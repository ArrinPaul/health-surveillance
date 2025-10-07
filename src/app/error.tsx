'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page Error:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f9fafb',
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#ef4444',
          marginBottom: '16px',
        }}>
          Something went wrong
        </h2>
        <p style={{
          color: '#6b7280',
          marginBottom: '16px',
          lineHeight: '1.6',
        }}>
          We encountered an error while loading this page.
        </p>
        {error.message && (
          <p style={{
            fontSize: '12px',
            color: '#9ca3af',
            marginBottom: '24px',
            fontFamily: 'monospace',
            padding: '12px',
            backgroundColor: '#f3f4f6',
            borderRadius: '6px',
            wordBreak: 'break-word',
          }}>
            {error.message}
          </p>
        )}
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginRight: '12px',
          }}
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
