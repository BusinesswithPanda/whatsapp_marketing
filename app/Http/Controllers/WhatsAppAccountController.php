<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\WhatsappAccount;

class WhatsAppAccountController extends Controller
{
    public function index(Request $request)
    {
        $accounts = WhatsappAccount::where('company_id', $request->user()->company_id)->get();
        return Inertia::render('WhatsApp/Accounts/Index', [
            'accounts' => $accounts
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'phone_number_id' => 'required|string',
            'waba_id' => 'required|string',
            'access_token' => 'required|string',
        ]);

        WhatsappAccount::create([
            'company_id' => $request->user()->company_id,
            'phone_number_id' => $request->input('phone_number_id'),
            'waba_id' => $request->input('waba_id'),
            'access_token' => $request->input('access_token'),
            'status' => 'CONNECTED'
        ]);

        return redirect()->route('whatsapp.accounts.index')->with('success', 'WhatsApp account connected successfully.');
    }
}
