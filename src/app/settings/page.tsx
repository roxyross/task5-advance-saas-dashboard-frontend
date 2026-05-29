'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  User, Shield, Bell, Monitor, Lock, 
  ArrowLeft, Save, Globe, Palette
} from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading]);

  if (loading || !user) return <div className="flex items-center justify-center min-h-screen">Accessing control panel...</div>;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="min-h-screen p-6 lg:p-10 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 glass rounded-lg hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Control Center</h1>
            <p className="text-foreground/60">Manage your cosmic identity and preferences.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="md:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${activeTab === tab.id ? 'bg-accent text-background font-bold shadow-lg shadow-accent/20' : 'hover:bg-white/5 text-foreground/70'}
              `}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-8 rounded-3xl"
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/60 px-1">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.full_name}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/60 px-1">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      disabled
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground/40 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-foreground/60 px-1">Bio</label>
                  <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 h-32"
                    placeholder="Tell us about your cosmic mission..."
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-accent text-background font-bold rounded-xl hover:opacity-90 transition-all ml-auto">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Security Protocol</h2>
                <div className="p-4 rounded-2xl bg-orange-400/10 border border-orange-400/20 flex gap-4">
                  <Shield className="text-orange-400 shrink-0" size={24} />
                  <div>
                    <p className="text-sm font-bold text-orange-400">Security Recommendation</p>
                    <p className="text-sm text-foreground/60">Two-factor authentication is not yet enabled. Enable it to secure your data stream.</p>
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                    <div className="flex items-center gap-3">
                      <Lock size={20} className="text-accent" />
                      <div>
                        <p className="font-medium text-sm">Change Password</p>
                        <p className="text-xs text-foreground/40">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <button className="text-sm font-bold text-accent hover:underline">Update</button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                    <div className="flex items-center gap-3">
                      <Monitor size={20} className="text-accent" />
                      <div>
                        <p className="font-medium text-sm">Active Sessions</p>
                        <p className="text-xs text-foreground/40">2 devices currently logged in</p>
                      </div>
                    </div>
                    <button className="text-sm font-bold text-accent hover:underline">Manage</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Visual Preferences</h2>
                <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-xl text-accent">
                      <Palette size={24} />
                    </div>
                    <div>
                      <p className="font-medium">System Theme</p>
                      <p className="text-sm text-foreground/60">Select your preferred color scheme</p>
                    </div>
                  </div>
                  <ThemeSwitcher />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 text-center py-10">
                <Bell size={48} className="mx-auto text-accent/20" />
                <p className="text-foreground/60">Notification preferences coming soon to your sector.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
