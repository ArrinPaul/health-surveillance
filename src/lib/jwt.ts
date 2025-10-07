import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export interface JWTPayload {
  userId: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export class JWTService {
  static generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: '7d',
        algorithm: 'HS256'
      }
    );
  }

  static verifyToken(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      console.error('JWT verification failed:', error);
      return null;
    }
  }

  static extractTokenFromRequest(request: NextRequest): string | null {
    // Check Authorization header
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Check cookies
    const token = request.cookies.get('auth-token')?.value;
    return token || null;
  }

  static refreshToken(oldToken: string): string | null {
    const payload = this.verifyToken(oldToken);
    if (!payload) return null;

    // Remove iat and exp from payload
    const { iat, exp, ...newPayload } = payload;
    return this.generateToken(newPayload);
  }
}