"use client";

import { useState } from 'react';
// import { useTranslation } from 'react-i18next'; // Removed for SSR compatibility
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Upload, Search, Filter } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function HealthDataPage() {
  // const { t } = useTranslation(); // Removed for SSR compatibility
  const t = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientName: '',
    symptoms: '',
    location: '',
    date: '',
    age: '',
    gender: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock submission
    setTimeout(() => {
      setLoading(false);
      alert('Health report submitted successfully!');
      setFormData({
        patientName: '',
        symptoms: '',
        location: '',
        date: '',
        age: '',
        gender: ''
      });
    }, 1000);
  };

  const mockReports = [
    { id: 1, patient: 'Anonymous', symptoms: 'Fever, Headache', location: 'Guwahati', date: '2024-01-15', status: 'Under Review' },
    { id: 2, patient: 'Anonymous', symptoms: 'Diarrhea, Vomiting', location: 'Jorhat', date: '2024-01-14', status: 'Confirmed' },
    { id: 3, patient: 'Anonymous', symptoms: 'Cough, Fever', location: 'Dibrugarh', date: '2024-01-13', status: 'Resolved' },
    { id: 4, patient: 'Anonymous', symptoms: 'Skin Rash', location: 'Tezpur', date: '2024-01-12', status: 'Under Review' },
    { id: 5, patient: 'Anonymous', symptoms: 'Abdominal Pain', location: 'Shillong', date: '2024-01-11', status: 'Confirmed' }
  ];

  return (
    <ProtectedRoute allowedRoles={['admin', 'health-worker']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('healthData')}</h1>
          <p className="text-muted-foreground mt-2">
            Collect and manage health data reports
          </p>
        </div>

        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList>
            <TabsTrigger value="submit">{t('submitReport')}</TabsTrigger>
            <TabsTrigger value="reports">{t('viewReports')}</TabsTrigger>
          </TabsList>

          <TabsContent value="submit">
            <Card className="backdrop-blur-xl bg-card/50">
              <CardHeader>
                <CardTitle>{t('submitReport')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">{t('patientName')}</Label>
                      <Input
                        id="patientName"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">{t('location')}</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="date">{t('date')}</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Input
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="symptoms">{t('symptoms')}</Label>
                    <Textarea
                      id="symptoms"
                      value={formData.symptoms}
                      onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                      required
                      className="mt-1"
                      rows={4}
                      placeholder="Describe symptoms in detail..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="upload">{t('uploadImage')} (Optional)</Label>
                    <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full md:w-auto">
                    {loading ? t('loading') : t('submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="backdrop-blur-xl bg-card/50">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Health Reports</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      {t('search')}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      {t('filter')}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Symptoms</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>#{report.id}</TableCell>
                          <TableCell>{report.patient}</TableCell>
                          <TableCell>{report.symptoms}</TableCell>
                          <TableCell>{report.location}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                report.status === 'Confirmed' ? 'destructive' :
                                report.status === 'Resolved' ? 'default' :
                                'secondary'
                              }
                            >
                              {report.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}