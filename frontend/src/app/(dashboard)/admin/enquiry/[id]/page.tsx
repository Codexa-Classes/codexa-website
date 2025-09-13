'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Calendar, User, BookOpen, Clock, Edit } from 'lucide-react';
import { firestoreEnquiryService, EnquiryDocument } from '@/lib/services/enquiry/firestoreEnquiryService';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHeader } from '@/components/forms';
import { ROUTES } from '@/lib/constants';

export default function ViewEnquiryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const enquiryId = params?.id as string;
  
  const [enquiry, setEnquiry] = useState<EnquiryDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }

    if (enquiryId) {
      loadEnquiry();
    }
  }, [user, router, enquiryId]);

  const loadEnquiry = async () => {
    try {
      setIsLoading(true);
      const enquiryData = await firestoreEnquiryService.getEnquiryById(enquiryId);
      if (enquiryData) {
        setEnquiry(enquiryData);
      } else {
        setError('Enquiry not found');
      }
    } catch (err) {
      setError('Failed to load enquiry');
      console.error('Error loading enquiry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push(ROUTES.admin.enquiry);
  };

  const getStatusBadgeVariant = (status: EnquiryDocument['status']) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'contacted':
        return 'secondary';
      case 'enrolled':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isEnquiryRecent = (timestamp: any) => {
    if (!timestamp) return false;
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 2; // Show badge only if enquiry is 2 days old or less
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading enquiry...</p>
        </div>
      </div>
    );
  }

  if (error || !enquiry) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error || 'Enquiry not found'}</div>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Enquiries
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { href: ROUTES.admin.dashboard, label: 'Dashboard' },
          { href: ROUTES.admin.enquiry, label: 'Enquiries' },
          { href: '#', label: `Enquiry #${enquiryId.slice(-8)}` },
        ]}
      />

      <Card>
        <CardHeader>
          <PageHeader
            title={`Enquiry Details`}
            onBack={handleBack}
            actionButton={{
              text: "Edit Status",
              onClick: () => {
                // TODO: Implement status editing
                console.log('Edit status for enquiry:', enquiryId);
              }
            }}
          />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Enquiry Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isEnquiryRecent(enquiry.timestamp) && (
                <Badge 
                  variant={getStatusBadgeVariant(enquiry.status)} 
                  className="text-sm px-3 py-1 animate-pulse text-white font-semibold"
                  style={{
                    animation: 'blink 2s infinite',
                    background: enquiry.status === 'new' ? 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)' : 
                                enquiry.status === 'contacted' ? 'linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)' :
                                enquiry.status === 'enrolled' ? 'linear-gradient(135deg, #10b981, #059669, #047857)' :
                                enquiry.status === 'rejected' ? 'linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)' : 
                                'linear-gradient(135deg, #6b7280, #4b5563, #374151)'
                  }}
                >
                  {enquiry.status.toUpperCase()}
                </Badge>
              )}
              <div className="text-sm text-gray-600">
                Submitted on {formatDate(enquiry.timestamp)}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-lg font-semibold">{enquiry.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Pass Out Year</label>
                  <p className="text-lg font-semibold">{enquiry.passOutYear}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </label>
                  <p className="text-lg">{enquiry.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Mobile Number
                  </label>
                  <p className="text-lg">{enquiry.mobile}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Interest */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Interest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-sm font-medium text-gray-600">Technologies of Interest</label>
                <div className="mt-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg">{enquiry.technology}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-medium">Enquiry Submitted</p>
                    <p className="text-sm text-gray-600">{formatDate(enquiry.timestamp)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div>
                    <p className="font-medium">Status: {enquiry.status}</p>
                    <p className="text-sm text-gray-600">Current status</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {/* <div className="flex gap-4 pt-4">
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Enquiries
            </Button>
            <Button 
              onClick={() => {
                // TODO: Implement status update
                console.log('Update status for enquiry:', enquiryId);
              }}
              variant="default"
            >
              <Edit className="h-4 w-4 mr-2" />
              Update Status
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
