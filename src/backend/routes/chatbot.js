const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * @swagger
 * /chatbot/message:
 *   post:
 *     summary: Send message to AI chatbot
 *     tags: [Chatbot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: User message to the chatbot
 *               context:
 *                 type: object
 *                 description: Optional context for the conversation
 *     responses:
 *       200:
 *         description: AI response generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                 category:
 *                   type: string
 *                 confidence:
 *                   type: number
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post('/message', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Enhanced system prompt for health-focused responses
    const systemPrompt = `You are an AI Health Assistant for a water and health surveillance system. You specialize in:
    - Water safety and purification
    - Waterborne disease prevention
    - Hygiene practices
    - Emergency health guidance
    - Community health surveillance

    Guidelines:
    - Provide accurate, helpful health information
    - Always recommend seeking medical attention for serious symptoms
    - Use clear, simple language accessible to all education levels
    - Include emergency contacts when appropriate (108 for ambulance, 104 for health helpline)
    - Format responses with bullet points and clear sections when possible
    - Be empathetic and supportive
    - Never provide specific medical diagnoses - always recommend professional consultation

    Current message context: ${context ? JSON.stringify(context) : 'None'}
    
    User message: ${message}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(systemPrompt);
    const response = result.response;
    const botResponse = response.text();

    // Categorize the response for better UX
    const category = categorizeMessage(message);
    
    // Generate confidence score based on keyword matching
    const confidence = calculateConfidence(message, botResponse);

    // Generate follow-up suggestions
    const suggestions = generateSuggestions(category, message);

    res.json({
      response: botResponse,
      category,
      confidence,
      suggestions
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    
    // Fallback response if AI is unavailable
    const fallbackResponse = generateFallbackResponse(req.body.message);
    
    res.json({
      response: fallbackResponse,
      category: 'fallback',
      confidence: 0.7,
      suggestions: ['Contact health helpline: 104', 'Visit nearest health center', 'Check water quality']
    });
  }
});

/**
 * @swagger
 * /chatbot/suggestions:
 *   get:
 *     summary: Get contextual suggestions for the chatbot
 *     tags: [Chatbot]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category for suggestions (water, health, hygiene, emergency)
 *     responses:
 *       200:
 *         description: Suggestions retrieved successfully
 */
router.get('/suggestions', (req, res) => {
  const { category } = req.query;
  
  const suggestions = {
    water: [
      "How to purify water safely?",
      "What are signs of contaminated water?",
      "Best water storage practices",
      "Water quality testing methods"
    ],
    health: [
      "Symptoms of waterborne diseases",
      "When to seek medical help?",
      "Preventing dehydration",
      "Community health surveillance"
    ],
    hygiene: [
      "Proper hand washing steps",
      "Food safety guidelines",
      "Personal hygiene best practices",
      "Sanitation in communities"
    ],
    emergency: [
      "Emergency health contacts",
      "First aid for water poisoning",
      "Outbreak response procedures",
      "Evacuation health guidelines"
    ]
  };

  const allSuggestions = [
    ...suggestions.water,
    ...suggestions.health,
    ...suggestions.hygiene,
    ...suggestions.emergency
  ];

  res.json({
    suggestions: category ? suggestions[category] || [] : allSuggestions.slice(0, 10)
  });
});

// Helper functions
function categorizeMessage(message) {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('water') || lowercaseMessage.includes('drink') || lowercaseMessage.includes('purify')) {
    return 'water';
  }
  if (lowercaseMessage.includes('symptom') || lowercaseMessage.includes('fever') || lowercaseMessage.includes('sick')) {
    return 'health';
  }
  if (lowercaseMessage.includes('wash') || lowercaseMessage.includes('clean') || lowercaseMessage.includes('hygiene')) {
    return 'hygiene';
  }
  if (lowercaseMessage.includes('emergency') || lowercaseMessage.includes('urgent') || lowercaseMessage.includes('help')) {
    return 'emergency';
  }
  
  return 'general';
}

function calculateConfidence(message, response) {
  // Simple confidence calculation based on response length and keyword matching
  const keywords = ['water', 'health', 'hygiene', 'disease', 'symptom', 'clean', 'safe'];
  const messageWords = message.toLowerCase().split(' ');
  const matchedKeywords = messageWords.filter(word => keywords.includes(word));
  
  const keywordScore = Math.min(matchedKeywords.length / 3, 1);
  const lengthScore = Math.min(response.length / 500, 1);
  
  return Math.round((keywordScore * 0.6 + lengthScore * 0.4) * 100) / 100;
}

function generateSuggestions(category, message) {
  const suggestionMap = {
    water: [
      'Learn about water testing',
      'Find water purification methods',
      'Check local water quality reports'
    ],
    health: [
      'Contact health helpline: 104',
      'Find nearest health center',
      'Learn about disease prevention'
    ],
    hygiene: [
      'Watch hand washing tutorial',
      'Read hygiene guidelines',
      'Access community health tips'
    ],
    emergency: [
      'Call emergency services: 108',
      'Find emergency contacts',
      'Access first aid guide'
    ],
    general: [
      'Explore health education',
      'Check AI health features',
      'Contact health support'
    ]
  };

  return suggestionMap[category] || suggestionMap.general;
}

function generateFallbackResponse(message) {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('water')) {
    return `🚰 For water safety information:
    
• Boil water for at least 20 minutes before drinking
• Store in clean, covered containers  
• Check color, smell, and taste before use
• Use purification tablets if needed

For specific water quality concerns, contact your local health department or call the water quality helpline.`;
  }

  if (lowercaseMessage.includes('health') || lowercaseMessage.includes('sick')) {
    return `🏥 For health concerns:

• Seek immediate medical attention for serious symptoms
• Call health helpline: 104
• Call ambulance for emergencies: 108
• Visit your nearest Primary Health Center

Remember: Early medical consultation is always better for any health concerns.`;
  }

  return `🤖 I'm your AI Health Assistant. I can help you with:

• Water safety and purification
• Disease prevention and symptoms  
• Hygiene practices
• Emergency health guidance
• Community health information

Please ask me specific questions about health, water safety, or hygiene, and I'll provide detailed guidance.

For emergencies, always call 108 (ambulance) or 104 (health helpline).`;
}

module.exports = router;