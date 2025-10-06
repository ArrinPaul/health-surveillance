import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    // Mock AI health query responses
    const responses = {
      "fever": "Fever is a common symptom that indicates your body is fighting an infection. Rest, stay hydrated, and monitor your temperature. Seek medical attention if fever exceeds 101.3°F (38.5°C) or persists.",
      "headache": "Headaches can have various causes including stress, dehydration, or underlying conditions. Try rest, hydration, and gentle pain relief. Consult a doctor if severe or persistent.",
      "cough": "Coughs help clear your airways. Stay hydrated, use honey for soothing, and rest. See a healthcare provider if cough persists over 2 weeks or includes blood.",
      "default": "Thank you for your health question. While I can provide general information, it's important to consult with a qualified healthcare professional for personalized medical advice and proper diagnosis."
    };

    // Simple keyword matching for demo
    let response = responses.default;
    const lowerQuery = query.toLowerCase();
    
    for (const [keyword, answer] of Object.entries(responses)) {
      if (lowerQuery.includes(keyword)) {
        response = answer;
        break;
      }
    }

    return NextResponse.json({
      success: true,
      response: response,
      query: query,
      timestamp: new Date().toISOString(),
      disclaimer: "This information is for educational purposes only. Always consult a healthcare professional for medical advice."
    });

  } catch (error) {
    console.error('Health query error:', error);
    return NextResponse.json(
      { error: 'Failed to process health query' },
      { status: 500 }
    );
  }
}