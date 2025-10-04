import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Auth
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      role: 'Role',
      location: 'Location',
      selectRole: 'Select Role',
      admin: 'Admin',
      healthWorker: 'Health Worker',
      communityUser: 'Community User',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      
      // Dashboard
      dashboard: 'Dashboard',
      activeCases: 'Active Cases',
      predictedOutbreaks: 'Predicted Outbreaks',
      waterQualityAlerts: 'Water Quality Alerts',
      interventions: 'Interventions in Progress',
      diseaseHotspots: 'Disease Hotspots',
      casesTrend: 'Cases Trend',
      waterQualityTrend: 'Water Quality Trend',
      
      // Navigation
      healthData: 'Health Data',
      waterQuality: 'Water Quality',
      alerts: 'Alerts',
      education: 'Education',
      communityReports: 'Community Reports',
      profile: 'Profile',
      settings: 'Settings',
      help: 'Help & Support',
      logout: 'Logout',
      
      // Health Data
      submitReport: 'Submit Health Report',
      patientName: 'Patient Name',
      symptoms: 'Symptoms',
      date: 'Date',
      demographics: 'Demographics',
      uploadImage: 'Upload Image',
      submit: 'Submit',
      viewReports: 'View Reports',
      search: 'Search',
      filter: 'Filter',
      
      // Water Quality
      searchLocation: 'Search by Location or GPS',
      checkWaterQuality: 'Check Water Quality',
      ph: 'pH Level',
      turbidity: 'Turbidity',
      temperature: 'Temperature',
      rainfall: 'Rainfall',
      humidity: 'Humidity',
      
      // Alerts
      severity: 'Severity',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      viewDetails: 'View Details',
      
      // Education
      safeWater: 'Safe Drinking Water',
      hygiene: 'Hygiene',
      sanitation: 'Sanitation',
      diseasePrevention: 'Disease Prevention',
      
      // Community
      reportIssue: 'Report an Issue',
      problemDescription: 'Problem Description',
      unsafeWaterSource: 'Unsafe Water Source',
      healthIssue: 'Health Issue',
      
      // Accessibility
      fontSize: 'Font Size',
      contrast: 'High Contrast',
      language: 'Language',
      
      // Common
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    }
  },
  hi: {
    translation: {
      login: 'लॉगिन',
      register: 'रजिस्टर करें',
      email: 'ईमेल',
      password: 'पासवर्ड',
      name: 'नाम',
      role: 'भूमिका',
      location: 'स्थान',
      selectRole: 'भूमिका चुनें',
      admin: 'व्यवस्थापक',
      healthWorker: 'स्वास्थ्य कार्यकर्ता',
      communityUser: 'सामुदायिक उपयोगकर्ता',
      signIn: 'साइन इन करें',
      signUp: 'साइन अप करें',
      dashboard: 'डैशबोर्ड',
      activeCases: 'सक्रिय मामले',
      predictedOutbreaks: 'अनुमानित प्रकोप',
      waterQualityAlerts: 'जल गुणवत्ता अलर्ट',
      interventions: 'चल रहे हस्तक्षेप',
      healthData: 'स्वास्थ्य डेटा',
      waterQuality: 'जल गुणवत्ता',
      alerts: 'अलर्ट',
      education: 'शिक्षा',
      communityReports: 'सामुदायिक रिपोर्ट',
      profile: 'प्रोफाइल',
      settings: 'सेटिंग्स',
      help: 'मदद और समर्थन',
      logout: 'लॉगआउट',
      language: 'भाषा',
    }
  },
  as: {
    translation: {
      login: 'লগিন',
      register: 'পঞ্জীয়ন কৰক',
      email: 'ইমেইল',
      password: 'পাছৱৰ্ড',
      name: 'নাম',
      role: 'ভূমিকা',
      location: 'স্থান',
      selectRole: 'ভূমিকা নির্বাচন কৰক',
      admin: 'প্ৰশাসক',
      healthWorker: 'স্বাস্থ্য কৰ্মী',
      communityUser: 'সম্প্ৰদায় ব্যৱহাৰকাৰী',
      signIn: 'চাইন ইন কৰক',
      signUp: 'চাইন আপ কৰক',
      dashboard: 'ডেচবৰ্ড',
      activeCases: 'সক্ৰিয় কেচ',
      healthData: 'স্বাস্থ্য তথ্য',
      waterQuality: 'পানীৰ গুণগত মান',
      alerts: 'সতৰ্কবাণী',
      education: 'শিক্ষা',
      communityReports: 'সম্প্ৰদায় প্ৰতিবেদন',
      profile: 'প্ৰফাইল',
      settings: 'ছেটিংছ',
      help: 'সহায় আৰু সমৰ্থন',
      logout: 'লগআউট',
      language: 'ভাষা',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;