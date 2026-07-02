import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Sparkles, MessageSquare, Clock, Bell, Plus, Play, Trash2, Edit2, GitBranch, ArrowRight, Zap } from 'lucide-react';

interface Workflow {
    id: number;
    name: string;
    trigger_type: string;
    trigger_config: {
        keyword?: string;
        match_type?: string;
    };
    steps: Array<{
        id: string;
        type: string;
        data?: {
            body?: string;
            tag?: string;
        };
    }>;
    is_active: boolean;
}

export default function AutomationsIndex({ workflows }: { workflows: Workflow[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this workflow?')) {
            destroy(route('whatsapp.automations.destroy', id));
        }
    };

    const templates = [
        {
            title: 'Welcome Message',
            desc: 'Auto-send greeting to new chat subscribers.',
            trigger: 'welcome',
            icon: Sparkles,
            color: 'from-pink-500/10 to-rose-500/10 text-rose-500',
            borderColor: 'border-rose-100 dark:border-rose-900/30',
        },
        {
            title: 'Keyword Auto-Reply',
            desc: 'Trigger responses when helper words match.',
            trigger: 'keyword',
            icon: MessageSquare,
            color: 'from-blue-500/10 to-indigo-500/10 text-blue-500',
            borderColor: 'border-blue-100 dark:border-blue-900/30',
        },
        {
            title: 'Drip Sequence',
            desc: 'Schedule timed follow-up messages.',
            trigger: 'drip',
            icon: Clock,
            color: 'from-amber-500/10 to-orange-500/10 text-amber-500',
            borderColor: 'border-amber-100 dark:border-amber-900/30',
        },
        {
            title: 'Abandoned Cart',
            desc: 'Nudge users back to finish checkout.',
            trigger: 'abandoned_cart',
            icon: Bell,
            color: 'from-emerald-500/10 to-teal-500/10 text-emerald-500',
            borderColor: 'border-emerald-100 dark:border-emerald-900/30',
        }
    ];

    return (
        <AuthenticatedLayout header={
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Automations & Workflows</h2>
                <p className="text-[13px] text-slate-500 dark:text-zinc-400 mt-1 font-medium">
                    Trigger auto-replies, nurture leads with drip sequences, and build custom customer journeys.
                </p>
            </div>
        }>
            <Head title="Workflows & Automations" />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* Templates Section */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-5 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500" />
                        Quick-Start Templates
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {templates.map((tpl, idx) => (
                            <Link
                                key={idx}
                                href={route('whatsapp.automations.create', { trigger: tpl.trigger })}
                                className={`group bg-white dark:bg-zinc-900 p-6 rounded-2xl border ${tpl.borderColor} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                            >
                                <div>
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tpl.color} flex items-center justify-center mb-4`}>
                                        <tpl.icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-base text-slate-800 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {tpl.title}
                                    </h4>
                                    <p className="text-xs text-slate-400 dark:text-zinc-500 leading-relaxed font-medium">
                                        {tpl.desc}
                                    </p>
                                </div>
                                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                                    Use Template
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Workflow List Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-100 flex items-center gap-2">
                            <GitBranch className="w-5 h-5 text-blue-500" />
                            Active Automations
                        </h3>
                        <Link
                            href={route('whatsapp.automations.create')}
                            className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200"
                            style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                        >
                            <Plus className="w-4 h-4 mr-1.5" />
                            New Workflow
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-2xl overflow-hidden">
                        {workflows.length === 0 ? (
                            <div className="p-16 text-center max-w-md mx-auto">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-zinc-700/50">
                                    <GitBranch className="w-8 h-8 text-slate-400" />
                                </div>
                                <h4 className="text-base font-bold text-slate-800 dark:text-zinc-200">No Automations Configured</h4>
                                <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2 leading-relaxed font-medium">
                                    You don't have any automated workflows running. Create one using our templates to automate your client replies.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50 dark:divide-zinc-800/40">
                                {workflows.map((wf) => (
                                    <div key={wf.id} className="p-6 flex flex-wrap items-center justify-between gap-6 hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-bold text-base text-slate-850 dark:text-zinc-100 truncate">
                                                    {wf.name}
                                                </h4>
                                                <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                                                    wf.is_active 
                                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-450' 
                                                        : 'bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-450'
                                                }`}>
                                                    {wf.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 dark:text-zinc-500 font-semibold">
                                                <span className="flex items-center gap-1">
                                                    <Play className="w-3.5 h-3.5 text-slate-400" />
                                                    Trigger: <strong className="text-slate-650 dark:text-zinc-350">{wf.trigger_type.toUpperCase()}</strong>
                                                    {wf.trigger_type === 'keyword' && (
                                                        <span className="bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] font-bold text-blue-600 dark:text-blue-400 ml-1">
                                                            "{wf.trigger_config?.keyword}"
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="text-slate-200 dark:text-zinc-800">•</span>
                                                <span>
                                                    Steps: <strong className="text-slate-650 dark:text-zinc-350">{wf.steps?.length || 0} Actions</strong>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route('whatsapp.automations.edit', wf.id)}
                                                className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-xl transition-all"
                                                title="Edit Workflow"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(wf.id)}
                                                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                                                title="Delete Workflow"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
