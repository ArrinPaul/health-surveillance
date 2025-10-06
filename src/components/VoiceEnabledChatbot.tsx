"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/lib/simple-i18n';
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
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  Pause,
  Play
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
  category?: string;
  language?: string;
}

interface Suggestion {
  text: string;
  category: string;
  icon: any;
}

interface VoiceConfig {
  lang: string;
  name: string;
  rate: number;
  pitch: number;
}

const VoiceEnabledChatbot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice features state
  const [isListening, setIsListening] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Voice configuration for different languages
  const voiceConfigs: { [key: string]: VoiceConfig } = {
    en: { lang: 'en-US', name: 'en-US-Standard-J', rate: 1.0, pitch: 1.0 },
    hi: { lang: 'hi-IN', name: 'hi-IN-Standard-A', rate: 0.9, pitch: 1.1 },
    bn: { lang: 'bn-IN', name: 'bn-IN-Standard-A', rate: 0.9, pitch: 1.0 },
    es: { lang: 'es-ES', name: 'es-ES-Standard-A', rate: 1.0, pitch: 1.0 },
    fr: { lang: 'fr-FR', name: 'fr-FR-Standard-A', rate: 1.0, pitch: 1.0 },
    ar: { lang: 'ar-SA', name: 'ar-XA-Standard-A', rate: 0.9, pitch: 1.0 },
    zh: { lang: 'zh-CN', name: 'zh-CN-Standard-A', rate: 1.0, pitch: 1.0 },
  };

  const suggestions: Suggestion[] = [
    { text: t('waterPurificationQuestion'), category: "water", icon: Droplet },
    { text: t('diseaseSymptoms'), category: "health", icon: AlertTriangle },
    { text: t('handWashingSteps'), category: "hygiene", icon: Sparkles },
    { text: t('emergencyContacts'), category: "emergency", icon: Heart },
    { text: t('mosquitoPrevention'), category: "prevention", icon: Bug }
  ];

  // Initialize voice features
  useEffect(() => {
    initializeVoiceFeatures();
    
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      content: t('chatbotWelcome'),
      type: 'bot',
      timestamp: new Date(),
      category: 'greeting',
      language: i18n.language
    };
    setMessages([welcomeMessage]);
  }, [i18n.language, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update voice when language changes
  useEffect(() => {
    if (speechSynthesis && availableVoices.length > 0) {
      updateVoiceForLanguage();
    }
  }, [i18n.language, availableVoices]);

  const initializeVoiceFeatures = () => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = voiceConfigs[i18n.language]?.lang || 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
      };
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
      
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      };
      
      loadVoices();
      if (speechSynthesis?.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  };

  const updateVoiceForLanguage = () => {
    const currentLang = i18n.language;
    const voiceConfig = voiceConfigs[currentLang];
    
    if (voiceConfig) {
      // Find the best matching voice for current language
      const voice = availableVoices.find(v => 
        v.lang.startsWith(currentLang) || v.lang.startsWith(voiceConfig.lang.split('-')[0])
      ) || availableVoices.find(v => v.lang.startsWith('en'));
      
      setSelectedVoice(voice || null);
      
      // Update recognition language
      if (recognition) {
        recognition.lang = voiceConfig.lang;
      }
    }
  };

  const startVoiceRecognition = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const stopVoiceRecognition = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const speakText = async (text: string, language?: string) => {
    if (!isVoiceEnabled || !speechSynthesis || !selectedVoice) return;

    // Stop any current speech
    speechSynthesis.cancel();
    
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      const langConfig = voiceConfigs[language || i18n.language];
      
      utterance.voice = selectedVoice;
      utterance.rate = langConfig?.rate || 1.0;
      utterance.pitch = langConfig?.pitch || 1.0;
      utterance.volume = 0.8;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error in speech synthesis:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const processUserMessage = async (message: string): Promise<string> => {
    const lowercaseMessage = message.toLowerCase();
    const currentLang = i18n.language;
    
    // Generate response based on language and context
    if (lowercaseMessage.includes('water') || lowercaseMessage.includes(t('water').toLowerCase())) {
      return t('waterSafetyResponse');
    }

    if (lowercaseMessage.includes('hand') || lowercaseMessage.includes(t('hygiene').toLowerCase())) {
      return t('handHygieneResponse');
    }

    if (lowercaseMessage.includes('symptom') || lowercaseMessage.includes(t('symptoms').toLowerCase())) {
      return t('symptomResponse');
    }

    if (lowercaseMessage.includes('emergency') || lowercaseMessage.includes(t('emergency').toLowerCase())) {
      return t('emergencyResponse');
    }

    return t('defaultChatbotResponse');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      type: 'user',
      timestamp: new Date(),
      language: i18n.language
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToProcess = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Try backend API first, then fallback to local processing
      let botResponse;
      try {
        const response = await fetch('/api/chatbot/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: messageToProcess,
            language: i18n.language
          })
        });

        if (response.ok) {
          const data = await response.json();
          botResponse = data.response;
        } else {
          botResponse = await processUserMessage(messageToProcess);
        }
      } catch (error) {
        botResponse = await processUserMessage(messageToProcess);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        type: 'bot',
        timestamp: new Date(),
        language: i18n.language
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Speak the response if voice is enabled
      if (isVoiceEnabled && botResponse) {
        await speakText(botResponse, i18n.language);
      }
      
    } catch (error) {
      console.error('Chatbot error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (isSpeaking) {
      stopSpeaking();
    }
  };

  const formatMessage = (content: string) => {
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
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <Card className="h-full flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-lg">
        <CardHeader className="pb-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-sm">{t('aiHealthAssistant')}</CardTitle>
              <div className="flex items-center gap-1 ml-2">
                <Languages className="w-4 h-4" />
                <span className="text-xs">{i18n.language.toUpperCase()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoice}
                className="w-8 h-8 p-0 text-white hover:bg-white/20"
                title={isVoiceEnabled ? t('disableVoice') : t('enableVoice')}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
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
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
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
                          {message.type === 'bot' && (
                            <div className="flex items-center gap-1">
                              <Bot className="w-4 h-4 text-blue-500" />
                              {message.type === 'bot' && isVoiceEnabled && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => speakText(message.content, message.language)}
                                  className="w-6 h-6 p-0 hover:bg-blue-100"
                                  title={t('speakMessage')}
                                >
                                  <Volume2 className="w-3 h-3 text-blue-500" />
                                </Button>
                              )}
                            </div>
                          )}
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

                {/* Voice Status */}
                {(isListening || isSpeaking) && (
                  <div className="px-4 py-2 bg-blue-50 border-t">
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      {isListening && (
                        <>
                          <Mic className="w-4 h-4 animate-pulse" />
                          <span>{t('listening')}...</span>
                        </>
                      )}
                      {isSpeaking && (
                        <>
                          <Volume2 className="w-4 h-4 animate-pulse" />
                          <span>{t('speaking')}...</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={stopSpeaking}
                            className="ml-auto w-6 h-6 p-0"
                          >
                            <Pause className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Quick Suggestions */}
                <div className="px-4 pb-2">
                  <div className="flex flex-wrap gap-1">
                    {suggestions.slice(0, 3).map((suggestion, index) => {
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
                    <div className="flex-1 flex gap-1">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={t('askHealthQuestion')}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      {isVoiceEnabled && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                          className={`w-10 ${isListening ? 'bg-red-100 border-red-300' : ''}`}
                          disabled={!recognition}
                          title={isListening ? t('stopListening') : t('startListening')}
                        >
                          {isListening ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
                        </Button>
                      )}
                    </div>
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

export default VoiceEnabledChatbot;