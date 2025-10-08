"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import AppLayout from './AppLayout';
// import { ConvexProvider, ConvexReactClient } from "convex/react";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ClientProviders({ children }: { children: any }) {
  return (
    // <ConvexProvider client={convex}>
      <SettingsProvider>
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </AuthProvider>
      </SettingsProvider>
    // </ConvexProvider>
  );
}