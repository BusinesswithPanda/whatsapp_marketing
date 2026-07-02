import { Link } from '@inertiajs/react';
import { LayoutDashboard, Users, Send, MessageSquare, Settings, Menu, MessageCircle, GitBranch } from 'lucide-react';
import ColvoLogo from '@/Components/ColvoLogo';

interface SidebarProps {
    isMobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ isMobileOpen, setMobileOpen }: SidebarProps) {
    const navItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, active: route().current('dashboard') },
        { name: 'Inbox', href: route('whatsapp.inbox.index'), icon: MessageCircle, active: route().current('whatsapp.inbox.*') },
        { name: 'Contacts', href: route('whatsapp.contacts.index'), icon: Users, active: route().current('whatsapp.contacts.*') },
        { name: 'Templates', href: route('whatsapp.templates.index'), icon: MessageSquare, active: route().current('whatsapp.templates.*') },
        { name: 'Campaigns', href: route('whatsapp.campaigns.index'), icon: Send, active: route().current('whatsapp.campaigns.*') },
        { name: 'Automation', href: route('whatsapp.automations.index'), icon: GitBranch, active: route().current('whatsapp.automations.*') },
        { name: 'Settings', href: route('whatsapp.accounts.index'), icon: Settings, active: route().current('whatsapp.accounts.*') },
    ];

    return (
        <>
            {/* Mobile backdrop */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 z-20 bg-gray-900/50 transition-opacity lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <div 
                className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-zinc-800 bg-zinc-950 shadow-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between px-4 pt-6 pb-2">
                    <Link href="/" className="flex flex-1 items-center justify-center bg-white py-3 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow">
                        <ColvoLogo className="h-9 w-auto object-contain" />
                    </Link>
                    <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/80 hover:text-white ml-3">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                item.active
                                    ? 'text-white shadow-[0_4px_20px_rgba(252,82,71,0.25)]'
                                    : 'text-white/90 hover:bg-white/20 hover:text-white'
                            }`}
                            style={item.active ? { background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' } : undefined}
                        >
                            <item.icon className={`relative z-10 mr-3 h-5 w-5 flex-shrink-0 ${item.active ? 'text-white' : 'text-white/90'}`} />
                            <span className="relative z-10 font-bold">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}
