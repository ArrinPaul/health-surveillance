"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TestPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setCount(count + 1);
    setMessage(`Button clicked ${count + 1} times`);
    console.log('Button clicked!', count + 1);
  };

  const handleAlert = () => {
    alert('Alert button works!');
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Button Test Page</h1>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Basic Button Tests</h2>
          
          <div className="space-y-4 p-4 border rounded-lg">
            <Button onClick={handleClick}>
              Click Me (Count: {count})
            </Button>
            
            <Button onClick={handleAlert} variant="outline">
              Show Alert
            </Button>
            
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            
            <Button asChild variant="secondary">
              <Link href="/">Go Home</Link>
            </Button>
            
            <p className="text-lg">{message || 'No clicks yet'}</p>
          </div>
          
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">Form Test</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted!');
            }}>
              <div className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Test input"
                  className="w-full p-2 border rounded"
                />
                <Button type="submit">Submit Form</Button>
              </div>
            </form>
          </div>
          
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">Navigation Test</h3>
            <div className="flex gap-2 flex-wrap">
              <Link href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Login Page
              </Link>
              <Link href="/register" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Register Page
              </Link>
              <Link href="/dashboard" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}