'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/register', {
        email,
        password,
        full_name: fullName,
        role: 'user'
      });
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 rounded-3xl w-full max-w-md border-accent/20"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-bold text-background mx-auto mb-4 text-2xl">
            N
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-foreground/60 mt-2">Join the Nebula Analytics network</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 glass rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
              placeholder="Commander Shepard"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 glass rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
              placeholder="commander@nebula.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 glass rounded-xl focus:ring-2 focus:ring-accent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent text-background font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent-glow disabled:opacity-50 mt-4"
          >
            {loading ? 'Creating Identity...' : 'Register Now'}
          </button>
        </form>

        <p className="text-center mt-8 text-foreground/60">
          Already have an account?{' '}
          <Link href="/login" className="text-accent font-semibold hover:underline">
            Log in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
