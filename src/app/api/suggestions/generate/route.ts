import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/suggestions/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Suggestions API proxy error:', error);
    
    // Return fallback suggestions
    return NextResponse.json({
      suggestions: getFallbackSuggestions(),
      generatedAt: new Date(),
      refreshInterval: 30,
      fallback: true
    });
  }
}

function getFallbackSuggestions() {
  const currentHour = new Date().getHours();
  const currentMonth = new Date().getMonth();
  
  const suggestions = [
    {
      id: 'fallback-1',
      type: 'water',
      priority: 'medium',
      title: 'Daily Water Safety Check',
      description: 'Ensure your drinking water is properly purified before consumption. Check color, smell, and taste.',
      action: 'Learn More',
      actionUrl: '/education',
      timestamp: new Date(),
      category: 'water_safety',
      icon: 'Droplet'
    },
    {
      id: 'fallback-2',
      type: 'health',
      priority: 'low',
      title: 'Health Monitoring Reminder',
      description: 'Regular health monitoring helps in early detection of potential health issues.',
      action: 'View Health Data',
      actionUrl: '/health-data',
      timestamp: new Date(),
      category: 'preventive_care',
      icon: 'Heart'
    }
  ];

  // Add time-based suggestions
  if (currentHour >= 6 && currentHour <= 8) {
    suggestions.unshift({
      id: 'fallback-time',
      type: 'health',
      priority: 'high',
      title: 'Morning Water Safety',
      description: 'Peak contamination period detected. Ensure extra precaution with water consumption.',
      action: 'Set Reminder',
      actionUrl: '/education',
      timestamp: new Date(),
      category: 'time_based',
      icon: 'Clock'
    });
  }

  // Add seasonal suggestions
  if (currentMonth >= 5 && currentMonth <= 8) { // Monsoon season
    suggestions.push({
      id: 'fallback-season',
      type: 'emergency',
      priority: 'high',
      title: 'Monsoon Health Protocol',
      description: 'Increased risk of waterborne diseases during monsoon. Follow enhanced safety measures.',
      action: 'View Protocol',
      actionUrl: '/education',
      timestamp: new Date(),
      category: 'seasonal',
      icon: 'Activity'
    });
  }

  return suggestions;
}