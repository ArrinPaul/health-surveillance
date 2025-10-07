"use client";"use client";"use client";"use client";"use client";"use client";



import React, { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';import React, { useState } from 'react';

import { Switch } from '@/components/ui/switch';

import { Badge } from '@/components/ui/badge';import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Label } from '@/components/ui/label';

import { Languages, Volume2, Globe, Settings, Check, Play, VolumeX } from 'lucide-react';import { Button } from '@/components/ui/button';import React, { useState } from 'react';



interface Language {import { Switch } from '@/components/ui/switch';

  code: string;

  name: string;import { Badge } from '@/components/ui/badge';import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

  nativeName: string;

  flag: string;import { Label } from '@/components/ui/label';

  status: 'supported' | 'beta' | 'coming-soon';

}import { import { Button } from '@/components/ui/button';import React, { useState, useEffect } from 'react';



const LanguageSettingsPage = () => {  Languages, 

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [voiceEnabled, setVoiceEnabled] = useState(true);  Volume2, import { Languages, Globe, Settings } from 'lucide-react';

  const [isTestingVoice, setIsTestingVoice] = useState(false);

  Globe, 

  const supportedLanguages: Language[] = [

    {  Settings, import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

      code: 'en',

      name: 'English',  Check, 

      nativeName: 'English',

      flag: '🇺🇸',  Play, const LanguageSettingsPage = () => {

      status: 'supported'

    },  VolumeX 

    {

      code: 'hi',} from 'lucide-react';  const [currentLanguage, setCurrentLanguage] = useState('en');import { Button } from '@/components/ui/button';import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';

      name: 'Hindi',

      nativeName: 'हिन्दी',

      flag: '🇮🇳',

      status: 'supported'interface Language {

    },

    {  code: string;

      code: 'es',

      name: 'Spanish',  name: string;  const languages = [import { Switch } from '@/components/ui/switch';

      nativeName: 'Español',

      flag: '🇪🇸',  nativeName: string;

      status: 'supported'

    },  flag: string;    { code: 'en', name: 'English', flag: '🇺🇸' },

    {

      code: 'fr',  status: 'supported' | 'beta' | 'coming-soon';

      name: 'French',

      nativeName: 'Français',}    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },import { Badge } from '@/components/ui/badge';// import { useTranslation } from 'react-i18next'; // Removed for SSR compatibility// import { useTranslation } from 'react-i18next'; // Removed for SSR compatibility

      flag: '🇫🇷',

      status: 'beta'

    }

  ];const LanguageSettingsPage = () => {    { code: 'es', name: 'Spanish', flag: '🇪🇸' },



  const currentLanguageData = supportedLanguages.find(lang => lang.code === currentLanguage);  const [currentLanguage, setCurrentLanguage] = useState('en');



  const handleLanguageChange = (languageCode: string) => {  const [voiceEnabled, setVoiceEnabled] = useState(true);    { code: 'fr', name: 'French', flag: '🇫🇷' }import { Label } from '@/components/ui/label';

    setCurrentLanguage(languageCode);

    localStorage.setItem('selectedLanguage', languageCode);  const [isTestingVoice, setIsTestingVoice] = useState(false);

  };

  ];

  const testVoice = () => {

    if (!voiceEnabled) return;  const supportedLanguages: Language[] = [

    setIsTestingVoice(true);

    const utterance = new SpeechSynthesisUtterance('Hello! This is a test message.');    {import { Languages, Volume2, Globe, Settings, Check, Play } from 'lucide-react';import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

    utterance.onend = () => setIsTestingVoice(false);

    utterance.onerror = () => setIsTestingVoice(false);      code: 'en',

    speechSynthesis.speak(utterance);

  };      name: 'English',  const currentLang = languages.find(lang => lang.code === currentLanguage);



  const getStatusBadge = (status: Language['status']) => {      nativeName: 'English',

    switch (status) {

      case 'supported':      flag: '🇺🇸',

        return <Badge className="bg-green-100 text-green-800">Supported</Badge>;

      case 'beta':      status: 'supported'

        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Beta</Badge>;

      case 'coming-soon':    },  return (

        return <Badge variant="outline" className="bg-gray-100 text-gray-600">Coming Soon</Badge>;

      default:    {

        return null;

    }      code: 'hi',    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">interface Language {import { Button } from '@/components/ui/button';import { Button } from '@/components/ui/button';

  };

      name: 'Hindi',

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">      nativeName: 'हिन्दी',      <div className="max-w-4xl mx-auto space-y-6">

      <div className="max-w-4xl mx-auto space-y-6">

        <div className="text-center space-y-2">      flag: '🇮🇳',

          <div className="flex items-center justify-center space-x-2">

            <Languages className="h-8 w-8 text-blue-600" />      status: 'supported'        <div className="text-center space-y-2">  code: string;

            <h1 className="text-3xl font-bold text-gray-900">Language Settings</h1>

          </div>    },

          <p className="text-gray-600">Customize your language preferences and voice settings</p>

        </div>    {          <div className="flex items-center justify-center space-x-2">



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">      code: 'es',

          <Card className="border-0 shadow-lg">

            <CardHeader>      name: 'Spanish',            <Languages className="h-8 w-8 text-blue-600" />  name: string;import { Switch } from '@/components/ui/switch';import { Switch } from '@/components/ui/switch';

              <CardTitle className="flex items-center space-x-2">

                <Globe className="h-5 w-5" />      nativeName: 'Español',

                <span>Current Language</span>

              </CardTitle>      flag: '🇪🇸',            <h1 className="text-3xl font-bold text-gray-900">Language Settings</h1>

            </CardHeader>

            <CardContent>      status: 'supported'

              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">

                <span className="text-2xl">{currentLanguageData?.flag}</span>    },          </div>  nativeName: string;

                <div className="ml-3">

                  <div className="font-medium">{currentLanguageData?.name}</div>    {

                  <div className="text-sm text-muted-foreground">{currentLanguageData?.nativeName}</div>

                </div>      code: 'fr',          <p className="text-gray-600">Customize your language preferences</p>

                {currentLanguageData && getStatusBadge(currentLanguageData.status)}

              </div>      name: 'French',

            </CardContent>

          </Card>      nativeName: 'Français',        </div>  flag: string;import { Slider } from '@/components/ui/slider';import { Slider } from '@/components/ui/slider';



          <Card className="border-0 shadow-lg">      flag: '🇫🇷',

            <CardHeader>

              <CardTitle className="flex items-center space-x-2">      status: 'beta'

                <Volume2 className="h-5 w-5" />

                <span>Voice Settings</span>    },

              </CardTitle>

            </CardHeader>    {        <Card className="border-0 shadow-lg">  status: 'supported' | 'beta';

            <CardContent className="space-y-6">

              <div className="flex items-center justify-between">      code: 'de',

                <Label htmlFor="enable-voice">Enable Voice</Label>

                <Switch      name: 'German',          <CardHeader>

                  id="enable-voice"

                  checked={voiceEnabled}      nativeName: 'Deutsch',

                  onCheckedChange={setVoiceEnabled}

                />      flag: '🇩🇪',            <CardTitle className="flex items-center space-x-2">}import { Badge } from '@/components/ui/badge';import { Badge } from '@/components/ui/badge';

              </div>

      status: 'beta'

              {voiceEnabled && (

                <Button    },              <Globe className="h-5 w-5" />

                  onClick={testVoice}

                  disabled={isTestingVoice}    {

                  variant="outline"

                  className="w-full"      code: 'pt',              <span>Current Language</span>

                >

                  {isTestingVoice ? (      name: 'Portuguese',

                    <>

                      <VolumeX className="h-4 w-4 mr-2 animate-pulse" />      nativeName: 'Português',            </CardTitle>

                      Testing...

                    </>      flag: '🇵🇹',

                  ) : (

                    <>      status: 'coming-soon'          </CardHeader>const LanguageSettingsPage: React.FC = () => {import { Label } from '@/components/ui/label';import { Label } from '@/components/ui/label';

                      <Play className="h-4 w-4 mr-2" />

                      Test Voice    }

                    </>

                  )}  ];          <CardContent>

                </Button>

              )}

            </CardContent>

          </Card>  const currentLanguageData = supportedLanguages.find(lang => lang.code === currentLanguage);            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">  const [currentLanguage, setCurrentLanguage] = useState('en');

        </div>



        <Card className="border-0 shadow-lg">

          <CardHeader>  const handleLanguageChange = (languageCode: string) => {              <span className="text-2xl">{currentLang?.flag}</span>

            <CardTitle className="flex items-center space-x-2">

              <Languages className="h-5 w-5" />    setCurrentLanguage(languageCode);

              <span>Available Languages</span>

            </CardTitle>    // Save to localStorage              <div className="font-medium">{currentLang?.name}</div>  const [voiceEnabled, setVoiceEnabled] = useState(true);import {import {

          </CardHeader>

          <CardContent>    localStorage.setItem('selectedLanguage', languageCode);

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {supportedLanguages.map((language) => {  };            </div>

                const isSelected = language.code === currentLanguage;

                

                return (

                  <div  const testVoice = () => {          </CardContent>

                    key={language.code}

                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${    if (!voiceEnabled) return;

                      isSelected

                        ? 'border-blue-500 bg-blue-50 shadow-md'            </Card>

                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'

                    } ${language.status === 'coming-soon' ? 'opacity-60 cursor-not-allowed' : ''}`}    setIsTestingVoice(true);

                    onClick={() => {

                      if (language.status !== 'coming-soon') {    const utterance = new SpeechSynthesisUtterance('Hello! This is a test of the voice settings for the health surveillance system.');  const supportedLanguages: Language[] = [  Select,  Select,

                        handleLanguageChange(language.code);

                      }    

                    }}

                  >    utterance.onend = () => {        <Card className="border-0 shadow-lg">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center space-x-3">      setIsTestingVoice(false);

                        <span className="text-2xl">{language.flag}</span>

                        <div>    };          <CardHeader>    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', status: 'supported' },

                          <div className="font-medium">{language.name}</div>

                          <div className="text-sm text-gray-500">{language.nativeName}</div>    

                        </div>

                      </div>    utterance.onerror = () => {            <CardTitle>Available Languages</CardTitle>

                      <div className="flex flex-col items-end space-y-1">

                        {getStatusBadge(language.status)}      setIsTestingVoice(false);

                        {isSelected && <Check className="h-4 w-4 text-blue-600" />}

                      </div>    };          </CardHeader>    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', status: 'supported' },  SelectContent,  SelectContent,

                    </div>

                  </div>    

                );

              })}    speechSynthesis.speak(utterance);          <CardContent>

            </div>

          </CardContent>  };

        </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">    { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', status: 'supported' },

        <div className="flex justify-center">

          <Button onClick={() => alert('Settings saved successfully!')}>  const getStatusBadge = (status: Language['status']) => {

            <Settings className="h-4 w-4 mr-2" />

            Save Settings    switch (status) {              {languages.map((language) => (

          </Button>

        </div>      case 'supported':

      </div>

    </div>        return <Badge className="bg-green-100 text-green-800">Supported</Badge>;                <div    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', status: 'beta' }  SelectItem,  SelectItem,

  );

};      case 'beta':



export default LanguageSettingsPage;        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Beta</Badge>;                  key={language.code}

      case 'coming-soon':

        return <Badge variant="outline" className="bg-gray-100 text-gray-600">Coming Soon</Badge>;                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${  ];

      default:

        return null;                    language.code === currentLanguage

    }

  };                      ? 'border-blue-500 bg-blue-50'  SelectTrigger,  SelectTrigger,



  return (                      : 'border-gray-200 hover:border-gray-300'

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">

      <div className="max-w-4xl mx-auto space-y-6">                  }`}  const currentLanguageData = supportedLanguages.find(lang => lang.code === currentLanguage);

        {/* Header */}

        <div className="text-center space-y-2">                  onClick={() => setCurrentLanguage(language.code)}

          <div className="flex items-center justify-center space-x-2">

            <Languages className="h-8 w-8 text-blue-600" />                >  SelectValue,  SelectValue,

            <h1 className="text-3xl font-bold text-gray-900">Language Settings</h1>

          </div>                  <div className="flex items-center space-x-3">

          <p className="text-gray-600">Customize your language preferences and voice settings</p>

        </div>                    <span className="text-2xl">{language.flag}</span>  const getStatusBadge = (status: Language['status']) => {



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">                    <div className="font-medium">{language.name}</div>

          {/* Current Language Display */}

          <Card className="border-0 shadow-lg">                  </div>    return status === 'supported' ? } from '@/components/ui/select';} from '@/components/ui/select';

            <CardHeader>

              <CardTitle className="flex items-center space-x-2">                </div>

                <Globe className="h-5 w-5" />

                <span>Current Language</span>              ))}      <Badge className="bg-green-100 text-green-800">Supported</Badge> :

              </CardTitle>

            </CardHeader>            </div>

            <CardContent>

              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">          </CardContent>      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Beta</Badge>;import { import { 

                <span className="text-2xl">{currentLanguageData?.flag}</span>

                <div className="ml-3">        </Card>

                  <div className="font-medium">{currentLanguageData?.name}</div>

                  <div className="text-sm text-muted-foreground">{currentLanguageData?.nativeName}</div>  };

                </div>

                {currentLanguageData && getStatusBadge(currentLanguageData.status)}        <div className="flex justify-center">

              </div>

            </CardContent>          <Button onClick={() => alert('Settings saved!')}>  Languages,   Languages, 

          </Card>

            <Settings className="h-4 w-4 mr-2" />

          {/* Voice Settings */}

          <Card className="border-0 shadow-lg">            Save Settings  return (

            <CardHeader>

              <CardTitle className="flex items-center space-x-2">          </Button>

                <Volume2 className="h-5 w-5" />

                <span>Voice Settings</span>        </div>    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">  Volume2,   Volume2, 

              </CardTitle>

            </CardHeader>      </div>

            <CardContent className="space-y-6">

              {/* Enable Voice */}    </div>      <div className="max-w-4xl mx-auto space-y-6">

              <div className="flex items-center justify-between">

                <Label htmlFor="enable-voice">Enable Voice</Label>  );

                <Switch

                  id="enable-voice"};        <div className="text-center space-y-2">  VolumeX,   VolumeX, 

                  checked={voiceEnabled}

                  onCheckedChange={setVoiceEnabled}

                />

              </div>export default LanguageSettingsPage;          <div className="flex items-center justify-center space-x-2">



              {voiceEnabled && (            <Languages className="h-8 w-8 text-blue-600" />  Mic,  Mic,

                <Button

                  onClick={testVoice}            <h1 className="text-3xl font-bold text-gray-900">Language Settings</h1>

                  disabled={isTestingVoice}

                  variant="outline"          </div>  MicOff,  MicOff,

                  className="w-full"

                >          <p className="text-gray-600">Customize your language preferences and voice settings</p>

                  {isTestingVoice ? (

                    <>        </div>  Globe,  Globe,

                      <VolumeX className="h-4 w-4 mr-2 animate-pulse" />

                      Testing...

                    </>

                  ) : (        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">  Settings,  Settings,

                    <>

                      <Play className="h-4 w-4 mr-2" />          <Card className="border-0 shadow-lg">

                      Test Voice

                    </>            <CardHeader>  Check,  Check,

                  )}

                </Button>              <CardTitle className="flex items-center space-x-2">

              )}

            </CardContent>                <Globe className="h-5 w-5" />  Play,  Play,

          </Card>

        </div>                <span>Current Language</span>



        {/* Available Languages */}              </CardTitle>  Download,  Download,

        <Card className="border-0 shadow-lg">

          <CardHeader>            </CardHeader>

            <CardTitle className="flex items-center space-x-2">

              <Languages className="h-5 w-5" />            <CardContent>  RefreshCw  RefreshCw

              <span>Available Languages</span>

            </CardTitle>              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">

          </CardHeader>

          <CardContent>                <span className="text-2xl">{currentLanguageData?.flag}</span>} from 'lucide-react';} from 'lucide-react';

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {supportedLanguages.map((language) => {                <div className="ml-3">

                const isSelected = language.code === currentLanguage;

                                  <div className="font-medium">{currentLanguageData?.name}</div>

                return (

                  <div                  <div className="text-sm text-muted-foreground">{currentLanguageData?.nativeName}</div>

                    key={language.code}

                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${                </div>interface Language {interface Language {

                      isSelected

                        ? 'border-blue-500 bg-blue-50 shadow-md'                {currentLanguageData && getStatusBadge(currentLanguageData.status)}

                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'

                    } ${language.status === 'coming-soon' ? 'opacity-60 cursor-not-allowed' : ''}`}              </div>  code: string;  code: string;

                    onClick={() => {

                      if (language.status !== 'coming-soon') {            </CardContent>

                        handleLanguageChange(language.code);

                      }          </Card>  name: string;  name: string;

                    }}

                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center space-x-3">          <Card className="border-0 shadow-lg">  nativeName: string;  nativeName: string;

                        <span className="text-2xl">{language.flag}</span>

                        <div>            <CardHeader>

                          <div className="font-medium">{language.name}</div>

                          <div className="text-sm text-gray-500">{language.nativeName}</div>              <CardTitle className="flex items-center space-x-2">  flag: string;  flag: string;

                        </div>

                      </div>                <Volume2 className="h-5 w-5" />

                      <div className="flex flex-col items-end space-y-1">

                        {getStatusBadge(language.status)}                <span>Voice Settings</span>  region: string;  region: string;

                        {isSelected && <Check className="h-4 w-4 text-blue-600" />}

                      </div>              </CardTitle>

                    </div>

                  </div>            </CardHeader>  status: 'supported' | 'beta' | 'coming-soon';  status: 'supported' | 'beta' | 'coming-soon';

                );

              })}            <CardContent className="space-y-4">

            </div>

          </CardContent>              <div className="flex items-center justify-between">}}

        </Card>

                <Label>Enable Voice</Label>

        {/* Action Buttons */}

        <div className="flex justify-center">                <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} />

          <Button onClick={() => alert('Settings saved successfully!')}>

            <Settings className="h-4 w-4 mr-2" />              </div>

            Save Settings

          </Button>              {voiceEnabled && (interface VoiceSettings {interface VoiceSettings {

        </div>

      </div>                <Button variant="outline" className="w-full">

    </div>

  );                  <Play className="h-4 w-4 mr-2" />  enabled: boolean;  enabled: boolean;

};

                  Test Voice

export default LanguageSettingsPage;
                </Button>  rate: number;  rate: number;

              )}

            </CardContent>  pitch: number;  pitch: number;

          </Card>

        </div>  volume: number;  volume: number;



        <Card className="border-0 shadow-lg">  autoSpeak: boolean;  autoSpeak: boolean;

          <CardHeader>

            <CardTitle className="flex items-center space-x-2">  preferredVoice: string;  preferredVoice: string;

              <Languages className="h-5 w-5" />

              <span>Available Languages</span>}}

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">const LanguageSettingsPage: React.FC = () => {const LanguageSettingsPage: React.FC = () => {

              {supportedLanguages.map((language) => (

                <div  // Static translations for better SSR compatibility  // const { i18n, t } = useTranslation(); // Removed for SSR compatibility

                  key={language.code}

                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${  const t = (key: string) => {  

                    language.code === currentLanguage

                      ? 'border-blue-500 bg-blue-50 shadow-md'    const translations: Record<string, string> = {  // Static translations for better SSR compatibility

                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'

                  }`}      'languageSettings': 'Language Settings',  const t = (key: string) => {

                  onClick={() => setCurrentLanguage(language.code)}

                >      'selectLanguage': 'Select Language',    const translations: Record<string, string> = {

                  <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-3">      'voiceSettings': 'Voice Settings',      'languageSettings': 'Language Settings',

                      <span className="text-2xl">{language.flag}</span>

                      <div>      'enableVoice': 'Enable Voice',      'selectLanguage': 'Select Language',

                        <div className="font-medium">{language.name}</div>

                        <div className="text-sm text-gray-500">{language.nativeName}</div>      'speechRate': 'Speech Rate',      'voiceSettings': 'Voice Settings',

                      </div>

                    </div>      'speechPitch': 'Speech Pitch',      'enableVoice': 'Enable Voice',

                    <div className="flex flex-col items-end space-y-1">

                      {getStatusBadge(language.status)}      'volume': 'Volume',      'speechRate': 'Speech Rate',

                      {language.code === currentLanguage && <Check className="h-4 w-4 text-blue-600" />}

                    </div>      'autoSpeak': 'Auto Speak',      'speechPitch': 'Speech Pitch',

                  </div>

                </div>      'preferredVoice': 'Preferred Voice',      'volume': 'Volume',

              ))}

            </div>      'testVoice': 'Test Voice',      'autoSpeak': 'Auto Speak',

          </CardContent>

        </Card>      'downloadLanguage': 'Download Language Pack',      'preferredVoice': 'Preferred Voice',



        <div className="flex justify-center">      'refreshVoices': 'Refresh Voices',      'testVoice': 'Test Voice',

          <Button onClick={() => alert('Settings saved successfully!')}>

            <Settings className="h-4 w-4 mr-2" />      'saveSettings': 'Save Settings',      'downloadLanguage': 'Download Language Pack',

            Save Settings

          </Button>      'currentLanguage': 'Current Language',      'refreshVoices': 'Refresh Voices',

        </div>

      </div>      'availableLanguages': 'Available Languages',      'saveSettings': 'Save Settings',

    </div>

  );      'voicePreview': 'Voice Preview',      'currentLanguage': 'Current Language',

};

      'settings': 'Settings'      'availableLanguages': 'Available Languages',

export default LanguageSettingsPage;
    };      'voicePreview': 'Voice Preview',

    return translations[key] || key;      'settings': 'Settings'

  };    };

      return translations[key] || key;

  const [currentLanguage, setCurrentLanguage] = useState('en');  };

  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({  

    enabled: true,  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({

    rate: 1.0,    enabled: true,

    pitch: 1.0,    rate: 1.0,

    volume: 0.8,    pitch: 1.0,

    autoSpeak: false,    volume: 0.8,

    preferredVoice: ''    autoSpeak: false,

  });    preferredVoice: ''

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);  });

  const [isTestingVoice, setIsTestingVoice] = useState(false);  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});  const [isTestingVoice, setIsTestingVoice] = useState(false);

  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});

  const supportedLanguages: Language[] = [  const [currentLanguage, setCurrentLanguage] = useState('en'); // Default to English

    {

      code: 'en',  const supportedLanguages: Language[] = [

      name: 'English',    {

      nativeName: 'English',      code: 'en',

      flag: '🇺🇸',      name: 'English',

      region: 'United States',      nativeName: 'English',

      status: 'supported'      flag: '🇺🇸',

    },      region: 'United States',

    {      status: 'supported'

      code: 'hi',    },

      name: 'Hindi',    {

      nativeName: 'हिन्दी',      code: 'hi',

      flag: '🇮🇳',      name: 'Hindi',

      region: 'India',      nativeName: 'हिंदी',

      status: 'supported'      flag: '🇮🇳',

    },      region: 'India',

    {      status: 'supported'

      code: 'es',    },

      name: 'Spanish',    {

      nativeName: 'Español',      code: 'bn',

      flag: '🇪🇸',      name: 'Bengali',

      region: 'Spain',      nativeName: 'বাংলা',

      status: 'supported'      flag: '🇧🇩',

    },      region: 'Bangladesh',

    {      status: 'supported'

      code: 'fr',    },

      name: 'French',    {

      nativeName: 'Français',      code: 'as',

      flag: '🇫🇷',      name: 'Assamese',

      region: 'France',      nativeName: 'অসমীয়া',

      status: 'supported'      flag: '🇮🇳',

    }      region: 'Assam, India',

  ];      status: 'beta'

    },

  useEffect(() => {    {

    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';      code: 'es',

    const savedVoiceSettings = localStorage.getItem('voiceSettings');      name: 'Spanish',

          nativeName: 'Español',

    setCurrentLanguage(savedLanguage);      flag: '🇪🇸',

          region: 'Spain',

    if (savedVoiceSettings) {      status: 'supported'

      try {    },

        setVoiceSettings(JSON.parse(savedVoiceSettings));    {

      } catch (error) {      code: 'fr',

        console.error('Error parsing saved voice settings:', error);      name: 'French',

      }      nativeName: 'Français',

    }      flag: '🇫🇷',

      region: 'France',

    loadVoices();      status: 'supported'

        },

    if (speechSynthesis.onvoiceschanged !== undefined) {    {

      speechSynthesis.onvoiceschanged = loadVoices;      code: 'ar',

    }      name: 'Arabic',

  }, []);      nativeName: 'العربية',

      flag: '🇸🇦',

  const loadVoices = () => {      region: 'Saudi Arabia',

    const voices = speechSynthesis.getVoices();      status: 'beta'

    setAvailableVoices(voices);    },

        {

    if (voices.length > 0 && !voiceSettings.preferredVoice) {      code: 'zh',

      const defaultVoice = voices.find(v => v.lang.startsWith(currentLanguage)) || voices[0];      name: 'Chinese',

      setVoiceSettings(prev => ({      nativeName: '中文',

        ...prev,      flag: '🇨🇳',

        preferredVoice: defaultVoice?.name || ''      region: 'China',

      }));      status: 'beta'

    }    },

  };    {

      code: 'pt',

  const handleLanguageChange = (languageCode: string) => {      name: 'Portuguese',

    setCurrentLanguage(languageCode);      nativeName: 'Português',

    localStorage.setItem('selectedLanguage', languageCode);      flag: '🇵🇹',

          region: 'Portugal',

    const voices = speechSynthesis.getVoices();      status: 'coming-soon'

    const languageVoice = voices.find(v => v.lang.startsWith(languageCode));    },

    if (languageVoice) {    {

      setVoiceSettings(prev => ({      code: 'de',

        ...prev,      name: 'German',

        preferredVoice: languageVoice.name      nativeName: 'Deutsch',

      }));      flag: '🇩🇪',

    }      region: 'Germany',

  };      status: 'coming-soon'

    }

  const handleVoiceSettingChange = <T extends keyof VoiceSettings>(  ];

    setting: T,

    value: VoiceSettings[T]  useEffect(() => {

  ) => {    loadSettings();

    const newSettings = { ...voiceSettings, [setting]: value };    loadAvailableVoices();

    setVoiceSettings(newSettings);  }, []);

    localStorage.setItem('voiceSettings', JSON.stringify(newSettings));

  };  useEffect(() => {

    saveSettings();

  const testVoice = () => {  }, [voiceSettings]);

    if (!voiceSettings.enabled) return;

      const loadSettings = () => {

    setIsTestingVoice(true);    if (typeof window !== 'undefined') {

    const utterance = new SpeechSynthesisUtterance('Hello! This is a test of the voice settings.');      const savedVoiceSettings = localStorage.getItem('voiceSettings');

          if (savedVoiceSettings) {

    utterance.rate = voiceSettings.rate;        try {

    utterance.pitch = voiceSettings.pitch;          setVoiceSettings(JSON.parse(savedVoiceSettings));

    utterance.volume = voiceSettings.volume;        } catch (error) {

              console.error('Error loading voice settings:', error);

    if (voiceSettings.preferredVoice) {        }

      const voice = availableVoices.find(v => v.name === voiceSettings.preferredVoice);      }

      if (voice) {    }

        utterance.voice = voice;  };

      }

    }  const saveSettings = () => {

        if (typeof window !== 'undefined') {

    utterance.onend = () => setIsTestingVoice(false);      localStorage.setItem('voiceSettings', JSON.stringify(voiceSettings));

    utterance.onerror = () => setIsTestingVoice(false);    }

      };

    speechSynthesis.speak(utterance);

  };  const loadAvailableVoices = () => {

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {

  const getStatusBadge = (status: Language['status']) => {      const loadVoices = () => {

    switch (status) {        const voices = window.speechSynthesis.getVoices();

      case 'supported':        setAvailableVoices(voices);

        return <Badge variant="default" className="bg-green-100 text-green-800">Supported</Badge>;        

      case 'beta':        // Set default voice if not set

        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Beta</Badge>;        if (!voiceSettings.preferredVoice && voices.length > 0) {

      case 'coming-soon':          const defaultVoice = voices.find(v => v.lang.startsWith(currentLanguage)) || voices[0];

        return <Badge variant="outline" className="bg-gray-100 text-gray-600">Coming Soon</Badge>;          setVoiceSettings(prev => ({ ...prev, preferredVoice: defaultVoice.name }));

      default:        }

        return null;      };

    }      

  };      loadVoices();

      if (speechSynthesis.onvoiceschanged !== undefined) {

  const currentLanguageData = supportedLanguages.find(lang => lang.code === currentLanguage);        speechSynthesis.onvoiceschanged = loadVoices;

      }

  return (    }

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">  };

      <div className="max-w-4xl mx-auto space-y-6">

        <div className="text-center space-y-2">  const changeLanguage = async (languageCode: string) => {

          <div className="flex items-center justify-center space-x-2">    try {

            <Languages className="h-8 w-8 text-blue-600" />      setCurrentLanguage(languageCode); // Update local state instead of i18n

            <h1 className="text-3xl font-bold text-gray-900">{t('languageSettings')}</h1>      if (typeof window !== 'undefined') {

          </div>        localStorage.setItem('preferredLanguage', languageCode);

          <p className="text-gray-600">Customize your language preferences and voice settings</p>      }

        </div>      

      // Update preferred voice for new language

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">      const languageVoices = availableVoices.filter(voice => 

          <Card className="border-0 shadow-lg">        voice.lang.startsWith(languageCode)

            <CardHeader>      );

              <CardTitle className="flex items-center space-x-2">      if (languageVoices.length > 0) {

                <Globe className="h-5 w-5" />        setVoiceSettings(prev => ({ 

                <span>{t('currentLanguage')}</span>          ...prev, 

              </CardTitle>          preferredVoice: languageVoices[0].name 

            </CardHeader>        }));

            <CardContent>      }

              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">    } catch (error) {

                <span className="text-2xl">{currentLanguageData?.flag}</span>      console.error('Failed to change language:', error);

                <div className="ml-3">    }

                  <div className="font-medium">{currentLanguageData?.name}</div>  };

                  <div className="text-sm text-muted-foreground">{currentLanguageData?.nativeName}</div>

                </div>  const testVoice = async () => {

                {getStatusBadge(currentLanguageData?.status || 'supported')}    if (!voiceSettings.enabled || isTestingVoice) return;

              </div>    

            </CardContent>    setIsTestingVoice(true);

          </Card>    

    try {

          <Card className="border-0 shadow-lg">      const text = t('voiceTestMessage') || 'This is a voice test for the health surveillance system.';

            <CardHeader>      const utterance = new SpeechSynthesisUtterance(text);

              <CardTitle className="flex items-center space-x-2">      

                <Volume2 className="h-5 w-5" />      const selectedVoice = availableVoices.find(v => v.name === voiceSettings.preferredVoice);

                <span>{t('voiceSettings')}</span>      if (selectedVoice) {

              </CardTitle>        utterance.voice = selectedVoice;

            </CardHeader>      }

            <CardContent className="space-y-6">      

              <div className="flex items-center justify-between">      utterance.rate = voiceSettings.rate;

                <Label htmlFor="enable-voice">{t('enableVoice')}</Label>      utterance.pitch = voiceSettings.pitch;

                <Switch      utterance.volume = voiceSettings.volume;

                  id="enable-voice"      

                  checked={voiceSettings.enabled}      utterance.onend = () => {

                  onCheckedChange={(checked) => handleVoiceSettingChange('enabled', checked)}        setIsTestingVoice(false);

                />      };

              </div>      

      utterance.onerror = () => {

              {voiceSettings.enabled && (        setIsTestingVoice(false);

                <>      };

                  <div className="space-y-2">      

                    <Label>{t('speechRate')}: {voiceSettings.rate.toFixed(1)}x</Label>      if (typeof window !== 'undefined') {

                    <Slider        window.speechSynthesis.speak(utterance);

                      value={[voiceSettings.rate]}      }

                      onValueChange={(value) => handleVoiceSettingChange('rate', value[0])}    } catch (error) {

                      max={2}      console.error('Error testing voice:', error);

                      min={0.5}      setIsTestingVoice(false);

                      step={0.1}    }

                      className="w-full"  };

                    />

                  </div>  const downloadLanguage = (languageCode: string) => {

    setDownloadProgress(prev => ({ ...prev, [languageCode]: 0 }));

                  <div className="space-y-2">    

                    <Label>{t('volume')}: {Math.round(voiceSettings.volume * 100)}%</Label>    // Simulate download progress

                    <Slider    const interval = setInterval(() => {

                      value={[voiceSettings.volume]}      setDownloadProgress(prev => {

                      onValueChange={(value) => handleVoiceSettingChange('volume', value[0])}        const currentProgress = prev[languageCode] || 0;

                      max={1}        if (currentProgress >= 100) {

                      min={0}          clearInterval(interval);

                      step={0.1}          return { ...prev, [languageCode]: 100 };

                      className="w-full"        }

                    />        return { ...prev, [languageCode]: currentProgress + 10 };

                  </div>      });

    }, 200);

                  <Button  };

                    onClick={testVoice}

                    disabled={isTestingVoice}  const getLanguageVoices = (languageCode: string) => {

                    variant="outline"    return availableVoices.filter(voice => 

                    className="w-full"      voice.lang.startsWith(languageCode) || voice.lang.startsWith(languageCode.split('-')[0])

                  >    );

                    {isTestingVoice ? (  };

                      <>

                        <VolumeX className="h-4 w-4 mr-2 animate-pulse" />  const getStatusBadge = (status: string) => {

                        Testing...    switch (status) {

                      </>      case 'supported':

                    ) : (        return <Badge variant="default" className="bg-green-500">Supported</Badge>;

                      <>      case 'beta':

                        <Play className="h-4 w-4 mr-2" />        return <Badge variant="secondary" className="bg-yellow-500">Beta</Badge>;

                        {t('testVoice')}      case 'coming-soon':

                      </>        return <Badge variant="outline">Coming Soon</Badge>;

                    )}      default:

                  </Button>        return null;

                </>    }

              )}  };

            </CardContent>

          </Card>  const currentLanguageData = supportedLanguages.find(lang => lang.code === currentLanguage);

        </div>

  return (

        <Card className="border-0 shadow-lg">    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-6">

          <CardHeader>      <div className="max-w-4xl mx-auto space-y-6">

            <CardTitle className="flex items-center space-x-2">        {/* Header */}

              <Languages className="h-5 w-5" />        <div className="flex items-center gap-4 mb-8">

              <span>{t('availableLanguages')}</span>          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">

            </CardTitle>            <Languages className="w-6 h-6 text-white" />

          </CardHeader>          </div>

          <CardContent>          <div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">            <h1 className="text-3xl font-bold">{t('languageSettings') || 'Language & Voice Settings'}</h1>

              {supportedLanguages.map((language) => {            <p className="text-muted-foreground mt-1">

                const isSelected = language.code === currentLanguage;              {t('languageSettingsDescription') || 'Configure your preferred language and voice settings for the health surveillance system.'}

                            </p>

                return (          </div>

                  <div        </div>

                    key={language.code}

                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${        {/* Current Language */}

                      isSelected        <Card>

                        ? 'border-blue-500 bg-blue-50 shadow-md'          <CardHeader>

                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'            <CardTitle className="flex items-center gap-2">

                    }`}              <Globe className="w-5 h-5" />

                    onClick={() => handleLanguageChange(language.code)}              {t('currentLanguage') || 'Current Language'}

                  >            </CardTitle>

                    <div className="flex items-center justify-between">          </CardHeader>

                      <div className="flex items-center space-x-3">          <CardContent>

                        <span className="text-2xl">{language.flag}</span>            <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg">

                        <div>              <span className="text-2xl">{currentLanguage?.flag}</span>

                          <div className="font-medium">{language.name}</div>              <div className="flex-1">

                          <div className="text-sm text-gray-500">{language.nativeName}</div>                <div className="font-medium">{currentLanguage?.name}</div>

                        </div>                <div className="text-sm text-muted-foreground">{currentLanguage?.nativeName}</div>

                      </div>              </div>

                      <div className="flex flex-col items-end space-y-1">              {getStatusBadge(currentLanguage?.status || 'supported')}

                        {getStatusBadge(language.status)}            </div>

                        {isSelected && <Check className="h-4 w-4 text-blue-600" />}          </CardContent>

                      </div>        </Card>

                    </div>

                  </div>        {/* Available Languages */}

                );        <Card>

              })}          <CardHeader>

            </div>            <CardTitle className="flex items-center gap-2">

          </CardContent>              <Languages className="w-5 h-5" />

        </Card>              {t('availableLanguages') || 'Available Languages'}

      </div>            </CardTitle>

    </div>          </CardHeader>

  );          <CardContent>

};            <div className="grid gap-3">

              {supportedLanguages.map((language) => {

export default LanguageSettingsPage;                const isSelected = language.code === currentLanguage;
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