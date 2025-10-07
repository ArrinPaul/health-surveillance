import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { JWTService } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In a real app, you would fetch user from Convex/database here
    // For now, we'll simulate user lookup
    // This should be replaced with actual database query
    const mockUsers = [
      {
        id: 'user_1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        passwordHash: await bcrypt.hash('password', 12)
      },
      {
        id: 'user_2',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user',
        passwordHash: await bcrypt.hash('password123', 12)
      }
    ];

    // Find user by email
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = JWTService.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

    // Set HTTP-only cookie for security
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}