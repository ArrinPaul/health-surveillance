import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid input format' },
        { status: 400 }
      );
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Mock authentication with role determination
    if (email && password.length >= 8) {
      // Determine role based on email
      let role = 'community-user';
      if (email.toLowerCase().includes('admin')) {
        role = 'admin';
      } else if (email.toLowerCase().includes('health') || email.toLowerCase().includes('worker')) {
        role = 'health-worker';
      }
      
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email: email,
        role: role,
        location: 'Default Location'
      };
      
      return NextResponse.json({
        success: true,
        token: 'mock-jwt-token',
        user: user,
        message: 'Login successful'
      });
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid credentials or password too short' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}