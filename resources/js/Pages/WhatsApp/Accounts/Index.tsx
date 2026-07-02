import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Phone, CheckCircle, Plus } from 'lucide-react';

interface Account {
    id: number;
    phone_number_id: string;
    waba_id: string;
    status: string;
    quality_score: string | null;
}

export default function AccountsIndex({ accounts }: { accounts: Account[] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        phone_number_id: '',
        waba_id: '',
        access_token: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('whatsapp.accounts.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout header={
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">WhatsApp Accounts</h2>
                <p className="text-[13px] text-slate-500 dark:text-zinc-400 mt-1 font-medium">
                    Configure your WhatsApp Business Account API credentials and manage connected profiles.
                </p>
            </div>
        }>
            <Head title="WhatsApp Accounts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Add Account Form */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Connect Meta App</h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Provide your WhatsApp Business API credentials to connect your platform.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="phone_number_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number ID</label>
                                    <input
                                        id="phone_number_id"
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        value={data.phone_number_id}
                                        onChange={(e) => setData('phone_number_id', e.target.value)}
                                        required
                                    />
                                    {errors.phone_number_id && <div className="mt-2 text-sm text-red-600">{errors.phone_number_id}</div>}
                                </div>

                                <div>
                                    <label htmlFor="waba_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Business Account ID (WABA ID)</label>
                                    <input
                                        id="waba_id"
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        value={data.waba_id}
                                        onChange={(e) => setData('waba_id', e.target.value)}
                                        required
                                    />
                                    {errors.waba_id && <div className="mt-2 text-sm text-red-600">{errors.waba_id}</div>}
                                </div>

                                <div>
                                    <label htmlFor="access_token" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Permanent Access Token</label>
                                    <input
                                        id="access_token"
                                        type="password"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                                        value={data.access_token}
                                        onChange={(e) => setData('access_token', e.target.value)}
                                        required
                                    />
                                    {errors.access_token && <div className="mt-2 text-sm text-red-600">{errors.access_token}</div>}
                                </div>

                                <div className="flex items-center gap-4">
                                    <button 
                                        disabled={processing} 
                                        className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold text-white shadow-[0_4px_15px_rgba(228,15,122,0.2)] hover:shadow-[0_6px_20px_rgba(228,15,122,0.3)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                                        style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                                    >
                                        <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                                        Connect Account
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>

                    {/* Connected Accounts List */}
                    <div className="bg-white shadow sm:rounded-lg dark:bg-gray-800">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Connected Accounts</h3>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {accounts.map((account) => (
                                    <li key={account.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-5 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <div className="flex items-center gap-x-4">
                                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#2ABCFB]/10">
                                                <Phone className="h-5 w-5 text-[#235BDD]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                                    WABA ID: {account.waba_id}
                                                </p>
                                                <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                                    Phone ID: {account.phone_number_id}
                                                </p>
                                            </div>
                                        </div>
                                        <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                                            <div className="flex -space-x-0.5">
                                                <dd className="text-sm leading-6 text-gray-500 dark:text-gray-400">Status</dd>
                                            </div>
                                            <div className="flex w-16 gap-x-2.5">
                                                <dd className="leading-6 text-gray-400">
                                                    <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-[#235BDD] ring-1 ring-inset ring-[#2ABCFB]/30 bg-[#2ABCFB]/10">
                                                        <svg className="h-1.5 w-1.5 fill-[#235BDD]" viewBox="0 0 6 6" aria-hidden="true"><circle cx="3" cy="3" r="3" /></svg>
                                                        {account.status}
                                                    </span>
                                                </dd>
                                            </div>
                                        </dl>
                                    </li>
                                ))}
                                {accounts.length === 0 && (
                                    <li className="px-4 py-5 sm:px-6 text-sm text-gray-500 dark:text-gray-400 text-center">
                                        No WhatsApp accounts connected yet.
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
