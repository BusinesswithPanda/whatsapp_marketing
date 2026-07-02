<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Campaign;
use App\Models\Message;
use App\Models\Contact;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $companyId = $request->user()->company_id;

        $totalContacts = Contact::where('company_id', $companyId)->count();
        $totalCampaigns = Campaign::where('company_id', $companyId)->count();
        
        $messagesQuery = Message::whereHas('contact', function($q) use ($companyId) {
            $q->where('company_id', $companyId);
        });

        $totalMessagesSent = (clone $messagesQuery)->whereIn('status', ['sent', 'delivered', 'read'])->count();
        $totalMessagesRead = (clone $messagesQuery)->where('status', 'read')->count();

        $readRate = $totalMessagesSent > 0 ? round(($totalMessagesRead / $totalMessagesSent) * 100, 1) : 0;

        // Daily sent chart data (last 7 days)
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $sent = Message::whereHas('contact', function($q) use ($companyId) {
                $q->where('company_id', $companyId);
            })->whereDate('created_at', $date)->where('direction', 'outbound')->count();
            
            $chartData[] = [
                'date' => Carbon::now()->subDays($i)->format('M d'),
                'messages' => $sent
            ];
        }

        $recentCampaigns = Campaign::where('company_id', $companyId)
            ->with('template')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'metrics' => [
                'totalContacts' => $totalContacts,
                'totalCampaigns' => $totalCampaigns,
                'totalMessagesSent' => $totalMessagesSent,
                'readRate' => $readRate,
            ],
            'chartData' => $chartData,
            'recentCampaigns' => $recentCampaigns
        ]);
    }
}
