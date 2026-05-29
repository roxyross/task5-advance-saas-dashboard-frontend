'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'cosmic' | 'cyberpunk' | 'volcanic' | 'emerald';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('cosmic');

  useEffect(() => {
    const savedTheme = localStorage.getItem('nebula-theme') as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
      document.body.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('nebula-theme', newTheme);
    if (newTheme === 'cosmic') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
