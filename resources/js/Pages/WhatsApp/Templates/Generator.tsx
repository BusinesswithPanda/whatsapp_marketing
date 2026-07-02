import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Sparkles, Send, Copy, ArrowRight, LayoutTemplate } from 'lucide-react';
import { useState } from 'react';

export default function TemplateGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedTemplates, setGeneratedTemplates] = useState<any[]>([]);

    const [form, setForm] = useState({
        businessType: '',
        promotionGoal: '',
        targetAudience: '',
        tone: 'Professional'
    });

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        setGeneratedTemplates([]);
        
        // Mocking an AI generation delay
        setTimeout(() => {
            setGeneratedTemplates([
                {
                    id: 1,
                    text: `Hi {{1}},\n\nLooking for the perfect ${form.businessType || 'solution'}? We've got you covered! Enjoy an exclusive offer just for you. Use code SPECIAL20 to get 20% off your next purchase.\n\nShop now!`,
                    category: 'MARKETING'
                },
                {
                    id: 2,
                    text: `Hello {{1}},\n\nDon't miss out! Our latest ${form.businessType || 'collection'} is flying off the shelves. Grab yours before it's too late.\n\nClick below to explore:`,
                    category: 'MARKETING'
                },
                {
                    id: 3,
                    text: `Dear {{1}},\n\nAs a valued customer, we're giving you early access to our ${form.promotionGoal || 'upcoming sale'}. Get ready for amazing deals tailored just for ${form.targetAudience || 'you'}!\n\nSave the date: {{2}}`,
                    category: 'MARKETING'
                }
            ]);
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <AuthenticatedLayout header={
            <div className="flex items-center gap-4">
                <Link href={route('whatsapp.templates.index')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </Link>
                <h2 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-200 tracking-tight flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 text-indigo-500" /> AI Template Generator
                </h2>
            </div>
        }>
            <Head title="AI Template Generator" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Input Form */}
                    <div className="w-full lg:w-1/3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-100 dark:border-gray-700 p-6 rounded-3xl shadow-lg relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-2xl pointer-events-none"></div>
                        
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Describe Your Campaign</h3>
                        
                        <form onSubmit={handleGenerate} className="space-y-5 relative z-10">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Type</label>
                                <input required type="text" value={form.businessType} onChange={e => setForm({...form, businessType: e.target.value})} placeholder="e.g. Fashion Retail, Real Estate" className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Promotion Goal</label>
                                <textarea required value={form.promotionGoal} onChange={e => setForm({...form, promotionGoal: e.target.value})} placeholder="e.g. Announce a weekend flash sale" rows={3} className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Audience</label>
                                <input required type="text" value={form.targetAudience} onChange={e => setForm({...form, targetAudience: e.target.value})} placeholder="e.g. Existing loyal customers" className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tone of Voice</label>
                                <select value={form.tone} onChange={e => setForm({...form, tone: e.target.value})} className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                    <option value="Professional">Professional</option>
                                    <option value="Friendly">Friendly & Casual</option>
                                    <option value="Sales">Sales & Persuasive</option>
                                    <option value="Urgent">Urgent (FOMO)</option>
                                </select>
                            </div>
                            
                            <div className="pt-4">
                                <button type="submit" disabled={isGenerating} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                                    {isGenerating ? (
                                        <span className="flex items-center"><Sparkles className="animate-spin w-5 h-5 mr-2" /> Generating Magic...</span>
                                    ) : (
                                        <span className="flex items-center"><Sparkles className="w-5 h-5 mr-2" /> Generate Templates</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Output Area */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-6">
                        {!isGenerating && generatedTemplates.length === 0 && (
                            <div className="h-[500px] flex flex-col items-center justify-center bg-white/50 dark:bg-gray-800/30 backdrop-blur-md rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 text-center px-4">
                                <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                                    <Sparkles className="w-10 h-10 text-indigo-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Ready to Generate</h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                                    Fill out the form on the left to instruct our AI. It will generate highly converting, WhatsApp-approved templates instantly.
                                </p>
                            </div>
                        )}

                        {isGenerating && (
                            <div className="h-[500px] flex flex-col items-center justify-center">
                                <div className="animate-pulse flex flex-col items-center">
                                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">Crafting the perfect message...</p>
                                </div>
                            </div>
                        )}

                        {!isGenerating && generatedTemplates.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Generated Suggestions</h3>
                                    <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full">{generatedTemplates.length} Results</span>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-6">
                                    {generatedTemplates.map((template, idx) => (
                                        <div key={template.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Option {idx + 1}</span>
                                                    <div className="flex gap-2">
                                                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors" title="Copy Text">
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="bg-[#EFEAE2] dark:bg-[#111B21] p-4 rounded-xl mb-4 relative">
                                                    <div className="bg-white dark:bg-[#202C33] p-3 rounded-lg rounded-tl-none shadow-sm max-w-[90%]">
                                                        <p className="text-[#111b21] dark:text-[#E9EDEF] text-[15px] whitespace-pre-wrap leading-relaxed">
                                                            {template.text.split(/(\{\{\d+\}\})/).map((part: string, i: number) => 
                                                                part.match(/\{\{\d+\}\}/) ? <span key={i} className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 px-1 rounded font-mono text-sm">{part}</span> : part
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <Link href={route('whatsapp.templates.create')} className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                                        <LayoutTemplate className="w-4 h-4 mr-2" /> Edit & Save Template <ArrowRight className="w-4 h-4 ml-1" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
