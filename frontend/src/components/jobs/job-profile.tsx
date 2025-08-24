import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/page-header';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users,
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  GraduationCap,
  Star
} from 'lucide-react';
import { Job } from './jobs-columns';
import dayjs from 'dayjs';

interface JobProfileProps {
  job: Job;
  onBack: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function JobProfile({ 
  job, 
  onBack,
  onDelete,
  onEdit
}: JobProfileProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          title={`Job Details`}
          onBack={onBack}
          actions={[
            {
              label: 'Edit',
              onClick: onEdit,
              variant: 'outline',
              icon: <Edit className="h-4 w-4" />
            },
            {
              label: 'Delete',
              onClick: onDelete,
              variant: 'destructive',
              icon: <Trash2 className="h-4 w-4" />
            }
          ]}
        />

        {/* Main Grid Container */}
        <div className="space-y-6">
          {/* Basic Job Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Basic Job Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Column 1: Job Title + Job Type */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-xl font-semibold">{job.jobTitle}</div>
                    <span className="text-sm font-medium text-muted-foreground">Job Title</span>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary">{job.jobType}</Badge>
                    <span className="text-sm font-medium text-muted-foreground">Job Type</span>
                  </div>
                </div>

                {/* Column 2: Industry + Department */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-base font-semibold">{job.industry}</div>
                    <span className="text-sm font-medium text-muted-foreground">Industry</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base font-semibold">{job.department}</div>
                    <span className="text-sm font-medium text-muted-foreground">Department</span>
                  </div>
                </div>

                {/* Column 3: Role + Work Mode */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-base font-semibold">{job.role}</div>
                    <span className="text-sm font-medium text-muted-foreground">Role / Designation</span>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary">{job.workMode}</Badge>
                    <span className="text-sm font-medium text-muted-foreground">Work Mode</span>
                  </div>
                </div>

                {/* Column 4: Status + Priority */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Badge variant={job.status === 'active' ? 'default' : job.status === 'closed' ? 'destructive' : 'secondary'}>
                      {job.status}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">Status</span>
                  </div>
                  <div className="space-y-2">
                    <Badge variant={job.priority === 'high' ? 'destructive' : job.priority === 'medium' ? 'default' : 'secondary'}>
                      {job.priority}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">Priority</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <div className="text-xl font-semibold">{job.companyName}</div>
                  <span className="text-sm font-medium text-muted-foreground">Company Name</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.companyId}</div>
                  <span className="text-sm font-medium text-muted-foreground">Company ID</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.companyLocation}</div>
                  <span className="text-sm font-medium text-muted-foreground">Company Location</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{dayjs(job.datePosted).format("DD MMM YYYY")}</div>
                  <span className="text-sm font-medium text-muted-foreground">Date Posted</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <div className="text-base">{job.location}</div>
                  <span className="text-sm font-medium text-muted-foreground">Location</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.city}</div>
                  <span className="text-sm font-medium text-muted-foreground">City</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.state}</div>
                  <span className="text-sm font-medium text-muted-foreground">State</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.country}</div>
                  <span className="text-sm font-medium text-muted-foreground">Country</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.pincode}</div>
                  <span className="text-sm font-medium text-muted-foreground">Pincode / Zip Code</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Requirements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5" />
                Skills & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills && job.requiredSkills.length > 0 ? (
                      job.requiredSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No skills specified</span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Required Skills</span>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {job.preferredSkills && job.preferredSkills.length > 0 ? (
                      job.preferredSkills.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No preferred skills</span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Preferred Skills</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">
                    {job.experienceRequired ? 
                      `${job.experienceRequired.minYears}${job.experienceRequired.maxYears ? `-${job.experienceRequired.maxYears}` : '+'} years` : 
                      'Experience not specified'
                    }
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Experience Required</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.educationRequired || 'Not specified'}</div>
                  <span className="text-sm font-medium text-muted-foreground">Education Required</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">
                    {job.certifications && job.certifications.length > 0 ? 
                      `${job.certifications.length} cert(s)` : 'None'
                    }
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Certifications</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">
                    {job.languages && job.languages.length > 0 ? 
                      `${job.languages.length} lang(s)` : 'None'
                    }
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Languages</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation & Benefits */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Compensation & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <div className="text-base">
                    {job.salaryRange ? 
                      `${job.currency} ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}` : 
                      'Salary not specified'
                    }
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Salary Range</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.currency}</div>
                  <span className="text-sm font-medium text-muted-foreground">Currency</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">
                    {job.additionalBenefits && job.additionalBenefits.length > 0 ? 
                      job.additionalBenefits.slice(0, 2).join(', ') : 'None'
                    }
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Additional Benefits</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Details & Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Job Details & Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <div className="text-base">{job.numberOfOpenings}</div>
                  <span className="text-sm font-medium text-muted-foreground">Number of Openings</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.employmentStartDate || 'Not specified'}</div>
                  <span className="text-sm font-medium text-muted-foreground">Employment Start Date</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.applicationDeadline || 'Not specified'}</div>
                  <span className="text-sm font-medium text-muted-foreground">Application Deadline</span>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">{job.shiftTiming}</Badge>
                  <span className="block text-sm font-medium text-muted-foreground">Shift Timing</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.noticePeriodPreference || 'Not specified'}</div>
                  <span className="text-sm font-medium text-muted-foreground">Notice Period Preference</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">
                    {job.workAuthorizationRequirements && job.workAuthorizationRequirements.length > 0 ? 
                      job.workAuthorizationRequirements.join(', ') : 'Not specified'
                    }
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Work Authorization</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{dayjs(job.lastUpdated).format("DD MMM YYYY")}</div>
                  <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base">{job.postedBy}</div>
                  <span className="text-sm font-medium text-muted-foreground">Posted By</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card className="col-span-4">
            <CardHeader className="pb-3">
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="prose max-w-none">
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {job.jobDescription}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Documents & Attachments */}
          <Card className="col-span-4">
            <CardHeader className="pb-3">
              <CardTitle>Documents & Attachments</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Job Description.pdf</p>
                      <p className="text-sm text-muted-foreground">Updated {dayjs(job.datePosted).format("DD MMM YYYY")}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Company Profile.pdf</p>
                      <p className="text-sm text-muted-foreground">Company information</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
}
