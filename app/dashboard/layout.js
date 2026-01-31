import Link from 'next/link';
import { Home, Users, BarChart3, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Lead CRM</h1>
                </div>
                <nav className="mt-6">
                    <Link href="/dashboard" className="flex items-center px-6 py-3 hover:bg-slate-800 transition-colors">
                        <Home className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link href="/dashboard" className="flex items-center px-6 py-3 hover:bg-slate-800 transition-colors">
                        <Users className="w-5 h-5 mr-3" />
                        Leads
                    </Link>
    <Link href="/dashboard" className="flex items-center px-6 py-3 hover:bg-slate-800 transition-colors">
                        <Users className="w-5 h-5 mr-3" />
                        Contact Us 
                    </Link>
                    {/* <Link href="/analytics" className="flex items-center px-6 py-3 hover:bg-slate-800 transition-colors">
            <BarChart3 className="w-5 h-5 mr-3" />
            Analytics
          </Link> */}
                    <Link href="/login" className="flex items-center px-6 py-3 hover:bg-slate-800 transition-colors mt-auto text-red-400">
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="bg-white shadow p-4 flex justify-between md:hidden">
                    <span className="font-bold text-lg">Lead CRM</span>
                    <Link href="/login" className="text-red-500">Logout</Link>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
