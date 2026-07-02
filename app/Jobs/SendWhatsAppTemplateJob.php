<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Message;
use Illuminate\Support\Facades\Http;
use Illuminate\Queue\Middleware\RateLimited;

class SendWhatsAppTemplateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    public function middleware()
    {
        // Enforce Meta rate limits using Laravel's rate limiting
        return [new RateLimited('whatsapp-sends')];
    }

    public function handle(): void
    {
        $contact = $this->message->contact;
        $campaign = $this->message->campaign;
        $template = $campaign->template;
        $account = \App\Models\WhatsappAccount::where('company_id', $campaign->company_id)->first();

        if (!$account) {
            $this->message->update(['status' => 'failed', 'error_message' => 'No WhatsApp account configured.']);
            return;
        }

        $url = "https://graph.facebook.com/v19.0/{$account->phone_number_id}/messages";

        $payload = [
            'messaging_product' => 'whatsapp',
            'to' => $contact->phone,
            'type' => 'template',
            'template' => [
                'name' => $template->element_name,
                'language' => ['code' => $template->language]
            ]
        ];

        $response = Http::withToken($account->access_token)->post($url, $payload);

        if ($response->successful()) {
            $this->message->update([
                'status' => 'sent',
                'message_sid' => $response->json('messages.0.id')
            ]);
            $campaign->increment('sent_count');
        } else {
            $this->message->update([
                'status' => 'failed',
                'error_message' => $response->body()
            ]);
        }
    }
}
