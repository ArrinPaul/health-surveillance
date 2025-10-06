"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import VoiceEnabledChatbot from './VoiceEnabledChatbot';

// Simplified Auth Context
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'health-worker' | 'community-user';
  location?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

// Simplified Settings Context  
interface SettingsContextType {
  language: string;
  theme: 'light' | 'dark';
  fontSize: number;
  highContrast: boolean;
  setLanguage: (lang: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setFontSize: (size: number) => void;
  setHighContrast: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  language: 'en',
  theme: 'light',
  fontSize: 16,
  highContrast: false,
  setLanguage: () => {},
  setTheme: () => {},
  setFontSize: () => {},
  setHighContrast: () => {},
});

export const useSettings = () => useContext(SettingsContext);

// Combined Provider Component
export default function ClientProviders({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  
  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      const storedLang = localStorage.getItem('language');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      if (storedTheme) setTheme(storedTheme);
      if (storedLang) setLanguage(storedLang);
    } catch (error) {
      console.warn('Error loading stored data:', error);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simple mock authentication
      if (email.includes('@') && password.length > 0) {
        const mockUser: User = {
          id: Date.now().toString(),
          name: email.split('@')[0] || 'User',
          email: email,
          role: email.includes('admin') ? 'admin' : 'health-worker',
          location: 'Demo Location',
          phone: '',
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const updateTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Layout wrapper
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/';
  
  const content = isAuthPage ? (
    children
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Navigation />
      <main className="lg:ml-72 pt-20 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
      <VoiceEnabledChatbot />
    </div>
  );

  return (
    <SettingsContext.Provider 
      value={{ 
        language, 
        theme, 
        fontSize,
        highContrast,
        setLanguage: updateLanguage, 
        setTheme: updateTheme,
        setFontSize,
        setHighContrast
      }}
    >
      <AuthContext.Provider 
        value={{ 
          user, 
          login, 
          logout, 
          isAuthenticated 
        }}
      >
        {content}
      </AuthContext.Provider>
    </SettingsContext.Provider>
  );
}