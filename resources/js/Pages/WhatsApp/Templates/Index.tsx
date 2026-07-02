import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { RefreshCw, MessageSquare, Plus, CheckCircle2, Clock, XCircle, Search, Filter, MoreVertical, LayoutGrid, Sparkles } from 'lucide-react';

interface Template {
    id: number;
    waba_id: string;
    element_name: string;
    language: string;
    category: string;
    status: string;
    updated_at?: string;
}

export default function TemplatesIndex({ templates }: { templates: Template[] }) {
    const { post, processing } = useForm();

    const handleSync = () => {
        post(route('whatsapp.templates.sync'));
    };

    const stats = [
        { name: 'Total Templates', value: templates.length, icon: MessageSquare, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
        { name: 'Approved', value: templates.filter(t => t.status === 'APPROVED').length, icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
        { name: 'Pending', value: templates.filter(t => t.status === 'PENDING').length, icon: Clock, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
        { name: 'Rejected', value: templates.filter(t => t.status === 'REJECTED').length, icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10' },
    ];

    return (
        <AuthenticatedLayout header={
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black leading-tight text-gray-900 dark:text-white tracking-tight">Template Management</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Manage and sync your Meta-approved message templates.</p>
                </div>
                <div className="flex space-x-3">
                    <Link href={route('whatsapp.templates.library')} className="inline-flex items-center justify-center rounded-xl bg-white dark:bg-gray-800/90 backdrop-blur-2xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 shadow-[0_4px_15px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-700/50 hover:shadow-[0_6px_20px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 transition-all">
                        <LayoutGrid className="mr-2 h-4 w-4 text-gray-500" /> Template Library
                    </Link>
                    <Link 
                        href={route('whatsapp.templates.generator')} 
                        className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200"
                        style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                    >
                        <Sparkles className="mr-2 h-4 w-4" /> AI Generator
                    </Link>
                </div>
            </div>
        }>
            <Head title="Message Templates" />

            <div className="py-8">
                <div className="mx-auto max-w-[90rem] sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Stats Section with Ultra Premium Glassmorphism */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
                        {stats.map((stat) => (
                            <div key={stat.name} className="bg-white dark:bg-gray-800/90 backdrop-blur-2xl border border-gray-100/50 dark:border-gray-700/50 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[2rem] p-6 sm:p-8 flex items-center group transition-all hover:-translate-y-1">
                                <div className={`p-4 rounded-2xl group-hover:scale-110 transition-transform ${stat.bg}`}>
                                    <stat.icon className={`h-7 w-7 ${stat.color}`} aria-hidden="true" />
                                </div>
                                <div className="ml-5">
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{stat.name}</p>
                                    <p className="text-3xl font-black text-gray-900 dark:text-white mt-1 tracking-tight">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table Section */}
                    <div className="bg-white dark:bg-gray-800/90 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[2rem] border border-gray-100/50 dark:border-gray-700/50 overflow-hidden">
                        <div className="border-b border-gray-100 dark:border-gray-700/50 px-6 sm:px-8 py-6 flex flex-col lg:flex-row justify-between items-center gap-4">
                            <div className="flex-1 flex gap-4 w-full sm:w-auto">
                                <div className="relative flex-1 max-w-md">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="text"
                                        name="search"
                                        className="block w-full rounded-xl border-gray-200 dark:border-gray-700 py-2.5 pl-11 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:text-sm font-medium dark:bg-gray-900/50 dark:text-white transition-all"
                                        placeholder="Search your templates..."
                                    />
                                </div>
                                <button className="inline-flex items-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <Filter className="h-4 w-4 mr-2 text-gray-400" /> Filter
                                </button>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto justify-end">
                                <button
                                    onClick={handleSync}
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                >
                                    <RefreshCw className={`-ml-0.5 mr-2 h-4 w-4 text-gray-500 ${processing ? 'animate-spin' : ''}`} />
                                    Sync from Meta
                                </button>
                                <Link
                                    href={route('whatsapp.templates.create')}
                                    className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200"
                                    style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                                >
                                    <Plus className="-ml-0.5 mr-1.5 h-4 w-4" />
                                    Create New
                                </Link>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700/50">
                                <thead className="bg-gray-50/50 dark:bg-gray-800/30">
                                    <tr>
                                        <th scope="col" className="py-4 pl-6 sm:pl-8 pr-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Template Name</th>
                                        <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                        <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Language</th>
                                        <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="relative py-4 pl-3 pr-6 sm:pr-8 text-right">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50 bg-transparent">
                                    {templates.map((template) => (
                                        <tr key={template.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                                            <td className="whitespace-nowrap py-4 pl-6 sm:pl-8 pr-3 text-sm font-bold text-gray-900 dark:text-white">
                                                <div className="flex items-center">
                                                    <div className="h-9 w-9 flex-shrink-0 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center mr-3">
                                                        <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    {template.element_name}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className="inline-flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2.5 py-1 text-xs font-bold text-gray-600 dark:text-gray-300">
                                                    {template.category}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">{template.language}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className={`inline-flex items-center gap-x-1.5 rounded-lg px-2.5 py-1 text-xs font-black uppercase tracking-wider ${
                                                    template.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' : 
                                                    template.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30' : 
                                                    'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-500 border border-amber-200 dark:border-amber-500/30'
                                                }`}>
                                                    <svg className={`h-1.5 w-1.5 ${template.status === 'APPROVED' ? 'fill-emerald-500' : template.status === 'REJECTED' ? 'fill-red-500' : 'fill-amber-500'}`} viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" /></svg>
                                                    {template.status}
                                                </span>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-6 sm:pr-8 text-right text-sm font-medium">
                                                <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                                                    <span className="sr-only">Open options</span>
                                                    <MoreVertical className="h-4 w-4" aria-hidden="true" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {templates.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-16 text-center text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-col items-center justify-center opacity-60">
                                                    <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                                                    <p className="text-base font-bold text-gray-600 dark:text-gray-300">No templates found.</p>
                                                    <p className="mt-1 font-medium">Click "Sync from Meta" to fetch your templates or create a new one.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
