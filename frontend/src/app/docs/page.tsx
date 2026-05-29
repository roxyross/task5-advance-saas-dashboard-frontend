'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Book, Code, Server, Shield, 
  Zap, ArrowLeft, Terminal, Cpu 
} from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const sections = [
  {
    title: "Getting Started",
    icon: Book,
    content: "Welcome to Nebula Analytics. Our platform provides deep-space data processing with real-time visualization of your most critical cosmic infrastructure metrics."
  },
  {
    title: "Tech Stack",
    icon: Cpu,
    content: "Built with Next.js 15 (App Router), FastAPI, and Neon Postgres. We use Framer Motion for glassmorphic animations and Recharts for data visualization."
  },
  {
    title: "Authentication",
    icon: Shield,
    content: "Secure access is handled via JWT tokens. Our middleware ensures that your cosmic data remains protected and only accessible to authorized commanders."
  },
  {
    title: "API Integration",
    icon: Server,
    content: "The backend is powered by a robust FastAPI instance featuring automated rate limiting and SQLAlchemy 2.0 for efficient database operations."
  }
];

export default function DocsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-6 lg:p-10 max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 glass rounded-lg hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
            <p className="text-foreground/60 italic">Directive: System Knowledge Base</p>
          </div>
        </div>
        <ThemeSwitcher />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-8 rounded-3xl border-accent/10 hover:border-accent/30 transition-colors"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
              <section.icon size={24} />
            </div>
            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
            <p className="text-foreground/60 leading-relaxed">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass p-8 rounded-3xl bg-accent/5 border-dashed border-2 border-accent/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <Terminal className="text-accent" size={24} />
          <h2 className="text-xl font-bold">Quick Command Reference</h2>
        </div>
        <div className="space-y-4 font-mono text-sm">
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <p className="text-accent mb-1"># Start Frontend Development</p>
            <p className="text-foreground/80">npm run dev</p>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <p className="text-accent mb-1"># Start Backend API</p>
            <p className="text-foreground/80">uvicorn app.main:app --reload</p>
          </div>
        </div>
      </motion.div>

      <footer className="mt-20 text-center text-foreground/40 text-sm">
        <p>&copy; 2026 Nebula Analytics. All systems operational.</p>
      </footer>
    </div>
  );
}
