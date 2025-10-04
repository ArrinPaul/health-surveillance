"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import AppLayout from './AppLayout';
import ConvexClientProvider from './ConvexProvider';

export default function ClientProviders({ children }: { children: any }) {
  return (
    <ConvexClientProvider children={
      <SettingsProvider children={
        <AuthProvider children={
          <AppLayout children={children} />
        } />
      } />
    } />
  );
}