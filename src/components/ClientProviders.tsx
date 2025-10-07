"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import AppLayout from './AppLayout';

// TODO: Enable after running `npx convex dev` to generate files
// Step 1: Uncomment these imports:
// import { ConvexProvider, ConvexReactClient } from "convex/react";
// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ClientProviders({ children }: { children: any }) {
  return (
    // Step 2: Wrap with ConvexProvider (see REALTIME_SETUP.md)
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