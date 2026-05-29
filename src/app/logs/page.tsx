'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BarChart3, LayoutDashboard, Activity, Settings, LogOut, Menu, X,
  Search, Filter, Download, ChevronLeft, ChevronRight
} from 'lucide-react';
import api from '@/lib/api';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function LogsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/analytics/logs');
        setLogs(response.data);
      } catch (err) {
        // Fallback mock logs
        setLogs([
          { id: 1, action: 'User Login', user_id: 1, status: 'Success', timestamp: new Date().toISOString() },
          { id: 2, action: 'API Key Created', user_id: 1, status: 'Success', timestamp: new Date().toISOString() },
          { id: 3, action: 'Dashboard View', user_id: 1, status: 'Success', timestamp: new Date().toISOString() },
          { id: 4, action: 'Settings Updated', user_id: 1, status: 'Success', timestamp: new Date().toISOString() },
          { id: 5, action: 'Failed Login Attempt', user_id: 1, status: 'Failed', timestamp: new Date().toISOString() },
        ]);
      }
    };
    if (user) fetchLogs();
  }, [user]);

  if (loading || !user) return null;

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard', active: false },
    { name: 'Analytics', icon: BarChart3, href: '/analytics', active: false },
    { name: 'Activity Logs', icon: Activity, href: '/logs', active: true },
    { name: 'Settings', icon: Settings, href: '/settings', active: false },
  ];

  return (
    <div className="min-h-screen flex bg-background/30">
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 glass border-r-0 rounded-r-3xl transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-background">N</div>
            <span className="text-xl font-bold tracking-tight">Nebula</span>
          </div>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-accent text-background font-bold' : 'hover:bg-white/5 text-foreground/70'}`}
              >
                <item.icon size={20} />
                {item.name}
              </button>
            ))}
          </nav>
          <button onClick={() => { logout(); router.push('/'); }} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all mt-auto">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 p-6 lg:p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold">Activity Logs</h1>
            <p className="text-foreground/60">Monitor all system events and user actions</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <button className="lg:hidden p-2 glass rounded-lg" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        <div className="glass rounded-3xl overflow-hidden border-accent/10">
          <div className="p-6 border-b border-card-border flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <input 
                type="text" 
                placeholder="Search logs..." 
                className="w-full pl-10 pr-4 py-2 glass rounded-xl focus:ring-1 focus:ring-accent outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 glass rounded-xl hover:bg-white/5">
                <Filter size={18} /> Filter
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 glass rounded-xl hover:bg-white/5">
                <Download size={18} /> Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-foreground/40 text-sm">
                  <th className="px-6 py-4 font-medium">Action</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Timestamp</th>
                  <th className="px-6 py-4 font-medium text-right">ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                {logs.filter(log => log.action.toLowerCase().includes(search.toLowerCase())).map((log, index) => (
                  <motion.tr 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                          <Activity size={16} />
                        </div>
                        <span className="font-medium">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/60">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-mono text-foreground/40">
                      #{log.id}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-card-border flex justify-between items-center text-sm text-foreground/40">
            <span>Showing {logs.length} results</span>
            <div className="flex gap-2">
              <button className="p-2 glass rounded-lg hover:bg-white/5 disabled:opacity-30" disabled>
                <ChevronLeft size={18} />
              </button>
              <button className="p-2 glass rounded-lg hover:bg-white/5">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
