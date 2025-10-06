import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiDocs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Health Surveillance API Documentation</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
        .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .method { color: white; padding: 4px 8px; border-radius: 3px; font-weight: bold; }
        .post { background-color: #49cc90; }
        .get { background-color: #61affe; }
        pre { background: #f8f8f8; padding: 10px; border-radius: 3px; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>🏥 Health Surveillance System API</h1>
    <p>Complete serverless API for health monitoring and disease surveillance.</p>
    
    <h2>📊 Available Endpoints</h2>
    
    <div class="endpoint">
        <h3><span class="method post">POST</span> /api/chatbot/message</h3>
        <p>AI-powered health chatbot with multilingual support</p>
        <pre>Body: { "message": "string", "language": "string" }</pre>
    </div>
    
    <div class="endpoint">
        <h3><span class="method get">GET</span> /api/health</h3>
        <p>System health check and service status</p>
    </div>
    
    <div class="endpoint">
        <h3><span class="method post">POST</span> /api/suggestions/generate</h3>
        <p>Generate personalized health suggestions</p>
        <pre>Body: { "location": "string", "userPreferences": {} }</pre>
    </div>
    
    <div class="endpoint">
        <h3><span class="method get">GET</span> /api/water-quality</h3>
        <p>Real-time water quality data</p>
        <pre>Query: ?lat=number&lon=number</pre>
    </div>
    
    <div class="endpoint">
        <h3><span class="method post">POST</span> /api/water-quality/analyze</h3>
        <p>AI-powered water quality analysis</p>
        <pre>Body: { "waterData": {}, "location": "string" }</pre>
    </div>
    
    <div class="endpoint">
        <h3><span class="method post">POST</span> /api/ai/analyze-symptoms</h3>
        <p>AI symptom analysis and recommendations</p>
        <pre>Body: { "symptoms": ["string"], "severity": "string" }</pre>
    </div>
    
    <div class="endpoint">
        <h3><span class="method post">POST</span> /api/ai/health-query</h3>
        <p>Natural language health queries</p>
        <pre>Body: { "query": "string" }</pre>
    </div>
    
    <div class="endpoint">
        <h3><span class="method post">POST</span> /api/predict</h3>
        <p>Disease outbreak prediction</p>
        <pre>Body: { "location": "string", "timeframe": "string" }</pre>
    </div>
    
    <div class="endpoint">
        <h3><span class="method post">POST</span> /api/health-forecast</h3>
        <p>Health trend forecasting</p>
        <pre>Body: { "district": "string", "duration": "string" }</pre>
    </div>
    
    <h2>🌍 Multilingual Support</h2>
    <p>All APIs support 16 languages including English and 15 Indian languages.</p>
    
    <h2>🔒 Authentication</h2>
    <p>Demo mode active - no authentication required for testing.</p>
    
    <h2>📈 Response Format</h2>
    <pre>
{
  "success": boolean,
  "data": object,
  "timestamp": "ISO string",
  "error": "string (if applicable)"
}
    </pre>
</body>
</html>
    `;

    return new NextResponse(apiDocs, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('API docs error:', error);
    return NextResponse.json(
      { error: 'Failed to load API documentation' },
      { status: 500 }
    );
  }
}