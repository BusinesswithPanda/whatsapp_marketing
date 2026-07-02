<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Message;
use App\Models\Contact;
use App\Models\WhatsappAccount;
use App\Events\MessageReceived;
use App\Events\MessageStatusUpdated;

class WebhookController extends Controller
{
    // Verification step
    public function verify(Request $request)
    {
        $mode = $request->query('hub_mode');
        $token = $request->query('hub_verify_token');
        $challenge = $request->query('hub_challenge');

        if ($mode && $token) {
            if ($mode === 'subscribe' && $token === 'whatsapp_marketing_token') {
                return response($challenge, 200);
            }
            return response('Forbidden', 403);
        }
        return response('Bad Request', 400);
    }

    // Payload step
    public function handle(Request $request)
    {
        $data = $request->all();
        
        if (isset($data['object']) && $data['object'] === 'whatsapp_business_account') {
            foreach ($data['entry'] as $entry) {
                foreach ($entry['changes'] as $change) {
                    $value = $change['value'];
                    
                    // Handle message status updates
                    if (isset($value['statuses'])) {
                        foreach ($value['statuses'] as $status) {
                            $this->handleStatusUpdate($status);
                        }
                    }

                    // Handle incoming messages
                    if (isset($value['messages'])) {
                        foreach ($value['messages'] as $message) {
                            $this->handleIncomingMessage($message, $value['metadata']);
                        }
                    }
                }
            }
        }

        return response('EVENT_RECEIVED', 200);
    }

    private function handleStatusUpdate($status)
    {
        $message = Message::where('message_sid', $status['id'])->first();
        if ($message) {
            $message->update(['status' => $status['status']]); // sent, delivered, read, failed
            
            if ($status['status'] === 'read' && $message->campaign) {
                $message->campaign->increment('read_count');
            }

            event(new MessageStatusUpdated($message));
        }
    }

    private function handleIncomingMessage($messageData, $metadata)
    {
        $phone = $messageData['from'];
        
        $account = WhatsappAccount::where('phone_number_id', $metadata['phone_number_id'])->first();
        if (!$account) return;

        $contact = Contact::firstOrCreate(
            ['company_id' => $account->company_id, 'phone' => $phone],
            ['first_name' => 'Unknown', 'tags' => json_encode(['inbound'])]
        );

        $text = $messageData['text']['body'] ?? '';

        $message = Message::create([
            'contact_id' => $contact->id,
            'direction' => 'inbound',
            'status' => 'received',
            'message_sid' => $messageData['id'],
            'body' => $text,
        ]);

        event(new MessageReceived($message));

        // Evaluate automated workflows/triggers
        $this->evaluateWorkflows($account->company_id, $contact, $text, $account);
    }

    private function evaluateWorkflows($companyId, $contact, $text, $account)
    {
        $workflows = \App\Models\Workflow::where('company_id', $companyId)
            ->where('is_active', true)
            ->get();

        foreach ($workflows as $workflow) {
            $triggered = false;

            if ($workflow->trigger_type === 'keyword') {
                $keyword = $workflow->trigger_config['keyword'] ?? '';
                $matchType = $workflow->trigger_config['match_type'] ?? 'contains';

                if (!empty($keyword)) {
                    if ($matchType === 'equals') {
                        $triggered = (strtolower(trim($text)) === strtolower(trim($keyword)));
                    } else {
                        $triggered = str_contains(strtolower($text), strtolower($keyword));
                    }
                }
            } elseif ($workflow->trigger_type === 'welcome') {
                $msgCount = Message::where('contact_id', $contact->id)->count();
                $triggered = ($msgCount <= 1);
            }

            if ($triggered) {
                $this->executeWorkflow($workflow, $contact, $account);
            }
        }
    }

    private function executeWorkflow($workflow, $contact, $account)
    {
        $steps = $workflow->steps ?? [];
        foreach ($steps as $step) {
            $type = $step['type'] ?? '';
            $data = $step['data'] ?? [];

            if ($type === 'message') {
                $body = $data['body'] ?? '';
                if (!empty($body)) {
                    $body = str_replace('{{first_name}}', $contact->first_name ?? 'there', $body);
                    $body = str_replace('{{last_name}}', $contact->last_name ?? '', $body);

                    $outMessage = Message::create([
                        'contact_id' => $contact->id,
                        'direction' => 'outbound',
                        'status' => 'pending',
                        'body' => $body,
                    ]);

                    $url = "https://graph.facebook.com/v19.0/{$account->phone_number_id}/messages";
                    $payload = [
                        'messaging_product' => 'whatsapp',
                        'recipient_type' => 'individual',
                        'to' => $contact->phone,
                        'type' => 'text',
                        'text' => [
                            'preview_url' => false,
                            'body' => $body
                        ]
                    ];

                    try {
                        $response = \Illuminate\Support\Facades\Http::withToken($account->access_token)->post($url, $payload);
                        if ($response->successful()) {
                            $outMessage->update([
                                'status' => 'sent',
                                'message_sid' => $response->json('messages.0.id')
                            ]);
                        } else {
                            $outMessage->update([
                                'status' => 'failed',
                                'error_message' => $response->body()
                            ]);
                        }
                    } catch (\Exception $e) {
                        $outMessage->update([
                            'status' => 'failed',
                            'error_message' => $e->getMessage()
                        ]);
                    }
                }
            } elseif ($type === 'tag_add') {
                $tag = $data['tag'] ?? '';
                if (!empty($tag)) {
                    $existingTags = json_decode($contact->tags, true) ?: [];
                    if (!in_array($tag, $existingTags)) {
                        $existingTags[] = $tag;
                        $contact->update(['tags' => json_encode($existingTags)]);
                    }
                }
            }
        }
    }
}
