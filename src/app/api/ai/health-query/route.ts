import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Mock response
    const response = {
      answer: 'This is a mock response to your health query.',
      sources: ['Mock source']
    };
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}