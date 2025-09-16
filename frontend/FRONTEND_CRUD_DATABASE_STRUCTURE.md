# Frontend CRUD Operations & Database Structure

## Overview

This document provides a comprehensive overview of all CRUD (Create, Read, Update, Delete) operations implemented in the frontend codebase, along with their corresponding database structures. The frontend uses both local storage and API services for data management.

## CRUD Operations Summary

### 1. **Candidates Management** 
- **Service**: `candidatesService` (`/lib/services/candidatesService.ts`)
- **Storage**: Local Storage (`job-portal-candidates`)
- **Components**: AddCandidateForm, EditCandidateForm, CandidateProfile, CandidatesColumns
- **Routes**: `/admin/candidates`, `/admin/candidates/add`, `/admin/candidates/[id]/edit`

### 2. **Jobs Management**
- **Service**: `jobsService` (`/lib/services/jobsService.ts`)
- **Storage**: Local Storage (`job-portal-jobs`)
- **Components**: AddJobForm, EditJobForm, JobProfile, JobsColumns
- **Routes**: `/admin/jobs`, `/admin/jobs/add`, `/admin/jobs/[id]/edit`, `/user/jobs`

### 3. **Courses Management**
- **Service**: `courseService` (`/lib/services/coursesService.ts`) + `adminCoursesApiService` (`/lib/services/coursesApi.ts`)
- **Storage**: Local Storage (`job_portal_courses`) + API Integration
- **Components**: AddCourseForm, EditCourseForm, CourseProfile, CoursesColumns
- **Routes**: `/admin/courses`, `/admin/courses/add`, `/admin/courses/[id]/edit`, `/user/courses`

### 4. **User Authentication & Profile**
- **Service**: `AuthService` (`/lib/services/auth.ts`, `/lib/services/authService.ts`)
- **Storage**: Local Storage (`access_token`, `user`) + API Integration
- **Components**: LoginForm, UserProfile
- **Routes**: `/login`, `/user/profile`

### 5. **Enquiries Management**
- **Service**: `firestoreEnquiryService` (`/lib/services/enquiry/firestoreEnquiryService.ts`) + `enquiryService` (`/lib/services/enquiry/enquiryService.ts`)
- **Storage**: Firebase Firestore + Local Storage (`job-portal-enquiries`)
- **Components**: EnquiryForm, EnquiryDashboard, EnquiryList
- **Routes**: `/candidate/enquiry`, `/admin/enquiry`

---

## Detailed Database Structures

### 1. Candidates Database Structure

```typescript
interface Candidate {
  id: string;
  
  // Admin-Required Fields (for account creation)
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  address: string;
  pincode: string;
  password: string;
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
  updatedAt: string;
}
```

**CRUD Operations:**
- **Create**: `candidatesService.createCandidate(data)`
- **Read**: `candidatesService.getAllCandidates()`, `candidatesService.getCandidateById(id)`, `candidatesService.searchCandidates(query)`
- **Update**: `candidatesService.updateCandidate(id, data)`
- **Delete**: `candidatesService.deleteCandidate(id)`

**Additional Features:**
- Filter by status, priority, location, skills
- Search functionality
- Statistics generation
- Status and priority updates

---

### 2. Jobs Database Structure

```typescript
interface Job {
  id: string;
  
  // Basic Job Information
  jobTitle: string;
  jobDescription: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  workMode: 'on-site' | 'hybrid' | 'remote';
  industry: string;
  department: string;
  role: string;
  
  // Company Details
  companyId: string;
  companyName: string;
  companyLocation: string;
  
  // Location Details
  location: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  
  // Skills & Requirements
  requiredSkills: string[];
  preferredSkills?: string[];
  experienceRequired: {
    minYears: number;
    maxYears?: number;
  };
  educationRequired: string;
  certifications?: string[];
  languages?: Array<{
    language: string;
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  }>;
  
  // Compensation
  salaryRange: {
    min: number;
    max: number;
  };
  currency: string;
  additionalBenefits?: string[];
  
  // Other Job Attributes
  numberOfOpenings: number;
  employmentStartDate?: string;
  applicationDeadline?: string;
  shiftTiming: 'day' | 'night' | 'rotational';
  noticePeriodPreference?: string;
  workAuthorizationRequirements?: string[];
  
  // System / Metadata
  status: 'active' | 'closed' | 'draft';
  priority: 'low' | 'medium' | 'high';
  datePosted: string;
  lastUpdated: string;
  postedBy: string; // Recruiter/Admin ID
  createdAt: string;
  updatedAt?: string;
}
```

