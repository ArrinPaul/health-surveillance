const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not found. AI features will be disabled.');
      this.genAI = null;
      this.model = null;
    } else {
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
  }

  async summarizeHealthReport(reportData) {
    if (!this.model) {
      return 'AI summarization not available. Please configure GEMINI_API_KEY.';
    }

    try {
      const prompt = `
      As a health expert, summarize this health report for health officials:
      
      Symptoms: ${reportData.symptoms}
      Location: ${reportData.location}
      Demographics: Age: ${reportData.age}, Gender: ${reportData.gender}
      Severity: ${reportData.severity}
      Duration: ${reportData.duration}
      
      Provide:
      1. A concise summary
      2. Risk assessment (Low/Medium/High)
      3. Recommended actions
      4. Potential waterborne disease indicators
      
      Keep the response under 200 words and actionable.
      `;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini summarization error:', error);
      return 'Error generating AI summary. Please check your Gemini API key.';
    }
  }

  async generateHealthAlert(riskData) {
    if (!this.model) {
      return 'AI alert generation not available. Please configure GEMINI_API_KEY.';
    }

    try {
      const prompt = `
      Generate a health alert message for community members based on:
      
      Risk Level: ${riskData.riskLevel}
      Location: ${riskData.location}
      Health Issues: ${riskData.issues}
      Water Quality: ${riskData.waterQuality}
      Weather Conditions: ${riskData.weather}
      
      Create a clear, urgent but not panic-inducing alert that includes:
      1. What's happening
      2. Who's affected
      3. What actions to take
      4. When to seek help
      
      Use simple language suitable for rural communities. Max 150 words.
      `;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini alert generation error:', error);
      return 'Error generating AI alert. Please check your Gemini API key.';
    }
  }

  async answerHealthQuery(question, context = '') {
    if (!this.model) {
      return 'AI health assistance not available. Please configure GEMINI_API_KEY.';
    }

    try {
      const prompt = `
      You are a health assistant for a rural health surveillance system. Answer this question:
      
      Question: ${question}
      Context: ${context}
      
      Focus on:
      - Waterborne diseases prevention
      - Hygiene practices
      - When to seek medical help
      - Simple, actionable advice
      
      Keep the answer under 200 words, use simple language, and be practical for rural communities.
      `;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini health query error:', error);
      return 'Error processing your question. Please check your Gemini API key.';
    }
  }

  async analyzeSymptoms(symptoms) {
    if (!this.model) {
      return 'AI symptom analysis not available. Please configure GEMINI_API_KEY.';
    }

    try {
      const prompt = `
      Analyze these reported symptoms for potential waterborne diseases:
      
      Symptoms: ${symptoms.join(', ')}
      
      Provide:
      1. Possible waterborne diseases
      2. Urgency level (Low/Medium/High/Critical)
      3. Immediate recommendations
      4. When to seek medical attention
      
      Be specific about waterborne diseases like cholera, typhoid, hepatitis A, dysentery, etc.
      `;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini symptom analysis error:', error);
      return 'Error analyzing symptoms. Please check your Gemini API key.';
    }
  }

  async analyzeHealthData(healthData) {
    if (!this.model) {
      return 'AI health data analysis not available. Please configure GEMINI_API_KEY.';
    }

    try {
      const prompt = `
      As a health expert, analyze this health data and provide insights:
      
      Data: ${JSON.stringify(healthData)}
      
      Provide:
      1. Health status assessment
      2. Risk factors identified
      3. Recommendations for improvement
      4. Early warning indicators
      5. Preventive measures
      
      Focus on water quality impacts, disease prevention, and community health patterns.
      Keep the response under 300 words and actionable.
      `;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini health data analysis error:', error);
      return 'Error analyzing health data. Please check your Gemini API key.';
    }
  }

  async analyzeWaterQuality(waterData) {
    if (!this.model) {
      return 'AI water quality analysis not available. Please configure GEMINI_API_KEY.';
    }

    try {
      const prompt = `
      As a water quality expert, analyze this water quality data:
      
      pH: ${waterData.pH}
      Turbidity: ${waterData.turbidity}
      Temperature: ${waterData.temperature || 'N/A'}
      Contaminants: ${waterData.contaminants || 'N/A'}
      
      Provide:
      1. Water safety assessment
      2. Risk level (Low/Medium/High/Critical)
      3. Specific health concerns
      4. Treatment recommendations
      5. Safety measures
      
      Focus on immediate health risks and actionable steps.
      `;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini water quality analysis error:', error);
      return 'Error analyzing water quality. Please check your Gemini API key.';
    }
  }
}

module.exports = new GeminiService();