import { PropsWithChildren, ReactNode, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';
import { User } from '@/types';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user as User;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen bg-gray-50 dark:bg-gray-950 font-sans antialiased text-gray-900 dark:text-gray-100 flex">
            {/* Sidebar Component */}
            <Sidebar isMobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />

            {/* Main Content Wrapper */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Navbar Component */}
                <Navbar user={user} setMobileOpen={setSidebarOpen} header={header} />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