**CRUD Operations:**
- **Create**: `jobsService.createJob(data)`
- **Read**: `jobsService.getAllJobs()`, `jobsService.getActiveJobs()`, `jobsService.getJobById(id)`, `jobsService.searchJobs(query)`
- **Update**: `jobsService.updateJob(id, data)`
- **Delete**: `jobsService.deleteJob(id)`

**Additional Features:**
- Filter by status, type, industry, location, salary range
- Search functionality
- Statistics generation
- Status toggle and updates
- Jobs expiring soon
- Recent jobs

---

### 3. Courses Database Structure

```typescript
interface Course {
  id: string;
  name: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'framework';
  duration: string;
  price: number;
  image: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published' | 'archived';
  prerequisites: string[];
  syllabus: string[];
  enrolledStudents: string[];
  createdAt: string;
  updatedAt: string;
}

interface EnrolledCourse extends Course {
  progress: number; // 0-100
  completedTopics: number;
  isCompleted: boolean;
  enrollmentDate: Date;
  certificateId?: string;
}

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'graduated';
  enrolledCourses: string[];
  completedCourses: string[];
  joinDate: string;
  lastActive: string;
}

interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  status: 'enrolled' | 'in-progress' | 'completed' | 'dropped';
  enrolledAt: string;
  completedAt?: string;
  progress: number; // 0-100
  certificateId?: string;
}
```

**CRUD Operations:**
- **Local Service**: `courseService.getAll()`, `courseService.getById(id)`, `courseService.create(data)`, `courseService.update(id, updates)`, `courseService.delete(id)`
- **API Service**: `adminCoursesApiService.create(data)`, `adminCoursesApiService.update(id, updates)`, `adminCoursesApiService.delete(id)`, `adminCoursesApiService.getAllAdmin()`

**Additional Features:**
- Filter by category
- Get published courses only
- Slug-based ID support
- Enrollment tracking

---

### 4. User Authentication & Profile Database Structure

```typescript
// Backend API User interface
interface BackendUser {
  id: number;
  email: string;
  mobile: string;
  full_name: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
}

// Frontend User interface
interface User {
  id: string;
  name: string;
  mobile: string;
  role: 'admin' | 'user';
  type: 'employee' | 'candidate';
  isAuthenticated: boolean;
}

// User Profile (Extended)
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  city: string;
  state: string;
  country: string;
  bio: string;
  experience: number;
  education: string;
  currentRole: string;
  desiredRole: string;
  skills: string[];
  languages: Array<{
    language: string;
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  }>;
  certifications: string[];
  availability: 'immediate' | '2-weeks' | '1-month' | '3-months' | 'negotiable';
  workMode: 'on-site' | 'hybrid' | 'remote' | 'flexible';
  expectedSalary: number;
  currency: string;
  resumeUrl?: string;
  profilePicture?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}

// Login credentials
interface LoginCredentials {
  mobile: string;
  password: string;
}
```

**CRUD Operations:**
- **Authentication**: `AuthService.login(credentials)`, `AuthService.logout()`, `AuthService.getCurrentUser()`
- **Profile Management**: User profile editing (local state management)

**Additional Features:**
- Token-based authentication
- Local storage persistence
- User role management
- Profile completion tracking

---

### 5. Enquiries Database Structure

```typescript
interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  passOutYear: number;
  technology: string[];
  timestamp: string;
  status: 'new' | 'contacted' | 'enrolled' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

interface CreateEnquiryData {
  name: string;
  mobile: string;
  email: string;
  passOutYear: number;
  technology: string[];
}

interface UpdateEnquiryData {
  id: string;
  status?: 'new' | 'contacted' | 'enrolled' | 'rejected';
  priority?: 'low' | 'medium' | 'high';
}

// Firestore Document Structure
interface EnquiryDocument {
  id: string;
  name: string;
  mobile: string;
  email: string;
  passOutYear: number;
  technology: string; // Stored as comma-separated string
  timestamp: Timestamp;
  status: 'new' | 'contacted' | 'enrolled' | 'rejected';
}
```

