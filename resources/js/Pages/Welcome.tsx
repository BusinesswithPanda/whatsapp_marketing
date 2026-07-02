import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import ColvoLogo from '@/Components/ColvoLogo';
import {
    MessageSquare,
    Send,
    Users,
    BarChart3,
    Settings,
    Shield,
    Zap,
    Check,
    CheckCheck,
    Menu,
    X,
    MessageCircle,
    ArrowRight,
    Sparkles,
    Database,
    Activity,
    Layers,
    Clock,
    ShoppingCart,
    TrendingUp,
    HeartHandshake,
    CheckCircle2
} from 'lucide-react';

interface SimulatedMessage {
    id: number;
    sender: 'user' | 'platform' | 'customer';
    text: string;
    time: string;
    status?: 'sent' | 'delivered' | 'read';
}

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Interactive chat states
    const [chatMessages, setChatMessages] = useState<SimulatedMessage[]>([]);
    const [typing, setTyping] = useState(false);

    const campaignScript: SimulatedMessage[] = [
        { id: 1, sender: 'platform', text: '📢 Broadcast "Festival Discount" launched for 4,800 tags.', time: '10:00 AM' },
        { id: 2, sender: 'customer', text: 'Hey, I clicked the coupon link! How do I get my 50% off?', time: '10:01 AM' },
        { id: 3, sender: 'user', text: 'Great! The discount is applied automatically at checkout using code: FEST50.', time: '10:02 AM', status: 'read' },
        { id: 4, sender: 'customer', text: 'Awesome, just completed my order! That was fast.', time: '10:03 AM' },
    ];

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let index = 0;
        
        setChatMessages([campaignScript[0]]);
        
        const triggerNextMessage = () => {
            if (index >= campaignScript.length - 1) {
                index = 0;
                setChatMessages([campaignScript[0]]);
                timer = setTimeout(triggerNextMessage, 3000);
                return;
            }

            setTyping(true);
            timer = setTimeout(() => {
                index++;
                setChatMessages((prev) => [...prev, campaignScript[index]]);
                setTyping(false);
                timer = setTimeout(triggerNextMessage, 4000);
            }, 1500);
        };

        timer = setTimeout(triggerNextMessage, 3500);

        return () => clearTimeout(timer);
    }, []);

    const navHub = [
        {
            name: 'Real-Time Inbox',
            description: 'A WhatsApp Web-style collaborative workspace powered by WebSockets.',
            icon: MessageCircle,
            href: auth.user ? route('whatsapp.inbox.index') : route('login'),
            badge: 'Live Chat',
            color: 'from-emerald-50 to-emerald-100/10',
            border: 'border-emerald-200/80 group-hover:border-emerald-400',
            badgeBg: 'bg-emerald-100 text-emerald-800'
        },
        {
            name: 'Campaign Builder',
            description: 'Configure and broadcast scheduled marketing campaigns to target lists.',
            icon: Send,
            href: auth.user ? route('whatsapp.campaigns.index') : route('login'),
            badge: 'Wizard',
            color: 'from-emerald-50 to-emerald-100/10',
            border: 'border-emerald-200/80 group-hover:border-emerald-400',
            badgeBg: 'bg-emerald-100 text-emerald-800'
        },
        {
            name: 'Contact CRM',
            description: 'Bulk upload customers via CSV or TXT, apply custom tags, and segment list.',
            icon: Users,
            href: auth.user ? route('whatsapp.contacts.index') : route('login'),
            badge: 'CRM Segments',
            color: 'from-emerald-50 to-emerald-100/10',
            border: 'border-emerald-200/80 group-hover:border-emerald-400',
            badgeBg: 'bg-emerald-100 text-emerald-800'
        },
        {
            name: 'Meta Templates',
            description: 'Sync official Meta templates and view dynamic renders in a phone preview.',
            icon: MessageSquare,
            href: auth.user ? route('whatsapp.templates.index') : route('login'),
            badge: 'Graph API',
            color: 'from-emerald-50 to-emerald-100/10',
            border: 'border-emerald-200/80 group-hover:border-emerald-400',
            badgeBg: 'bg-emerald-100 text-emerald-800'
        },
        {
            name: 'Analytics & telemetry',
            description: 'Monitor delivery, read rates, and outbound metrics via interactive charts.',
            icon: BarChart3,
            href: auth.user ? route('dashboard') : route('login'),
            badge: 'Recharts API',
            color: 'from-emerald-50 to-emerald-100/10',
            border: 'border-emerald-200/80 group-hover:border-emerald-400',
            badgeBg: 'bg-emerald-100 text-emerald-800'
        },
        {
            name: 'Meta Accounts',
            description: 'Manage Multiple WhatsApp Business numbers and Graph API credentials.',
            icon: Settings,
            href: auth.user ? route('whatsapp.accounts.index') : route('login'),
            badge: 'Multi-Tenant',
            color: 'from-emerald-50 to-emerald-100/10',
            border: 'border-emerald-200/80 group-hover:border-emerald-400',
            badgeBg: 'bg-emerald-100 text-emerald-800'
        }
    ];

    return (
        <>
            <Head title="Colvo" />
            
            {/* Main Outer container styled with vibrant colorful theme */}
            <div className="relative min-h-screen bg-[#fafbfc] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
                
                {/* Colorful Glowing Gradients Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ff9a9e] rounded-full mix-blend-multiply filter blur-[150px] opacity-70" />
                    <div className="absolute top-[-5%] right-[-5%] w-[60%] h-[60%] bg-[#fecfef] rounded-full mix-blend-multiply filter blur-[150px] opacity-60" />
                    <div className="absolute top-[20%] right-[10%] w-[40%] h-[60%] bg-[#a1c4fd] rounded-full mix-blend-multiply filter blur-[150px] opacity-60" />
                    <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-[#c2e9fb] rounded-full mix-blend-multiply filter blur-[150px] opacity-60" />
                    <div className="absolute top-[30%] left-[30%] w-[30%] h-[30%] bg-[#fdfbfb] rounded-full mix-blend-overlay filter blur-[100px] opacity-80" />
                </div>


                {/* Navbar */}
                <header className="absolute top-0 w-full z-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-20 items-center justify-between">
                            {/* Logo: Colvo Style pill badge */}
                            <div className="flex items-center">
                                <Link href="/" className="bg-white border border-slate-200/80 px-5 py-1.5 rounded-full shadow-sm flex items-center transition-transform hover:scale-[1.02]">
                                    <ColvoLogo 
                                        className="h-[40px] w-auto object-contain"
                                    />
                                </Link>
                            </div>

                            {/* Desktop Nav */}
                            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                                <a href="#features" className="hover:text-[#008069] transition-colors">Features</a>
                                <a href="#navigation-hub" className="hover:text-[#008069] transition-colors">Navigation Hub</a>
                                <a href="#developer-info" className="hover:text-[#008069] transition-colors">Specs</a>
                            </nav>

                            {/* Auth Controls */}
                            <div className="hidden md:flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center gap-2 rounded-full bg-[#008069] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#006e5a] hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-emerald-700/10"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-semibold text-slate-800 hover:text-slate-950 transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 px-6 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
                                        >
                                            Create Account
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex md:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="inline-flex items-center justify-center rounded-full p-2.5 text-slate-600 hover:bg-white hover:text-slate-900 transition-colors border border-slate-200"
                                >
                                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-b border-emerald-900/10 bg-white px-4 py-6 space-y-4">
                        <nav className="flex flex-col gap-4 text-base font-semibold text-slate-600">
                            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#008069]">Features</a>
                            <a href="#navigation-hub" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#008069]">Navigation Hub</a>
                            <a href="#developer-info" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#008069]">Specs</a>
                        </nav>
                        <hr className="border-slate-100" />
                        <div className="flex flex-col gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008069] py-3 text-sm font-bold text-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="flex w-full items-center justify-center rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-800 bg-slate-50"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="flex w-full items-center justify-center rounded-full bg-[#008069] py-3 text-sm font-bold text-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-32">
                    <div className="grid items-center gap-16 lg:grid-cols-12">
                        
                        {/* Left Side: Headline & Copy */}
                        <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
                            <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight text-[#f35b6b] leading-[1.05] mb-2">
                                Bulk WhatsApp<br />
                                <span className="text-[#6c63ff]">Marketing Software</span>
                            </h1>
                            
                            {/* Color-stripe separator matching screenshot */}
                            <div className="flex h-1.5 w-48 rounded-full overflow-hidden mx-auto lg:mx-0 mt-6">
                                <div className="w-[30%] bg-emerald-400" />
                                <div className="w-[20%] bg-blue-400" />
                                <div className="w-[30%] bg-yellow-400" />
                                <div className="w-[20%] bg-red-400" />
                            </div>

                            <p className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base text-slate-600 leading-relaxed font-medium mt-6">
                                Build connections, trigger, managing, and manage customer interactions. Elevate WhatsApp conversions via Meta-approved broadcast templates and WebSockets team inboxes.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/25 hover:scale-[1.02] transition-all"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('register')}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-orange-400 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-all"
                                    >
                                        Get Started Free
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Right Side: Mockup + Floating Cards */}
                        <div className="lg:col-span-7 flex justify-center relative">
                            {/* Floating Analytics Doughnut (Top Left) */}
                            <div className="absolute top-10 left-0 sm:left-[-20px] z-30 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/50" style={{ transform: 'translateY(-10px)' }}>
                                <div className="relative w-24 h-24 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <defs>
                                            <linearGradient id="doughnutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#ff9a9e" />
                                                <stop offset="50%" stopColor="#fecfef" />
                                                <stop offset="100%" stopColor="#a1c4fd" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            className="text-slate-100"
                                            strokeWidth="4"
                                            stroke="currentColor"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path
                                            stroke="url(#doughnutGrad)"
                                            strokeWidth="4"
                                            strokeDasharray="98, 100"
                                            fill="none"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-xl font-bold text-slate-800">98%</span>
                                        <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider text-center px-2">delivery rate</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Message Analytics (Bottom Left) */}
                            <div className="absolute bottom-16 left-[-40px] sm:left-[-80px] z-30 w-64 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 p-4 shadow-2xl" style={{ transform: 'translateY(10px)' }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="h-6 w-6 rounded-md bg-emerald-50 flex items-center justify-center">
                                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-800">Message analytics</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[9px] font-semibold text-slate-600">
                                            <span>78,252 received</span>
                                            <span className="text-emerald-500">89%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-400 w-[89%]" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[9px] font-semibold text-slate-500">
                                            <span>12,391 read</span>
                                            <span>31%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-sky-400 w-[31%]" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[9px] font-semibold text-slate-500">
                                            <span>10,323 replied</span>
                                            <span>19%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-400 w-[19%]" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[9px] font-semibold text-slate-500">
                                            <span>1,233 clicked 'Shop'</span>
                                            <span>2%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-400 w-[2%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Paper Plane (Top Right) */}
                            <div className="absolute top-10 right-[-20px] sm:right-[-40px] z-30">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center transform rotate-12 shadow-2xl shadow-blue-500/30 border-2 border-white/20">
                                        <Send className="h-8 w-8 text-white transform -rotate-12" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 h-7 w-7 bg-[#f35b6b] rounded-full flex items-center justify-center text-white text-[11px] font-bold border-2 border-white shadow-lg">
                                        1
                                    </div>
                                </div>
                            </div>

                            {/* Floating Contacts (Bottom Right) */}
                            <div className="absolute bottom-24 right-[-10px] sm:right-[-30px] z-30 w-44 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 p-3.5 shadow-2xl">
                                <div className="space-y-2.5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-7 w-7 rounded-full bg-[#fecfef] flex items-center justify-center border border-pink-200">
                                                <Users className="h-3 w-3 text-pink-600" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="h-1.5 w-12 bg-slate-200 rounded-full" />
                                                <div className="h-1 w-8 bg-slate-100 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <Check className="h-2.5 w-2.5 text-emerald-600" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-7 w-7 rounded-full bg-[#c2e9fb] flex items-center justify-center border border-blue-200">
                                                <Users className="h-3 w-3 text-blue-600" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="h-1.5 w-16 bg-slate-200 rounded-full" />
                                                <div className="h-1 w-10 bg-slate-100 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <Check className="h-2.5 w-2.5 text-emerald-600" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="h-7 w-7 rounded-full bg-[#a1c4fd] flex items-center justify-center border border-indigo-200">
                                                <Users className="h-3 w-3 text-indigo-600" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="h-1.5 w-14 bg-slate-200 rounded-full" />
                                                <div className="h-1 w-8 bg-slate-100 rounded-full" />
                                            </div>
                                        </div>
                                        <div className="h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <Check className="h-2.5 w-2.5 text-emerald-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Frame */}
                            <div className="relative w-full max-w-[280px] aspect-[9/19] rounded-[48px] bg-[#111b21] border-[10px] border-[#222e35] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-10 ring-1 ring-white/10">
                                {/* Speaker notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-[#222e35] rounded-b-2xl z-20" />

                                {/* WhatsApp Application Screen (Dark Mode) */}
                                <div className="h-full flex flex-col bg-[#0b141a] pt-6">
                                    {/* App Header */}
                                    <div className="py-3 px-4 bg-[#202c33] text-white flex items-center gap-3 border-b border-white/5">
                                        <div className="h-8 w-8 rounded-full bg-[#6c63ff]/20 flex items-center justify-center text-[#6c63ff]">
                                            <ShoppingCart className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-[12px] font-semibold text-[#e9edef]">WhatsApp Account</h4>
                                            <span className="text-[9px] text-[#8696a0]">Running seamlessly</span>
                                        </div>
                                    </div>

                                    {/* Chat Display Area */}
                                    <div className="flex-1 p-3 overflow-y-auto space-y-4 flex flex-col justify-start">
                                        <div className="text-center text-[9px] text-[#8696a0] my-2 bg-[#202c33] px-3 py-1 rounded-lg self-center shadow-sm">
                                            Today
                                        </div>
                                        
                                        {/* Rich Template Card Message */}
                                        <div className="self-start w-full max-w-[90%] bg-[#202c33] rounded-xl overflow-hidden text-slate-200 shadow-sm border border-white/5">
                                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-20 flex flex-col items-center justify-center text-white px-4">
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-center leading-tight">Progress out easily?</span>
                                                <span className="text-[8px] text-white/80 text-center mt-1">Get 50% discount available above from Phenominal ad</span>
                                            </div>
                                            <div className="p-3 text-[9px] text-[#e9edef] leading-relaxed">
                                                <p>Bulk backward interactions on WhatsApp are simple!</p>
                                            </div>
                                            <div className="border-t border-white/5 p-2 text-center text-[10px] font-semibold text-blue-400">
                                                Shop Now
                                            </div>
                                        </div>

                                        {/* Simulating Chat Log */}
                                        {chatMessages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`max-w-[85%] rounded-xl p-2 text-[10px] leading-relaxed shadow-sm transition-all duration-300 border border-white/5 ${
                                                    msg.sender === 'user' || msg.sender === 'platform'
                                                        ? 'self-end bg-[#005c4b] text-[#e9edef] rounded-tr-none'
                                                        : 'self-start bg-[#202c33] text-[#e9edef] rounded-tl-none'
                                                }`}
                                            >
                                                <p>{msg.text}</p>
                                                <div className="flex justify-end items-center gap-1 mt-1 text-[8px] text-[#8696a0]">
                                                    <span>{msg.time}</span>
                                                    {msg.sender === 'user' && <CheckCheck className="h-3 w-3 text-[#53bdeb]" />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Input Placeholder */}
                                    <div className="p-2.5 bg-[#202c33] flex items-center gap-2 border-t border-white/5">
                                        <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-[10px] text-[#8696a0]">
                                            Type a message...
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Navigation Hub */}
                <section id="navigation-hub" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 relative z-10">
                    <div className="text-center space-y-4 mb-20">
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            Interactive Platform Hub
                        </h2>
                        <p className="max-w-2xl mx-auto text-base text-slate-500 font-medium">
                            Skip the menus. Directly navigate into critical components. Hover cards to reveal sub-modules.
                        </p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-12">
                        {/* Left Column: Menu Items */}
                        <div className="lg:col-span-4 flex flex-col gap-2">
                            {navHub.map((item, index) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                                        index === 1 
                                            ? 'bg-slate-50 border border-slate-200/60 shadow-sm' 
                                            : 'hover:bg-slate-50 border border-transparent hover:border-slate-200/60'
                                    }`}
                                >
                                    <h3 className={`text-base font-bold transition-colors ${index === 1 ? 'text-[#f35b6b]' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                        {item.name}
                                    </h3>
                                    <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full ${
                                        index === 0 ? 'bg-blue-100 text-blue-700' :
                                        index === 1 ? 'bg-indigo-100 text-indigo-700' :
                                        index === 2 ? 'bg-emerald-100 text-emerald-700' :
                                        index === 3 ? 'bg-indigo-100 text-indigo-700' :
                                        index === 4 ? 'bg-pink-100 text-pink-700' :
                                        'bg-emerald-100 text-emerald-700'
                                    }`}>
                                        {item.badge}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Right Column: Visual Charts representing the Hub */}
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            {/* Node Diagram Chart */}
                            <div className="w-full bg-[#1e293b] rounded-2xl p-6 shadow-inner relative overflow-hidden flex items-center justify-center min-h-[250px]">
                                {/* Connecting Lines Base */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                                    <path d="M 30% 50% C 45% 50%, 45% 20%, 60% 20%" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                                    <path d="M 30% 50% C 45% 50%, 45% 40%, 60% 40%" fill="none" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                                    <path d="M 30% 50% C 45% 50%, 45% 60%, 60% 60%" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                                    <path d="M 30% 50% C 45% 50%, 45% 80%, 60% 80%" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                                    
                                    <path d="M 75% 20% L 90% 20%" fill="none" stroke="#38bdf8" strokeWidth="2" className="opacity-50" />
                                    <path d="M 75% 40% L 90% 40%" fill="none" stroke="#f472b6" strokeWidth="2" className="opacity-50" />
                                    <path d="M 75% 60% L 90% 60%" fill="none" stroke="#fbbf24" strokeWidth="2" className="opacity-50" />
                                    <path d="M 75% 80% L 90% 80%" fill="none" stroke="#a78bfa" strokeWidth="2" className="opacity-50" />
                                </svg>
                                
                                <div className="relative z-10 w-full flex items-center justify-between px-4 sm:px-12">
                                    {/* Left Node */}
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-[#0ea5e9] text-white text-[10px] font-bold px-4 py-2 rounded-lg shadow-lg">New Lead</div>
                                        <div className="bg-[#8b5cf6] text-white text-[10px] font-bold px-4 py-2 rounded-lg shadow-lg">Checkout</div>
                                    </div>
                                    
                                    {/* Center Node */}
                                    <div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                        <Send className="h-6 w-6 text-[#6c63ff]" />
                                    </div>
                                    
                                    {/* Right Nodes 1 */}
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-slate-700 border border-slate-600 text-white text-[10px] px-4 py-2 rounded-lg">Wait 1h</div>
                                        <div className="bg-slate-700 border border-slate-600 text-white text-[10px] px-4 py-2 rounded-lg">Condition</div>
                                        <div className="bg-slate-700 border border-slate-600 text-white text-[10px] px-4 py-2 rounded-lg">Send MSG</div>
                                        <div className="bg-slate-700 border border-slate-600 text-white text-[10px] px-4 py-2 rounded-lg">Add Tag</div>
                                    </div>
                                    
                                    {/* Right Nodes 2 */}
                                    <div className="flex flex-col gap-4 hidden sm:flex">
                                        <div className="bg-[#f35b6b] text-white text-[10px] px-4 py-2 rounded-lg">Action</div>
                                        <div className="bg-[#f35b6b] text-white text-[10px] px-4 py-2 rounded-lg">Action</div>
                                        <div className="bg-[#f35b6b] text-white text-[10px] px-4 py-2 rounded-lg">Action</div>
                                        <div className="bg-[#f35b6b] text-white text-[10px] px-4 py-2 rounded-lg">Action</div>
                                    </div>
                                </div>
                            </div>

                            {/* Analytics Area Chart */}
                            <div className="w-full bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-sm font-bold text-slate-800">Analytics</h4>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#f35b6b]" /> Dates</span>
                                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Series</span>
                                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#3b82f6]" /> Series</span>
                                    </div>
                                </div>
                                <div className="relative h-40 w-full overflow-hidden">
                                    {/* Mock SVG Area Chart */}
                                    <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="areaPink" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#f35b6b" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#f35b6b" stopOpacity="0" />
                                            </linearGradient>
                                            <linearGradient id="areaOrange" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                                            </linearGradient>
                                            <linearGradient id="areaBlue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        {/* Blue Series */}
                                        <path d="M0,180 C100,150 200,190 300,140 C400,90 500,160 600,120 C700,80 800,50 800,50 L800,200 L0,200 Z" fill="url(#areaBlue)" />
                                        <path d="M0,180 C100,150 200,190 300,140 C400,90 500,160 600,120 C700,80 800,50 800,50" fill="none" stroke="#3b82f6" strokeWidth="3" />
                                        
                                        {/* Orange Series */}
                                        <path d="M0,190 C150,170 250,110 350,140 C450,170 550,80 650,100 C750,120 800,90 800,90 L800,200 L0,200 Z" fill="url(#areaOrange)" />
                                        <path d="M0,190 C150,170 250,110 350,140 C450,170 550,80 650,100 C750,120 800,90 800,90" fill="none" stroke="#f59e0b" strokeWidth="3" />
                                        
                                        {/* Pink Series */}
                                        <path d="M0,160 C100,100 200,120 300,80 C400,40 500,110 600,60 C700,10 800,40 800,40 L800,200 L0,200 Z" fill="url(#areaPink)" />
                                        <path d="M0,160 C100,100 200,120 300,80 C400,40 500,110 600,60 C700,10 800,40 800,40" fill="none" stroke="#f35b6b" strokeWidth="3" />
                                    </svg>
                                    
                                    {/* X-Axis labels */}
                                    <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 text-[10px] text-slate-400 font-semibold mb-2">
                                        <span>Sun</span>
                                        <span>Mon</span>
                                        <span>Tue</span>
                                        <span>Wed</span>
                                        <span>Thu</span>
                                        <span>Fri</span>
                                        <span>Sat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Specs */}
                <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 mt-10">
                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="lg:col-span-1 space-y-4">
                            <h2 className="text-3xl font-extrabold text-slate-900">
                                Built to Scale
                            </h2>
                            <p className="text-slate-600 font-medium">
                                Powered by robust abstractions ensuring Meta rate-limits are honored and updates are dispatched in real-time.
                            </p>
                            <div className="pt-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                        <CheckCheck className="h-3 w-3 stroke-[3]" />
                                    </div>
                                    <span className="text-sm text-slate-700 font-semibold">99.9% Webhook Delivery</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                        <CheckCheck className="h-3 w-3 stroke-[3]" />
                                    </div>
                                    <span className="text-sm text-slate-700 font-semibold">50 requests/sec Limit Protection</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
                            <div className="rounded-3xl border border-slate-100 bg-white p-8 space-y-4 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-shadow">
                                <div className="h-12 w-12 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center mb-2">
                                    <Database className="h-6 w-6 stroke-[2]" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900">Multi-Tenant Separation</h3>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    Every workspace runs secure database tenancy. Contacts, campaigns, and templates are scoped via company_id.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-100 bg-white p-8 space-y-4 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-shadow">
                                <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center mb-2">
                                    <Zap className="h-6 w-6 stroke-[2]" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900">Laravel Reverb WebSockets</h3>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    No long polling. Incoming message webhooks publish events to Laravel Reverb for instantaneous team chat refresh.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-100 bg-white p-8 space-y-4 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-shadow">
                                <div className="h-12 w-12 rounded-2xl bg-pink-100 text-pink-500 flex items-center justify-center mb-2">
                                    <Clock className="h-6 w-6 stroke-[2]" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900">Rate-Limited Queue Jobs</h3>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    Campaign template triggers run asynchronously. AppServiceProvider limits Redis queue output to avoid API throttling.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-100 bg-white p-8 space-y-4 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-shadow">
                                <div className="h-12 w-12 rounded-2xl bg-indigo-100 text-indigo-500 flex items-center justify-center mb-2">
                                    <HeartHandshake className="h-6 w-6 stroke-[2]" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900">Secure Meta Signatures</h3>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                    Webhooks verify signatures from Graph API before processing inbound replies or updating message statuses.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Developer Spec Sheet */}
                <section id="developer-info" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 pb-32">
                    <div className="rounded-3xl border border-slate-100 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/40">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-[#fecfef] text-pink-600 flex items-center justify-center shadow-sm border border-pink-200">
                                    <Database className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        System Telemetry & Specs
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1 font-medium">
                                        Running on robust technology abstractions.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 text-[11px] font-bold tracking-wide text-slate-600">
                                <span className="border border-slate-200 text-slate-700 px-4 py-2 rounded-full bg-white hover:bg-slate-50 transition-colors">
                                    Laravel API v{laravelVersion}
                                </span>
                                <span className="border border-slate-200 text-slate-700 px-4 py-2 rounded-full bg-white hover:bg-slate-50 transition-colors">
                                    PHP v{phpVersion}
                                </span>
                                <span className="border border-slate-200 text-slate-700 px-4 py-2 rounded-full bg-white hover:bg-slate-50 transition-colors">
                                    MariaDB / MySQL
                                </span>
                                <span className="border border-slate-200 text-slate-700 px-4 py-2 rounded-full bg-white hover:bg-slate-50 transition-colors">
                                    DigitalOcean & Forge
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 bg-transparent py-12 border-t border-slate-200/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold">
                            <ColvoLogo className="h-6 w-auto object-contain" />
                            <span>© {new Date().getFullYear()} Colvo Inc. All rights reserved.</span>
                        </div>
                        <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">API Documentation</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
