'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PageHeader } from '@/components/forms';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar,
  Star,
  Bookmark,
  Share2,
  Eye,
  CheckCircle,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Globe,
  Zap,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';
import { jobsService } from '@/lib/services/jobsService';
import { Job } from '@/components/jobs/jobs-columns';
import dayjs from 'dayjs';

export default function JobDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isApplied, setIsApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push(ROUTES.login);
      return;
    }

    const loadJob = async () => {
      if (params.id) {
        const jobData = jobsService.getJobById(params.id as string);
        if (jobData) {
          setJob(jobData);
          // Check if user has already applied (mock data)
          setIsApplied(Math.random() > 0.7); // 30% chance of being applied
          setIsBookmarked(Math.random() > 0.8); // 20% chance of being bookmarked
        } else {
          router.push(ROUTES.user.jobs);
        }
      }
      setIsLoading(false);
    };

    loadJob();
  }, [user, router, params.id]);

  if (!user || user.role !== 'user') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button onClick={() => router.push(ROUTES.user.jobs)}>
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    // TODO: Implement actual application logic
    setIsApplied(true);
    // Show success message
    alert('Application submitted successfully!');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: job.jobTitle,
        text: `Check out this job opportunity: ${job.jobTitle} at ${job.companyName}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getJobPostedTime = (datePosted: string) => {
    const posted = dayjs(datePosted);
    return posted.format("DD MMM YYYY");
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PageHeader
            title="Job Details"
            onBack={() => router.push(ROUTES.user.jobs)}
            actionButton={{
              text: "Back to Jobs",
              onClick: () => router.push(ROUTES.user.jobs)
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-4">
                    {/* Company Logo */}
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-10 w-10 text-gray-400" />
                    </div>
                    
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {job.jobTitle}
                      </h1>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-lg font-semibold text-gray-700">
                            {job.companyName}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">
                              {getCompanyRating(job.companyName)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Job Meta Information */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {job.experienceRequired.minYears}-{job.experienceRequired.maxYears || job.experienceRequired.minYears + 2} years
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600 capitalize">{job.workMode}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600 capitalize">{job.jobType.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBookmark}
                      className={isBookmarked ? 'text-blue-600' : ''}
                    >
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Priority Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge 
                    variant="outline" 
                    className={`${getPriorityColor(job.priority)} border-2`}
                  >
                    {job.priority} Priority
                  </Badge>
                  {job.numberOfOpenings > 1 && (
                    <Badge variant="secondary">
                      {job.numberOfOpenings} Openings
                    </Badge>
                  )}
                </div>

                {/* Apply Button */}
                <div className="flex gap-3">
                  {isApplied ? (
                    <Button disabled className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Applied
                    </Button>
                  ) : (
                    <Button onClick={handleApply} className="bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </Button>
                  )}
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View Company Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {job.jobDescription}
                </p>
                
                <Separator className="my-6" />
                
                {/* Key Responsibilities */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Responsibilities</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Develop and maintain high-quality web applications using modern technologies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Collaborate with cross-functional teams to deliver exceptional user experiences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Write clean, maintainable, and well-documented code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Participate in code reviews and contribute to team best practices</span>
                    </li>
                  </ul>
                </div>

                {/* Required Skills */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Preferred Skills */}
                {job.preferredSkills && job.preferredSkills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferred Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.preferredSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Education Requirements
                    </h3>
                    <p className="text-gray-700">{job.educationRequired}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Experience Requirements
                    </h3>
                    <p className="text-gray-700">
                      {job.experienceRequired.minYears} - {job.experienceRequired.maxYears || job.experienceRequired.minYears + 2} years
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  About {job.companyName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {job.companyName} is a leading technology company focused on innovation and excellence. 
                  We are committed to creating cutting-edge solutions that drive business growth and user satisfaction.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job.companyLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job.industry}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Job Summary & Actions */}
          <div className="space-y-6">
            {/* Job Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Salary Range</span>
                  <span className="font-semibold text-gray-900">
                    ₹{Math.round(job.salaryRange.min / 1000)}K - ₹{Math.round(job.salaryRange.max / 1000)}K
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Experience</span>
                  <span className="font-semibold text-gray-900">
                    {job.experienceRequired.minYears} - {job.experienceRequired.maxYears || job.experienceRequired.minYears + 2} years
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Job Type</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {job.jobType.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Work Mode</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {job.workMode}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Posted</span>
                  <span className="font-semibold text-gray-900">
                    {getJobPostedTime(job.datePosted)}
                  </span>
                </div>
                
                {job.applicationDeadline && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Deadline</span>
                    <span className="font-semibold text-gray-900">
                      {dayjs(job.applicationDeadline).format("DD MMM YYYY")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Recruiter
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Company Website
                </Button>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Based on your profile and this job
                </p>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-gray-900">Frontend Developer</h4>
                    <p className="text-sm text-gray-600">TechCorp Inc.</p>
                    <p className="text-xs text-gray-500">₹80K - ₹120K</p>
                  </div>
                  <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-gray-900">React Developer</h4>
                    <p className="text-sm text-gray-600">InnovateSoft</p>
                    <p className="text-xs text-gray-500">₹90K - ₹140K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
