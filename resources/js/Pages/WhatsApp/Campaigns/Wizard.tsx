import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Users, LayoutTemplate, Send, ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, Plus, Rocket, AlertCircle } from 'lucide-react';

export default function CampaignWizard({ templates, availableTags }: { templates: any[], availableTags: string[] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        target_tag: '',
        template_id: '',
        scheduled_at: ''
    });

    const [step, setStep] = useState(1);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('whatsapp.campaigns.store'));
    };

    const steps = [
        { id: 1, name: 'Audience', description: 'Who are you sending to?', icon: Users },
        { id: 2, name: 'Template', description: 'What is the message?', icon: LayoutTemplate },
        { id: 3, name: 'Schedule', description: 'When to deliver?', icon: Send },
    ];

    return (
        <AuthenticatedLayout header={
            <div className="flex items-center gap-4">
                <Link href={route('whatsapp.campaigns.index')} className="p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-[0_2px_10px_rgb(0,0,0,0.04)] hover:shadow-[0_4px_15px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 transition-all">
                    <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </Link>
                <div>
                    <h2 className="text-2xl font-black leading-tight text-gray-900 dark:text-white tracking-tight">Create Campaign</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Follow the steps to launch your WhatsApp broadcast.</p>
                </div>
            </div>
        }>
            <Head title="New Campaign" />
            <div className="py-8">
                <div className="mx-auto max-w-[70rem] sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Stepper Sidebar */}
                        <div className="w-full lg:w-1/4">
                            <nav aria-label="Progress" className="sticky top-8">
                                <ol role="list" className="overflow-hidden">
                                    {steps.map((s, stepIdx) => {
                                        const isCompleted = step > s.id;
                                        const isActive = step === s.id;
                                        const isInactive = step < s.id;

                                        return (
                                            <li key={s.id} className={`relative ${stepIdx !== steps.length - 1 ? 'pb-10' : ''}`}>
                                                {stepIdx !== steps.length - 1 ? (
                                                    <div className={`absolute left-6 top-12 -ml-px mt-0.5 h-full w-0.5 ${
                                                        isCompleted ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-zinc-800'
                                                    }`} aria-hidden="true" />
                                                ) : null}
                                                <div className="group relative flex items-start">
                                                    <span className="flex h-9 items-center">
                                                        <span className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${
                                                            isCompleted 
                                                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.2)]' 
                                                                : isActive 
                                                                ? 'bg-white dark:bg-zinc-900 border-2 border-blue-600 dark:border-blue-400 shadow-[0_4px_15px_rgba(37,99,235,0.15)] text-blue-600 dark:text-blue-400 scale-105' 
                                                                : 'bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-slate-700 dark:text-zinc-300'
                                                        }`}>
                                                            {isCompleted ? (
                                                                <CheckCircle2 className="h-6 w-6 text-white stroke-[2.5]" aria-hidden="true" />
                                                            ) : (
                                                                <s.icon className="h-5 w-5 stroke-[2]" />
                                                            )}
                                                        </span>
                                                    </span>
                                                    <span className="ml-4 flex min-w-0 flex-col pt-1.5">
                                                        <span className={`text-sm tracking-tight transition-colors duration-200 ${
                                                            isCompleted 
                                                                ? 'text-slate-900 dark:text-zinc-50 font-extrabold' 
                                                                : isActive 
                                                                ? 'text-blue-600 dark:text-blue-400 font-extrabold' 
                                                                : 'text-slate-550 dark:text-zinc-400 font-semibold'
                                                        }`}>
                                                            {s.name}
                                                        </span>
                                                        <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500 mt-0.5 leading-none">
                                                            {s.description}
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </nav>
                        </div>

                        {/* Form Content */}
                        <div className="w-full lg:w-3/4">
                            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-2xl border border-gray-100/50 dark:border-gray-700/50 p-6 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all min-h-[450px] relative overflow-hidden">
                                
                                {/* Background Decoration */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                                <form onSubmit={submit} className="relative z-10 h-full flex flex-col">
                                    {/* Step 1: Audience */}
                                    {step === 1 && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 flex-1">
                                            <div>
                                                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                        <Users className="h-6 w-6" />
                                                    </div>
                                                    Target Segment
                                                </h3>
                                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Define the name of this campaign and select who should receive it.</p>
                                            </div>
                                            
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Campaign Name <span className="text-red-500">*</span></label>
                                                    <input 
                                                        type="text" 
                                                        value={data.name} 
                                                        onChange={e => setData('name', e.target.value)} 
                                                        placeholder="e.g. Summer Promo 2026" 
                                                        className="w-full rounded-2xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/50 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all px-4 py-3 text-gray-900 dark:text-gray-100" 
                                                        required 
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Target Audience Tag</label>
                                                    <div className="relative">
                                                        <select 
                                                            value={data.target_tag} 
                                                            onChange={e => setData('target_tag', e.target.value)} 
                                                            className="w-full rounded-2xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/50 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all px-4 py-3 text-gray-900 dark:text-gray-100 appearance-none"
                                                        >
                                                            <option value="">All Contacts (Send to everyone)</option>
                                                            {availableTags.map(tag => (
                                                                <option key={tag} value={tag}>Tag: {tag}</option>
                                                            ))}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                            <ChevronRight className="h-4 w-4 rotate-90" />
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-[13px] text-gray-500 dark:text-gray-400 font-medium">If you select 'All Contacts', the message will be broadcasted to your entire database.</p>
                                                    {errors.target_tag && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> {errors.target_tag}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Template */}
                                    {step === 2 && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 flex-1">
                                            <div>
                                                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                                        <LayoutTemplate className="h-6 w-6" />
                                                    </div>
                                                    Choose Template
                                                </h3>
                                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Select a Meta-approved template to send to your audience.</p>
                                            </div>
                                            
                                            <div className="space-y-6">
                                                {templates.length === 0 ? (
                                                    <div className="text-center py-10 px-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50">
                                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                                            <LayoutTemplate className="h-8 w-8 text-gray-400" />
                                                        </div>
                                                        <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">No Templates Found</h3>
                                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium max-w-sm mx-auto">You don't have any approved WhatsApp templates yet. You need at least one template to create a campaign.</p>
                                                        <Link 
                                                            href={route('whatsapp.templates.create')} 
                                                            className="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200"
                                                            style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                                                        >
                                                            <Plus className="-ml-1 mr-2 h-5 w-5" />
                                                            Create New Template
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Approved Meta Templates <span className="text-red-500">*</span></label>
                                                            <div className="relative">
                                                                <select 
                                                                    value={data.template_id} 
                                                                    onChange={e => setData('template_id', e.target.value)} 
                                                                    className="w-full rounded-2xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/50 shadow-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all px-4 py-3.5 text-gray-900 dark:text-gray-100 appearance-none font-medium" 
                                                                    required
                                                                >
                                                                    <option value="" disabled>Select a template...</option>
                                                                    {templates.map(t => (
                                                                        <option key={t.id} value={t.id}>{t.element_name} ({t.language})</option>
                                                                    ))}
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                                    <ChevronRight className="h-4 w-4 rotate-90" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-2xl border border-blue-100/50 dark:border-blue-800/30 flex gap-4 items-start shadow-inner">
                                                            <div className="mt-0.5">
                                                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">i</div>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Dynamic Variables Mapping</h4>
                                                                <p className="text-[13px] text-blue-800/80 dark:text-blue-200/70 font-medium leading-relaxed">
                                                                    Variables like <code className="bg-white/60 dark:bg-gray-900/60 px-1 py-0.5 rounded text-blue-900 dark:text-blue-300 mx-0.5">{'{{1}}'}</code> in your template will be automatically mapped to the contact's <code className="bg-white/60 dark:bg-gray-900/60 px-1 py-0.5 rounded text-blue-900 dark:text-blue-300 mx-0.5">first_name</code>. Make sure your database has names updated.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Schedule */}
                                    {step === 3 && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 flex-1">
                                            <div>
                                                <h3 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                                                        <Send className="h-6 w-6" />
                                                    </div>
                                                    Delivery Schedule
                                                </h3>
                                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">When should this campaign be sent out?</p>
                                            </div>
                                            
                                            <div className="space-y-6">
                                                <div className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 p-6 rounded-2xl relative overflow-hidden transition-all hover:border-green-200 dark:hover:border-green-800/50">
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Schedule Date & Time</label>
                                                    <input 
                                                        type="datetime-local" 
                                                        value={data.scheduled_at} 
                                                        onChange={e => setData('scheduled_at', e.target.value)} 
                                                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/80 shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all px-4 py-3.5 text-gray-900 dark:text-gray-100 font-medium" 
                                                    />
                                                    
                                                    {data.scheduled_at ? (
                                                        <div className="mt-4 flex items-center text-[13px] text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-500/10 p-3 rounded-xl border border-green-100 dark:border-green-800/30">
                                                            <Send className="w-4 h-4 mr-2" />
                                                            Campaign will be scheduled for {new Date(data.scheduled_at).toLocaleString()}.
                                                        </div>
                                                    ) : (
                                                        <div className="mt-4 flex items-center text-[13px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-500/10 p-3 rounded-xl border border-blue-100 dark:border-blue-800/30">
                                                            <Rocket className="w-4 h-4 mr-2" />
                                                            Leaving this blank will send the campaign immediately.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation Actions */}
                                    <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100 dark:border-gray-700/50">
                                        {step > 1 ? (
                                            <button 
                                                type="button" 
                                                onClick={() => setStep(step - 1)} 
                                                className="px-6 py-2.5 text-[15px] font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 rounded-xl transition-all flex items-center"
                                            >
                                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                            </button>
                                        ) : <div></div>}

                                        {step < 3 ? (
                                            <button 
                                                type="button" 
                                                onClick={() => setStep(step + 1)} 
                                                disabled={(step === 1 && !data.name) || (step === 2 && !data.template_id)} 
                                                className="inline-flex items-center rounded-xl px-8 py-3 text-[15px] font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.25)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.35)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none duration-200"
                                                style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                                            >
                                                Next Step <ArrowRight className="ml-2 h-5 w-5" />
                                            </button>
                                        ) : (
                                            <button 
                                                type="submit" 
                                                disabled={processing} 
                                                className="inline-flex items-center rounded-xl px-8 py-3 text-[15px] font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.25)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.35)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none duration-200"
                                                style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                                            >
                                                {processing ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                                ) : (
                                                    <Rocket className="-ml-1 mr-2 h-5 w-5" />
                                                )}
                                                {data.scheduled_at ? 'Schedule Campaign' : 'Send Campaign Now'}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
