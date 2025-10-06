"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  X, 
  Minimize2, 
  Maximize2,
  Sparkles,
  Heart,
  Droplet,
  Bug,
  AlertTriangle,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  category?: string;
}

interface Suggestion {
  text: string;
  category: string;
  icon: any;
}

const AIChatbot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message in current language
  useEffect(() => {
    const welcomeMessage = {
      id: '1',
      content: getWelcomeMessage(),
      type: 'bot' as const,
      timestamp: new Date(),
      category: 'greeting'
    };
    setMessages([welcomeMessage]);
  }, [i18n.language]);

  const getWelcomeMessage = () => {
    const messages = {
      en: "Hello! I'm your AI Health Assistant. I can help you with questions about water safety, hygiene, disease prevention, and health surveillance. How can I assist you today?",
      hi: "नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। मैं पानी की सुरक्षा, स्वच्छता, रोग रोकथाम, और स्वास्थ्य निगरानी के बारे में प्रश्नों में आपकी सहायता कर सकता हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
      bn: "নমস্কার! আমি আপনার AI স্বাস্থ্য সহায়ক। আমি পানির সুরক্ষা, স্বাস্থ্যবিধি, রোগ প্রতিরোধ এবং স্বাস্থ্য নজরদারি সম্পর্কে প্রশ্নে সাহায্য করতে পারি। আজ আমি আপনাকে কিভাবে সাহায্য করতে পারি?",
      ta: "வணக்கம்! நான் உங்கள் AI சுகாதார உதவியாளர். நீர் பாதுகாப்பு, சுகாதாரம், நோய் தடுப்பு மற்றும் சுகாதார கண்காணிப்பு பற்றிய கேள்விகளில் உதவ முடியும். இன்று நான் உங்களுக்கு எப்படி உதவலாம்?",
      te: "నమస్కారం! నేను మీ AI ఆరోగ్య సహాయకుడిని. నీటి భద్రత, పరిశుభ్రత, వ్యాధి నివారణ మరియు ఆరోగ్య పర్యవేక్షణ గురించిన ప్రశ్నలలో సహాయం చేయగలను. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
      mr: "नमस्कार! मी तुमचा AI आरोग्य सहाय्यक आहे. मी पाण्याची सुरक्षा, स्वच्छता, रोग प्रतिबंध आणि आरोग्य देखरेख याबद्दल प्रश्नांमध्ये मदत करू शकतो. आज मी तुम्हाला कशी मदत करू शकतो?",
      gu: "નમસ્તે! હું તમારો AI આરોગ્ય સહાયક છું. હું પાણીની સલામતી, સ્વચ્છતા, રોગ નિવારણ અને આરોગ્ય દેખરેખ વિશેના પ્રશ્નોમાં મદદ કરી શકું છું. આજે હું તમને કેવી રીતે મદદ કરી શકું?",
      kn: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಆರೋಗ್ಯ ಸಹಾಯಕ. ನೀರಿನ ಸುರಕ್ಷತೆ, ಸ್ವಚ್ಛತೆ, ರೋಗ ನಿವಾರಣೆ ಮತ್ತು ಆರೋಗ್ಯ ಮೇಲ್ವಿಚಾರಣೆ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ?",
      ml: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI ആരോഗ്യ സഹായകൻ. വെള്ളത്തിന്റെ സുരക്ഷ, ശുചിത്വം, രോഗനിവാരണം, ആരോഗ്യ നിരീക്ഷണം എന്നിവയെക്കുറിച്ചുള്ള ചോദ്യങ്ങളിൽ സഹായിക്കാൻ കഴിയും. ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",
      pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਸਿਹਤ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਪਾਣੀ ਦੀ ਸੁਰੱਖਿਆ, ਸਫਾਈ, ਬਿਮਾਰੀ ਦੀ ਰੋਕਥਾਮ ਅਤੇ ਸਿਹਤ ਨਿਗਰਾਨੀ ਬਾਰੇ ਸਵਾਲਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
      or: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର AI ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ। ମୁଁ ପାଣି ସୁରକ୍ଷା, ସ୍ୱଚ୍ଛତା, ରୋଗ ନିବାରଣ ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ତଦାରଖ ବିଷୟରେ ପ୍ରଶ୍ନରେ ସାହାଯ୍ୟ କରିପାରିବି। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
      as: "নমস্কাৰ! মই আপোনাৰ AI স্বাস্থ্য সহায়ক। মই পানীৰ সুৰক্ষা, স্বাস্থ্যবিধি, ৰোগ প্ৰতিৰোধ আৰু স্বাস্থ্য নিৰীক্ষণৰ বিষয়ে প্ৰশ্নত সহায় কৰিব পাৰো। আজি মই আপোনাক কেনেকৈ সহায় কৰিব পাৰো?",
      ur: "السلام علیکم! میں آپ کا AI صحت کا مددگار ہوں۔ میں پانی کی حفاظت، صفائی، بیماری کی روک تھام اور صحت کی نگرانی کے بارے میں سوالات میں مدد کر سکتا ہوں۔ آج میں آپ کی کیسے مدد کر سکتا ہوں؟",
      gom: "नमस्कार! हांव तुमचो AI आरोग्य मदतनीस। हांव उदकाची सुरक्षा, स्वच्छता, रोगप्रतिबंध आनी आरोग्य देखरेख विशींच्या प्रस्नांत मदत करूं येतां। आयज हांव तुमकां कसो आदार करूं येतां?",
      ne: "नमस्ते! म तपाईंको AI स्वास्थ्य सहायक हुँ। म पानीको सुरक्षा, सरसफाइ, रोग रोकथाम र स्वास्थ्य निगरानीका बारेमा प्रश्नहरूमा मद्दत गर्न सक्छु। आज म तपाईंलाई कसरी मद्दत गर्न सक्छु?"
    };
    return messages[i18n.language as keyof typeof messages] || messages.en;
  };

  const getSuggestions = (): Suggestion[] => {
    const suggestions = {
      en: [
        { text: "How to purify water safely?", category: "water", icon: Droplet },
        { text: "Symptoms of waterborne diseases", category: "health", icon: AlertTriangle },
        { text: "Proper hand washing steps", category: "hygiene", icon: Sparkles },
        { text: "Mosquito prevention tips", category: "prevention", icon: Bug },
        { text: "Emergency health contacts", category: "emergency", icon: Heart }
      ],
      hi: [
        { text: "पानी को सुरक्षित रूप से कैसे शुद्ध करें?", category: "water", icon: Droplet },
        { text: "जल जनित रोगों के लक्षण", category: "health", icon: AlertTriangle },
        { text: "हाथ धोने के सही तरीके", category: "hygiene", icon: Sparkles },
        { text: "मच्छर से बचाव के उपाय", category: "prevention", icon: Bug },
        { text: "आपातकालीन स्वास्थ्य संपर्क", category: "emergency", icon: Heart }
      ],
      bn: [
        { text: "কিভাবে নিরাপদে পানি বিশুদ্ধ করবেন?", category: "water", icon: Droplet },
        { text: "পানিবাহিত রোগের লক্ষণ", category: "health", icon: AlertTriangle },
        { text: "সঠিক হাত ধোয়ার নিয়ম", category: "hygiene", icon: Sparkles },
        { text: "মশা প্রতিরোধের টিপস", category: "prevention", icon: Bug },
        { text: "জরুরি স্বাস্থ্য যোগাযোগ", category: "emergency", icon: Heart }
      ],
      ta: [
        { text: "நீரை பாதுகாப்பாக எவ்வாறு சுத்திகரிப்பது?", category: "water", icon: Droplet },
        { text: "நீர்வழி நோய்களின் அறிகுறிகள்", category: "health", icon: AlertTriangle },
        { text: "சரியான கை கழுவும் முறை", category: "hygiene", icon: Sparkles },
        { text: "கொசு தடுப்பு வழிகள்", category: "prevention", icon: Bug },
        { text: "அவசர சுகாதார தொடர்புகள்", category: "emergency", icon: Heart }
      ],
      te: [
        { text: "నీటిని సురక్షితంగా ఎలా శుద్ధి చేయాలి?", category: "water", icon: Droplet },
        { text: "నీటి ద్వారా వ్యాపించే వ్యాధుల లక్షణాలు", category: "health", icon: AlertTriangle },
        { text: "చేతులు కడుక్కోవడం యొక్క సరైన దశలు", category: "hygiene", icon: Sparkles },
        { text: "దోమల నివారణ చిట్కాలు", category: "prevention", icon: Bug },
        { text: "అత్యవసర ఆరోగ్య పరిచయాలు", category: "emergency", icon: Heart }
      ],
      mr: [
        { text: "पाणी सुरक्षितपणे कसे शुद्ध करावे?", category: "water", icon: Droplet },
        { text: "जलजन्य रोगांची लक्षणे", category: "health", icon: AlertTriangle },
        { text: "हात धुण्याच्या योग्य पायऱ्या", category: "hygiene", icon: Sparkles },
        { text: "डास टाळण्याच्या टिप्स", category: "prevention", icon: Bug },
        { text: "आपत्कालीन आरोग्य संपर्क", category: "emergency", icon: Heart }
      ]
    };
    return suggestions[i18n.language as keyof typeof suggestions] || suggestions.en;
  };

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', loadVoices, { once: true });
      }
    };
    loadVoices();
  }, []);

  // Enhanced text-to-speech function with better language support and text cleaning
  const speakText = (text: string) => {
    if (!voiceEnabled || !text || !('speechSynthesis' in window)) {
      console.log('🔇 Speech disabled or not supported');
      return;
    }

    try {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      // Clean text for better speech synthesis
      const cleanText = text
        .replace(/[#*_~`]/g, '') // Remove markdown formatting
        .replace(/🚰|🧼|🏥|💡|🚨|⚠️|🔬|🌡️|💊|🚑|📞|📱|✅|❌|🎉|🌟|⭐|🔥|💪|🛡️|📊|📈|📋|📌/g, '') // Remove emojis
        .replace(/\n•/g, '. ') // Replace bullet points with periods
        .replace(/\n\d+\./g, '. ') // Replace numbered lists with periods
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
        .replace(/__(.*?)__/g, '$1') // Remove underline markdown
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
        .replace(/\n+/g, '. ') // Replace multiple newlines with periods
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\.{2,}/g, '.') // Replace multiple periods with single period
        .trim();

      if (!cleanText) return;
      
      // Enhanced voice loading with retry mechanism
      const speakWithVoice = () => {
        const voices = speechSynthesis.getVoices();
        console.log(`🎵 Available voices: ${voices.length}, Current language: ${i18n.language}`);
        
        // If no voices are available yet, wait and retry
        if (voices.length === 0) {
          console.log('⏳ Waiting for voices to load...');
          setTimeout(() => {
            if (speechSynthesis.getVoices().length > 0) {
              speakWithVoice();
            } else {
              console.log('⚠️ No voices available after retry');
            }
          }, 100);
          return;
        }
        
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        // Enhanced language mapping for better voice selection
        const languageMap: { [key: string]: string[] } = {
          'hi': ['hi-IN', 'hi', 'en-IN'],
          'bn': ['bn-IN', 'bn-BD', 'bn', 'en-IN'],
          'ta': ['ta-IN', 'ta', 'en-IN'],
          'te': ['te-IN', 'te', 'en-IN'],
          'mr': ['mr-IN', 'mr', 'en-IN'],
          'gu': ['gu-IN', 'gu', 'en-IN'],
          'kn': ['kn-IN', 'kn', 'en-IN'],
          'ml': ['ml-IN', 'ml', 'en-IN'],
          'pa': ['pa-IN', 'pa-Guru-IN', 'pa', 'en-IN'],
          'or': ['or-IN', 'or', 'en-IN'],
          'as': ['as-IN', 'as', 'en-IN'],
          'ur': ['ur-IN', 'ur-PK', 'ur', 'en-IN'],
          'gom': ['hi-IN', 'mr-IN', 'en-IN'], // Konkani fallback to Hindi/Marathi
          'ne': ['ne-NP', 'ne', 'hi-IN', 'en-IN'],
          'en': ['en-IN', 'en-US', 'en-GB', 'en-AU', 'en']
        };

        const currentLang = i18n.language;
        const preferredLangs = languageMap[currentLang] || ['en-US', 'en'];
        
        let selectedVoice = null;
        
        // Primary search: exact language match
        for (const lang of preferredLangs) {
          selectedVoice = voices.find(v => 
            v.lang === lang || 
            v.lang.startsWith(lang + '-') ||
            v.name.toLowerCase().includes(lang.toLowerCase())
          );
          if (selectedVoice) break;
        }
        
        // Secondary search: partial match for Indian languages
        if (!selectedVoice && currentLang !== 'en') {
          selectedVoice = voices.find(v => 
            v.lang.includes('IN') || 
            v.name.toLowerCase().includes('indian') ||
            v.name.toLowerCase().includes('india')
          );
        }
        
        // Tertiary search: any English voice as fallback
        if (!selectedVoice) {
          selectedVoice = voices.find(v => v.lang.startsWith('en'));
        }
        
        // Final fallback: first available voice
        if (!selectedVoice && voices.length > 0) {
          selectedVoice = voices[0];
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
          console.log(`🎵 Speaking with: ${selectedVoice.name} (${selectedVoice.lang}) for ${currentLang}`);
        } else {
          console.log('⚠️ No voice found, using system default');
        }

        // Optimize speech parameters based on language
        if (['hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur', 'ne', 'gom'].includes(currentLang)) {
          utterance.rate = 0.7; // Slower for Indian languages
          utterance.pitch = 0.9;
        } else {
          utterance.rate = 0.85; // Normal speed for English
          utterance.pitch = 1.0;
        }
        
        utterance.volume = 1.0; // Maximum volume for clarity

        // Enhanced event handlers
        utterance.onstart = () => {
          console.log('🎙️ Speech synthesis started');
        };
        
        utterance.onend = () => {
          console.log('✅ Speech synthesis completed');
        };
        
        utterance.onerror = (event) => {
          console.error('❌ Speech synthesis error:', event.error);
          // Try again with default voice if there was an error
          if (event.error === 'voice-unavailable' || event.error === 'synthesis-unavailable') {
            setTimeout(() => {
              const fallbackUtterance = new SpeechSynthesisUtterance(cleanText);
              fallbackUtterance.rate = 0.8;
              fallbackUtterance.volume = 1.0;
              speechSynthesis.speak(fallbackUtterance);
            }, 1000);
          }
        };
        
        utterance.onpause = () => console.log('⏸️ Speech paused');
        utterance.onresume = () => console.log('▶️ Speech resumed');

        speechSynthesis.speak(utterance);
      };

      // Ensure voices are loaded before speaking
      const voices = speechSynthesis.getVoices();
      if (voices.length === 0) {
        console.log('Loading voices...');
        speechSynthesis.addEventListener('voiceschanged', speakWithVoice, { once: true });
        // Force voice loading for some browsers
        speechSynthesis.getVoices();
      } else {
        speakWithVoice();
      }
    } catch (error) {
      console.error('Speech synthesis initialization error:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processUserMessage = async (message: string): Promise<string> => {
    // Simulate AI processing with NLP-based responses
    const lowercaseMessage = message.toLowerCase();
    
    // Health-related responses
    if (lowercaseMessage.includes('water') || lowercaseMessage.includes('drinking') || lowercaseMessage.includes('purify')) {
      return `🚰 **Water Safety Guidelines:**

• **Boiling**: Boil water for at least 20 minutes before drinking
• **Storage**: Use clean, covered containers
• **Quality Check**: Check color, smell, and taste
• **Purification**: Use water purification tablets if boiling isn't possible
• **Container Care**: Clean water storage containers regularly

Remember: Clean water is your first line of defense against waterborne diseases!`;
    }

    if (lowercaseMessage.includes('hand') || lowercaseMessage.includes('wash') || lowercaseMessage.includes('hygiene')) {
      return `🧼 **Proper Hand Washing Steps:**

1. **Wet** hands with clean water
2. **Apply soap** and lather well
3. **Scrub** for at least 20 seconds (all surfaces)
4. **Rinse** thoroughly with clean water
5. **Dry** with a clean towel or air dry

**When to wash**: Before eating, after using toilet, after coughing/sneezing, after touching surfaces.`;
    }

    if (lowercaseMessage.includes('symptom') || lowercaseMessage.includes('fever') || lowercaseMessage.includes('diarrhea') || lowercaseMessage.includes('sick')) {
      return `🏥 **Common Waterborne Disease Symptoms:**

**Immediate attention needed if you have:**
• Persistent diarrhea or vomiting
• High fever (above 101°F/38.3°C)
• Severe dehydration
• Blood in stool
• Severe abdominal pain

**Prevention is key**: Clean water, proper sanitation, and good hygiene practices.

**Emergency**: Call 108 for ambulance or 104 for health helpline.`;
    }

    if (lowercaseMessage.includes('mosquito') || lowercaseMessage.includes('malaria') || lowercaseMessage.includes('dengue')) {
      return `🦟 **Mosquito Control & Prevention:**

**Eliminate breeding sites:**
• Remove standing water (pots, containers, etc.)
• Clean gutters and drains
• Cover water storage tanks

**Personal protection:**
• Use mosquito nets while sleeping
• Wear long sleeves during dawn/dusk
• Use repellents containing DEET

**Community action:** Report breeding sites to local health authorities.`;
    }

    if (lowercaseMessage.includes('emergency') || lowercaseMessage.includes('contact') || lowercaseMessage.includes('help')) {
      return `🚨 **Emergency Contacts:**

• **Health Helpline**: 104
• **Ambulance**: 108
• **Water Quality Issues**: 1800-XXX-XXXX
• **Local Health Center**: Contact your nearest PHC

**When to call**: Severe symptoms, outbreak suspicions, water contamination, or any health emergency.`;
    }

    if (lowercaseMessage.includes('prevention') || lowercaseMessage.includes('disease') || lowercaseMessage.includes('protect')) {
      return `🛡️ **Disease Prevention Guidelines:**

**Water & Food:**
• Drink only boiled or purified water
• Eat freshly cooked food
• Avoid raw vegetables and street food

**Sanitation:**
• Use toilets, avoid open defecation
• Keep surroundings clean
• Proper garbage disposal

**Personal Hygiene:**
• Regular hand washing
• Personal cleanliness
• Clean clothes and bedding`;
    }

    if (lowercaseMessage.includes('ai') || lowercaseMessage.includes('predict') || lowercaseMessage.includes('analysis')) {
      return `🤖 **AI Health Features:**

Our AI system can help with:
• **Symptom Analysis**: Analyze health symptoms using AI
• **Outbreak Prediction**: Predict disease outbreaks
• **Water Quality Analysis**: Real-time water quality assessment
• **Health Forecasting**: Predict health trends
• **Risk Assessment**: Evaluate health risks in your area

Visit the AI Features section to access these tools!`;
    }

    // Default response with general health advice
    return `🏥 **General Health Guidance:**

I'm here to help with health, water safety, and disease prevention questions. You can ask me about:

• Water purification and safety
• Disease symptoms and prevention
• Hygiene practices
• Mosquito control
• Emergency contacts
• AI health features

Could you please be more specific about what health information you need?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToProcess = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Try to use backend AI service
      const response = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToProcess })
      });

      let botResponse;
      if (response.ok) {
        const data = await response.json();
        botResponse = data.response;
      } else {
        // Fallback to local processing
        botResponse = await processUserMessage(messageToProcess);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        type: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Speak bot response if voice is enabled
      if (voiceEnabled) {
        setTimeout(() => speakText(botResponse), 500);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Fallback to local processing
      const botResponse = await processUserMessage(messageToProcess);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        type: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Speak bot response if voice is enabled
      if (voiceEnabled) {
        setTimeout(() => speakText(botResponse), 500);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/• (.*?)(\n|$)/g, '• $1<br/>')
      .replace(/(\d+\. )(.*?)(\n|$)/g, '$1$2<br/>')
      .split('\n').join('<br/>');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      <Card className="h-full flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
        <CardHeader className="pb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-sm">{t('chatbot')}</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newState = !voiceEnabled;
                  setVoiceEnabled(newState);
                  console.log(`🎵 Voice ${newState ? 'enabled' : 'disabled'} for language: ${i18n.language}`);
                  
                  // Test voice when enabling
                  if (newState && 'speechSynthesis' in window) {
                    const testText = i18n.language === 'hi' ? 'आवाज़ सक्रिय है' : 
                                   i18n.language === 'bn' ? 'ভয়েস সক্রিয়' :
                                   i18n.language === 'ta' ? 'குரல் செயலில்' :
                                   'Voice enabled';
                    setTimeout(() => speakText(testText), 200);
                  }
                }}
                className={`w-8 h-8 p-0 hover:bg-white/20 transition-colors ${voiceEnabled ? 'text-green-200 animate-pulse' : 'text-white/60'}`}
                title={voiceEnabled ? `Voice enabled (${i18n.language})` : 'Click to enable voice'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 text-blue-500" />}
                          {message.type === 'user' && <User className="w-4 h-4 mt-1" />}
                          <div 
                            className="text-sm"
                            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-blue-500" />
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestions */}
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-1">
                    {getSuggestions().slice(0, 3).map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className="text-xs flex items-center gap-1"
                        >
                          <Icon className="w-3 h-3" />
                          {suggestion.text.split(' ').slice(0, 2).join(' ')}...
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={t('askQuestion')}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default AIChatbot;