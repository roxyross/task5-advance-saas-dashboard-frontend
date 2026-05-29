'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BarChart3, Users, CreditCard, ArrowUpRight, 
  LayoutDashboard, Activity, Settings, LogOut, Menu, X,
  TrendingUp, Clock
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import api from '@/lib/api';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/analytics/dashboard');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data');
      }
    };
    if (user) fetchData();
  }, [user]);

  if (loading || !user) return <div className="flex items-center justify-center min-h-screen">Loading cosmic data...</div>;

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard', active: true },
    { name: 'Analytics', icon: BarChart3, href: '/analytics', active: false },
    { name: 'Activity Logs', icon: Activity, href: '/logs', active: false },
    { name: 'Settings', icon: Settings, href: '/settings', active: false },
  ];

  const stats = [
    { name: 'Total Users', value: data?.total_users || '0', icon: Users, trend: '+12%', color: 'text-blue-400' },
    { name: 'Active Sessions', value: data?.active_sessions || '0', icon: Clock, trend: '+5%', color: 'text-purple-400' },
    { name: 'Revenue', value: `$${(data?.revenue || 0).toLocaleString()}`, icon: CreditCard, trend: '+18%', color: 'text-emerald-400' },
    { name: 'Growth Rate', value: `${data?.growth_rate || 0}%`, icon: TrendingUp, trend: '+2%', color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen flex bg-background/30">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 glass border-r-0 rounded-r-3xl transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-background">
              N
            </div>
            <span className="text-xl font-bold tracking-tight">Nebula</span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${item.active ? 'bg-accent text-background font-bold' : 'hover:bg-white/5 text-foreground/70'}
                `}
              >
                <item.icon size={20} />
                {item.name}
              </button>
            ))}
          </nav>

          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all mt-auto"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <p className="text-foreground/60">Welcome back, {user.full_name}</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <button 
              className="lg:hidden p-2 glass rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-3xl glow-hover"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-full flex items-center gap-1">
                  <ArrowUpRight size={12} />
                  {stat.trend}
                </span>
              </div>
              <p className="text-foreground/60 text-sm mb-1">{stat.name}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 glass p-8 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Revenue Stream</h2>
              <select className="bg-white/5 border-0 text-sm rounded-lg focus:ring-0">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.chart_data || []}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="label" 
                    stroke="rgba(255,255,255,0.5)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--accent)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Activity Mini Table */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl"
          >
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Activity size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New deployment successful</p>
                    <p className="text-xs text-foreground/40">2 minutes ago • Production</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 glass rounded-xl text-sm font-medium hover:bg-white/5 transition-all">
              View All Logs
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
