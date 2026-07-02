import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Send, CheckCheck, Rocket, Activity, BarChart3, ArrowRight, Plus } from 'lucide-react';

interface Metrics {
    totalContacts: number;
    totalCampaigns: number;
    totalMessagesSent: number;
    readRate: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800/80 p-3 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                <p className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">{label}</p>
                <div className="flex items-center gap-2 mt-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                        {payload[0].value} {payload[0].value === 1 ? 'message' : 'messages'}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function Dashboard({ metrics, chartData, recentCampaigns }: { metrics: Metrics, chartData: any[], recentCampaigns: any[] }) {
    return (
        <AuthenticatedLayout header={
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Analytics Dashboard</h2>
                    <p className="text-[13px] text-slate-500 dark:text-zinc-400 mt-1 font-medium">
                        Real-time performance metrics and overview of your WhatsApp campaigns.
                    </p>
                </div>
                {recentCampaigns.length > 0 && (
                    <Link
                        href={route('whatsapp.campaigns.index')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200"
                        style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                    >
                        <Plus className="w-4 h-4" />
                        New Campaign
                    </Link>
                )}
            </div>
        }>
            <Head title="Dashboard" />
            
            <div className="space-y-6 max-w-7xl mx-auto py-2">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Contacts Card */}
                    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 group shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold text-slate-400 dark:text-zinc-400 uppercase tracking-wider">Total Contacts</span>
                            <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">{metrics.totalContacts}</h3>
                            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1.5 font-medium">Active list subscribers</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Campaigns Card */}
                    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-5 hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-all duration-300 group shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold text-slate-400 dark:text-zinc-400 uppercase tracking-wider">Total Campaigns</span>
                            <div className="p-2.5 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                <Rocket className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">{metrics.totalCampaigns}</h3>
                            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1.5 font-medium">Broadcasts scheduled or sent</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Messages Sent Card */}
                    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 group shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold text-slate-400 dark:text-zinc-400 uppercase tracking-wider">Messages Sent</span>
                            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                <Send className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">{metrics.totalMessagesSent}</h3>
                            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1.5 font-medium">Successfully delivered</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Read Rate Card */}
                    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-5 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300 group shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] font-semibold text-slate-400 dark:text-zinc-400 uppercase tracking-wider">Read Rate</span>
                            <div className="p-2.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl group-hover:scale-105 transition-transform duration-300">
                                <CheckCheck className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">{metrics.readRate}%</h3>
                            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1.5 font-medium">Average open percentage</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </div>

                {/* Primary Dashboard Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Chart Container */}
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-zinc-50 flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-blue-500" /> Messages Sent Trend
                                </h3>
                                <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">Daily volume over the past 7 days</p>
                            </div>
                        </div>
                        <div className="h-[300px] w-full mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#2563eb" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-zinc-800/60" />
                                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                                    <Tooltip 
                                        content={<CustomTooltip />} 
                                        cursor={{ fill: 'rgba(148, 163, 184, 0.04)' }} 
                                    />
                                    <Bar 
                                        dataKey="messages" 
                                        fill="url(#colorMessages)" 
                                        radius={[4, 4, 0, 0]} 
                                        maxBarSize={32} 
                                        background={{ fill: 'rgba(148, 163, 184, 0.05)', radius: 4 }} 
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Campaigns Container */}
                    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-2xl p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-zinc-50 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-purple-500" /> Recent Activity
                                </h3>
                                <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">Latest broadcast deployments</p>
                            </div>
                        </div>

                        <div className="space-y-3 flex-1 flex flex-col justify-between">
                            {recentCampaigns && recentCampaigns.length > 0 ? (
                                <div className="space-y-3">
                                    {recentCampaigns.map((campaign) => (
                                        <div key={campaign.id} className="bg-slate-50/50 dark:bg-zinc-800/20 p-4 rounded-xl flex justify-between items-center border border-slate-100/50 dark:border-zinc-800/40 hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-colors duration-200">
                                            <div className="min-w-0 flex-1 pr-3">
                                                <p className="font-bold text-[14px] text-slate-800 dark:text-zinc-100 truncate">{campaign.name}</p>
                                                <p className="text-xs text-slate-400 dark:text-zinc-500 mt-0.5">{new Date(campaign.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-[13px] font-bold text-slate-800 dark:text-zinc-200">{campaign.sent_count} sent</p>
                                                <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mt-1.5 ${
                                                    campaign.status === 'COMPLETED' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20' : 
                                                    'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20'
                                                }`}>
                                                    {campaign.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                                    <div className="w-14 h-14 bg-purple-50 dark:bg-purple-950/40 rounded-full flex items-center justify-center mb-4 ring-8 ring-purple-50/50 dark:ring-purple-950/20 border border-purple-100/50 dark:border-purple-900/30">
                                        <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <p className="text-[15px] font-bold text-slate-700 dark:text-zinc-300">No campaigns yet</p>
                                    <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1 max-w-[200px] mx-auto leading-relaxed">
                                        Create a contact list and schedule your first broadcast.
                                    </p>
                                    <Link
                                        href={route('whatsapp.campaigns.index')}
                                        className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 group"
                                    >
                                        Create Campaign
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
