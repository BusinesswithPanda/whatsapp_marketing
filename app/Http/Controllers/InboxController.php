<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;

class InboxController extends Controller
{
    public function index(Request $request)
    {
        $companyId = $request->user()->company_id;
        
        $contacts = Contact::where('company_id', $companyId)
            ->whereHas('messages')
            ->with(['messages' => function ($query) {
                $query->latest()->limit(50); // Get latest 50 messages per contact for the initial load
            }])
            ->get();

        return Inertia::render('WhatsApp/Inbox/Index', [
            'contacts' => $contacts
        ]);
    }
}
