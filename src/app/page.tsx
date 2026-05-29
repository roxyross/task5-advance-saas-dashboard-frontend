'use client';

import TerminalHero from '@/components/TerminalHero';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { motion } from 'framer-motion';
import { BarChart3, Shield, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: "Cosmic Analytics",
    description: "Deep-space data processing with real-time visualization of your most critical metrics.",
    icon: BarChart3,
  },
  {
    title: "Quantum Security",
    description: "Role-based access control and JWT-powered authentication to keep your data safe.",
    icon: Shield,
  },
  {
    title: "Light-Speed Performance",
    description: "Optimized Next.js 15 and FastAPI backend for sub-millisecond response times.",
    icon: Zap,
  },
  {
    title: "Global Reach",
    description: "Multi-region availability and edge-cached responses for a worldwide audience.",
    icon: Globe,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-background/50 backdrop-blur-md border-b border-card-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-background">
            N
          </div>
          <span className="text-xl font-bold tracking-tight">MY DashBoard</span>
        </div>
        <ThemeSwitcher />
      </header>

      {/* Hero Section */}
      <section className="pt-32">
        <TerminalHero />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl glow-hover group"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mt-40 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-12 rounded-[2.5rem] max-w-4xl mx-auto border-accent/20 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-accent/5 -z-10 blur-3xl" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to transcend?</h2>
          <p className="text-xl text-foreground/60 mb-10 max-w-2xl mx-auto">
            Join the elite teams monitoring their cosmic infrastructure with Nebula Analytics.
          </p>
          <Link 
            href="/register" 
            className="inline-block px-10 py-4 bg-accent text-background font-bold rounded-full text-lg hover:opacity-90 transition-all shadow-xl shadow-accent-glow"
          >
            Start Your Journey Free
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
