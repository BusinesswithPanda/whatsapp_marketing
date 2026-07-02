# WhatsApp Marketing Platform - AI Context & Handoff

This document serves as a "memory" for AI assistants. If you are reading this on a new device or in a new session, this provides the complete state of the project.

## Tech Stack
- **Backend:** Laravel 11 (PHP 8.3+)
- **Frontend:** React (TypeScript) + Vite + Tailwind CSS + Inertia.js
- **Database:** MySQL 8.0+
- **Real-Time:** Laravel Reverb (WebSockets)
- **Charts:** Recharts (React)

## Architecture Overview
This is a multi-tenant B2B SaaS application. All primary tables use a `company_id` to separate tenant data.

### Core Modules Built:
1. **Authentication & UI Base (Phase 1):**
   - Built on top of Laravel Breeze (React/Inertia).
   - Multi-tenant companies table and `company_id` added to users.

2. **Meta WhatsApp Integration (Phase 2):**
   - `WhatsAppAccountController`: Manages Business Account API credentials.
   - `SyncWhatsAppTemplatesJob`: Pulls approved templates from Meta's Graph API.
   - **Template Layout Engine:** A React component that dynamically renders templates with a live mobile phone preview.

3. **CRM & Campaign Scheduler (Phase 3):**
   - **Contact CRM:** Allows uploading `.csv` or `.txt` files to bulk-import contacts with custom tags.
   - **Campaign Wizard:** A 3-step React wizard (Select Audience by Tag -> Choose Template -> Schedule).
   - **Rate Limiting:** `SendWhatsAppTemplateJob` strictly enforces a Meta rate limit of `50 requests per second` via `AppServiceProvider`.

4. **Webhooks & Team Inbox (Phase 4):**
   - `WebhookController`: Handles `/whatsapp/webhooks` (GET for Meta verification, POST for message statuses & inbound user replies).
   - **Real-Time Inbox:** `Inbox/Index.tsx` provides a WhatsApp Web-style chat interface listening to Laravel Reverb (`MessageReceived` and `MessageStatusUpdated` events) for live chat bubbles.

5. **Analytics Dashboard & Testing (Phase 5):**
   - `AnalyticsController`: Aggregates telemetry (Total Sent, Read Rates).
   - **React Dashboard:** Replaces the Breeze default dashboard with a custom UI featuring a 7-day `Recharts` area chart.
   - **PHPUnit Tests:** Created for Webhook verification and CSV uploads (`WebhookTest.php`, `ContactUploadTest.php`).

## Database Details
- **Database Name:** `whatsapp_marketing`
- **Connection:** MySQL

## Running the Application Locally
To start the app, run these two commands in separate terminal windows:
1. `php artisan serve` (Starts the PHP API and backend).
2. `npm run dev` (Starts Vite for real-time frontend compiling).

## Resuming Development
To resume development, the AI should inspect `routes/web.php` for the application structure and `database/migrations` for the schema layout.
