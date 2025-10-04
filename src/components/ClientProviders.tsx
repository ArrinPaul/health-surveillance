"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import AppLayout from './AppLayout';
import { useEffect } from 'react';
import '@/lib/i18n';
import { useTranslation } from 'react-i18next';

function I18nWrapper({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return <>{children}</>;
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <AuthProvider>
        <I18nWrapper>
          <AppLayout>
            {children}
          </AppLayout>
        </I18nWrapper>
      </AuthProvider>
    </SettingsProvider>
  );
}