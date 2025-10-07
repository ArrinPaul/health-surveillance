"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import AppLayout from './AppLayout';
// Uncomment after running: npx convex dev
// import { ConvexProvider, ConvexReactClient } from "convex/react";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ClientProviders({ children }: { children: any }) {
  return (
    // Step 1: Wrap with ConvexProvider after setup (see REALTIME_SETUP.md)
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