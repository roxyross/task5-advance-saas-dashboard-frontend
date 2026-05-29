'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const TerminalHero = () => {
  const [text, setText] = useState('');
  const fullText = "Welcome to Nebula Analytics_";
  const [subText, setSubText] = useState('');
  const fullSubText = "> Initializing cosmic data streams...\n> Connection established.\n> Awaiting directive.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (text.length === fullText.length) {
      let j = 0;
      const timer = setInterval(() => {
        setSubText(fullSubText.slice(0, j));
        j++;
        if (j > fullSubText.length) clearInterval(timer);
      }, 50);
      return () => clearInterval(timer);
    }
  }, [text]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl max-w-2xl w-full font-mono text-left shadow-2xl shadow-accent-glow"
      >
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-accent mb-4">
          {text}
        </h1>
        <pre className="text-sm md:text-base text-foreground/70 whitespace-pre-wrap leading-relaxed">
          {subText}
        </pre>
        {subText.length === fullSubText.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link href="/dashboard" className="px-6 py-2 bg-accent text-background font-bold rounded-lg hover:opacity-90 transition-all glow-hover">
              Launch Dashboard
            </Link>
            <Link href="/docs" className="px-6 py-2 glass rounded-lg hover:bg-white/10 transition-all">
              Documentation
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TerminalHero;
