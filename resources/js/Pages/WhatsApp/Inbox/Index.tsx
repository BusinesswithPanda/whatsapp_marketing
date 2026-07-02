import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { MessageCircle, Phone, Clock, Search, Send, Check, CheckCheck, XCircle, ArrowRight } from 'lucide-react';

export default function InboxIndex({ contacts }: { contacts: any[] }) {
    const [selectedContact, setSelectedContact] = useState<any | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (selectedContact) {
            setMessages(selectedContact.messages || []);
        }
    }, [selectedContact]);

    useEffect(() => {
        if ((window as any).Echo && selectedContact) {
            const channel = (window as any).Echo.private(`chat.${selectedContact.id}`);
            channel.listen('MessageReceived', (e: any) => {
                setMessages(prev => [...prev, e.message]);
            });
            channel.listen('MessageStatusUpdated', (e: any) => {
                setMessages(prev => prev.map(m => m.id === e.message.id ? e.message : m));
            });
            return () => {
                channel.stopListening('MessageReceived');
                channel.stopListening('MessageStatusUpdated');
            };
        }
    }, [selectedContact]);

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'sent': return <Check className="h-3.5 w-3.5 text-slate-400" />;
            case 'delivered': return <CheckCheck className="h-3.5 w-3.5 text-slate-400" />;
            case 'read': return <CheckCheck className="h-3.5 w-3.5 text-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />;
            case 'failed': return <XCircle className="h-3.5 w-3.5 text-red-500" />;
            default: return <Clock className="h-3.5 w-3.5 text-slate-400" />;
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageText.trim()) return;

        const newMsg = {
            id: Date.now(),
            body: messageText,
            direction: 'outbound',
            status: 'sent',
            created_at: new Date().toISOString()
        };

        setMessages(prev => [...prev, newMsg]);
        setMessageText('');

        // Sync back to locally mutated contacts array
        if (selectedContact) {
            if (!selectedContact.messages) {
                selectedContact.messages = [];
            }
            selectedContact.messages.push(newMsg);
        }
    };

    const filteredContacts = contacts.filter(contact => {
        const fullName = `${contact.first_name || ''} ${contact.last_name || ''}`.toLowerCase();
        const phone = (contact.phone || '').toLowerCase();
        return fullName.includes(searchQuery.toLowerCase()) || phone.includes(searchQuery.toLowerCase());
    });

    return (
        <AuthenticatedLayout header={
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Team Inbox</h2>
                <p className="text-[13px] text-slate-500 dark:text-zinc-400 mt-1 font-medium">
                    Manage real-time customer conversations, template responses, and incoming messages.
                </p>
            </div>
        }>
            <Head title="Inbox" />
            
            <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 shadow-sm rounded-2xl flex h-[680px] overflow-hidden">
                    {/* Left Sidebar - Conversation List */}
                    <div className="w-80 flex-shrink-0 border-r border-slate-100 dark:border-zinc-800 flex flex-col bg-slate-50/50 dark:bg-zinc-950/20">
                        {/* Search header */}
                        <div className="p-4 border-b border-slate-100 dark:border-zinc-800">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search conversations..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-slate-400" 
                                />
                            </div>
                        </div>

                        {/* List Items */}
                        <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-zinc-800/40">
                            {filteredContacts.length === 0 ? (
                                <div className="p-8 text-center text-slate-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-wider">
                                    No conversations found
                                </div>
                            ) : (
                                filteredContacts.map((contact) => {
                                    const latestMsg = contact.messages?.[contact.messages.length - 1];
                                    const initials = `${contact.first_name?.[0] || ''}${contact.last_name?.[0] || ''}`.toUpperCase();
                                    const isSelected = selectedContact?.id === contact.id;

                                    return (
                                        <div 
                                            key={contact.id} 
                                            onClick={() => setSelectedContact(contact)}
                                            className={`p-4 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-zinc-800/40 transition-colors flex items-start gap-3 relative ${
                                                isSelected ? 'bg-slate-100/70 dark:bg-zinc-800/60' : ''
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-md" />
                                            )}
                                            {/* Initial Avatar */}
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-800/50 border border-slate-100 dark:border-zinc-700/60 flex items-center justify-center font-bold text-sm text-blue-600 dark:text-blue-400 flex-shrink-0">
                                                {initials || <MessageCircle className="w-4 h-4" />}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <h4 className="font-bold text-[14px] text-slate-800 dark:text-zinc-100 truncate">
                                                        {contact.first_name} {contact.last_name}
                                                    </h4>
                                                    <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-semibold flex-shrink-0">
                                                        {latestMsg?.created_at 
                                                            ? new Date(latestMsg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
                                                            : ''
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center gap-2">
                                                    <p className="text-[12px] text-slate-400 dark:text-zinc-500 truncate font-medium">
                                                        {latestMsg?.body || 'Template Message'}
                                                    </p>
                                                    {latestMsg?.direction === 'outbound' && (
                                                        <div className="flex-shrink-0">
                                                            {getStatusIcon(latestMsg.status)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Right Area - Active Chat */}
                    <div className="flex-1 flex flex-col bg-slate-50/20 dark:bg-zinc-950/10 relative">
                        {selectedContact ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-4 bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800/80 flex items-center justify-between z-10 shadow-sm shadow-slate-100/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-100/50 dark:border-blue-500/20">
                                            <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 dark:text-zinc-100 leading-snug">
                                                {selectedContact.first_name} {selectedContact.last_name}
                                            </h3>
                                            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{selectedContact.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Messages Area */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10 flex flex-col-reverse">
                                    <div className="flex flex-col space-y-4">
                                        {messages.slice().reverse().map((msg: any) => {
                                            const isOutbound = msg.direction === 'outbound';
                                            return (
                                                <div key={msg.id} className={`flex ${isOutbound ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm relative ${
                                                        isOutbound 
                                                            ? 'bg-blue-600 text-white rounded-tr-none' 
                                                            : 'bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/30 text-slate-850 dark:text-zinc-150 rounded-tl-none'
                                                    }`}>
                                                        <p className="text-[13px] font-medium whitespace-pre-wrap leading-relaxed">
                                                            {msg.body || 'Media / Template Message'}
                                                        </p>
                                                        <div className="flex items-center justify-end gap-1 mt-2">
                                                            <span className={`text-[9px] font-semibold ${isOutbound ? 'text-blue-200' : 'text-slate-400 dark:text-zinc-500'}`}>
                                                                {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                            </span>
                                                            {isOutbound && (
                                                                <div className="text-white">
                                                                    {getStatusIcon(msg.status)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Message Input Box */}
                                <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800/80 z-10">
                                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-950/60 p-2 rounded-2xl border border-slate-100 dark:border-zinc-800/50">
                                        <input 
                                            type="text" 
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            placeholder="Type a message..." 
                                            className="flex-1 border-0 bg-transparent focus:ring-0 text-xs font-semibold dark:text-white px-3 placeholder-slate-400" 
                                        />
                                        <button 
                                            type="submit" 
                                            className="p-2 text-white rounded-xl shadow-md shadow-blue-500/20 hover:opacity-90 transition-opacity flex-shrink-0 flex items-center justify-center"
                                            style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-center text-[10px] text-slate-400 dark:text-zinc-500 mt-2 font-medium">
                                        To send a message outside the 24-hour window, you must use an approved template.
                                    </p>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center z-10 p-8 text-center">
                                <div className="relative mb-6 group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-3xl" />
                                    <div 
                                        className="relative p-6 rounded-3xl shadow-[0_15px_30px_rgba(228,15,122,0.2)] group-hover:scale-105 transition-transform duration-300 border border-white/10"
                                        style={{ background: 'linear-gradient(to right, #FDB337, #FC5247, #E40F7A, #D150D7, #235BDD, #2ABCFB)' }}
                                    >
                                        <MessageCircle className="w-12 h-12 text-white drop-shadow-md stroke-[1.5]" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-2 tracking-tight">WhatsApp Web for Teams</h3>
                                <p className="text-xs text-slate-400 dark:text-zinc-500 max-w-xs leading-relaxed font-medium">
                                    Select a conversation from the left sidebar to view message history, track deliverability, or send a reply.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
