import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { MessageCircle, CheckCircle2, Sparkles, TrendingUp, Bell, Search, Plus, User } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        // Outer Padded Frame (Light Gray background, centering the app frame)
        <div className="min-h-screen bg-[#eef1f5] flex items-center justify-center p-0 md:p-6 lg:p-10 font-sans">
            
            {/* Inner App Container with rounded corners and border/shadow */}
            <div className="w-full max-w-[1300px] min-h-[100vh] md:min-h-[85vh] lg:h-[620px] bg-white rounded-none md:rounded-[32px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.08)] grid grid-cols-12 border border-slate-200/50">
                
                {/* Left Column: Form Area */}
                <div className="col-span-12 lg:col-span-5 flex flex-col justify-center px-8 sm:px-14 lg:px-16 py-12 bg-white relative">
                    <div className="w-full max-w-sm mx-auto">
                        {children}
                    </div>
                </div>

                {/* Right Column: Visual Dashboard Mockup (Vibrant Gradient Sidebar) */}
                <div className="hidden lg:col-span-7 lg:flex bg-gradient-to-br from-[#ff9a44] via-[#fc6076] to-[#0984e3] text-white p-12 flex-col justify-center items-center relative overflow-hidden border-l border-white/10">
                    
                    {/* Glowing background vector line chart */}
                    <svg className="absolute inset-0 w-full h-full text-white/10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 0,80 Q 20,40 40,65 T 70,25 T 100,50" fill="none" stroke="currentColor" strokeWidth="0.8" />
                        <path d="M 0,90 Q 25,60 50,75 T 100,35" fill="none" stroke="currentColor" strokeWidth="0.4" />
                    </svg>

                    {/* Visual decoration: Grid Pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-35" />
                    
                    {/* Glowing Orbs */}
                    <div className="absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full bg-pink-400/40 blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-10 left-[-10%] w-[450px] h-[450px] rounded-full bg-blue-400/40 blur-[110px] pointer-events-none" />

                    {/* Graphic composition: Parent container upscaled to 580px max-width */}
                    <div className="relative w-full max-w-[580px] aspect-[4/3] flex items-center justify-center">
                        
                        {/* Floating vibrant chat bubble (Top Right) */}
                        <div className="absolute -top-6 right-12 z-30 hover:scale-105 transition-transform duration-300">
                            <div className="bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 border border-white/30 h-14 w-16 rounded-[1.2rem] flex items-center justify-center shadow-[0_15px_35px_rgba(252,96,118,0.4)]">
                                <span className="flex gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDelay: '0ms' }} />
                                    <span className="h-2 w-2 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDelay: '150ms' }} />
                                    <span className="h-2 w-2 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDelay: '300ms' }} />
                                </span>
                            </div>
                        </div>

                        {/* Floating WhatsApp Vibrant Logo (Left Center) */}
                        <div className="absolute left-[-36px] top-[32%] z-30 flex h-16 w-16 items-center justify-center rounded-[1.2rem] bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 shadow-[0_15px_35px_rgba(236,72,153,0.4)] text-white hover:scale-105 transition-transform duration-300 border border-white/20 backdrop-blur-md">
                            <svg className="h-8 w-8 fill-current drop-shadow-md" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.89 5.83L2.06 22l4.31-1.12C7.94 21.46 9.9 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.23 14.18c-.23.64-1.34 1.18-1.85 1.23-.46.05-.98.07-2.79-.66-2.28-.93-3.71-3.23-3.83-3.38-.11-.16-.94-1.25-.94-2.39 0-1.13.59-1.69.8-1.91.21-.22.46-.27.61-.27.15 0 .3 0 .43.01.14 0 .32-.05.5.38.18.43.64 1.56.7 1.68.06.12.1.26.02.43-.08.17-.12.27-.25.42-.13.15-.27.33-.39.45-.13.12-.26.26-.11.51.15.25.66 1.09 1.41 1.76.97.86 1.79 1.13 2.05 1.26.26.13.41.11.56-.06.15-.17.65-.76.82-.99.17-.23.34-.19.58-.1.24.09 1.52.72 1.78.85.26.13.43.2.5.31.06.12.06.69-.17 1.33z" />
                            </svg>
                        </div>

                        {/* High-Fidelity Mockup: Dashboard Panel - Upscaled to w-[460px] */}
                        <div className="w-[460px] bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-slate-100 overflow-hidden text-slate-800 scale-95 origin-center -translate-x-8 -translate-y-4">
                            {/* Dashboard header */}
                            <div className="bg-[#fcfdfd] px-4.5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-800">
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#1e293b]" />
                                    <span>Dashboard</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search className="h-3.5 w-3.5 text-slate-400 absolute left-1.5 top-1/2 -translate-y-1/2" />
                                        <div className="bg-white border border-slate-100 w-24 h-5.5 rounded-md pl-6.5" />
                                    </div>
                                    <Bell className="h-3.5 w-3.5 text-slate-400" />
                                </div>
                            </div>

                            {/* Core Dashboard Structure */}
                            <div className="flex h-[260px]">
                                {/* Mini Sidebar */}
                                <div className="w-18 bg-[#1e293b] p-3.5 space-y-2.5 text-[7px] font-bold text-slate-400">
                                    <div className="bg-slate-800 text-white p-1.5 rounded-md flex items-center gap-1">
                                        <div className="h-1.5 w-1.5 bg-[#0ea5e9] rounded-full" />
                                        Analytics
                                    </div>
                                    <div className="p-1.5 pl-3">Campaigns</div>
                                    <div className="p-1.5 pl-3">Templates</div>
                                    <div className="p-1.5 pl-3">Contacts</div>
                                    <div className="p-1.5 pl-3">Settings</div>
                                </div>

                                {/* Content Body */}
                                <div className="flex-1 p-3.5 grid grid-cols-3 gap-3">
                                    {/* Left Content column: Charts widget */}
                                    <div className="col-span-2 bg-white border border-slate-100 rounded-2xl p-3 flex flex-col justify-between">
                                        <div className="flex items-center justify-between text-[7.5px] font-bold text-slate-700">
                                            <span>Analytics Metrics</span>
                                            <span className="text-[6.5px] text-[#0ea5e9]">7 Days</span>
                                        </div>
                                        
                                        {/* Multi-colored bar charts */}
                                        <div className="flex items-end justify-between h-24 pt-4 px-2 border-b border-slate-100/80">
                                            <div className="w-3.5 bg-yellow-400 rounded-t-sm h-[35%]" />
                                            <div className="w-3.5 bg-orange-500 rounded-t-sm h-[60%]" />
                                            <div className="w-3.5 bg-pink-500 rounded-t-sm h-[45%]" />
                                            <div className="w-3.5 bg-purple-500 rounded-t-sm h-[80%]" />
                                            <div className="w-3.5 bg-[#0ea5e9] rounded-t-sm h-[50%]" />
                                        </div>
                                        <div className="flex justify-between text-[6.5px] text-slate-400 font-bold">
                                            <span>Mon</span>
                                            <span>Tue</span>
                                            <span>Wed</span>
                                            <span>Thu</span>
                                            <span>Fri</span>
                                        </div>
                                    </div>

                                    {/* Right Content column: Outbound widgets */}
                                    <div className="col-span-1 space-y-2.5">
                                        <div className="bg-white border border-slate-100 rounded-2xl p-2 flex flex-col justify-between">
                                            <span className="text-[6.5px] text-slate-400 font-bold">Broadcast</span>
                                            <span className="text-[12px] font-extrabold text-slate-800 mt-0.5">1,343</span>
                                            <span className="text-[5px] text-slate-400 font-semibold">Messages Sent</span>
                                        </div>
                                        <div className="bg-white border border-slate-100 rounded-2xl p-2 flex flex-col justify-between">
                                            <span className="text-[6.5px] text-slate-400 font-bold">User List</span>
                                            <span className="text-[12px] font-extrabold text-slate-800 mt-0.5">6,290</span>
                                            <span className="text-[5px] text-slate-400 font-semibold">Active Contacts</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* High-Fidelity Mockup: Phone Overlapping Dashboard - Upscaled to w-[180px] */}
                        <div className="absolute right-[-24px] top-6 z-20 w-[180px] aspect-[9/18.5] bg-slate-900 border-[6px] border-slate-800 rounded-[36px] shadow-2xl overflow-hidden ring-4 ring-white/10">
                            <div className="h-full flex flex-col bg-[#efeae2] text-[8px] text-slate-800">
                                {/* Header bar */}
                                <div className="pt-6 pb-2.5 px-3 bg-[#1e293b] text-white flex items-center gap-1.5">
                                    <div className="h-5.5 w-5.5 rounded-full bg-white/20 flex items-center justify-center">
                                        <MessageCircle className="h-3 w-3 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-[8.5px] leading-tight">WhatsMarketing</h4>
                                        <span className="text-[6px] text-[#0ea5e9]">online</span>
                                    </div>
                                </div>
                                
                                {/* Messages wallpaper */}
                                <div className="flex-1 p-2.5 space-y-2.5 flex flex-col justify-end">
                                    <div className="self-start bg-white rounded-lg p-2.5 rounded-tl-none border border-slate-200/50 max-w-[95%] shadow-sm leading-relaxed">
                                        <p className="text-[7.5px] text-slate-700">
                                            Hi! With WhatsMarketing you can send messages to all your contacts in one click, matching their names and details. Hope you like it!
                                        </p>
                                        <div className="text-[6px] text-emerald-600 font-extrabold mt-1 text-right">
                                            Thanks, WhatsMarketing 🚀
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Input placeholder */}
                                <div className="p-2 bg-[#f0f2f5] flex items-center border-t border-slate-200/50">
                                    <div className="flex-1 bg-white border rounded-full px-2.5 py-1 text-[7px] text-slate-400">
                                        Message...
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overlapping Performance Overview Card - Upscaled to w-[310px] */}
                        <div className="absolute left-[-40px] bottom-0 z-30 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/40 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] text-slate-800 w-[310px] hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-between border-b border-slate-200/50 pb-2.5 mb-2.5">
                                <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                                    <TrendingUp className="h-4.5 w-4.5 text-[#0984e3]" />
                                    Performance Overview
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-center">
                                <div>
                                    <span className="text-[16px] font-extrabold text-[#0984e3] block">98.7%</span>
                                    <span className="text-[8px] font-bold text-slate-500 uppercase">Open Rate</span>
                                </div>
                                <div className="h-8 w-px bg-slate-200/50" />
                                <div>
                                    <span className="text-[16px] font-extrabold text-slate-900 block">24K</span>
                                    <span className="text-[8px] font-bold text-slate-500 uppercase">Sent</span>
                                </div>
                                <div className="h-8 w-px bg-slate-200/50" />
                                <div>
                                    <span className="text-[16px] font-extrabold text-slate-900 block">1.2K</span>
                                    <span className="text-[8px] font-bold text-slate-500 uppercase">Clicks</span>
                                </div>
                            </div>

                            {/* Small floating graph icon attached to performance card */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-br from-pink-500 to-orange-400 h-8 w-10 rounded-xl shadow-lg flex items-center justify-center border border-white/20 hover:-translate-y-1 transition-transform">
                                <TrendingUp className="h-4 w-4 text-white drop-shadow" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
