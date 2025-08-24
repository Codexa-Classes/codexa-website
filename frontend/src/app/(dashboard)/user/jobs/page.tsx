'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign, 
  Users, 
  Eye, 
  Calendar,
  ChevronDown,
  Star,
  Bookmark,
  Briefcase,
  GraduationCap,
  Globe,
  Zap
} from 'lucide-react';
import { mockJobs } from '@/lib/mock/jobs';
import { jobsService } from '@/lib/services/jobsService';
import { Job } from '@/components/jobs/jobs-columns';
import { Label } from '@/components/ui/label';
import dayjs from 'dayjs';

export default function UserJobsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    workMode: [] as string[],
    experience: [] as string[],
    department: [] as string[],
    location: [] as string[],
    salary: [] as string[],
    companyType: [] as string[],
    industry: [] as string[],
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push(ROUTES.login);
      return;
    }
    
    // Initialize jobs from local storage
    jobsService.initializeWithSampleData();
    // Set sample data if storage is empty
    const existingJobs = jobsService.getAllJobs();
    if (existingJobs.length === 0) {
      jobsService.setSampleData(mockJobs);
    }
    const activeJobs = jobsService.getActiveJobs();
    setJobs(activeJobs);
    setFilteredJobs(activeJobs);
  }, [user, router]);

  // Apply filters and search
  useEffect(() => {
    let filtered = jobs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply work mode filter
    if (selectedFilters.workMode.length > 0) {
      filtered = filtered.filter(job => selectedFilters.workMode.includes(job.workMode));
    }

    // Apply experience filter
    if (selectedFilters.experience.length > 0) {
      filtered = filtered.filter(job => {
        const minExp = job.experienceRequired.minYears;
        return selectedFilters.experience.some(exp => {
          if (exp === '0-2') return minExp <= 2;
          if (exp === '3-5') return minExp >= 3 && minExp <= 5;
          if (exp === '6-10') return minExp >= 6 && minExp <= 10;
          if (exp === '10+') return minExp > 10;
          return true;
        });
      });
    }

    // Apply department filter
    if (selectedFilters.department.length > 0) {
      filtered = filtered.filter(job => selectedFilters.department.includes(job.department));
    }

    // Apply location filter
    if (selectedFilters.location.length > 0) {
      filtered = filtered.filter(job => selectedFilters.location.includes(job.location));
    }

    // Apply salary filter
    if (selectedFilters.salary.length > 0) {
      filtered = filtered.filter(job => {
        const avgSalary = (job.salaryRange.min + job.salaryRange.max) / 2;
        return selectedFilters.salary.some(salary => {
          if (salary === '0-3') return avgSalary <= 300000;
          if (salary === '3-6') return avgSalary > 300000 && avgSalary <= 600000;
          if (salary === '6-10') return avgSalary > 600000 && avgSalary <= 1000000;
          if (salary === '10+') return avgSalary > 1000000;
          return true;
        });
      });
    }

    // Apply company type filter
    if (selectedFilters.companyType.length > 0) {
      filtered = filtered.filter(job => {
        // Mock company type based on company name
        const companyName = job.companyName.toLowerCase();
        if (companyName.includes('tech') || companyName.includes('software')) return selectedFilters.companyType.includes('tech');
        if (companyName.includes('consulting') || companyName.includes('services')) return selectedFilters.companyType.includes('consulting');
        if (companyName.includes('bank') || companyName.includes('finance')) return selectedFilters.companyType.includes('finance');
        return true;
      });
    }

    // Apply industry filter
    if (selectedFilters.industry.length > 0) {
      filtered = filtered.filter(job => selectedFilters.industry.includes(job.industry));
    }

    // Apply sorting
    switch (sortBy) {
      case 'relevance':
        // Keep original order
        break;
      case 'datePosted':
        filtered = [...filtered].sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
        break;
      case 'salary':
        filtered = [...filtered].sort((a, b) => (b.salaryRange.max + b.salaryRange.min) - (a.salaryRange.max + a.salaryRange.min));
        break;
      case 'experience':
        filtered = [...filtered].sort((a, b) => a.experienceRequired.minYears - b.experienceRequired.minYears);
        break;
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedFilters, sortBy]);

  if (!user || user.role !== 'user') {
    return null;
  }

  const handleViewJob = (job: Job) => {
    router.push(`/user/jobs/${job.id}`);
  };

  const handleApplyJob = (job: Job) => {
    // TODO: Implement job application
    console.log('Apply for job:', job.jobTitle);
    alert(`Applied for: ${job.jobTitle}`);
    
    // TODO: Implement application tracking
    // For now, just refresh the jobs
    const activeJobs = jobsService.getActiveJobs();
    setJobs(activeJobs);
  };

  const handleBackToDashboard = () => {
    router.push(ROUTES.user.dashboard);
  };

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      workMode: [],
      experience: [],
      department: [],
      location: [],
      salary: [],
      companyType: [],
      industry: [],
    });
    setSearchTerm('');
  };

  // Get unique values for filters
  const workModes = Array.from(new Set(jobs.map(job => job.workMode)));
  const departments = Array.from(new Set(jobs.map(job => job.department)));
  const locations = Array.from(new Set(jobs.map(job => job.location)));
  const industries = Array.from(new Set(jobs.map(job => job.industry)));

  const experienceRanges = [
    { label: '0-2 years', value: '0-2' },
    { label: '3-5 years', value: '3-5' },
    { label: '6-10 years', value: '6-10' },
    { label: '10+ years', value: '10+' },
  ];

  const salaryRanges = [
    { label: '0-3 Lakhs', value: '0-3' },
    { label: '3-6 Lakhs', value: '3-6' },
    { label: '6-10 Lakhs', value: '6-10' },
    { label: '10+ Lakhs', value: '10+' },
  ];

  const companyTypes = [
    { label: 'Tech', value: 'tech' },
    { label: 'Consulting', value: 'consulting' },
    { label: 'Finance', value: 'finance' },
  ];

  const getJobPostedTime = (datePosted: string) => {
    const posted = dayjs(datePosted);
    return posted.format("DD MMM YYYY");
  };

  const getCompanyRating = (companyName: string) => {
    // Mock rating based on company name
    const ratings: { [key: string]: number } = {
      'TechCorp Inc.': 4.2,
      'InnovateSoft': 3.8,
      'Digital Solutions': 4.0,
      'WebTech': 3.6,
      'CodeCraft': 4.1,
    };
    return ratings[companyName] || 3.5;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleBackToDashboard}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Browse Jobs</h1>
              <p className="text-sm text-gray-600">
                Find your next career opportunity from our available job postings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">All Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {showFilters && (
                <div className="space-y-6">
                  {/* Work Mode Filter */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-gray-900">
                      <span className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Work Mode
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {workModes.map((mode) => (
                        <div key={mode} className="flex items-center space-x-2">
                          <Checkbox
                            id={`workMode-${mode}`}
                            checked={selectedFilters.workMode.includes(mode)}
                            onCheckedChange={() => toggleFilter('workMode', mode)}
                          />
                          <Label htmlFor={`workMode-${mode}`} className="text-sm text-gray-600">
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Experience Filter */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-gray-900">
                      <span className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        Experience
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {experienceRanges.map((range) => (
                        <div key={range.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`experience-${range.value}`}
                            checked={selectedFilters.experience.includes(range.value)}
                            onCheckedChange={() => toggleFilter('experience', range.value)}
                          />
                          <Label htmlFor={`experience-${range.value}`} className="text-sm text-gray-600">
                            {range.label}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Department Filter */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-gray-900">
                      <span className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Department
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {departments.map((dept) => (
                        <div key={dept} className="flex items-center space-x-2">
                          <Checkbox
                            id={`dept-${dept}`}
                            checked={selectedFilters.department.includes(dept)}
                            onCheckedChange={() => toggleFilter('department', dept)}
                          />
                          <Label htmlFor={`dept-${dept}`} className="text-sm text-gray-600">
                            {dept}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Location Filter */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-gray-900">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {locations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${location}`}
                            checked={selectedFilters.location.includes(location)}
                            onCheckedChange={() => toggleFilter('location', location)}
                          />
                          <Label htmlFor={`location-${location}`} className="text-sm text-gray-600">
                            {location}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Salary Filter */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-gray-900">
                      <span className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Salary
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {salaryRanges.map((range) => (
                        <div key={range.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`salary-${range.value}`}
                            checked={selectedFilters.salary.includes(range.value)}
                            onCheckedChange={() => toggleFilter('salary', range.value)}
                          />
                          <Label htmlFor={`salary-${range.value}`} className="text-sm text-gray-600">
                            {range.label}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Company Type Filter */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-gray-900">
                      <span className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Company Type
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {companyTypes.map((type) => (
                        <div key={type.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`companyType-${type.value}`}
                            checked={selectedFilters.companyType.includes(type.value)}
                            onCheckedChange={() => toggleFilter('companyType', type.value)}
                          />
                          <Label htmlFor={`companyType-${type.value}`} className="text-sm text-gray-600">
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Industry Filter */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-gray-900">
                      <span className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Industry
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {industries.map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox
                            id={`industry-${industry}`}
                            checked={selectedFilters.industry.includes(industry)}
                            onCheckedChange={() => toggleFilter('industry', industry)}
                          />
                          <Label htmlFor={`industry-${industry}`} className="text-sm text-gray-600">
                            {industry}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
      </div>

          {/* Right Content - Jobs List */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs by title, company, skills, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="datePosted">Date Posted</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </div>

      {/* Results Summary */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
          Showing {filteredJobs.length} of {jobs.length} available jobs
        </p>
              {Object.values(selectedFilters).some(filters => filters.length > 0) && (
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
            Clear all filters
          </Button>
        )}
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find more opportunities.
            </p>
                  <Button onClick={clearAllFilters}>Clear all filters</Button>
          </CardContent>
        </Card>
      ) : (
              <div className="space-y-4">
          {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
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
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-xs text-gray-500">
                                      {getCompanyRating(job.companyName)}
                                    </span>
                                  </div>
                                </div>
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
                    </div>
                  </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Bookmark className="h-4 w-4" />
                              </Button>
                  </div>
                </div>

                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {job.jobDescription}
                          </p>

                          {/* Skills/Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.requiredSkills.slice(0, 6).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.requiredSkills.length > 6 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.requiredSkills.length - 6} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                                <span className="font-medium text-gray-700">
                                  ₹{Math.round(job.salaryRange.min / 1000)}K - ₹{Math.round(job.salaryRange.max / 1000)}K
                                </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-blue-600" />
                                <span>{job.numberOfOpenings} openings</span>
                    </div>
                              <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                                <span>{getJobPostedTime(job.datePosted)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewJob(job)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleApplyJob(job)}
                  >
                    Apply Now
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
      </div>
    </div>
  );
}
