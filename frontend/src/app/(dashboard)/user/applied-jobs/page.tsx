'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHeader } from '@/components/forms';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign, 
  Calendar,
  Eye,
  CheckCircle,
  Clock as ClockIcon,
  XCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  Home,
  User
} from 'lucide-react';
import { mockJobs } from '@/lib/mock/jobs';
import { jobsService } from '@/lib/services/jobsService';
import { Job } from '@/components/jobs/jobs-columns';
import dayjs from 'dayjs';

interface AppliedJob {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  salaryRange: {
    min: number;
    max: number;
  };
  requiredSkills: string[];
  jobDescription: string;
  applicationDate: string;
  status: 'applied' | 'reviewing' | 'shortlisted' | 'interview' | 'offered' | 'rejected';
  lastUpdate: string;
  recruiterContact?: {
    name: string;
    email: string;
    phone: string;
  };
  nextStep?: string;
  interviewDate?: string;
}

export default function AppliedJobsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<AppliedJob[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push(ROUTES.login);
      return;
    }
    
    // Simulate loading applied jobs
    setTimeout(() => {
      const mockAppliedJobs: AppliedJob[] = mockJobs.slice(0, 5).map((job, index) => ({
        ...job,
        applicationDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: ['applied', 'reviewing', 'shortlisted', 'interview', 'offered', 'rejected'][Math.floor(Math.random() * 6)] as AppliedJob['status'],
        lastUpdate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        recruiterContact: Math.random() > 0.5 ? {
          name: ['Sarah Johnson', 'Mike Chen', 'Emily Davis', 'David Wilson'][Math.floor(Math.random() * 4)],
          email: `recruiter${Math.floor(Math.random() * 1000)}@company.com`,
          phone: `+1-555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
        } : undefined,
        nextStep: Math.random() > 0.7 ? [
          'Technical interview scheduled',
          'Waiting for feedback',
          'Reference check in progress',
          'Final round interview'
        ][Math.floor(Math.random() * 4)] : undefined,
        interviewDate: Math.random() > 0.8 ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined
      }));
      
      setAppliedJobs(mockAppliedJobs);
      setFilteredJobs(mockAppliedJobs);
      setIsLoading(false);
    }, 1000);
  }, [user, router]);

  // Filter jobs based on search and status
  useEffect(() => {
    let filtered = appliedJobs;

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    setFilteredJobs(filtered);
  }, [appliedJobs, searchTerm, statusFilter]);

  if (!user || user.role !== 'user') {
    return null;
  }

  const handleBackToDashboard = () => {
    router.push(ROUTES.user.dashboard);
  };

  const handleViewJob = (job: AppliedJob) => {
    router.push(`/user/jobs/${job.id}`);
  };

  const getStatusColor = (status: AppliedJob['status']) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shortlisted': return 'bg-green-100 text-green-800 border-green-200';
      case 'interview': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'offered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: AppliedJob['status']) => {
    switch (status) {
      case 'applied': return <FileText className="h-4 w-4" />;
      case 'reviewing': return <ClockIcon className="h-4 w-4" />;
      case 'shortlisted': return <TrendingUp className="h-4 w-4" />;
      case 'interview': return <Calendar className="h-4 w-4" />;
      case 'offered': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: AppliedJob['status']) => {
    switch (status) {
      case 'applied': return 'Applied';
      case 'reviewing': return 'Under Review';
      case 'shortlisted': return 'Shortlisted';
      case 'interview': return 'Interview';
      case 'offered': return 'Offer Received';
      case 'rejected': return 'Not Selected';
      default: return 'Unknown';
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffTime = Math.abs(now.getTime() - past.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getApplicationStats = () => {
    const stats = {
      total: appliedJobs.length,
      applied: appliedJobs.filter(job => job.status === 'applied').length,
      reviewing: appliedJobs.filter(job => job.status === 'reviewing').length,
      shortlisted: appliedJobs.filter(job => job.status === 'shortlisted').length,
      interview: appliedJobs.filter(job => job.status === 'interview').length,
      offered: appliedJobs.filter(job => job.status === 'offered').length,
      rejected: appliedJobs.filter(job => job.status === 'rejected').length,
    };
    return stats;
  };

  const stats = getApplicationStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { href: ROUTES.user.dashboard, label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
            { href: ROUTES.user.appliedJobs, label: 'Applied Jobs', icon: <User className="h-4 w-4" /> },
          ]}
        />

        {/* Page Header with Filters */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={handleBackToDashboard}>
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Applied Jobs</h1>
              <div className="w-[100px]"></div> {/* Spacer to balance the layout */}
            </div>
            <PageHeader
              title=""
              onBack={() => {}}
              filters={[
                {
                  label: "Search",
                  value: searchTerm,
                  type: "search",
                  placeholder: "Search applied jobs...",
                  onChange: (value) => setSearchTerm(value as string)
                },
                {
                  label: "Status",
                  value: statusFilter,
                  options: [
                    { value: "all", label: "All Statuses" },
                    { value: "applied", label: "Applied" },
                    { value: "reviewing", label: "Under Review" },
                    { value: "shortlisted", label: "Shortlisted" },
                    { value: "interview", label: "Interview" },
                    { value: "offered", label: "Offer Received" },
                    { value: "rejected", label: "Not Selected" }
                  ],
                  onChange: (value) => setStatusFilter(value as string)
                }
              ]}
              onClearFilters={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            />
          </CardHeader>
        </Card>

        {/* Application Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-6">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.applied}</div>
              <div className="text-sm text-gray-600">Applied</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{stats.reviewing}</div>
              <div className="text-sm text-gray-600">Reviewing</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.shortlisted}</div>
              <div className="text-sm text-gray-600">Shortlisted</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{stats.interview}</div>
              <div className="text-sm text-gray-600">Interview</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-emerald-600">{stats.offered}</div>
              <div className="text-sm text-gray-600">Offered</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredJobs.length} of {appliedJobs.length} applied jobs
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Applied Jobs List */}
        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No applications found</h3>
              <p className="text-gray-600 mb-4">
                {appliedJobs.length === 0 
                  ? "You haven't applied to any jobs yet. Start exploring opportunities!"
                  : "Try adjusting your search criteria or filters to find your applications."
                }
              </p>
              {appliedJobs.length === 0 && (
                <Button onClick={() => router.push(ROUTES.user.jobs)}>
                  Browse Jobs
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Company Logo */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-8 w-8 text-gray-400" />
                    </div>

                    {/* Job Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {job.jobTitle}
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
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
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(job.status)} border-2 flex items-center gap-1`}
                        >
                          {getStatusIcon(job.status)}
                          {getStatusLabel(job.status)}
                        </Badge>
                      </div>

                      {/* Application Timeline */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            Applied: {getTimeAgo(job.applicationDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            Updated: {getTimeAgo(job.lastUpdate)}
                          </span>
                        </div>
                        {job.nextStep && (
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-400" />
                            <span className="text-blue-600 font-medium">
                              {job.nextStep}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Next Steps & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {job.recruiterContact && (
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Mail className="mr-2 h-4 w-4" />
                                Contact
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Phone className="mr-2 h-4 w-4" />
                                Call
                              </Button>
                            </div>
                          )}
                          {job.interviewDate && (
                            <div className="flex items-center gap-2 text-sm text-purple-600">
                              <Calendar className="h-4 w-4" />
                              <span>Interview: {dayjs(job.interviewDate).format("DD MMM YYYY")}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewJob(job)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Job
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Track
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
