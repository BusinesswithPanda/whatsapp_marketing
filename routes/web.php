<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\AnalyticsController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // WhatsApp Accounts
    Route::get('/whatsapp/accounts', [\App\Http\Controllers\WhatsAppAccountController::class, 'index'])->name('whatsapp.accounts.index');
    Route::post('/whatsapp/accounts', [\App\Http\Controllers\WhatsAppAccountController::class, 'store'])->name('whatsapp.accounts.store');

    // WhatsApp Templates
    Route::get('/whatsapp/templates', [\App\Http\Controllers\TemplateController::class, 'index'])->name('whatsapp.templates.index');
    Route::get('/whatsapp/templates/library', [\App\Http\Controllers\TemplateController::class, 'library'])->name('whatsapp.templates.library');
    Route::get('/whatsapp/templates/generator', [\App\Http\Controllers\TemplateController::class, 'generator'])->name('whatsapp.templates.generator');
    Route::post('/whatsapp/templates/sync', [\App\Http\Controllers\TemplateController::class, 'sync'])->name('whatsapp.templates.sync');
    Route::get('/whatsapp/templates/create', [\App\Http\Controllers\TemplateController::class, 'create'])->name('whatsapp.templates.create');
    Route::post('/whatsapp/templates', [\App\Http\Controllers\TemplateController::class, 'store'])->name('whatsapp.templates.store');

    // Contacts
    Route::get('/whatsapp/contacts', [\App\Http\Controllers\ContactController::class, 'index'])->name('whatsapp.contacts.index');
    Route::post('/whatsapp/contacts', [\App\Http\Controllers\ContactController::class, 'store'])->name('whatsapp.contacts.store');
    Route::post('/whatsapp/contacts/bulk-delete', [\App\Http\Controllers\ContactController::class, 'bulkDestroy'])->name('whatsapp.contacts.bulk-delete');
    Route::put('/whatsapp/contacts/{contact}', [\App\Http\Controllers\ContactController::class, 'update'])->name('whatsapp.contacts.update');
    Route::delete('/whatsapp/contacts/{contact}', [\App\Http\Controllers\ContactController::class, 'destroy'])->name('whatsapp.contacts.destroy');
    Route::post('/whatsapp/contacts/upload', [\App\Http\Controllers\ContactController::class, 'upload'])->name('whatsapp.contacts.upload');

    // Automations & Workflows
    Route::get('/whatsapp/automations', [\App\Http\Controllers\WorkflowController::class, 'index'])->name('whatsapp.automations.index');
    Route::get('/whatsapp/automations/create', [\App\Http\Controllers\WorkflowController::class, 'create'])->name('whatsapp.automations.create');
    Route::post('/whatsapp/automations', [\App\Http\Controllers\WorkflowController::class, 'store'])->name('whatsapp.automations.store');
    Route::get('/whatsapp/automations/{workflow}/edit', [\App\Http\Controllers\WorkflowController::class, 'edit'])->name('whatsapp.automations.edit');
    Route::put('/whatsapp/automations/{workflow}', [\App\Http\Controllers\WorkflowController::class, 'update'])->name('whatsapp.automations.update');
    Route::delete('/whatsapp/automations/{workflow}', [\App\Http\Controllers\WorkflowController::class, 'destroy'])->name('whatsapp.automations.destroy');

    // Campaigns
    Route::get('/whatsapp/campaigns', [\App\Http\Controllers\CampaignController::class, 'index'])->name('whatsapp.campaigns.index');
    Route::get('/whatsapp/campaigns/create', [\App\Http\Controllers\CampaignController::class, 'create'])->name('whatsapp.campaigns.create');
    Route::post('/whatsapp/campaigns', [\App\Http\Controllers\CampaignController::class, 'store'])->name('whatsapp.campaigns.store');

    // Inbox
    Route::get('/whatsapp/inbox', [\App\Http\Controllers\InboxController::class, 'index'])->name('whatsapp.inbox.index');

    // User Manual Builder
    Route::get('/manual', [\App\Http\Controllers\ManualController::class, 'index'])->name('manual.index');
});

// Webhooks (Outside Auth)
Route::get('/whatsapp/webhooks', [\App\Http\Controllers\WebhookController::class, 'verify']);
Route::post('/whatsapp/webhooks', [\App\Http\Controllers\WebhookController::class, 'handle']);

require __DIR__.'/auth.php';