**CRUD Operations:**
- **Firestore Service**: `firestoreEnquiryService.createEnquiry(data)`, `firestoreEnquiryService.getAllEnquiries()`, `firestoreEnquiryService.updateEnquiryStatus(id, status)`, `firestoreEnquiryService.checkDuplicateEnquiry(email, mobile)`
- **Local Service**: `enquiryService.createEnquiry(data)`, `enquiryService.getAllEnquiries()`, `enquiryService.updateEnquiry(data)`, `enquiryService.deleteEnquiry(id)`

**Additional Features:**
- Duplicate enquiry detection
- Status management
- Priority management
- Technology filtering
- Year-based filtering

---

## Storage Mechanisms

### 1. **Local Storage**
- **Candidates**: `job-portal-candidates`
- **Jobs**: `job-portal-jobs`
- **Courses**: `job_portal_courses`
- **Enquiries**: `job-portal-enquiries`
- **Authentication**: `access_token`, `user`

### 2. **Firebase Firestore**
- **Enquiries**: `enquiries` collection
- **Real-time updates**
- **Cloud persistence**

### 3. **API Integration**
- **Courses**: Backend API integration for admin operations
- **Authentication**: Backend API for user management
- **Real-time data synchronization**

---

## Component Architecture

### Form Components
- **AddCandidateForm**: Create new candidates
- **EditCandidateForm**: Update existing candidates
- **AddJobForm**: Create new job postings
- **EditJobForm**: Update existing jobs
- **AddCourseForm**: Create new courses
- **EditCourseForm**: Update existing courses
- **EnquiryForm**: Submit enquiries
- **UserProfile**: Manage user profile

### List/Table Components
- **CandidatesColumns**: Candidates data table
- **JobsColumns**: Jobs data table
- **CoursesColumns**: Courses data table
- **EnquiryList**: Enquiries management

### Profile/Detail Components
- **CandidateProfile**: Detailed candidate view
- **JobProfile**: Detailed job view
- **CourseProfile**: Detailed course view

---

## Routes & Navigation

### Admin Routes
- `/admin/candidates` - Candidates management
- `/admin/candidates/add` - Add new candidate
- `/admin/candidates/[id]/edit` - Edit candidate
- `/admin/jobs` - Jobs management
- `/admin/jobs/add` - Add new job
- `/admin/jobs/[id]/edit` - Edit job
- `/admin/courses` - Courses management
- `/admin/courses/add` - Add new course
- `/admin/courses/[id]/edit` - Edit course
- `/admin/enquiry` - Enquiries management

### User Routes
- `/user/jobs` - Browse jobs
- `/user/courses` - Browse courses
- `/user/profile` - User profile management

### Public Routes
- `/candidate/enquiry` - Submit enquiry
- `/contact` - Contact form

---

## Key Features

### 1. **Data Validation**
- Form validation using Zod schemas
- Required field validation
- Email format validation
- Mobile number validation
- Custom validation rules

### 2. **Search & Filtering**
- Text-based search across multiple fields
- Filter by status, category, location, etc.
- Advanced filtering options
- Real-time search results

### 3. **State Management**
- Local state for form data
- Context API for authentication
- Local storage persistence
- Real-time updates

### 4. **User Experience**
- Toast notifications for feedback
- Loading states during operations
- Responsive design
- Mobile-friendly interfaces
- Confirmation dialogs for destructive actions

### 5. **Security**
- reCAPTCHA integration for forms
- Token-based authentication
- Role-based access control
- Input sanitization

---

## Integration Points

### 1. **Backend API Integration**
- Courses API for admin operations
- Authentication API for user management
- Real-time data synchronization

### 2. **Firebase Integration**
- Firestore for enquiries
- Real-time database updates
- Cloud persistence

### 3. **Local Storage**
- Browser-based data persistence
- Offline functionality
- Data migration support

---

This comprehensive database structure supports a full-featured job portal/educational platform with complete CRUD operations for all major entities, providing both local and cloud-based data management capabilities.
