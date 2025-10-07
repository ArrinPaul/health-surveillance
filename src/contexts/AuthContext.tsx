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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session (client-side only)
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      // Call backend login API to get user with their stored role
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Login failed' }));
        throw new Error(errorData.error || 'Login failed');
      }

      const userData = await response.json();
      
      // Handle case where API returns user directly or nested in 'user' property
      const user: User = userData.user || userData;
      
      if (!user || !user.id) {
        throw new Error('Invalid response from server');
      }
      
      setUser(user);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        if (userData.token) {
          localStorage.setItem('token', userData.token);
        }
      }
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      
      // In development, provide mock data as fallback
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock login data for development');
        
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
      
      // In production, re-throw the error
      throw error;
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
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {isLoading ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #e5e7eb',
              borderTopColor: '#3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }} />
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading...</p>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      ) : (
        children
      )}
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