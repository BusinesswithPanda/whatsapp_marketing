<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use App\Models\User;
use App\Models\Company;

class ContactUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_upload_contacts_csv()
    {
        $company = Company::create(['name' => 'Test Company']);
        $user = User::factory()->create(['company_id' => $company->id]);

        $csvContent = "phone,first_name,last_name,tags\n1234567890,John,Doe,marketing";
        $file = UploadedFile::fake()->createWithContent('contacts.csv', $csvContent);

        $response = $this->actingAs($user)->post('/whatsapp/contacts/upload', [
            'file' => $file,
        ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('contacts', [
            'company_id' => $company->id,
            'phone' => '1234567890',
            'first_name' => 'John',
            'last_name' => 'Doe',
        ]);
    }
}
