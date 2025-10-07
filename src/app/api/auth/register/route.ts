import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { JWTService } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role = 'user' } = await request.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Check if user already exists (you'd typically check this in your database)
    // For now, we'll use a simple check - in real app, use Convex or your database
    
    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // In a real app, you would save user to database here
    // For now, we'll simulate user creation
    const userId = `user_${Date.now()}`;

    // Generate JWT token
    const token = JWTService.generateToken({
      userId,
      email,
      role
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: userId,
        email,
        name,
        role
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}