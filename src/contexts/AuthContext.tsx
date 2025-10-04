"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'health-worker' | 'community-user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole, location: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
      location: 'Guwahati, Assam'
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, password: string, role: UserRole, location: string) => {
    // Mock registration - replace with actual API call
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      location
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}