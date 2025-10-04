import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Smart Health Surveillance System",
  description: "Early Warning System for Health Officials and Community - Disease Monitoring and Water Quality Tracking",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Health Surveillance",
  },
  openGraph: {
    title: "Smart Health Surveillance System",
    description: "Early Warning System for Disease Monitoring and Water Quality Tracking",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <Script id="suppress-resize-observer" strategy="beforeInteractive">
          {`
            // Suppress benign ResizeObserver error (common with Radix UI/shadcn)
            (function() {
              const resizeObserverErrHandler = function(e) {
                if (e.message && e.message.includes('ResizeObserver loop')) {
                  const resizeObserverErr = 'ResizeObserver loop completed with undelivered notifications.';
                  if (e.message === resizeObserverErr || e.message.includes('ResizeObserver')) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                  }
                }
              };
              
              window.addEventListener('error', resizeObserverErrHandler);
              
              const originalOnError = window.onerror;
              window.onerror = function(message, source, lineno, colno, error) {
                if (message && typeof message === 'string' && message.includes('ResizeObserver')) {
                  return true;
                }
                if (originalOnError) {
                  return originalOnError(message, source, lineno, colno, error);
                }
                return false;
              };
            })();
          `}
        </Script>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(reg => console.log('Service Worker registered'))
                  .catch(err => console.log('Service Worker registration failed', err));
              });
            }
          `}
        </Script>
        <ClientProviders>
          {children}
        </ClientProviders>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}