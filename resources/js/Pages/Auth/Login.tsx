import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import ColvoLogo from '@/Components/ColvoLogo';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Logo Badge at the top */}
            <div className="mb-6 flex items-center gap-2">
                <ColvoLogo 
                    textClassName="text-lg font-bold tracking-tight text-slate-800 dark:text-white" 
                    iconClassName="h-8 w-8"
                />
            </div>

            {/* Header Titles */}
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Welcome Back!
                </h1>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Log in to your dashboard
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200/50 text-sm font-semibold text-emerald-800">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                {/* Email Address Input */}
                <div>
                    <InputLabel htmlFor="email" value="Email Address" />
                    
                    <div className="mt-1.5 relative rounded-xl group p-[1px] bg-slate-200 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-blue-500 transition-all duration-300">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-500 transition-colors z-10">
                            <User className="h-4.5 w-4.5 stroke-[1.8]" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="pl-10 pr-4 block w-full h-12 bg-white border-none focus:ring-0 rounded-xl m-0 shadow-none"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password Input */}
                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <div className="mt-1.5 relative rounded-xl group p-[1px] bg-slate-200 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-blue-500 transition-all duration-300">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-500 transition-colors z-10">
                            <Lock className="h-4.5 w-4.5 stroke-[1.8]" />
                        </div>
                        
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="pl-10 pr-16 block w-full h-12 bg-white border-none focus:ring-0 rounded-xl m-0 shadow-none"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            required
                        />

                        {/* Toggle visibility with icon */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 gap-1 select-none z-10"
                        >
                            {showPassword ? (
                                <>
                                    <EyeOff className="h-3.5 w-3.5" />
                                    Hide
                                </>
                            ) : (
                                <>
                                    <Eye className="h-3.5 w-3.5" />
                                    Show
                                </>
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Remember & Forgot options */}
                <div className="flex items-center justify-between mt-5 text-sm">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    (e.target.checked || false) as false,
                                )
                            }
                        />
                        <span className="ms-2 text-slate-600 dark:text-slate-400 select-none">
                            Remember me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="font-bold text-purple-600 hover:text-purple-700 hover:underline focus:outline-none"
                        >
                            Forgot Password?
                        </Link>
                    )}
                </div>

                {/* Login Button */}
                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-[#38bdf8] hover:from-blue-600 hover:to-[#0ea5e9] active:from-blue-700 active:to-[#0284c7] text-sm font-extrabold shadow-lg shadow-blue-500/30 border-transparent text-white" 
                        disabled={processing}
                    >
                        Login
                    </PrimaryButton>
                </div>

                {/* Bottom Redirection prompt */}
                <div className="text-center pt-4">
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="font-bold text-[#0984e3] hover:text-blue-700 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
