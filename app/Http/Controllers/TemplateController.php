<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\WhatsappTemplate;
use App\Models\WhatsappAccount;
use App\Jobs\SyncWhatsAppTemplatesJob;

class TemplateController extends Controller
{
    public function index(Request $request)
    {
        // For simplicity, fetch all templates related to the user's company's WABA IDs
        $wabaIds = WhatsappAccount::where('company_id', $request->user()->company_id)->pluck('waba_id');
        $templates = WhatsappTemplate::whereIn('waba_id', $wabaIds)->get();

        return Inertia::render('WhatsApp/Templates/Index', [
            'templates' => $templates
        ]);
    }

    public function sync(Request $request)
    {
        $accounts = WhatsappAccount::where('company_id', $request->user()->company_id)->get();
        
        foreach ($accounts as $account) {
            SyncWhatsAppTemplatesJob::dispatch($account);
        }

        return back()->with('success', 'Template sync initiated.');
    }

    public function create()
    {
        return Inertia::render('WhatsApp/Templates/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'language' => 'required|string',
            'category' => 'required|string',
            'header_type' => 'required|string',
            'header_text' => 'nullable|string|max:60',
            'header_media' => 'nullable|file|mimes:jpeg,png,mp4,pdf,doc,docx,txt|max:15360',
            'body_text' => 'required|string',
            'footer_text' => 'nullable|string|max:60',
            'buttons' => 'nullable|array',
        ]);

        $wabaId = WhatsappAccount::where('company_id', $request->user()->company_id)->value('waba_id');
        if (!$wabaId) {
            // Fallback or handle error if no WABA is found
            $wabaId = 'demo_waba_' . $request->user()->company_id;
        }

        $mediaPath = null;
        if ($request->hasFile('header_media')) {
            $mediaPath = $request->file('header_media')->store('templates/media', 'public');
        }

        WhatsappTemplate::create([
            'waba_id' => $wabaId,
            'element_name' => $request->name,
            'language' => $request->language,
            'category' => $request->category,
            'status' => 'PENDING',
            'header_type' => $request->header_type,
            'header_text' => $request->header_text,
            'header_media_path' => $mediaPath,
            'body_text' => $request->body_text,
            'footer_text' => $request->footer_text,
            'buttons' => $request->buttons ? json_encode($request->buttons) : null,
        ]);

        return redirect()->route('whatsapp.templates.index')->with('success', 'Template saved and submitted for approval.');
    }

    public function library()
    {
        return Inertia::render('WhatsApp/Templates/Library');
    }

    public function generator()
    {
        return Inertia::render('WhatsApp/Templates/Generator');
    }
}
