'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/forms';
import { 
  Briefcase, 
  FileText, 
  User, 
  Search, 
  TrendingUp, 
  Calendar,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  Eye,
  Bookmark,
  Star,
  Zap,
  Target,
  Award,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { mockJobs } from '@/lib/mock/jobs';
import { jobsService } from '@/lib/services/jobsService';

export default function UserDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    appliedJobs: 0,
    savedJobs: 0,
    profileCompletion: 85
  });

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push(ROUTES.login);
      return;
    }

    // Initialize jobs service and get stats
    jobsService.initializeWithSampleData();
    const allJobs = jobsService.getAllJobs();
    setRecentJobs(allJobs.slice(0, 3));
    
    // Mock stats
    setStats({
      totalJobs: allJobs.length,
      appliedJobs: Math.floor(Math.random() * 5) + 2,
      savedJobs: Math.floor(Math.random() * 3) + 1,
      profileCompletion: 85
    });
  }, [user, router]);

  if (!user || user.role !== 'user') {
    return null;
  }

  const handleNavigateTo = (route: string) => {
    router.push(route);
  };

  const getCompanyRating = (companyName: string) => {
    const ratings: { [key: string]: number } = {
      'TechCorp Inc.': 4.2,
      'InnovateSoft': 3.8,
      'Digital Solutions': 4.0,
      'WebTech': 3.6,
      'CodeCraft': 4.1,
    };
    return ratings[companyName] || 3.5;
  };

  const getTimeAgo = (datePosted: string) => {
    const now = new Date();
    const posted = new Date(datePosted);
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-lg text-gray-600">
                Ready to find your next opportunity? Here&apos;s what&apos;s happening with your job search.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Jobs</p>
                  <p className="text-3xl font-bold">{stats.totalJobs}</p>
                </div>
                <Briefcase className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Applied Jobs</p>
                  <p className="text-3xl font-bold">{stats.appliedJobs}</p>
                </div>
                <FileText className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Saved Jobs</p>
                  <p className="text-3xl font-bold">{stats.savedJobs}</p>
                </div>
                <Bookmark className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Profile</p>
                  <p className="text-3xl font-bold">{stats.profileCompletion}%</p>
                </div>
                <User className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
              onClick={() => handleNavigateTo('/user/jobs')}
            >
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Jobs</h3>
                <p className="text-sm text-gray-600">Find your next opportunity</p>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
              onClick={() => handleNavigateTo('/user/applied-jobs')}
            >
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Applied Jobs</h3>
                <p className="text-sm text-gray-600">Track your applications</p>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
              onClick={() => handleNavigateTo('/user/profile')}
            >
              <CardContent className="p-6 text-center">
                <User className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">My Profile</h3>
                <p className="text-sm text-gray-600">Update your information</p>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
              onClick={() => handleNavigateTo('/user/jobs')}
            >
              <CardContent className="p-6 text-center">
                <Bookmark className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Saved Jobs</h3>
                <p className="text-sm text-gray-600">View your bookmarks</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Job Recommendations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
            <Button variant="outline" onClick={() => handleNavigateTo('/user/jobs')}>
              View All Jobs
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {getCompanyRating(job.companyName)}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                    {job.jobTitle}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{job.companyName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        ₹{Math.round(job.salaryRange.min / 1000)}K - ₹{Math.round(job.salaryRange.max / 1000)}K
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {job.experienceRequired.minYears}-{job.experienceRequired.maxYears || job.experienceRequired.minYears + 2} years
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {job.requiredSkills.slice(0, 3).map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.requiredSkills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.requiredSkills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {getTimeAgo(job.datePosted)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleNavigateTo(`/user/jobs/${job.id}`)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Profile Completion & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Complete Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Basic Information</span>
                  <Badge variant="secondary">100%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Skills & Experience</span>
                  <Badge variant="secondary">90%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Resume Upload</span>
                  <Badge variant="outline">60%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Social Links</span>
                  <Badge variant="outline">40%</Badge>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{stats.profileCompletion}%</div>
                    <div className="text-sm text-gray-600">Overall Complete</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleNavigateTo('/user/profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Complete Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Career Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Career Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Optimize Your Resume</h4>
                    <p className="text-sm text-gray-600">Use keywords from job descriptions to improve your chances</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Network Actively</h4>
                    <p className="text-sm text-gray-600">Connect with professionals in your industry</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Follow Up</h4>
                    <p className="text-sm text-gray-600">Send thank-you notes after interviews</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Get More Tips
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}