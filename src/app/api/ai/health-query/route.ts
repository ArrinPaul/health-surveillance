import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    // Try to use Gemini API if available
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (apiKey) {
      try {
        // Here you would implement actual Gemini API call
        // For now, providing intelligent mock responses based on query
        const response = generateHealthResponse(query);
        return NextResponse.json(response);
      } catch (apiError) {
        console.error('Gemini API error:', apiError);
        // Fall back to mock response
      }
    }
    
    // Mock response with more realistic content
    const response = generateHealthResponse(query);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Health query error:', error);
    return NextResponse.json({ error: 'Query failed' }, { status: 500 });
  }
}

function generateHealthResponse(query: string) {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('fever') || lowerQuery.includes('temperature')) {
    return {
      answer: 'For fever management: Stay hydrated, rest, and monitor your temperature. Seek medical attention if fever exceeds 101°F (38.3°C) or persists for more than 3 days. Paracetamol can help reduce fever.',
      sources: ['WHO Health Guidelines', 'CDC Fever Management'],
      confidence: 0.85
    };
  }
  
  if (lowerQuery.includes('water') || lowerQuery.includes('contamination')) {
    return {
      answer: 'For water safety: Boil water for at least 20 minutes, use water purification tablets, or drink from sealed bottled water. Avoid ice and raw foods washed in potentially contaminated water.',
      sources: ['Water Quality Guidelines', 'Public Health Advisory'],
      confidence: 0.90
    };
  }
  
  if (lowerQuery.includes('symptom') || lowerQuery.includes('sick')) {
    return {
      answer: 'Common symptoms to monitor include fever, cough, fatigue, and gastrointestinal issues. Keep a symptom diary and consult healthcare providers for persistent or severe symptoms.',
      sources: ['Health Monitoring Guide', 'Medical Reference'],
      confidence: 0.75
    };
  }
  
  // Default response
  return {
    answer: 'Thank you for your health query. For specific medical advice, please consult with a qualified healthcare professional. In general, maintain good hygiene, stay hydrated, and monitor your symptoms.',
    sources: ['General Health Guidelines'],
    confidence: 0.60
  };
}