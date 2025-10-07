"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import AppLayout from './AppLayout';
import { ErrorBoundary } from './ErrorBoundary';

export default function ClientProviders({ children }: { children: any }) {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </AuthProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
}