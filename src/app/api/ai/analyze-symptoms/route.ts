import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Mock AI analysis
    const result = {
      diagnosis: 'Common cold',
      confidence: 0.85,
      recommendations: ['Rest and drink fluids']
    };
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}