'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  BarChart3, LayoutDashboard, Activity, Settings, 
  LogOut, ArrowLeft, TrendingUp, Filter, Download
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import api from '@/lib/api';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/analytics/dashboard');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch analytics');
      }
    };
    if (user) fetchData();
  }, [user]);

  if (loading || !user) return <div className="flex items-center justify-center min-h-screen">Loading analytics...</div>;

  return (
    <div className="min-h-screen p-6 lg:p-10 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 glass rounded-lg hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Deep Space Analytics</h1>
            <p className="text-foreground/60">Comprehensive metrics for your cosmic infrastructure.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm hover:bg-white/5 transition-all">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-background font-bold rounded-xl text-sm hover:opacity-90 transition-all">
            <Download size={16} />
            Export
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-3xl"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Performance Breakdown</h2>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.chart_data || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                  }}
                />
                <Legend />
                <Bar dataKey="value" name="Metric Value" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-emerald-400" size={20} />
              Growth Projections
            </h3>
            <p className="text-foreground/60 mb-6">Based on your current trajectory, we expect a 25% increase in user engagement over the next solar cycle.</p>
            <div className="space-y-4">
              {[
                { label: 'Estimated Users', value: '12.4k', progress: 75 },
                { label: 'Potential Revenue', value: '$45.2k', progress: 45 },
                { label: 'System Load', value: '1.2TB', progress: 60 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{item.label}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent" 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-3xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity className="text-purple-400" size={20} />
              Real-time Pulse
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Andromeda Cluster', status: 'Online', delay: '12ms' },
                { label: 'Milky Way Edge', status: 'Online', delay: '45ms' },
                { label: 'Orion Nebula', status: 'Warning', delay: '128ms' },
                { label: 'Solar Station 4', status: 'Online', delay: '8ms' },
              ].map((node) => (
                <div key={node.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${node.status === 'Online' ? 'bg-emerald-400' : 'bg-orange-400'} shadow-[0_0_8px_rgba(52,211,153,0.5)]`} />
                    <span className="text-sm">{node.label}</span>
                  </div>
                  <span className="text-xs font-mono text-foreground/40">{node.delay}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
