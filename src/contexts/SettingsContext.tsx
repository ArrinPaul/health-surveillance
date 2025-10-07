"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load settings from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      const storedFontSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large' | null;
      const storedHighContrast = localStorage.getItem('highContrast') === 'true';
      const storedLanguage = localStorage.getItem('language');
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

      if (storedFontSize) setFontSize(storedFontSize);
      if (storedHighContrast) setHighContrast(true);
      if (storedLanguage) setLanguage(storedLanguage);
      if (storedTheme) {
        setTheme(storedTheme);
        // Apply theme
        if (storedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      }
    }
  }, []);

  const handleSetFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fontSize', size);
    }
  };

  const handleSetHighContrast = (enabled: boolean) => {
    setHighContrast(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem('highContrast', enabled.toString());
    }
  };

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const handleSetTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return (
    <SettingsContext.Provider value={{
      fontSize,
      setFontSize: handleSetFontSize,
      highContrast,
      setHighContrast: handleSetHighContrast,
      language,
      setLanguage: handleSetLanguage,
      theme,
      setTheme: handleSetTheme
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}