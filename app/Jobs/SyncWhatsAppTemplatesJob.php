<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\WhatsappAccount;
use App\Models\WhatsappTemplate;
use Illuminate\Support\Facades\Http;

class SyncWhatsAppTemplatesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $account;

    public function __construct(WhatsappAccount $account)
    {
        $this->account = $account;
    }

    public function handle(): void
    {
        // Meta Graph API Endpoint for message templates
        $url = "https://graph.facebook.com/v19.0/{$this->account->waba_id}/message_templates";
        
        $response = Http::withToken($this->account->access_token)->get($url);

        if ($response->successful()) {
            $templates = $response->json('data') ?? [];

            foreach ($templates as $item) {
                // Determine buttons from components
                $buttons = null;
                $bodyText = null;

                if (isset($item['components'])) {
                    foreach ($item['components'] as $component) {
                        if ($component['type'] === 'BODY') {
                            $bodyText = $component['text'] ?? null;
                        }
                        if ($component['type'] === 'BUTTONS') {
                            $buttons = $component['buttons'] ?? null;
                        }
                    }
                }

                WhatsappTemplate::updateOrCreate(
                    [
                        'waba_id' => $this->account->waba_id,
                        'element_name' => $item['name'],
                        'language' => $item['language'],
                    ],
                    [
                        'category' => $item['category'],
                        'status' => $item['status'],
                        'body_text' => $bodyText,
                        'buttons' => $buttons ? json_encode($buttons) : null,
                    ]
                );
            }
        }
    }
}
