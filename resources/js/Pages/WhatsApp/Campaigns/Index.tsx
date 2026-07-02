import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Send, Plus, Clock, Users, Rocket, ArrowRight, CheckCircle } from 'lucide-react';

export default function CampaignsIndex({ campaigns }: { campaigns: any[] }) {
    return (
        <AuthenticatedLayout header={
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Broadcast Campaigns</h2>
                    <p className="text-[13px] text-slate-500 dark:text-zinc-400 mt-1 font-medium">
                        Create, schedule, and analyze your mass WhatsApp broadcasts and template campaigns.
                    </p>
                </div>
                {campaigns.length > 0 && (
                    <Link
                        href={route('whatsapp.campaigns.create')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-xl shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200"
                        style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                    >
                        <Plus className="w-4.5 h-4.5" />
                        New Campaign
                    </Link>
                )}
            </div>
        }>
            <Head title="Campaigns" />
            
            <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {campaigns.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {campaigns.map((campaign) => {
                            const percentage = campaign.total_contacts > 0 
                                ? Math.round((campaign.sent_count / campaign.total_contacts) * 100) 
                                : 0;
                            
                            return (
                                <div 
                                    key={campaign.id} 
                                    className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 dark:hover:border-zinc-800 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
                                >
                                    {/* Campaign details */}
                                    <div className="flex items-center gap-4 min-w-0 flex-1">
                                        <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100/50 dark:border-purple-900/30">
                                            <Rocket className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-base font-bold text-slate-800 dark:text-zinc-100 truncate">
                                                {campaign.name}
                                            </p>
                                            <p className="text-[13px] flex flex-wrap items-center gap-x-2 gap-y-1 text-slate-400 dark:text-zinc-500 mt-1 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Users className="h-3.5 w-3.5" /> {campaign.total_contacts} Recipients
                                                </span>
                                                <span className="text-slate-300 dark:text-zinc-700">&bull;</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5" /> 
                                                    {campaign.scheduled_at 
                                                        ? new Date(campaign.scheduled_at).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
                                                        : 'Sent Immediately'
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress statistics */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:w-80 flex-shrink-0">
                                        <div className="w-full flex-1">
                                            <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1.5">
                                                <span>Delivery Progress</span>
                                                <span>{percentage}%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                                                <div 
                                                    className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-[11px] text-slate-400 dark:text-zinc-500 mt-1.5 font-medium">
                                                <span>Sent: {campaign.sent_count}/{campaign.total_contacts}</span>
                                                <span>Read: {campaign.read_count}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <div className="flex items-center justify-between sm:justify-end md:w-36 flex-shrink-0">
                                        <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${
                                            campaign.status === 'COMPLETED' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20' : 
                                            campaign.status === 'PROCESSING' || campaign.status === 'SENDING' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20' : 
                                            'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20'
                                        }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${
                                                campaign.status === 'COMPLETED' ? 'bg-emerald-500' : 
                                                campaign.status === 'PROCESSING' || campaign.status === 'SENDING' ? 'bg-blue-500' : 
                                                'bg-amber-500'
                                            }`} />
                                            {campaign.status}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-12 text-center shadow-sm max-w-lg mx-auto mt-8">
                        <div className="w-16 h-16 bg-purple-50 dark:bg-purple-950/40 rounded-full flex items-center justify-center mx-auto mb-5 ring-8 ring-purple-50/50 dark:ring-purple-950/20 border border-purple-100/50 dark:border-purple-900/30">
                            <Rocket className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-100">No campaigns created yet</h3>
                        <p className="text-sm text-slate-400 dark:text-zinc-500 mt-2 max-w-xs mx-auto leading-relaxed">
                            Create your first broadcast segment, choose an approved template, and schedule your launch.
                        </p>
                        <div className="mt-6">
                            <Link
                                href={route('whatsapp.campaigns.create')}
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200"
                                style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                            >
                                <Plus className="w-4 h-4" />
                                Create Campaign
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
