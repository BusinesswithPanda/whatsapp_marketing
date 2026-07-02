import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import { Type, Image as ImageIcon, Video, FileText, MousePointerClick, Plus, Trash2, Smartphone, Save, ChevronLeft, ChevronRight, Info, LayoutTemplate, MessageSquare, Link2, PhoneCall } from 'lucide-react';

export default function CreateTemplate() {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const { data, setData, post, processing } = useForm({
        name: params.get('name') || '',
        category: params.get('category') || 'MARKETING',
        language: 'en',
        header_type: 'NONE', // TEXT, IMAGE, VIDEO, DOCUMENT, NONE
        header_text: '',
        header_media: null as File | null,
        body_text: params.get('body') || 'Hello {{1}},\n\nYour order {{2}} has been successfully delivered.',
        footer_text: '',
        buttons: [{ type: 'QUICK_REPLY', text: 'Great!', url: '' }]
    });

    const [variables, setVariables] = useState<string[]>(['John', '#ORD-12345']);

    // Extract variables {{1}}, {{2}} from body text to show sample inputs
    useEffect(() => {
        const matches = data.body_text.match(/\{\{(\d+)\}\}/g);
        if (matches) {
            const uniqueVars = [...new Set(matches)];
            if (uniqueVars.length > variables.length) {
                setVariables([...variables, ...Array(uniqueVars.length - variables.length).fill('')]);
            } else if (uniqueVars.length < variables.length) {
                setVariables(variables.slice(0, uniqueVars.length));
            }
        } else {
            setVariables([]);
        }
    }, [data.body_text]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('whatsapp.templates.store'));
    };

    const addButton = () => {
        if (data.buttons.length < 3) {
            setData('buttons', [...data.buttons, { type: 'QUICK_REPLY', text: '', url: '' }]);
        }
    };

    const removeButton = (index: number) => {
        const newBtns = data.buttons.filter((_, idx) => idx !== index);
        setData('buttons', newBtns);
    };

    // Helper to replace variables with sample text in preview
    const renderPreviewBody = () => {
        let text = data.body_text;
        variables.forEach((val, index) => {
            text = text.replace(new RegExp(`\\{\\{${index + 1}\\}\\}`, 'g'), val || `{{${index + 1}}}`);
        });
        return text;
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex items-center gap-4">
                <Link href={route('whatsapp.templates.index')} className="p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-[0_2px_10px_rgb(0,0,0,0.04)] hover:shadow-[0_4px_15px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 transition-all">
                    <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </Link>
                <div>
                    <h2 className="text-2xl font-black leading-tight text-gray-900 dark:text-white tracking-tight">Create Message Template</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Design and submit a new WhatsApp template for approval.</p>
                </div>
            </div>
        }>
            <Head title="Create Template" />

            <div className="py-8">
                <div className="mx-auto max-w-[90rem] sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8 lg:gap-12 items-start">
                    
                    {/* Left Column - Form Builder */}
                    <div className="w-full xl:w-2/3 space-y-8">
                        <form onSubmit={submit} className="space-y-8">
                            
                            {/* General Info Card */}
                            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-2xl border border-gray-100/50 dark:border-gray-700/50 p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mr-3">
                                        <LayoutTemplate className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    Template Information
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Template Name</label>
                                        <input 
                                            type="text" 
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_'))} 
                                            placeholder="e.g. summer_sale_promo" 
                                            className="w-full rounded-2xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/50 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400" 
                                            required 
                                        />
                                        <p className="text-[13px] text-gray-500 mt-2 font-medium">Lowercase and underscores only.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                                        <div className="relative">
                                            <select 
                                                value={data.category} 
                                                onChange={e => setData('category', e.target.value)} 
                                                className="w-full rounded-2xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/50 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all px-4 py-3 text-gray-900 dark:text-gray-100 appearance-none font-medium pr-10"
                                            >
                                                <option value="MARKETING">Marketing (Promotions, offers)</option>
                                                <option value="UTILITY">Utility (Updates, alerts)</option>
                                                <option value="AUTHENTICATION">Authentication (OTPs)</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                                <ChevronRight className="h-4 w-4 rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Language</label>
                                        <div className="relative">
                                            <select 
                                                value={data.language} 
                                                onChange={e => setData('language', e.target.value)} 
                                                className="w-full rounded-2xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/50 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all px-4 py-3 text-gray-900 dark:text-gray-100 appearance-none font-medium pr-10"
                                            >
                                                <option value="en">English (en)</option>
                                                <option value="en_US">English (US)</option>
                                                <option value="hi">Hindi (hi)</option>
                                                <option value="es">Spanish (es)</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                                <ChevronRight className="h-4 w-4 rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Header Card */}
                            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-2xl border border-gray-100/50 dark:border-gray-700/50 p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                        Header <span className="ml-2 px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">Optional</span>
                                    </h3>
                                </div>
                                
                                {/* Segmented Control for Header Type */}
                                <div className="flex flex-wrap p-1.5 bg-gray-100 dark:bg-gray-900/80 rounded-2xl mb-6">
                                    {['NONE', 'TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT'].map(type => (
                                        <button 
                                            key={type} 
                                            type="button" 
                                            onClick={() => setData('header_type', type)} 
                                            className={`flex-1 min-w-[100px] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                                data.header_type === type 
                                                    ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-[0_2px_8px_rgb(0,0,0,0.08)]' 
                                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                {type === 'IMAGE' && <ImageIcon className="w-4 h-4" />}
                                                {type === 'VIDEO' && <Video className="w-4 h-4" />}
                                                {type === 'DOCUMENT' && <FileText className="w-4 h-4" />}
                                                {type === 'TEXT' && <Type className="w-4 h-4" />}
                                                {type === 'NONE' ? 'None' : type.charAt(0) + type.slice(1).toLowerCase()}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {data.header_type === 'TEXT' && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                        <input 
                                            type="text" 
                                            value={data.header_text} 
                                            onChange={e => setData('header_text', e.target.value)} 
                                            placeholder="Enter header text (max 60 characters)" 
                                            maxLength={60} 
                                            className="w-full rounded-2xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/50 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all px-4 py-3 text-gray-900 dark:text-gray-100" 
                                        />
                                        <p className="text-right text-xs text-gray-400 mt-2 font-medium">{data.header_text.length} / 60</p>
                                    </div>
                                )}
                                {['IMAGE', 'VIDEO', 'DOCUMENT'].includes(data.header_type) && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="p-8 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-center relative hover:bg-gray-50/80 dark:hover:bg-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
                                            <input 
                                                type="file" 
                                                accept={data.header_type === 'IMAGE' ? 'image/*' : data.header_type === 'VIDEO' ? 'video/*' : '.pdf,.doc,.docx,.txt'}
                                                onChange={e => setData('header_media', e.target.files?.[0] || null)}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            {data.header_media ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                                                        {data.header_type === 'IMAGE' ? <ImageIcon className="w-8 h-8" /> : data.header_type === 'VIDEO' ? <Video className="w-8 h-8" /> : <FileText className="w-8 h-8" />}
                                                    </div>
                                                    <p className="text-base font-bold text-gray-900 dark:text-gray-100 truncate max-w-full px-4">{data.header_media.name}</p>
                                                    <p className="text-sm text-gray-500 mt-1 font-medium">Click or drag to replace</p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center pointer-events-none">
                                                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-500/10 dark:group-hover:text-blue-400 transition-all group-hover:scale-105">
                                                        <Plus className="w-8 h-8" />
                                                    </div>
                                                    <p className="text-base font-bold text-gray-900 dark:text-gray-100">Upload a sample {data.header_type.toLowerCase()}</p>
                                                    <p className="text-sm text-gray-500 mt-1 font-medium">Meta requires a sample file for approval</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Body Card */}
                            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-2xl border border-gray-100/50 dark:border-gray-700/50 p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center mr-3">
                                        <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    Message Body
                                </h3>
                                <p className="text-[13px] text-gray-500 mb-6 ml-13 font-medium">Use <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-300">{'{{1}}'}</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-300">{'{{2}}'}</code> to insert variables for personalization.</p>
                                
                                <textarea 
                                    value={data.body_text} 
                                    onChange={e => setData('body_text', e.target.value)} 
                                    rows={5} 
                                    className="w-full rounded-2xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/50 shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-mono text-[15px] p-5 text-gray-900 dark:text-gray-100 leading-relaxed" 
                                    required
                                    placeholder="Enter your message here..."
                                ></textarea>
                                
                                {variables.length > 0 && (
                                    <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-inner animate-in fade-in duration-500">
                                        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center"><Info className="w-4 h-4 mr-1.5 text-gray-400" /> Variable Samples for Preview</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {variables.map((val, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <span className="text-xs font-black text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 shadow-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">{'{{'}{idx + 1}{'}}'}</span>
                                                    <input 
                                                        type="text" 
                                                        value={val} 
                                                        onChange={e => {
                                                            const newVars = [...variables];
                                                            newVars[idx] = e.target.value;
                                                            setVariables(newVars);
                                                        }} 
                                                        className="flex-1 text-sm rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/50 py-2.5 px-3 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm" 
                                                        placeholder={`Sample ${idx + 1}`} 
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer & Buttons Card */}
                            <div className="bg-white dark:bg-gray-800/90 backdrop-blur-2xl border border-gray-100/50 dark:border-gray-700/50 p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                        Footer <span className="ml-2 px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">Optional</span>
                                    </h3>
                                    <input 
                                        type="text" 
                                        value={data.footer_text} 
                                        onChange={e => setData('footer_text', e.target.value)} 
                                        placeholder="e.g. Reply STOP to unsubscribe" 
                                        maxLength={60} 
                                        className="w-full rounded-2xl border-gray-200 dark:border-gray-700 dark:bg-gray-900/50 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all px-4 py-3 text-gray-900 dark:text-gray-100 text-[15px]" 
                                    />
                                </div>
                                
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Interactive Buttons <span className="ml-2 px-2.5 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg">Optional</span>
                                        </h3>
                                        {data.buttons.length < 3 && (
                                            <button 
                                                type="button" 
                                                onClick={addButton} 
                                                className="inline-flex items-center px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 rounded-xl transition-colors"
                                            >
                                                <Plus className="w-4 h-4 mr-1.5" /> Add Button
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        {data.buttons.map((btn, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-gray-50/50 dark:bg-gray-900/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50 animate-in fade-in slide-in-from-left-4 duration-300">
                                                <div className="relative w-full sm:w-1/3">
                                                    <select 
                                                        value={btn.type} 
                                                        onChange={e => {
                                                            const newBtns = [...data.buttons];
                                                            newBtns[idx].type = e.target.value;
                                                            setData('buttons', newBtns);
                                                        }} 
                                                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-bold text-gray-700 dark:text-gray-200 pl-10 pr-8 py-3 appearance-none"
                                                    >
                                                        <option value="QUICK_REPLY">Quick Reply</option>
                                                        <option value="URL">Visit Website</option>
                                                        <option value="PHONE">Call Phone</option>
                                                    </select>
                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                        {btn.type === 'QUICK_REPLY' && <MessageSquare className="w-4 h-4" />}
                                                        {btn.type === 'URL' && <Link2 className="w-4 h-4" />}
                                                        {btn.type === 'PHONE' && <PhoneCall className="w-4 h-4" />}
                                                    </div>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                        <ChevronRight className="h-3.5 w-3.5 rotate-90" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 w-full flex gap-3">
                                                    <input 
                                                        type="text" 
                                                        value={btn.text} 
                                                        onChange={e => {
                                                            const newBtns = [...data.buttons];
                                                            newBtns[idx].text = e.target.value;
                                                            setData('buttons', newBtns);
                                                        }} 
                                                        placeholder="Button Text" 
                                                        maxLength={25} 
                                                        className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm py-3 px-4" 
                                                    />
                                                    {['URL', 'PHONE'].includes(btn.type) && (
                                                        <input 
                                                            type="text" 
                                                            value={btn.url} 
                                                            onChange={e => {
                                                                const newBtns = [...data.buttons];
                                                                newBtns[idx].url = e.target.value;
                                                                setData('buttons', newBtns);
                                                            }} 
                                                            placeholder={btn.type === 'URL' ? 'https://example.com' : '+1234567890'} 
                                                            className="w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm py-3 px-4 animate-in fade-in slide-in-from-right-2" 
                                                        />
                                                    )}
                                                </div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeButton(idx)} 
                                                    className="p-3 w-full sm:w-auto text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                    <span className="sm:hidden font-semibold text-sm">Remove</span>
                                                </button>
                                            </div>
                                        ))}
                                        {data.buttons.length === 0 && (
                                            <div className="py-8 text-center bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                                                <p className="text-[15px] text-gray-500 font-medium">No buttons added yet.</p>
                                                <p className="text-xs text-gray-400 mt-1">Buttons increase customer engagement significantly.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sticky Action Bar for Mobile / Standard for Desktop */}
                            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 pb-12 lg:pb-0">
                                <Link 
                                    href={route('whatsapp.templates.index')} 
                                    className="px-8 py-3.5 text-[15px] font-bold text-gray-700 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200 hover:-translate-y-0.5 transition-all text-center"
                                >
                                    Cancel
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-bold text-white rounded-2xl shadow-[0_4px_15px_rgba(228,15,122,0.25)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.35)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0"
                                    style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                                >
                                    {processing ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    ) : (
                                        <Save className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column - Live Preview */}
                    <div className="w-full xl:w-1/3 sticky top-8 flex flex-col items-center xl:items-end">
                        <div className="w-full max-w-[380px]">
                            <div className="mb-4 text-center xl:text-right w-full pr-4">
                                <h3 className="font-black text-gray-900 dark:text-white text-lg flex items-center justify-center xl:justify-end gap-2">
                                    <Smartphone className="w-5 h-5 text-gray-400" /> Live Device Preview
                                </h3>
                                <p className="text-sm text-gray-500 font-medium">See how it looks on WhatsApp</p>
                            </div>
                            
                            <div className="bg-[#111111] dark:bg-[#000000] rounded-[3.5rem] p-4 shadow-[0_20px_50px_rgb(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgb(0,0,0,0.5)] border-[10px] border-[#1f2937] dark:border-[#111827] mx-auto w-full relative ring-1 ring-black/5 dark:ring-white/10">
                                {/* iPhone Dynamic Island / Notch */}
                                <div className="absolute top-4 inset-x-0 h-7 flex justify-center z-20 pointer-events-none">
                                    <div className="w-[120px] h-[30px] bg-black rounded-full shadow-inner flex items-center px-3 justify-end">
                                        <div className="w-3 h-3 rounded-full bg-[#0a0a0a] ring-1 ring-white/10 relative">
                                            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-[1px]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#EFEAE2] dark:bg-[#0B141A] h-[680px] rounded-[2.5rem] overflow-hidden flex flex-col relative pt-12 ring-1 ring-white/10">
                                    {/* WhatsApp Header */}
                                    <div className="bg-[#008069] dark:bg-[#202C33] text-white p-3 flex items-center gap-3 shadow-md z-10">
                                        <div className="w-10 h-10 bg-gray-200/20 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                                            <Smartphone className="w-5 h-5 text-white/80" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-[16px] leading-tight">Business Account</h4>
                                            <p className="text-[12px] text-white/80 font-medium">Official Business Account</p>
                                        </div>
                                    </div>
                                    
                                    {/* Chat Area */}
                                    <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-end bg-[url('https://static.whatsapp.net/rsrc.php/v3/yl/r/r2_oK-b0-9B.png')] bg-cover bg-center scrollbar-hide">
                                        {/* Date Badge */}
                                        <div className="flex justify-center mb-6">
                                            <div className="bg-white/90 dark:bg-[#182229]/90 backdrop-blur-sm text-gray-500 dark:text-gray-400 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm">
                                                TODAY
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-[#202C33] rounded-[1rem] rounded-tl-none shadow-[0_1px_2px_rgb(0,0,0,0.1)] p-1 max-w-[92%] relative animate-in slide-in-from-bottom-4 fade-in duration-500">
                                            <div className="p-2 pb-1.5">
                                                {/* Header */}
                                                {data.header_type === 'IMAGE' && (
                                                    <div className="w-full h-[140px] bg-gray-100 dark:bg-gray-800/50 rounded-[0.5rem] mb-2 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700/50">
                                                        {data.header_media ? (
                                                            <img src={URL.createObjectURL(data.header_media)} alt="Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <ImageIcon className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                                                        )}
                                                    </div>
                                                )}
                                                {data.header_type === 'VIDEO' && (
                                                    <div className="w-full h-[140px] bg-gray-100 dark:bg-gray-800/50 rounded-[0.5rem] mb-2 flex items-center justify-center relative overflow-hidden border border-gray-100 dark:border-gray-700/50">
                                                        {data.header_media ? (
                                                            <video src={URL.createObjectURL(data.header_media)} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Video className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                                                        )}
                                                        <div className="absolute inset-0 flex items-center justify-center"><div className="w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"><div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div></div></div>
                                                    </div>
                                                )}
                                                {data.header_type === 'DOCUMENT' && (
                                                    <div className="w-full h-16 bg-gray-50 dark:bg-[#182229] rounded-[0.5rem] mb-2 flex items-center px-4 gap-3 border border-gray-100 dark:border-gray-700/50">
                                                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                                            <FileText className="h-5 w-5 text-red-500" />
                                                        </div>
                                                        <span className="text-sm font-bold dark:text-[#E9EDEF] text-gray-800 truncate">{data.header_media ? data.header_media.name : 'document.pdf'}</span>
                                                    </div>
                                                )}
                                                {data.header_type === 'TEXT' && data.header_text && (
                                                    <h4 className="font-extrabold text-[#111b21] dark:text-[#E9EDEF] mb-1.5 text-[15.5px] tracking-tight">{data.header_text}</h4>
                                                )}
                                                
                                                {/* Body */}
                                                <p className="text-[#111b21] dark:text-[#E9EDEF] text-[15px] whitespace-pre-wrap leading-[1.35]">{renderPreviewBody()}</p>
                                                
                                                {/* Footer & Timestamp */}
                                                <div className="flex items-end justify-between mt-1 gap-2">
                                                    {data.footer_text ? (
                                                        <p className="text-[#667781] dark:text-[#8696a0] text-[13px] leading-tight flex-1">{data.footer_text}</p>
                                                    ) : <div className="flex-1"></div>}
                                                    <span className="text-[11px] text-[#667781] dark:text-[#8696a0] whitespace-nowrap mb-0.5 ml-2">12:00 PM</span>
                                                </div>
                                            </div>

                                            {/* Buttons attached to bubble */}
                                            {data.buttons.length > 0 && (
                                                <div className="border-t border-gray-100 dark:border-[#313D45] mt-1 flex flex-col">
                                                    {data.buttons.map((btn, idx) => (
                                                        btn.text && (
                                                            <div key={idx} className={`text-center py-3 flex items-center justify-center gap-2 relative group cursor-pointer hover:bg-gray-50/50 dark:hover:bg-[#182229]/50 transition-colors ${idx !== 0 ? 'border-t border-gray-100 dark:border-[#313D45]' : ''} ${idx === data.buttons.length - 1 ? 'rounded-b-[1rem]' : ''}`}>
                                                                {btn.type === 'URL' && <Link2 className="w-4 h-4 text-[#00A884]" />}
                                                                {btn.type === 'PHONE' && <PhoneCall className="w-4 h-4 text-[#00A884]" />}
                                                                {btn.type === 'QUICK_REPLY' && <MessageSquare className="w-4 h-4 text-[#00A884] opacity-80" />}
                                                                <span className="text-[#00A884] font-bold text-[15.5px] tracking-tight">{btn.text}</span>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
