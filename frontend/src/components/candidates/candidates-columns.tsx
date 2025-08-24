import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Eye, Edit, Trash2, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import {
  createTextColumn,
  createBadgeColumn,
  createPriorityColumn,
  createStatusColumn,
  createDateColumn,
  BaseColumn
} from '@/components/ui/table-columns';

export interface Candidate {
  id: string;
  // Admin-Required Fields (for account creation)
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: Date; // optional
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say'; // optional
  address: string;
  pincode: string;
  password: string; // for login
  course?: string;
  joiningDate?: Date;
  feesTransactionNumber?: string;
  jobAdmission?: boolean;
  
  // Candidate Self-Update Fields (can be updated later)
  profileTitle?: string;
  currentJobStatus?: 'employed' | 'unemployed' | 'student';
  totalExperience?: {
    years: number;
    months: number;
  };
  currentEmployer?: string;
  currentJobTitle?: string;
  primarySkills?: string[];
  secondarySkills?: string[];
  skillProficiencyLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  certifications?: string[];
  highestQualification?: string;
  specialization?: string;
  university?: string;
  yearOfPassing?: number;
  grades?: string;
  preferredJobType?: 'full-time' | 'part-time' | 'internship' | 'remote';
  preferredIndustry?: string;
  preferredRoles?: string[];
  expectedSalary?: string;
  workModePreference?: 'on-site' | 'hybrid' | 'remote';
  noticePeriod?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  languages?: Array<{
    language: string;
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  }>;
  workAuthorization?: string;
  
  // System Fields
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt?: string;
}

interface CandidatesColumnsProps {
  onViewProfile: (candidate: Candidate) => void;
  onEdit: (candidate: Candidate) => void;
  onDelete: (candidate: Candidate) => void;
  onScheduleInterview: (candidate: Candidate) => void;
  onApprove: (candidate: Candidate) => void;
  onReject: (candidate: Candidate) => void;
}

export const createCandidatesColumns = ({
  onViewProfile,
  onEdit,
  onDelete,
  onScheduleInterview,
  onApprove,
  onReject
}: CandidatesColumnsProps): BaseColumn[] => [
  {
    id: 'select',
    header: () => (
      <Checkbox
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={false}
        onCheckedChange={() => {}}
        aria-label="Select row"
      />
    ),
  },
  {
    id: 'fullName',
    header: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 flex items-center gap-1">
            Candidate
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Sort</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ChevronDown className="mr-2 h-4 w-4" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ChevronDown className="mr-2 h-4 w-4" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Hide
          </DropdownMenuItem>
          <DropdownMenuItem>
            Documentation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    cell: ({ row }: any) => (
      <div className="space-y-1">
        <div className="font-medium">{row.getValue('fullName')}</div>
        <div className="text-sm text-muted-foreground max-w-[200px] truncate">
          {row.original.email}
        </div>
        <div className="text-xs text-muted-foreground">
          {row.original.location}, {row.original.city}
        </div>
      </div>
    ),
  },
  createBadgeColumn('status', 'Status'),
  createBadgeColumn('priority', 'Priority'),
  {
    id: 'phoneNumber',
    header: 'Contact',
    cell: ({ row }: any) => (
      <div className="text-sm">
        <div>{row.original.phoneNumber}</div>
        <div className="text-muted-foreground">{row.original.email}</div>
      </div>
    ),
  },
  {
    id: 'primarySkills',
    header: 'Skills',
    cell: ({ row }: any) => (
      <div className="text-sm">
        {row.original.primarySkills && row.original.primarySkills.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {row.original.primarySkills.slice(0, 2).map((skill: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {skill}
              </span>
            ))}
            {row.original.primarySkills.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{row.original.primarySkills.length - 2}
              </span>
            )}
          </div>
        ) : (
          <span className="text-muted-foreground">No skills added</span>
        )}
      </div>
    ),
  },
  createDateColumn('createdAt', 'Created'),
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: any) => {
      const candidate = row.original as Candidate;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onViewProfile(candidate)}>
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(candidate)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(candidate)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onScheduleInterview(candidate)}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Schedule Interview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onApprove(candidate)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onReject(candidate)}>
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
