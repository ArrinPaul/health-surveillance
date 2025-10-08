"use client";

// import { useTranslation } from 'react-i18next'; // Removed for SSR compatibility
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertTriangle, Droplet, TrendingUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AISuggestions from '@/components/AISuggestions';

const DiseaseMap = dynamic(() => import('@/components/DiseaseMap'), { ssr: false });

// Make charts client-only to prevent hydration issues
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic<any>(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // const { t } = useTranslation(); // Removed for SSR compatibility
  
  // Static text replacements for better SSR compatibility
  const t = (key: string) => {
    const translations: Record<string, string> = {
      'activeCases': 'Active Cases',
      'waterQualityAlerts': 'Water Quality Alerts', 
      'dashboard': 'Health Dashboard',
      'diseaseHotspots': 'Disease Hotspots',
      'casesTrend': 'Cases Trend',
      'waterQualityTrend': 'Water Quality Trend'
    };
    return translations[key] || key;
  };

  const stats = [
    {
      title: t('activeCases'),
      value: '132',
      change: '+12%',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: 'AI Predictions',
      value: '94.7%',
      change: 'Accurate',
      icon: AlertTriangle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      title: t('waterQualityAlerts'),
      value: '8',
      change: '-2',
      icon: Droplet,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    },
    {
      title: 'AI Insights Today',
      value: '247',
      change: '+28%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    }
  ];

  const casesTrendData = [
    { month: 'Jan', cases: 45, predictions: 48 },
    { month: 'Feb', cases: 52, predictions: 55 },
    { month: 'Mar', cases: 48, predictions: 50 },
    { month: 'Apr', cases: 61, predictions: 65 },
    { month: 'May', cases: 75, predictions: 80 },
    { month: 'Jun', cases: 88, predictions: 95 },
    { month: 'Jul', cases: 132, predictions: 140 }
  ];

  const waterQualityData = [
    { month: 'Jan', pH: 7.2, turbidity: 3.5 },
    { month: 'Feb', pH: 7.1, turbidity: 4.2 },
    { month: 'Mar', pH: 6.9, turbidity: 5.1 },
    { month: 'Apr', pH: 7.0, turbidity: 4.8 },
    { month: 'May', pH: 6.8, turbidity: 6.2 },
    { month: 'Jun', pH: 6.7, turbidity: 7.5 },
    { month: 'Jul', pH: 6.9, turbidity: 6.8 }
  ];

  const diseaseDistribution = [
    { name: 'Waterborne', value: 45, color: '#3b82f6' },
    { name: 'Vector-borne', value: 35, color: '#10b981' },
    { name: 'Respiratory', value: 30, color: '#f59e0b' },
    { name: 'Others', value: 22, color: '#8b5cf6' }
  ];

  return (
    <ProtectedRoute allowedRoles={['admin', 'health-worker']}>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time overview of public health metrics.
          </p>
        </div>

        {/* AI-Powered Suggestions */}
        <AISuggestions />

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="backdrop-blur-xl bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map and Disease Distribution */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 backdrop-blur-xl bg-card/50">
            <CardHeader>
              <CardTitle>{t('diseaseHotspots')}</CardTitle>
            </CardHeader>
            <CardContent>
              {isMounted ? <DiseaseMap /> : <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading map...</div>}
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-card/50">
            <CardHeader>
              <CardTitle>Disease Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {isMounted ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={diseaseDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {diseaseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading chart...</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="backdrop-blur-xl bg-card/50">
            <CardHeader>
              <CardTitle>{t('casesTrend')}</CardTitle>
            </CardHeader>
            <CardContent>
              {isMounted ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={casesTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cases" stroke="#3b82f6" strokeWidth={2} name="Actual Cases" />
                    <Line type="monotone" dataKey="predictions" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading chart...</div>
              )}
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-card/50">
            <CardHeader>
              <CardTitle>{t('waterQualityTrend')}</CardTitle>
            </CardHeader>
            <CardContent>
              {isMounted ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={waterQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pH" fill="#3b82f6" name="pH Level" />
                    <Bar dataKey="turbidity" fill="#f59e0b" name="Turbidity (NTU)" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading chart...</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}