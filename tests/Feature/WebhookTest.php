<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class WebhookTest extends TestCase
{
    use RefreshDatabase;

    public function test_webhook_verification_returns_challenge_if_token_matches()
    {
        $response = $this->get('/whatsapp/webhooks?hub_mode=subscribe&hub_verify_token=whatsapp_marketing_token&hub_challenge=123456');

        $response->assertStatus(200);
        $this->assertEquals('123456', $response->getContent());
    }

    public function test_webhook_verification_fails_if_token_mismatches()
    {
        $response = $this->get('/whatsapp/webhooks?hub_mode=subscribe&hub_verify_token=wrong_token&hub_challenge=123456');

        $response->assertStatus(403);
    }
}
