import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symptoms } = body;
    
    if (!symptoms || !Array.isArray(symptoms)) {
      return NextResponse.json(
        { error: 'Symptoms array is required' },
        { status: 400 }
      );
    }

    // Advanced symptom analysis
    const analysis = analyzeSymptoms(symptoms);
    
    return NextResponse.json({
      symptoms: symptoms,
      analysis: analysis.diagnosis,
      confidence: analysis.confidence,
      severity: analysis.severity,
      recommendations: analysis.recommendations,
      urgency: analysis.urgency,
      followUp: analysis.followUp
    });
  } catch (error) {
    console.error('Symptom analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}

function analyzeSymptoms(symptoms: string[]) {
  const lowerSymptoms = symptoms.map(s => s.toLowerCase().trim());
  
  // Respiratory symptoms
  const respiratorySymptoms = ['cough', 'shortness of breath', 'chest pain', 'sore throat', 'runny nose'];
  const hasRespiratory = lowerSymptoms.some(s => respiratorySymptoms.some(rs => s.includes(rs)));
  
  // Fever and systemic symptoms
  const systemicSymptoms = ['fever', 'fatigue', 'headache', 'muscle aches', 'chills'];
  const hasSystemic = lowerSymptoms.some(s => systemicSymptoms.some(ss => s.includes(ss)));
  
  // Gastrointestinal symptoms
  const giSymptoms = ['nausea', 'vomiting', 'diarrhea', 'stomach pain', 'loss of appetite'];
  const hasGI = lowerSymptoms.some(s => giSymptoms.some(gs => s.includes(gs)));
  
  // Severe symptoms
  const severeSymptoms = ['difficulty breathing', 'chest pain', 'severe headache', 'high fever'];
  const hasSevere = lowerSymptoms.some(s => severeSymptoms.some(ss => s.includes(ss)));
  
  if (hasSevere) {
    return {
      diagnosis: 'Severe symptoms detected - requires immediate medical attention',
      confidence: 0.95,
      severity: 'High',
      urgency: 'Immediate',
      recommendations: [
        'Seek immediate medical attention',
        'Go to emergency room if breathing difficulties persist',
        'Monitor vital signs closely'
      ],
      followUp: 'Emergency medical care required'
    };
  }
  
  if (hasRespiratory && hasSystemic) {
    return {
      diagnosis: 'Possible respiratory infection (cold, flu, or other viral infection)',
      confidence: 0.80,
      severity: 'Moderate',
      urgency: 'Within 24-48 hours',
      recommendations: [
        'Rest and stay hydrated',
        'Monitor temperature regularly',
        'Isolate to prevent spread',
        'Consider contacting healthcare provider'
      ],
      followUp: 'Consult doctor if symptoms worsen or persist beyond 7 days'
    };
  }
  
  if (hasGI) {
    return {
      diagnosis: 'Possible gastrointestinal infection or food poisoning',
      confidence: 0.75,
      severity: 'Moderate',
      urgency: 'Monitor closely',
      recommendations: [
        'Stay hydrated with clear fluids',
        'Follow BRAT diet (bananas, rice, applesauce, toast)',
        'Rest and avoid dairy/fatty foods',
        'Monitor for dehydration'
      ],
      followUp: 'Seek medical care if symptoms persist beyond 48 hours or worsen'
    };
  }
  
  if (hasRespiratory) {
    return {
      diagnosis: 'Possible common cold or upper respiratory infection',
      confidence: 0.70,
      severity: 'Mild to Moderate',
      urgency: 'Self-care with monitoring',
      recommendations: [
        'Get plenty of rest',
        'Drink warm fluids',
        'Use throat lozenges for sore throat',
        'Consider over-the-counter medications for symptom relief'
      ],
      followUp: 'Contact healthcare provider if symptoms worsen or persist beyond 10 days'
    };
  }
  
  // Default for unclear symptoms
  return {
    diagnosis: 'Symptoms require further evaluation',
    confidence: 0.60,
    severity: 'Unknown',
    urgency: 'Monitor and consider consultation',
    recommendations: [
      'Monitor symptoms closely',
      'Keep a symptom diary',
      'Stay hydrated and rest',
      'Consider consulting healthcare provider'
    ],
    followUp: 'Seek medical advice for proper diagnosis and treatment'
  };
}