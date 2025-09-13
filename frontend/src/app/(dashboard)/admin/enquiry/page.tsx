'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Clock, CheckCircle, Home } from 'lucide-react';
import { EnquiryDashboard } from '@/components/admin/enquiry-dashboard';
import { firestoreEnquiryService, EnquiryDocument } from '@/lib/services/enquiry/firestoreEnquiryService';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHeader } from '@/components/forms';
import { ROUTES } from '@/lib/constants';

export default function AdminEnquiryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<EnquiryDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }
    
    // Load enquiries from Firebase
    const loadEnquiries = async () => {
      try {
        setLoading(true);
        const data = await firestoreEnquiryService.getAllEnquiries();
        setEnquiries(data);
      } catch (error) {
        console.error('Error loading enquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEnquiries();
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

  // Calculate stats from Firebase data
  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'new').length,
    contacted: enquiries.filter(e => e.status === 'contacted').length,
    enrolled: enquiries.filter(e => e.status === 'enrolled').length,
    rejected: enquiries.filter(e => e.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
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
          {/* Firebase Enquiry Dashboard */}
          <EnquiryDashboard />
        </CardContent>
      </Card>
    </div>
  );
}
