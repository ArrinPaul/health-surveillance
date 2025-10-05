"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Languages, 
  Volume2, 
  VolumeX, 
  Mic,
  MicOff,
  Globe,
  Settings,
  Check,
  Play,
  Download,
  RefreshCw
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
  status: 'supported' | 'beta' | 'coming-soon';
}

interface VoiceSettings {
  enabled: boolean;
  rate: number;
  pitch: number;
  volume: number;
  autoSpeak: boolean;
  preferredVoice: string;
}

const LanguageSettingsPage: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    rate: 1.0,
    pitch: 1.0,
    volume: 0.8,
    autoSpeak: false,
    preferredVoice: ''
  });
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isTestingVoice, setIsTestingVoice] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});

  const supportedLanguages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      region: 'United States',
      status: 'supported'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      flag: '🇮🇳',
      region: 'India',
      status: 'supported'
    },
    {
      code: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      flag: '🇧🇩',
      region: 'Bangladesh',
      status: 'supported'
    },
    {
      code: 'as',
      name: 'Assamese',
      nativeName: 'অসমীয়া',
      flag: '🇮🇳',
      region: 'Assam, India',
      status: 'beta'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      region: 'Spain',
      status: 'supported'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      region: 'France',
      status: 'supported'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      region: 'Saudi Arabia',
      status: 'beta'
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      region: 'China',
      status: 'beta'
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
      region: 'Portugal',
      status: 'coming-soon'
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      region: 'Germany',
      status: 'coming-soon'
    }
  ];

  useEffect(() => {
    loadSettings();
    loadAvailableVoices();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [voiceSettings]);

  const loadSettings = () => {
    const savedVoiceSettings = localStorage.getItem('voiceSettings');
    if (savedVoiceSettings) {
      try {
        setVoiceSettings(JSON.parse(savedVoiceSettings));
      } catch (error) {
        console.error('Error loading voice settings:', error);
      }
    }
  };

  const saveSettings = () => {
    localStorage.setItem('voiceSettings', JSON.stringify(voiceSettings));
  };

  const loadAvailableVoices = () => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Set default voice if not set
        if (!voiceSettings.preferredVoice && voices.length > 0) {
          const defaultVoice = voices.find(v => v.lang.startsWith(i18n.language)) || voices[0];
          setVoiceSettings(prev => ({ ...prev, preferredVoice: defaultVoice.name }));
        }
      };
      
      loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  };

  const changeLanguage = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      localStorage.setItem('preferredLanguage', languageCode);
      
      // Update preferred voice for new language
      const languageVoices = availableVoices.filter(voice => 
        voice.lang.startsWith(languageCode)
      );
      if (languageVoices.length > 0) {
        setVoiceSettings(prev => ({ 
          ...prev, 
          preferredVoice: languageVoices[0].name 
        }));
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const testVoice = async () => {
    if (!voiceSettings.enabled || isTestingVoice) return;
    
    setIsTestingVoice(true);
    
    try {
      const text = t('voiceTestMessage') || 'This is a voice test for the health surveillance system.';
      const utterance = new SpeechSynthesisUtterance(text);
      
      const selectedVoice = availableVoices.find(v => v.name === voiceSettings.preferredVoice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;
      
      utterance.onend = () => {
        setIsTestingVoice(false);
      };
      
      utterance.onerror = () => {
        setIsTestingVoice(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error testing voice:', error);
      setIsTestingVoice(false);
    }
  };

  const downloadLanguage = (languageCode: string) => {
    setDownloadProgress(prev => ({ ...prev, [languageCode]: 0 }));
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const currentProgress = prev[languageCode] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [languageCode]: 100 };
        }
        return { ...prev, [languageCode]: currentProgress + 10 };
      });
    }, 200);
  };

  const getLanguageVoices = (languageCode: string) => {
    return availableVoices.filter(voice => 
      voice.lang.startsWith(languageCode) || voice.lang.startsWith(languageCode.split('-')[0])
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'supported':
        return <Badge variant="default" className="bg-green-500">Supported</Badge>;
      case 'beta':
        return <Badge variant="secondary" className="bg-yellow-500">Beta</Badge>;
      case 'coming-soon':
        return <Badge variant="outline">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  const currentLanguage = supportedLanguages.find(lang => lang.code === i18n.language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Languages className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t('languageSettings') || 'Language & Voice Settings'}</h1>
            <p className="text-muted-foreground mt-1">
              {t('languageSettingsDescription') || 'Configure your preferred language and voice settings for the health surveillance system.'}
            </p>
          </div>
        </div>

        {/* Current Language */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {t('currentLanguage') || 'Current Language'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">
              <span className="text-2xl">{currentLanguage?.flag}</span>
              <div className="flex-1">
                <div className="font-medium">{currentLanguage?.name}</div>
                <div className="text-sm text-muted-foreground">{currentLanguage?.nativeName}</div>
              </div>
              {getStatusBadge(currentLanguage?.status || 'supported')}
            </div>
          </CardContent>
        </Card>

        {/* Available Languages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5" />
              {t('availableLanguages') || 'Available Languages'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {supportedLanguages.map((language) => {
                const isSelected = language.code === i18n.language;
                const voiceCount = getLanguageVoices(language.code).length;
                const isDownloading = downloadProgress[language.code] !== undefined && downloadProgress[language.code] < 100;
                
                return (
                  <div
                    key={language.code}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{language.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{language.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {language.nativeName} • {language.region}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(language.status)}
                          {voiceCount > 0 && (
                            <Badge variant="outline" className="text-xs">
                              <Volume2 className="w-3 h-3 mr-1" />
                              {voiceCount} voices
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {language.status === 'coming-soon' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadLanguage(language.code)}
                          disabled={isDownloading}
                        >
                          {isDownloading ? (
                            <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                          ) : (
                            <Download className="w-4 h-4 mr-2" />
                          )}
                          {isDownloading ? `${downloadProgress[language.code]}%` : 'Download'}
                        </Button>
                      ) : (
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => changeLanguage(language.code)}
                          disabled={isSelected}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Voice Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              {t('voiceSettings') || 'Voice Settings'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Voice Enable/Disable */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">
                  {t('enableVoice') || 'Enable Voice Features'}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('enableVoiceDescription') || 'Enable text-to-speech and voice input for the chatbot'}
                </p>
              </div>
              <Switch
                checked={voiceSettings.enabled}
                onCheckedChange={(checked) => 
                  setVoiceSettings(prev => ({ ...prev, enabled: checked }))
                }
              />
            </div>

            {voiceSettings.enabled && (
              <>
                {/* Auto-speak */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">
                      {t('autoSpeak') || 'Auto-speak Responses'}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('autoSpeakDescription') || 'Automatically read chatbot responses aloud'}
                    </p>
                  </div>
                  <Switch
                    checked={voiceSettings.autoSpeak}
                    onCheckedChange={(checked) => 
                      setVoiceSettings(prev => ({ ...prev, autoSpeak: checked }))
                    }
                  />
                </div>

                {/* Preferred Voice */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    {t('preferredVoice') || 'Preferred Voice'}
                  </Label>
                  <Select
                    value={voiceSettings.preferredVoice}
                    onValueChange={(value) => 
                      setVoiceSettings(prev => ({ ...prev, preferredVoice: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          <div className="flex items-center gap-2">
                            <span>{voice.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {voice.lang}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Voice Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Speech Rate */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {t('speechRate') || 'Speech Rate'}: {voiceSettings.rate.toFixed(1)}x
                    </Label>
                    <Slider
                      value={[voiceSettings.rate]}
                      onValueChange={(values) => 
                        setVoiceSettings(prev => ({ ...prev, rate: values[0] }))
                      }
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Speech Pitch */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {t('speechPitch') || 'Speech Pitch'}: {voiceSettings.pitch.toFixed(1)}
                    </Label>
                    <Slider
                      value={[voiceSettings.pitch]}
                      onValueChange={(values) => 
                        setVoiceSettings(prev => ({ ...prev, pitch: values[0] }))
                      }
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Volume */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      {t('volume') || 'Volume'}: {Math.round(voiceSettings.volume * 100)}%
                    </Label>
                    <Slider
                      value={[voiceSettings.volume]}
                      onValueChange={(values) => 
                        setVoiceSettings(prev => ({ ...prev, volume: values[0] }))
                      }
                      min={0.1}
                      max={1.0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Test Voice */}
                <div className="flex items-center gap-4 pt-4">
                  <Button
                    onClick={testVoice}
                    disabled={isTestingVoice}
                    className="flex items-center gap-2"
                  >
                    {isTestingVoice ? (
                      <VolumeX className="w-4 h-4 animate-pulse" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {isTestingVoice ? 'Playing...' : (t('testVoice') || 'Test Voice')}
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    {t('testVoiceDescription') || 'Test the current voice settings with a sample message'}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Reset Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              {t('resetSettings') || 'Reset Settings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t('resetSettingsDescription') || 'Reset all language and voice settings to default values'}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setVoiceSettings({
                    enabled: true,
                    rate: 1.0,
                    pitch: 1.0,
                    volume: 0.8,
                    autoSpeak: false,
                    preferredVoice: ''
                  });
                  changeLanguage('en');
                }}
              >
                {t('resetToDefaults') || 'Reset to Defaults'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LanguageSettingsPage;