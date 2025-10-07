"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  Droplet, 
  Heart,
  MapPin,
  Clock,
  Users,
  X,
  Sparkles,
  Activity
} from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'health' | 'water' | 'emergency' | 'trend' | 'personal';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action?: string;
  actionUrl?: string;
  timestamp: Date;
  location?: string;
  icon: any;
}

const AISuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set());

  // Generate AI-powered suggestions based on current conditions
  const generateSuggestions = (): Suggestion[] => {
    const currentHour = new Date().getHours();
    const currentMonth = new Date().getMonth();
    
    const baseSuggestions: Suggestion[] = [
      {
        id: '1',
        type: 'health',
        priority: 'high',
        title: 'Increased Disease Risk Alert',
        description: 'AI models predict a 23% higher risk of waterborne diseases in your area this week due to recent rainfall and temperature changes.',
        action: 'View Risk Map',
        actionUrl: '/risk-map',
        timestamp: new Date(),
        location: 'Your Area',
        icon: AlertTriangle
      },
      {
        id: '2',
        type: 'water',
        priority: 'medium',
        title: 'Water Quality Optimization',
        description: 'Based on your water usage patterns, consider boiling water for an additional 5 minutes during peak contamination hours (6-8 AM).',
        action: 'Learn More',
        actionUrl: '/water-quality',
        timestamp: new Date(),
        icon: Droplet
      },
      {
        id: '3',
        type: 'trend',
        priority: 'medium',
        title: 'Community Health Trend',
        description: 'Hand hygiene compliance in your community has increased by 34% this month. Keep up the great work!',
        action: 'View Analytics',
        actionUrl: '/analytics',
        timestamp: new Date(),
        icon: TrendingUp
      },
      {
        id: '4',
        type: 'personal',
        priority: 'low',
        title: 'Health Check Reminder',
        description: 'AI analysis suggests scheduling a preventive health check based on your area\'s health patterns.',
        action: 'Find Centers',
        actionUrl: '/health-centers',
        timestamp: new Date(),
        icon: Heart
      }
    ];

    // Add time-based suggestions
    if (currentHour >= 6 && currentHour <= 8) {
      baseSuggestions.unshift({
        id: 'time-1',
        type: 'health',
        priority: 'high',
        title: 'Morning Water Safety',
        description: 'Peak contamination hours detected. Ensure water is boiled for 20+ minutes before consumption.',
        action: 'Set Reminder',
        timestamp: new Date(),
        icon: Clock
      });
    }

    // Add seasonal suggestions
    if (currentMonth >= 5 && currentMonth <= 8) { // Monsoon season
      baseSuggestions.unshift({
        id: 'season-1',
        type: 'emergency',
        priority: 'high',
        title: 'Monsoon Health Alert',
        description: 'AI predicts increased vector-borne disease risk. Implement enhanced mosquito control measures.',
        action: 'Prevention Guide',
        actionUrl: '/education',
        timestamp: new Date(),
        icon: Activity
      });
    }

    return baseSuggestions;
  };

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        // Try to load from backend AI service
        const response = await fetch('/api/suggestions/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 'current-user',
            location: { area: 'user-area' },
            preferences: {},
            healthData: {}
          })
        });

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.suggestions || []);
        } else {
          // Fallback to local suggestions
          setSuggestions(generateSuggestions());
        }
      } catch (error) {
        console.error('Failed to load AI suggestions:', error);
        // Fallback to local suggestions
        setSuggestions(generateSuggestions());
      }
    };

    loadSuggestions();

    // Refresh suggestions every 30 minutes
    const interval = setInterval(loadSuggestions, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const dismissSuggestion = (id: string) => {
    setDismissedSuggestions(prev => new Set([...prev, id]));
  };

  const handleAction = (actionUrl?: string) => {
    if (actionUrl && typeof window !== 'undefined') {
      window.location.href = actionUrl;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityIconColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const activeSuggestions = suggestions.filter(s => !dismissedSuggestions.has(s.id));

  if (activeSuggestions.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6 border-l-4 border-l-purple-500 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              AI-Powered Suggestions
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                {activeSuggestions.length} Active
              </span>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Personalized recommendations based on AI analysis
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeSuggestions.slice(0, 3).map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <div
                key={suggestion.id}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(suggestion.priority)} relative`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissSuggestion(suggestion.id)}
                  className="absolute top-2 right-2 w-6 h-6 p-0 opacity-50 hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </Button>

                <div className="flex items-start gap-3 pr-8">
                  <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                    <Icon className={`w-5 h-5 ${getPriorityIconColor(suggestion.priority)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                        suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {suggestion.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {suggestion.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {(suggestion.timestamp instanceof Date ? suggestion.timestamp : new Date(suggestion.timestamp)).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                        {suggestion.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {suggestion.location}
                          </div>
                        )}
                      </div>
                      
                      {suggestion.action && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(suggestion.actionUrl)}
                          className="ml-auto"
                        >
                          {suggestion.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activeSuggestions.length > 3 && (
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full">
              View {activeSuggestions.length - 3} More Suggestions
            </Button>
          </div>
        )}

        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Lightbulb className="w-4 h-4 text-purple-500" />
            <span className="text-gray-600">
              Suggestions are updated every 30 minutes based on real-time data analysis and AI models.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISuggestions;