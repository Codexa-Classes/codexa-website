import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/page-header';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ROUTES } from '@/lib/constants';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  FileText,
  Download,
  Eye,
  Edit,
  Trash2,
  Home
} from 'lucide-react';
import { Candidate } from './candidates-columns';

interface CandidateProfileProps {
  candidate: Candidate;
  onBack: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export function CandidateProfile({ 
  candidate, 
  onBack,
  onDelete,
  onEdit
}: CandidateProfileProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { href: ROUTES.admin.dashboard, label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
          { href: ROUTES.admin.candidates, label: 'Candidates' },
          { label: candidate.fullName },
        ]}
      />

      <Card className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <PageHeader
            title={`Candidate Details`}
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
            {/* Personal Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Personal Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {candidate.profileTitle && (
                    <>
                      <div className="space-y-2">
                        <div className="text-xl font-semibold">{candidate.fullName}</div>
                        <span className="text-sm font-medium text-muted-foreground">Full Name</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-base">{candidate.profileTitle}</div>
                        <span className="text-sm font-medium text-muted-foreground">Profile Title</span>
                      </div>
                      <div className="space-y-2">
                        <Badge variant={candidate.status === 'approved' ? 'default' : candidate.status === 'rejected' ? 'destructive' : 'secondary'}>
                          {candidate.status}
                        </Badge>
                        <span className="text-sm font-medium text-muted-foreground">Status</span>
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <div className="text-base">{candidate.email}</div>
                    <span className="text-sm font-medium text-muted-foreground">Email</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base">{candidate.phoneNumber}</div>
                    <span className="text-sm font-medium text-muted-foreground">Phone</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base">{candidate.city}, {candidate.location}</div>
                    <span className="text-sm font-medium text-muted-foreground">Location</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base">{candidate.gender || 'Not specified'}</div>
                    <span className="text-sm font-medium text-muted-foreground">Gender</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base">{candidate.dateOfBirth || 'Not specified'}</div>
                    <span className="text-sm font-medium text-muted-foreground">Date of Birth</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base">{candidate.workAuthorization || 'Not specified'}</div>
                    <span className="text-sm font-medium text-muted-foreground">Work Authorization</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base">{candidate.noticePeriod || 'Not specified'}</div>
                    <span className="text-sm font-medium text-muted-foreground">Notice Period</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base">{new Date(candidate.createdAt).toLocaleDateString()}</div>
                    <span className="text-sm font-medium text-muted-foreground">Applied Date</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Status & Experience */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Professional Status & Experience</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Badge variant="secondary">{candidate.currentJobStatus || 'Not specified'}</Badge>
                    <span className="text-sm font-medium text-muted-foreground">Job Status</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base">{candidate.currentEmployer || 'Not specified'}</div>
                    <span className="text-sm font-medium text-muted-foreground">Current Employer</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base">{candidate.currentJobTitle || 'Not specified'}</div>
                    <span className="text-sm font-medium text-muted-foreground">Job Title</span>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary">{candidate.workModePreference || 'Not specified'}</Badge>
                    <span className="text-sm font-medium text-muted-foreground">Work Mode</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base">
                      {candidate.totalExperience ? 
                        `${candidate.totalExperience.years}+ years` : 
                        'Experience not specified'
                      }
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Total Experience</span>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary">{candidate.skillProficiencyLevel || 'Not specified'}</Badge>
                    <span className="text-sm font-medium text-muted-foreground">Skill Level</span>
                  </div>
                  <div className="space-y-2">
                    <Badge variant={candidate.priority === 'high' ? 'destructive' : candidate.priority === 'medium' ? 'default' : 'secondary'}>
                      {candidate.priority}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">Priority</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Education */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Skills & Education</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {candidate.primarySkills && candidate.primarySkills.length > 0 ? (
                        candidate.primarySkills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No skills specified</span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Primary Skills</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {candidate.secondarySkills && candidate.secondarySkills.length > 0 ? (
                        candidate.secondarySkills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No secondary skills</span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Secondary Skills</span>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="text-base">{candidate.highestQualification || 'Not specified'}</div>
                        <span className="text-sm font-medium text-muted-foreground">Qualification</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-base">{candidate.university || 'Not specified'}</div>
                        <span className="text-sm font-medium text-muted-foreground">University</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-base">{candidate.yearOfPassing || 'Not specified'}</div>
                        <span className="text-sm font-medium text-muted-foreground">Year of Passing</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Education</span>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="text-base">{candidate.specialization || 'Not specified'}</div>
                        <span className="text-sm font-medium text-muted-foreground">Specialization</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-base">
                          {candidate.certifications && candidate.certifications.length > 0 ? 
                            `${candidate.certifications.length} cert(s)` : 'None'
                          }
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">Certifications</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-base">
                          {candidate.languages && candidate.languages.length > 0 ? 
                            `${candidate.languages.length} lang(s)` : 'None'
                          }
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">Languages</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Additional Info</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Preferences & Professional Links */}
            <Card className="col-span-4">
              <CardHeader className="pb-3">
                <CardTitle>Job Preferences & Professional Links</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="text-sm">
                    <span className="font-medium">Job Type: </span>
                    <Badge variant="secondary">{candidate.preferredJobType || 'Not specified'}</Badge>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Work Mode: </span>
                    <Badge variant="secondary">{candidate.workModePreference || 'Not specified'}</Badge>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Industry: </span>
                    <span>{candidate.preferredIndustry || 'Not specified'}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Expected Salary: </span>
                    <span>{candidate.expectedSalary || 'Not specified'}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">LinkedIn: </span>
                    {candidate.linkedinUrl ? (
                      <a href={candidate.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View Profile
                      </a>
                    ) : (
                      <span className="text-muted-foreground">Not provided</span>
                    )}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Portfolio: </span>
                    {candidate.portfolioUrl ? (
                      <a href={candidate.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View Portfolio
                      </a>
                    ) : (
                      <span className="text-muted-foreground">Not provided</span>
                    )}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Preferred Roles: </span>
                    <span>
                      {candidate.preferredRoles && candidate.preferredRoles.length > 0 ? 
                        candidate.preferredRoles.slice(0, 2).join(', ') : 'Not specified'
                      }
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Work Auth: </span>
                    <span>{candidate.workAuthorization || 'Not specified'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="col-span-4">
              <CardHeader className="pb-3">
                <CardTitle>Documents & Portfolio</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Resume.pdf</p>
                        <p className="text-sm text-muted-foreground">Updated 2 days ago</p>
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
                        <p className="font-medium">Portfolio.pdf</p>
                        <p className="text-sm text-muted-foreground">Updated 1 week ago</p>
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
    </div>
  );
}
