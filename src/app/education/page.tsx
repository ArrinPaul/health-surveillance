"use client";

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, Sparkles, Bug, Heart, BookOpen, Video } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function EducationPage() {
  const { t } = useTranslation();

  const educationTopics = [
    {
      icon: Droplet,
      title: t('safeWater'),
      color: 'blue',
      content: [
        'Always boil water for at least 20 minutes before drinking',
        'Store water in clean, covered containers',
        'Check water color, smell, and taste before use',
        'Use water purification tablets when boiling is not possible',
        'Clean water storage containers regularly'
      ]
    },
    {
      icon: Sparkles,
      title: t('hygiene'),
      color: 'green',
      content: [
        'Wash hands with soap before eating and after using toilet',
        'Keep fingernails short and clean',
        'Cover food to protect from flies and insects',
        'Use clean utensils for cooking and eating',
        'Maintain personal cleanliness and bath regularly'
      ]
    },
    {
      icon: Heart,
      title: t('sanitation'),
      color: 'purple',
      content: [
        'Use toilets, avoid open defecation',
        'Keep surroundings clean and free of waste',
        'Dispose garbage properly in designated areas',
        'Keep drainage systems clean and unclogged',
        'Maintain cleanliness in community water sources'
      ]
    },
    {
      icon: Bug,
      title: t('diseasePrevention'),
      color: 'red',
      content: [
        'Use mosquito nets while sleeping',
        'Eliminate standing water around homes',
        'Seek medical help immediately if symptoms appear',
        'Complete full course of prescribed medicines',
        'Get vaccinated as per healthcare guidelines'
      ]
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600'
    },
    red: {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-600'
    }
  };

  const resources = [
    {
      type: 'video',
      title: 'Safe Water Practices',
      duration: '5 min',
      thumbnail: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=225&fit=crop'
    },
    {
      type: 'video',
      title: 'Hand Washing Techniques',
      duration: '3 min',
      thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=225&fit=crop'
    },
    {
      type: 'video',
      title: 'Preventing Waterborne Diseases',
      duration: '7 min',
      thumbnail: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=225&fit=crop'
    }
  ];

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('education')}</h1>
          <p className="text-muted-foreground mt-2">
            Learn about health, hygiene, and disease prevention
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {educationTopics.map((topic, index) => {
            const Icon = topic.icon;
            const colors = colorClasses[topic.color as keyof typeof colorClasses];
            
            return (
              <Card key={index} className="backdrop-blur-xl bg-card/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <CardTitle>{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {topic.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 ${colors.bg}`}></div>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Video Resources */}
        <Card className="backdrop-blur-xl bg-card/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              <CardTitle>Educational Videos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary border-b-8 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                      {resource.duration}
                    </div>
                  </div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-green-500/10 border-primary/20">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground mb-1">Health Helpline</p>
                <p className="text-2xl font-bold">104</p>
              </div>
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground mb-1">Ambulance</p>
                <p className="text-2xl font-bold">108</p>
              </div>
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground mb-1">Water Quality Issues</p>
                <p className="text-2xl font-bold">1800-XXX-XXXX</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}