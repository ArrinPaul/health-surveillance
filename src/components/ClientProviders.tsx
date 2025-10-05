"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import AppLayout from './AppLayout';
import ConvexClientProvider from './ConvexProvider';

export default function ClientProviders({ children }: { children: any }) {
  return (
    <ConvexClientProvider>
      <SettingsProvider>
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </AuthProvider>
      </SettingsProvider>
    </ConvexClientProvider>
  );
}