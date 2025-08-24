'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
import { Users, Briefcase, Building2, TrendingUp, FileText, BookOpen, MessageSquare } from 'lucide-react';
import { Loading, LoadingGrid, LoadingCard } from '@/components/ui/loading';
import { candidatesService } from '@/lib/services/candidatesService';
import { jobsService } from '@/lib/services/jobsService';
import { courseService } from '@/lib/services/coursesService';
import { enquiryService } from '@/lib/services/enquiry/enquiryService';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCandidates: 0,
    activeJobs: 0,
    totalCourses: 0,
    totalEnquiries: 0,
    growth: 0
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push(ROUTES.login);
      return;
    }
    
    // Get real-time stats
    const loadStats = async () => {
      const candidatesStats = candidatesService.getCandidatesStats();
      const jobsStats = jobsService.getJobsStats();
      const courses = await courseService.getAll();
      const enquiryStats = enquiryService.getEnquiryStats();
      
      setStats({
        totalCandidates: candidatesStats.total,
        activeJobs: jobsStats.byStatus.active,
        totalCourses: courses.length,
        totalEnquiries: enquiryStats.total,
        growth: Math.round((candidatesStats.byStatus.approved / Math.max(candidatesStats.total, 1)) * 100)
      });
    };

    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      loadStats();
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-9 bg-muted rounded w-64 animate-pulse" />
            <div className="h-5 bg-muted rounded w-48 animate-pulse mt-2" />
          </div>
        </div>
        <LoadingGrid count={4} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-6 border rounded-lg">
              <LoadingCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {user.name}!</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCandidates}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeJobs}</div>
          </CardContent>
        </Card>



        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
            <MessageSquare className="h-10 w-10 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalEnquiries}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Manage Candidates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Create, read, update, and delete candidate information.
            </p>
            <div className="space-y-2">
              <Button 
                className="w-full" 
                onClick={() => router.push(ROUTES.admin.candidates)}
              >
                Go to Candidates
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>Manage Jobs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Create, read, update, and delete job postings.
            </p>
            <div className="space-y-2">
              <Button 
                className="w-full"
                onClick={() => router.push(ROUTES.admin.jobs)}
              >
                Go to Jobs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>Manage Courses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Create, read, update, and delete course content.
            </p>
            <div className="space-y-2">
              <Button 
                className="w-full"
                onClick={() => router.push(ROUTES.admin.courses)}
              >
                Go to Courses
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Manage Enquiries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View and manage course enquiries from potential students.
            </p>
            <div className="space-y-2">
              <Button 
                className="w-full"
                onClick={() => router.push(ROUTES.admin.enquiry)}
              >
                Go to Enquiries
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}