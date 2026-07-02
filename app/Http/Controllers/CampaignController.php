<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Campaign;
use App\Models\Contact;
use App\Models\WhatsappTemplate;
use App\Models\Message;
use App\Jobs\SendWhatsAppTemplateJob;
use Carbon\Carbon;

class CampaignController extends Controller
{
    public function index(Request $request)
    {
        $campaigns = Campaign::where('company_id', $request->user()->company_id)->with('template')->get();
        return Inertia::render('WhatsApp/Campaigns/Index', [
            'campaigns' => $campaigns
        ]);
    }

    public function create(Request $request)
    {
        $templates = WhatsappTemplate::all(); // Usually filter by waba_id
        
        // Ensure tags decode gracefully
        $contacts = Contact::where('company_id', $request->user()->company_id)->get();
        $tags = collect();
        foreach($contacts as $c) {
            $decoded = json_decode($c->tags, true);
            if(is_array($decoded)) {
                $tags = $tags->merge($decoded);
            }
        }
        $tags = $tags->unique()->values();

        return Inertia::render('WhatsApp/Campaigns/Wizard', [
            'templates' => $templates,
            'availableTags' => $tags
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'template_id' => 'required|exists:whatsapp_templates,id',
            'target_tag' => 'nullable|string',
            'scheduled_at' => 'nullable|date',
        ]);

        $query = Contact::where('company_id', $request->user()->company_id)->where('is_blocked', false);
        if ($request->target_tag) {
            $query->whereJsonContains('tags', $request->target_tag);
        }
        $contacts = $query->get();

        if ($contacts->isEmpty()) {
            return back()->withErrors(['target_tag' => 'No contacts found for the selected segment.']);
        }

        $campaign = Campaign::create([
            'company_id' => $request->user()->company_id,
            'template_id' => $request->template_id,
            'name' => $request->name,
            'scheduled_at' => $request->scheduled_at ? Carbon::parse($request->scheduled_at) : null,
            'status' => 'PENDING',
            'total_contacts' => $contacts->count(),
        ]);

        foreach ($contacts as $contact) {
            $message = Message::create([
                'campaign_id' => $campaign->id,
                'contact_id' => $contact->id,
                'status' => 'pending',
            ]);

            $delay = $request->scheduled_at ? Carbon::parse($request->scheduled_at) : now();
            SendWhatsAppTemplateJob::dispatch($message)->delay($delay);
        }

        $campaign->update(['status' => 'PROCESSING']);

        return redirect()->route('whatsapp.campaigns.index')->with('success', 'Campaign scheduled successfully.');
    }
}
