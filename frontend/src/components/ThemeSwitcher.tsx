'use client';

import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { Moon, Zap, Flame, Leaf } from 'lucide-react';

const themes = [
  { id: 'cosmic', name: 'Cosmic', icon: Moon, color: '#06b6d4' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: Zap, color: '#f472b6' },
  { id: 'volcanic', name: 'Volcanic', icon: Flame, color: '#f97316' },
  { id: 'emerald', name: 'Emerald', icon: Leaf, color: '#10b981' },
] as const;

const ThemeSwitcher = () => {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 p-2 glass rounded-full">
      {themes.map((theme) => {
        const Icon = theme.icon;
        const isActive = currentTheme === theme.id;

        return (
          <motion.button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-all relative ${
              isActive ? 'text-background' : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-theme"
                className="absolute inset-0 bg-accent rounded-full -z-10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon size={20} />
            <span className="sr-only">{theme.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
