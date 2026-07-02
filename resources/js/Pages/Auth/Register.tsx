import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { User, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react';
import ColvoLogo from '@/Components/ColvoLogo';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConf, setShowPasswordConf] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Logo Badge at the top - Reduced margin */}
            <div className="mb-4">
                <ColvoLogo 
                    textClassName="text-lg font-bold tracking-tight text-slate-800 dark:text-white" 
                    iconClassName="h-8 w-8"
                />
            </div>

            {/* Header Titles - Reduced margin */}
            <div className="mb-4">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Get Started!
                </h1>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Create your free tenant workspace
                </p>
            </div>

            <form onSubmit={submit} className="space-y-3.5">
                {/* Name Input */}
                <div>
                    <InputLabel htmlFor="name" value="Full Name" />

                    <div className="mt-1 relative rounded-xl group p-[1px] bg-slate-200 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-blue-500 transition-all duration-300">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-500 transition-colors z-10">
                            <User className="h-4 w-4 stroke-[1.8]" />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="pl-10 pr-4 block w-full h-10.5 bg-white border-none focus:ring-0 rounded-xl m-0 shadow-none"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Full Name"
                            required
                        />
                    </div>

                    <InputError message={errors.name} className="mt-1" />
                </div>

                {/* Email Input */}
                <div>
                    <InputLabel htmlFor="email" value="Email Address" />

                    <div className="mt-1 relative rounded-xl group p-[1px] bg-slate-200 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-blue-500 transition-all duration-300">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-500 transition-colors z-10">
                            <Mail className="h-4 w-4 stroke-[1.8]" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="pl-10 pr-4 block w-full h-10.5 bg-white border-none focus:ring-0 rounded-xl m-0 shadow-none"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Password Input */}
                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <div className="mt-1 relative rounded-xl group p-[1px] bg-slate-200 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-blue-500 transition-all duration-300">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-500 transition-colors z-10">
                            <Lock className="h-4 w-4 stroke-[1.8]" />
                        </div>
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="pl-10 pr-16 block w-full h-10.5 bg-white border-none focus:ring-0 rounded-xl m-0 shadow-none"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            required
                        />
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

                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Confirm Password Input */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <div className="mt-1 relative rounded-xl group p-[1px] bg-slate-200 focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-blue-500 transition-all duration-300">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-500 transition-colors z-10">
                            <Lock className="h-4 w-4 stroke-[1.8]" />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            type={showPasswordConf ? 'text' : 'password'}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="pl-10 pr-16 block w-full h-10.5 bg-white border-none focus:ring-0 rounded-xl m-0 shadow-none"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            placeholder="Confirm Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasswordConf(!showPasswordConf)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 gap-1 select-none z-10"
                        >
                            {showPasswordConf ? (
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

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1"
                    />
                </div>

                {/* Pill register button */}
                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-[#38bdf8] hover:from-blue-600 hover:to-[#0ea5e9] active:from-blue-700 active:to-[#0284c7] text-sm font-extrabold shadow-lg shadow-blue-500/30 border-transparent text-white" 
                        disabled={processing}
                    >
                        Register
                    </PrimaryButton>
                </div>

                {/* Redirect Prompt */}
                <div className="text-center pt-3">
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="font-bold text-[#0984e3] hover:text-blue-700 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
