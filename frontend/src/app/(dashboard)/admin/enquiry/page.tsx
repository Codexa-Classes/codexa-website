'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Clock, CheckCircle, Home } from 'lucide-react';
import { EnquiryList } from '@/components/admin/enquiry/enquiry-list';
import { enquiryService } from '@/lib/services/enquiry/enquiryService';
import { useState } from 'react';
import { EnquiryStats } from '@/types/enquiry';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHeader } from '@/components/forms';
import { ROUTES } from '@/lib/constants';

export default function AdminEnquiryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<EnquiryStats>({
    total: 0,
    byStatus: { pending: 0, contacted: 0, enrolled: 0, rejected: 0 },
    byPriority: { low: 0, medium: 0, high: 0 },
    byTechnology: {},
    byYear: {}
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }
    
    // Load enquiry statistics
    const loadStats = () => {
      const enquiryStats = enquiryService.getEnquiryStats();
      setStats(enquiryStats);
    };

    loadStats();
  }, [user, router]);

  const handleBackToDashboard = () => {
    // Navigate back to dashboard
    window.history.back();
  };

  const handleAddEnquiry = () => {
    // Navigate to enquiry form
    window.location.href = "/enquiry";
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { href: ROUTES.admin.dashboard, label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
          { href: ROUTES.admin.enquiry, label: 'Enquiries' },
        ]}
      />

      <Card>
        <CardHeader>
          <PageHeader
            title="Enquiries"
            onBack={handleBackToDashboard}
            actionButton={{
              text: "View Form",
              onClick: handleAddEnquiry
            }}
          />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
                <Users className="h-10 w-10 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-10 w-10 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.byStatus.pending}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contacted</CardTitle>
                <TrendingUp className="h-10 w-10 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.byStatus.contacted}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrolled</CardTitle>
                <CheckCircle className="h-10 w-10 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.byStatus.enrolled}</div>
              </CardContent>
            </Card>
          </div>

          {/* Enquiry List */}
          <EnquiryList />
        </CardContent>
      </Card>
    </div>
  );
}
