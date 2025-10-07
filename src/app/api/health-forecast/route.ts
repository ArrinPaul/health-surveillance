import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Mock forecast
    const forecast = {
      trend: 'stable',
      predictions: ['No major outbreaks expected']
    };
    return NextResponse.json(forecast);
  } catch (error) {
    return NextResponse.json({ error: 'Forecast failed' }, { status: 500 });
  }
}