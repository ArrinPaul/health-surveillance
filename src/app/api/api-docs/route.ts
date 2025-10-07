import { NextResponse } from 'next/server';

export async function GET() {
  // Mock API docs
  const docs = {
    title: 'API Documentation',
    version: '1.0.0',
    endpoints: ['/api/auth/login', '/api/water-quality']
  };
  return NextResponse.json(docs);
}