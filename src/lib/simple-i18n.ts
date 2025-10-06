// Simple i18n stub to replace complex translation system
export const useTranslation = () => {
  const t = (key: string) => {
    // Simple translation mapping for essential keys
    const translations: Record<string, string> = {
      // Auth
      login: 'Login',
      register: 'Register', 
      email: 'Email',
      password: 'Password',
      name: 'Name',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      loading: 'Loading...',
      
      // Navigation
      dashboard: 'Dashboard',
      healthData: 'Health Data',
      waterQuality: 'Water Quality',
      alerts: 'Alerts',
      education: 'Education',
      communityReports: 'Community Reports',
      profile: 'Profile',
      settings: 'Settings',
      help: 'Help & Support',
      logout: 'Logout',
      aiFeatures: 'AI Features',
      
      // Common
      save: 'Save',
      submit: 'Submit',
      search: 'Search',
      filter: 'Filter',
      viewDetails: 'View Details',
      
      // Health
      submitReport: 'Submit Health Report',
      patientName: 'Patient Name',
      symptoms: 'Symptoms',
      
      // Water Quality
      searchLocation: 'Search by Location',
      checkWaterQuality: 'Check Water Quality',
      
      // AI Chatbot
      chatbot: 'AI Health Assistant',
      askQuestion: 'Ask me anything about health...',
      sendMessage: 'Send Message',
      
      // Settings
      language: 'Language',
      fontSize: 'Font Size',
      contrast: 'High Contrast',
      
      // Default
      [key]: key // Return the key itself if no translation found
    };
    
    return translations[key] || key;
  };

  const i18n = {
    language: 'en',
    changeLanguage: (lang: string) => Promise.resolve(),
    languages: ['en'],
  };
  
  return { t, i18n };
};