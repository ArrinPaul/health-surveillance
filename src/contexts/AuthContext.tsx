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
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, role: UserRole, location: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for existing session (client-side only)
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      // Call backend login API to get user with their stored role
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      const user: User = userData.user;
      
      setUser(user);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', userData.token);
      }
      
      return user;
    } catch (error) {
      // Fallback to mock data for development
      console.log('Using mock login data');
      
      // Mock users with different roles based on email
      let role: UserRole = 'community-user';
      if (email.includes('admin')) role = 'admin';
      else if (email.includes('health') || email.includes('worker')) role = 'health-worker';
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role,
        location: 'Guwahati, Assam'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(mockUser));
      }
      
      return mockUser;
    }
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
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