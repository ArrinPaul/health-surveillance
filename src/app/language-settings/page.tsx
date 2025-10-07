"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Languages, Volume2, Globe, Settings, Check, Play, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  status: 'supported' | 'beta' | 'coming-soon';
}

const LanguageSettingsPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [voiceSettings, setVoiceSettings] = useState({
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
  });
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isTestingVoice, setIsTestingVoice] = useState(false);

  const supportedLanguages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      status: 'supported',
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      status: 'supported',
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      status: 'supported',
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      status: 'beta',
    },
  ];

  const getStatusBadge = (status: Language['status']) => {
    switch (status) {
      case 'supported':
        return <Badge className="bg-green-100 text-green-800">Supported</Badge>;
      case 'beta':
        return <Badge className="bg-yellow-100 text-yellow-800">Beta</Badge>;
      case 'coming-soon':
        return <Badge className="bg-gray-100 text-gray-800">Coming Soon</Badge>;
      default:
        return null;
    }
  };

  const handleVoiceSettingChange = (setting: 'rate' | 'pitch' | 'volume', value: number) => {
    setVoiceSettings((prev) => ({ ...prev, [setting]: value }));
  };

  const testVoice = () => {
    setIsTestingVoice(true);
    // Simulate voice testing logic here
    setTimeout(() => setIsTestingVoice(false), 2000);
  };

  const changeLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
  };

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Languages className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Language Settings</h1>
          </div>
          <p className="text-gray-600">Customize your language preferences and voice settings</p>
        </div>

        {/* Language Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {supportedLanguages.map((language) => (
            <Card key={language.code} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Current Language</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <span className="text-2xl">{language.flag}</span>
                  <div className="ml-3">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-sm text-muted-foreground">{language.nativeName}</div>
                  </div>
                </div>
                <p className="text-gray-600">Customize your language preferences</p>
                {getStatusBadge(language.status)}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Voice Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5" />
              <span>Voice Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-voice">Enable Voice</Label>
              <Switch
                id="enable-voice"
                checked={voiceEnabled}
                onCheckedChange={setVoiceEnabled}
              />
            </div>

            {voiceEnabled && (
              <>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-speak">Auto Speak</Label>
                  <Switch
                    id="auto-speak"
                    checked={voiceEnabled}
                    onCheckedChange={setVoiceEnabled}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Speech Rate */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Speech Rate: {voiceSettings.rate.toFixed(1)}x
                    </Label>
                    <Slider
                      value={[voiceSettings.rate]}
                      onValueChange={(value) => handleVoiceSettingChange('rate', value[0])}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Speech Pitch */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Speech Pitch: {voiceSettings.pitch.toFixed(1)}
                    </Label>
                    <Slider
                      value={[voiceSettings.pitch]}
                      onValueChange={(value) => handleVoiceSettingChange('pitch', value[0])}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Volume */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Volume: {Math.round(voiceSettings.volume * 100)}%
                    </Label>
                    <Slider
                      value={[voiceSettings.volume]}
                      onValueChange={(value) => handleVoiceSettingChange('volume', value[0])}
                      min={0.1}
                      max={1}
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
                    {isTestingVoice ? 'Playing...' : 'Test Voice'}
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Test the current voice settings with a sample message
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
              Reset Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Reset all language and voice settings to default values
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setVoiceSettings({
                    rate: 1.0,
                    pitch: 1.0,
                    volume: 0.8,
                  });
                  changeLanguage('en');
                }}
              >
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LanguageSettingsPage;