"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  FileText, 
  Droplet, 
  Bell, 
  BookOpen, 
  MessageSquare,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard, roles: ['admin', 'health-worker'] },
    { href: '/health-data', label: t('healthData'), icon: FileText, roles: ['admin', 'health-worker'] },
    { href: '/water-quality', label: t('waterQuality'), icon: Droplet, roles: ['admin', 'health-worker'] },
    { href: '/ai-features', label: '🤖 AI Features', icon: LayoutDashboard, roles: ['admin', 'health-worker'] },
    { href: '/alerts', label: t('alerts'), icon: Bell, roles: ['admin', 'health-worker'] },
    { href: '/education', label: t('education'), icon: BookOpen, roles: ['admin', 'health-worker', 'community-user'] },
    { href: '/community-reports', label: t('communityReports'), icon: MessageSquare, roles: ['admin', 'health-worker', 'community-user'] },
  ];

  const bottomNavItems = [
    { href: '/profile', label: t('profile'), icon: User },
    { href: '/settings', label: t('settings'), icon: Settings },
    { href: '/help', label: t('help'), icon: HelpCircle },
  ];

  const filteredNavItems = navItems.filter(item => 
    !item.roles || (user && item.roles.includes(user.role))
  );

  const NavContent = () => (
    <>
      <div className="flex flex-col gap-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'hover:bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[15px]">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-border/40">
        <div className="flex flex-col gap-1 mb-4">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[15px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
        
        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
          <Button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            variant="ghost"
            className="justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[15px]">{t('logout')}</span>
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 apple-glass border-b border-border/40">
        <div className="flex items-center justify-between px-6 h-16">
          <h1 className="text-lg font-semibold tracking-tight">Health Surveillance</h1>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 flex flex-col p-6">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold tracking-tight">Health Surveillance</h2>
                  {user && (
                    <div className="mt-3 p-3 rounded-xl bg-muted">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{user.role.replace('-', ' ')}</p>
                    </div>
                  )}
                </div>
                <NavContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 apple-glass border-r border-border/40 flex-col p-6 z-40">
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight mb-3">
            Health Surveillance
          </h1>
          {user && (
            <div className="p-3 rounded-xl bg-muted">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground mt-1 capitalize">{user.role.replace('-', ' ')}</p>
            </div>
          )}
        </div>
        <NavContent />
      </aside>
    </>
  );
}