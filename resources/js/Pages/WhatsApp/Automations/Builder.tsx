import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Save, Plus, Trash2, Edit2, Zap, MessageSquare, Tag, Clock, Check, Smartphone } from 'lucide-react';

interface Step {
    id: string;
    type: string; // 'message' | 'tag_add' | 'delay'
    data: {
        body?: string;
        tag?: string;
        delay_value?: number;
        delay_unit?: string; // 'minutes' | 'hours' | 'days'
    };
}

interface Workflow {
    id?: number;
    name: string;
    trigger_type: string;
    trigger_config: {
        keyword?: string;
        match_type?: string;
    };
    steps: Step[];
    is_active: boolean;
}

export default function WorkflowBuilder({ workflow }: { workflow: Workflow | null }) {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const isEdit = !!workflow;

    const { data, setData, post, put, processing } = useForm({
        name: workflow?.name || 'My New Automation',
        trigger_type: workflow?.trigger_type || params.get('trigger') || 'keyword',
        trigger_config: workflow?.trigger_config || {
            keyword: '',
            match_type: 'contains',
        },
        steps: workflow?.steps || [
            {
                id: 'step_1',
                type: 'message',
                data: {
                    body: 'Hello {{first_name}}, thanks for reaching out! How can we help you today?',
                }
            }
        ] as Step[],
        is_active: workflow ? workflow.is_active : true,
    });

    const [editingStepId, setEditingStepId] = useState<string | null>(null);
    const [activeStepTab, setActiveStepTab] = useState<'message' | 'tag_add' | 'delay'>('message');
    const [stepInputText, setStepInputText] = useState('');
    const [stepInputTag, setStepInputTag] = useState('');
    const [stepInputDelayValue, setStepInputDelayValue] = useState<number>(1);
    const [stepInputDelayUnit, setStepInputDelayUnit] = useState('hours');

    const handleAddStep = (type: 'message' | 'tag_add' | 'delay') => {
        const newStep: Step = {
            id: 'step_' + Date.now(),
            type,
            data: {
                body: type === 'message' ? 'Thank you for your message!' : undefined,
                tag: type === 'tag_add' ? 'vip' : undefined,
                delay_value: type === 'delay' ? 1 : undefined,
                delay_unit: type === 'delay' ? 'hours' : undefined,
            }
        };
        setData('steps', [...data.steps, newStep]);
    };

    const handleRemoveStep = (id: string) => {
        setData('steps', data.steps.filter(s => s.id !== id));
        if (editingStepId === id) setEditingStepId(null);
    };

    const handleOpenEditStep = (step: Step) => {
        setEditingStepId(step.id);
        setActiveStepTab(step.type as any);
        setStepInputText(step.data.body || '');
        setStepInputTag(step.data.tag || '');
        setStepInputDelayValue(step.data.delay_value || 1);
        setStepInputDelayUnit(step.data.delay_unit || 'hours');
    };

    const handleSaveStepData = () => {
        if (!editingStepId) return;

        const updatedSteps = data.steps.map(s => {
            if (s.id === editingStepId) {
                return {
                    ...s,
                    type: activeStepTab,
                    data: {
                        body: activeStepTab === 'message' ? stepInputText : undefined,
                        tag: activeStepTab === 'tag_add' ? stepInputTag : undefined,
                        delay_value: activeStepTab === 'delay' ? stepInputDelayValue : undefined,
                        delay_unit: activeStepTab === 'delay' ? stepInputDelayUnit : undefined,
                    }
                };
            }
            return s;
        });

        setData('steps', updatedSteps);
        setEditingStepId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && workflow?.id) {
            put(route('whatsapp.automations.update', workflow.id));
        } else {
            post(route('whatsapp.automations.store'));
        }
    };

    const renderPreviewText = () => {
        // Find the first message step to display in the live device preview
        const msgStep = data.steps.find(s => s.type === 'message');
        return msgStep?.data.body || 'Type a message step to preview it here...';
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex items-center gap-4">
                <Link href={route('whatsapp.automations.index')} className="p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-[0_2px_10px_rgb(0,0,0,0.04)] hover:shadow-[0_4px_15px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 transition-all">
                    <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
                        {isEdit ? 'Edit Workflow' : 'Visual Workflow Builder'}
                    </h2>
                    <p className="text-[13px] text-slate-500 dark:text-zinc-400 mt-1 font-medium">
                        Configure node triggers and build sequential chat actions.
                    </p>
                </div>
            </div>
        }>
            <Head title="Workflow Builder" />

            <div className="max-w-[90rem] mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Columns - Workflow Setup & Visual Canvas */}
                    <div className="flex-1 space-y-8 w-full">
                        
                        {/* Name & Core Trigger Fields */}
                        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm p-6 sm:p-8 rounded-2xl space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-zinc-300 mb-2">Workflow Name</label>
                                <input 
                                    type="text" 
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="e.g. Sales Inquiry Welcome Sequence"
                                    className="w-full rounded-xl border-slate-200 dark:border-zinc-850 dark:bg-zinc-950 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold py-3 px-4 text-slate-800 dark:text-zinc-100 text-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-zinc-300 mb-2">Trigger Event</label>
                                        <div className="relative">
                                            <select
                                                value={data.trigger_type}
                                                onChange={e => setData('trigger_type', e.target.value)}
                                                className="w-full rounded-xl border-slate-200 dark:border-zinc-850 dark:bg-zinc-950 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all py-3 pl-4 pr-10 font-semibold text-slate-700 dark:text-zinc-200 text-sm appearance-none"
                                            >
                                                <option value="welcome">Welcome Message (New Subscriber)</option>
                                                <option value="keyword">Keyword Match (Auto-Reply)</option>
                                                <option value="drip">Drip Campaign (Timed Sequence)</option>
                                                <option value="abandoned_cart">Abandoned Cart Trigger</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                                <ChevronRight className="h-4 w-4 rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center pt-8">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={data.is_active}
                                                onChange={e => setData('is_active', e.target.checked)}
                                                className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-zinc-805 dark:bg-zinc-950 w-4 h-4"
                                            />
                                            <span className="text-sm font-bold text-slate-700 dark:text-zinc-300">Active Workflow Status</span>
                                        </label>
                                    </div>
                                </div>

                                {data.trigger_type === 'keyword' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50 dark:border-zinc-850/50 animate-in fade-in duration-300">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-zinc-300 mb-2">Keyword Phrase</label>
                                            <input 
                                                type="text" 
                                                value={data.trigger_config.keyword}
                                                onChange={e => setData('trigger_config', { ...data.trigger_config, keyword: e.target.value })}
                                                placeholder="e.g. help, price, info"
                                                className="w-full rounded-xl border-slate-200 dark:border-zinc-850 dark:bg-zinc-950 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold py-3 px-4 text-slate-800 dark:text-zinc-100 text-sm"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-zinc-300 mb-2">Matching Type</label>
                                            <div className="relative">
                                                <select
                                                    value={data.trigger_config.match_type}
                                                    onChange={e => setData('trigger_config', { ...data.trigger_config, match_type: e.target.value })}
                                                    className="w-full rounded-xl border-slate-200 dark:border-zinc-850 dark:bg-zinc-950 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all py-3 pl-4 pr-10 font-semibold text-slate-750 dark:text-zinc-205 text-sm appearance-none"
                                                >
                                                    <option value="contains">Contains Word</option>
                                                    <option value="equals">Exact Match</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                                    <ChevronRight className="h-4 w-4 rotate-90" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Visual Workflow Canvas */}
                        <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-100 dark:border-zinc-850/40 rounded-2xl p-8 flex flex-col items-center min-h-[500px]">
                            
                            {/* Visual Trigger Card */}
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-zinc-900/60 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/20 max-w-sm w-full shadow-sm text-center relative">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white rounded-full p-1.5 shadow-md shadow-amber-500/25">
                                    <Zap className="w-4 h-4 fill-white" />
                                </div>
                                <h4 className="font-bold text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 mt-2">Trigger Event</h4>
                                <p className="text-[14px] font-bold text-slate-800 dark:text-zinc-100 mt-1 capitalize">{data.trigger_type.replace('_', ' ')}</p>
                                {data.trigger_type === 'keyword' && data.trigger_config.keyword && (
                                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold">
                                        Matches: "{data.trigger_config.keyword}"
                                    </span>
                                )}
                            </div>

                            {/* Node Connectors and Steps list */}
                            {data.steps.map((step, idx) => (
                                <div key={step.id} className="w-full flex flex-col items-center">
                                    {/* Arrow linking nodes */}
                                    <div className="h-10 w-0.5 bg-slate-200 dark:bg-zinc-800 relative flex items-center justify-center">
                                        <div className="absolute bottom-0 -mb-1 w-2 h-2 border-r-2 border-b-2 border-slate-350 dark:border-zinc-700 rotate-45" />
                                    </div>

                                    {/* Step card */}
                                    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-5 rounded-2xl shadow-sm max-w-md w-full hover:shadow-md hover:border-blue-300 dark:hover:border-blue-900/50 transition-all flex items-center justify-between group gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                step.type === 'message' ? 'bg-blue-50 text-blue-505 dark:bg-blue-950/20' : 
                                                step.type === 'tag_add' ? 'bg-emerald-50 text-emerald-505 dark:bg-emerald-950/20' : 
                                                'bg-amber-50 text-amber-505 dark:bg-amber-950/20'
                                            }`}>
                                                {step.type === 'message' && <MessageSquare className="w-5 h-5 text-blue-500" />}
                                                {step.type === 'tag_add' && <Tag className="w-5 h-5 text-emerald-500" />}
                                                {step.type === 'delay' && <Clock className="w-5 h-5 text-amber-500" />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500">Step {idx + 1}</span>
                                                    <span className="text-[10px] font-black uppercase text-slate-300 dark:text-zinc-650">•</span>
                                                    <span className="text-[10px] font-black uppercase text-slate-500 dark:text-zinc-400">{step.type.replace('_', ' ')}</span>
                                                </div>
                                                <p className="text-sm font-bold text-slate-750 dark:text-zinc-100 truncate max-w-[240px] mt-0.5">
                                                    {step.type === 'message' && (step.data.body || 'Empty message...')}
                                                    {step.type === 'tag_add' && `Add Tag: "${step.data.tag || 'tag'}"`}
                                                    {step.type === 'delay' && `Delay: ${step.data.delay_value} ${step.data.delay_unit}`}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <button 
                                                type="button" 
                                                onClick={() => handleOpenEditStep(step)}
                                                className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-all"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveStep(step.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Arrow for adding new node */}
                            <div className="h-10 w-0.5 bg-slate-200 dark:bg-zinc-800 relative flex items-center justify-center mb-1">
                                <div className="absolute bottom-0 -mb-1 w-2 h-2 border-r-2 border-b-2 border-slate-350 dark:border-zinc-700 rotate-45" />
                            </div>

                            {/* Add Step actions menu */}
                            <div className="flex gap-2">
                                <button 
                                    type="button" 
                                    onClick={() => handleAddStep('message')}
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-blue-100 hover:border-blue-300 bg-white hover:bg-blue-50/20 dark:border-zinc-800 dark:bg-zinc-900 text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm transition-all"
                                >
                                    <MessageSquare className="w-3.5 h-3.5" /> Send Msg
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleAddStep('tag_add')}
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-emerald-100 hover:border-emerald-300 bg-white hover:bg-emerald-50/20 dark:border-zinc-800 dark:bg-zinc-900 text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm transition-all"
                                >
                                    <Tag className="w-3.5 h-3.5" /> Add Tag
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleAddStep('delay')}
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-100 hover:border-amber-300 bg-white hover:bg-amber-50/20 dark:border-zinc-800 dark:bg-zinc-900 text-xs font-bold text-amber-600 dark:text-amber-400 shadow-sm transition-all"
                                >
                                    <Clock className="w-3.5 h-3.5" /> Set Delay
                                </button>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                            <Link 
                                href={route('whatsapp.automations.index')} 
                                className="px-8 py-3.5 text-sm font-bold text-slate-600 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-800/60 hover:-translate-y-0.5 transition-all text-center"
                            >
                                Cancel
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white rounded-xl shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-75 disabled:hover:translate-y-0"
                                style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                            >
                                <Save className="w-4 h-4" />
                                {isEdit ? 'Save Changes' : 'Activate Workflow'}
                            </button>
                        </div>
                    </div>

                    {/* Right Columns - Node Editor Panel OR Preview Device */}
                    <div className="w-full lg:w-[380px] lg:sticky lg:top-8 space-y-6">
                        
                        {/* Slideout Node Editor */}
                        {editingStepId ? (
                            <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-md p-6 rounded-2xl animate-in slide-in-from-right-4 duration-300">
                                <h3 className="text-base font-bold text-slate-800 dark:text-zinc-100 mb-4 flex items-center gap-1.5">
                                    <Edit2 className="w-4 h-4 text-blue-500" />
                                    Configure Step Action
                                </h3>

                                <div className="space-y-5">
                                    {activeStepTab === 'message' && (
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 dark:text-zinc-500 uppercase mb-2">Message Body</label>
                                            <textarea 
                                                value={stepInputText}
                                                onChange={e => setStepInputText(e.target.value)}
                                                rows={5}
                                                placeholder="Write message text..."
                                                className="w-full rounded-xl border-slate-205 dark:border-zinc-850 dark:bg-zinc-950 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all p-3.5 text-slate-800 dark:text-zinc-100 font-semibold text-xs leading-relaxed"
                                            />
                                            <p className="text-[10px] text-slate-400 mt-2 font-medium">Use <code className="bg-slate-50 dark:bg-zinc-800 px-1 py-0.5 rounded text-[10px]">{"{{first_name}}"}</code> to insert contact name.</p>
                                        </div>
                                    )}

                                    {activeStepTab === 'tag_add' && (
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 dark:text-zinc-500 uppercase mb-2">Tag Name</label>
                                            <input 
                                                type="text" 
                                                value={stepInputTag}
                                                onChange={e => setStepInputTag(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                                                placeholder="e.g. lead, premium-user"
                                                className="w-full rounded-xl border-slate-205 dark:border-zinc-850 dark:bg-zinc-950 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all px-3 py-2.5 font-semibold text-slate-800 dark:text-zinc-100 text-xs"
                                            />
                                        </div>
                                    )}

                                    {activeStepTab === 'delay' && (
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 dark:text-zinc-500 uppercase mb-2">Wait Duration</label>
                                            <div className="flex gap-2 mt-2">
                                                <input 
                                                    type="number" 
                                                    value={stepInputDelayValue}
                                                    onChange={e => setStepInputDelayValue(parseInt(e.target.value) || 1)}
                                                    min={1}
                                                    className="w-20 rounded-xl border-slate-205 dark:border-zinc-850 dark:bg-zinc-950 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all p-2.5 font-bold text-center text-slate-800 dark:text-zinc-100 text-xs"
                                                />
                                                <div className="relative flex-1">
                                                    <select
                                                        value={stepInputDelayUnit}
                                                        onChange={e => setStepInputDelayUnit(e.target.value)}
                                                        className="w-full rounded-xl border-slate-205 dark:border-zinc-850 dark:bg-zinc-950 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all p-2.5 pr-8 font-bold text-slate-700 dark:text-zinc-200 text-xs appearance-none"
                                                    >
                                                        <option value="minutes">Minutes</option>
                                                        <option value="hours">Hours</option>
                                                        <option value="days">Days</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                                                        <ChevronRight className="h-3.5 w-3.5 rotate-90" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-2 border-t border-slate-50 dark:border-zinc-850">
                                        <button 
                                            type="button" 
                                            onClick={() => setEditingStepId(null)}
                                            className="flex-1 py-2 text-center text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-850 rounded-xl border border-slate-200 dark:border-zinc-800 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={handleSaveStepData}
                                            className="flex-1 py-2 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1"
                                        >
                                            <Check className="w-3.5 h-3.5" /> Save Step
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Live Device Preview */
                            <div className="bg-[#111] dark:bg-[#000] rounded-[3.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[10px] border-[#1f2937] dark:border-[#111827] mx-auto w-full relative ring-1 ring-black/5 dark:ring-white/10 max-w-[340px]">
                                {/* Dynamic Island / Notch */}
                                <div className="absolute top-4 inset-x-0 h-6 flex justify-center z-20 pointer-events-none">
                                    <div className="w-[100px] h-[25px] bg-black rounded-full shadow-inner flex items-center px-3 justify-end">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] ring-1 ring-white/10 relative">
                                            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-[1px]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#EFEAE2] dark:bg-[#0B141A] h-[520px] rounded-[2.5rem] overflow-hidden flex flex-col relative pt-10 ring-1 ring-white/10">
                                    {/* Header */}
                                    <div className="bg-[#008069] dark:bg-[#202C33] text-white p-3 flex items-center gap-2.5 shadow-md z-10">
                                        <div className="w-8 h-8 bg-gray-200/20 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                            <Smartphone className="w-4 h-4 text-white/80" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[14px] leading-tight">Auto Assistant</h4>
                                            <p className="text-[10px] text-white/80 font-medium">Automatic Agent</p>
                                        </div>
                                    </div>
                                    
                                    {/* Chat Area */}
                                    <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-end bg-[url('https://static.whatsapp.net/rsrc.php/v3/yl/r/r2_oK-b0-9B.png')] bg-cover bg-center scrollbar-hide">
                                        <div className="bg-white dark:bg-[#202C33] rounded-xl rounded-tl-none shadow-[0_1px_2px_rgb(0,0,0,0.1)] p-3 max-w-[92%] relative animate-in slide-in-from-bottom-4 fade-in duration-500">
                                            <p className="text-[#111b21] dark:text-[#E9EDEF] text-[13px] whitespace-pre-wrap leading-[1.35]">
                                                {renderPreviewText()}
                                            </p>
                                            <div className="flex items-end justify-end mt-1">
                                                <span className="text-[9px] text-[#667781] dark:text-[#8696a0] whitespace-nowrap">12:00 PM</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
