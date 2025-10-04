"use client";

import React, { useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { Shield, Stethoscope, Users, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('community-user');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, role);
      
      // Role-based redirect
      if (role === 'admin' || role === 'health-worker') {
        router.push('/dashboard');
      } else if (role === 'community-user') {
        router.push('/education');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Theme toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-3xl font-semibold tracking-tight">
              Health Surveillance
            </h1>
          </Link>
          <p className="text-xl text-muted-foreground">
            Sign in to continue
          </p>
        </div>

        <div className="apple-card p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                {t('email')}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
                className="mt-2 h-11 rounded-xl"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                {t('password')}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
                className="mt-2 h-11 rounded-xl"
                placeholder="••••••••"
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-sm font-medium">
                {t('role')}
              </Label>
              <Select value={role} onValueChange={(value: string) => setRole(value as UserRole)}>
                <SelectTrigger className="mt-2 h-11 rounded-xl">
                  <SelectValue placeholder={t('selectRole')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {t('admin')}
                    </div>
                  </SelectItem>
                  <SelectItem value="health-worker">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4" />
                      {t('healthWorker')}
                    </div>
                  </SelectItem>
                  <SelectItem value="community-user">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t('communityUser')}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 rounded-full text-base font-medium shadow-lg shadow-primary/20" 
              disabled={loading}
            >
              {loading ? t('loading') : (
                <span className="flex items-center gap-2">
                  {t('signIn')}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-4 text-muted-foreground">
                New to Health Surveillance?
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/register" 
              className="text-primary hover:text-primary/80 font-medium transition-colors text-sm"
            >
              Create an account
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}