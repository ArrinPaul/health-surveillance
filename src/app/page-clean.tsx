"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = () => {
    const mockUser = {
      email: 'demo@example.com',
      role: 'admin',
      name: 'Demo User'
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    router.push('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600">
                  Health Surveillance System
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to Your
              <span className="text-indigo-600"> Health Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Monitor community health, analyze water quality, and access AI-powered health assistance.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-indigo-600 text-xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Health Assistant</h3>
                <p className="text-gray-600 mb-4">
                  Get instant health guidance in multiple languages
                </p>
                <Link href="/ai-features" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Try Now →
                </Link>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-cyan-600 text-xl">💧</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Water Quality Monitor</h3>
                <p className="text-gray-600 mb-4">
                  Check real-time water quality and safety
                </p>
                <Link href="/water-quality" className="text-cyan-600 hover:text-cyan-500 font-medium">
                  Check Now →
                </Link>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-600 text-xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Analytics</h3>
                <p className="text-gray-600 mb-4">
                  View health trends and predictions
                </p>
                <Link href="/dashboard" className="text-green-600 hover:text-green-500 font-medium">
                  View Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">
                Health Surveillance System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI-Powered Health
              <span className="text-indigo-600"> Surveillance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Monitor community health, predict disease outbreaks, and ensure water safety 
              with our comprehensive AI-driven surveillance system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleLogin}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700"
              >
                Get Started
              </button>
              <Link href="/about" className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Health Monitoring
            </h2>
            <p className="text-xl text-gray-600">
              Advanced AI features for complete health surveillance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Health Assistant</h3>
              <p className="text-gray-600 mb-4">
                Get instant health guidance in 15+ Indian languages with voice support
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-800">
                  Ask me about water safety, hygiene practices, or symptoms!
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">💧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Water Quality Monitor</h3>
              <p className="text-gray-600 mb-4">
                Real-time water quality analysis and safety recommendations
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">pH Level</span>
                  <span className="text-sm font-semibold text-green-600">Safe</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bacteria Count</span>
                  <span className="text-sm font-semibold text-green-600">Low</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Analytics</h3>
              <p className="text-gray-600 mb-4">
                Track disease patterns and predict health trends
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Disease Risk</span>
                  <span className="text-sm font-semibold text-green-600">Low</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Community Health</span>
                  <span className="text-sm font-semibold text-green-600">Stable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Health Surveillance System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}