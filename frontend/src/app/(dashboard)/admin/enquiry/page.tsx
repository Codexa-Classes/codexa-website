'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { EnquiryList } from '@/components/admin/enquiry/enquiry-list';
import { enquiryService } from '@/lib/services/enquiry/enquiryService';
import { useState } from 'react';
import { EnquiryStats } from '@/types/enquiry';

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

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-8 w-full max-w-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enquiry Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all course enquiries from potential students
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 ? 'All time enquiries' : 'No enquiries yet'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.byStatus.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting contact
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.byStatus.contacted}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.byStatus.enrolled}</div>
            <p className="text-xs text-muted-foreground">
              Successfully converted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">High Priority</span>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {stats.byPriority.high}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Medium Priority</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {stats.byPriority.medium}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Low Priority</span>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                {stats.byPriority.low}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Top Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(stats.byTechnology)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([tech, count]) => (
                <div key={tech} className="flex items-center justify-between">
                  <span className="text-sm truncate">{tech}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            {Object.keys(stats.byTechnology).length === 0 && (
              <p className="text-sm text-muted-foreground">No enquiries yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Recent Years</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(stats.byYear)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .slice(0, 5)
              .map(([year, count]) => (
                <div key={year} className="flex items-center justify-between">
                  <span className="text-sm">{year}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            {Object.keys(stats.byYear).length === 0 && (
              <p className="text-sm text-muted-foreground">No enquiries yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enquiry List */}
      <Card>
        <CardHeader>
          <CardTitle>All Enquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <EnquiryList />
        </CardContent>
      </Card>
    </div>
  );
}
