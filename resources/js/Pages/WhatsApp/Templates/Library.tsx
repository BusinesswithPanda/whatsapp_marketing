import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, MessageSquare, Copy, Edit, LayoutTemplate, Star } from 'lucide-react';
import { useState } from 'react';

// Mock data for the library
const TEMPLATE_CATEGORIES = ['All', 'Marketing', 'E-commerce', 'Real Estate', 'Education', 'Healthcare', 'Customer Support'];

const MOCK_TEMPLATES = [
    {
        id: 1,
        name: 'summer_sale_alert',
        category: 'Marketing',
        body: 'Hi {{1}}, our Summer Sale is now LIVE! 🌞 Get flat 50% OFF on your favorite items using code SUMMER50. Offer valid till {{2}}.',
        buttons: ['Shop Now', 'Stop Promos']
    },
    {
        id: 2,
        name: 'order_shipped_update',
        category: 'E-commerce',
        body: 'Hello {{1}}, great news! Your order #{{2}} has been shipped via {{3}}. Track your package using the link below 📦.',
        buttons: ['Track Order']
    },
    {
        id: 3,
        name: 'property_visit_reminder',
        category: 'Real Estate',
        body: 'Hi {{1}}, this is a friendly reminder for your property visit at {{2}} scheduled on {{3}} at {{4}}. Let us know if you need to reschedule.',
        buttons: ['Confirm Visit', 'Reschedule']
    },
    {
        id: 4,
        name: 'course_enrollment_success',
        category: 'Education',
        body: 'Congratulations {{1}}! You have successfully enrolled in "{{2}}". Your classes start on {{3}}. We are excited to have you onboard 🎓.',
        buttons: ['Go to Dashboard']
    },
    {
        id: 5,
        name: 'appointment_confirmation',
        category: 'Healthcare',
        body: 'Dear {{1}}, your appointment with Dr. {{2}} is confirmed for {{3}}. Please arrive 10 minutes early. Location: {{4}}.',
        buttons: ['View Details', 'Cancel']
    },
    {
        id: 6,
        name: 'customer_support_ticket',
        category: 'Customer Support',
        body: 'Hi {{1}}, we have received your support ticket #{{2}}. Our team is looking into it and will respond within {{3}} hours. Thank you for your patience.',
        buttons: ['Check Status']
    }
];

export default function TemplateLibrary() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredTemplates = activeCategory === 'All' 
        ? MOCK_TEMPLATES 
        : MOCK_TEMPLATES.filter(t => t.category === activeCategory);

    return (
        <AuthenticatedLayout header={
            <div className="flex items-center gap-4">
                <Link href={route('whatsapp.templates.index')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </Link>
                <h2 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-200 tracking-tight">Template Library</h2>
            </div>
        }>
            <Head title="Template Library" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Ready-Made Templates
                        </h1>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            Choose from our collection of highly converting, pre-approved WhatsApp templates.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex justify-center flex-wrap gap-2 mb-10">
                        {TEMPLATE_CATEGORIES.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === category
                                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Templates Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTemplates.map(template => (
                            <div key={template.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
                                <div className="p-5 flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-800/50">
                                            {template.category}
                                        </span>
                                        <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                                            <Star className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{template.name}</h3>
                                    
                                    {/* Mock WhatsApp Bubble */}
                                    <div className="mt-4 bg-[#EFEAE2] dark:bg-[#111B21] p-3 rounded-xl">
                                        <div className="bg-white dark:bg-[#202C33] p-3 rounded-lg rounded-tl-none shadow-sm">
                                            <p className="text-[#111b21] dark:text-[#E9EDEF] text-[14px] whitespace-pre-wrap">
                                                {template.body.split(/(\{\{\d+\}\})/).map((part, i) => 
                                                    part.match(/\{\{\d+\}\}/) ? <span key={i} className="text-blue-500 font-medium">{part}</span> : part
                                                )}
                                            </p>
                                        </div>
                                        {template.buttons.map((btn, i) => (
                                            <div key={i} className="bg-white dark:bg-[#202C33] mt-1 py-2 text-center rounded-lg shadow-sm">
                                                <span className="text-[#00a884] font-medium text-sm">{btn}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900/50 px-5 py-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                                    <Link href={route('whatsapp.templates.create', { name: template.name, category: template.category === 'Marketing' ? 'MARKETING' : 'UTILITY', body: template.body })} className="flex-1 flex justify-center items-center gap-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                        <LayoutTemplate className="w-4 h-4" /> Use Template
                                    </Link>
                                    <button className="p-2 text-gray-500 hover:text-gray-700 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Clone">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-gray-500 hover:text-blue-600 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Edit in Builder">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
