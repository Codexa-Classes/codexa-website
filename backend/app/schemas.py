from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, List

# User schemas
class UserCreate(BaseModel):
    email: EmailStr
    mobile: str
    password: str
    full_name: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    mobile: str
    full_name: Optional[str]
    is_active: bool
    is_admin: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    mobile: Optional[str] = None
    password: Optional[str] = None
    full_name: Optional[str] = None
    is_active: Optional[bool] = None
    is_admin: Optional[bool] = None

class UserLogin(BaseModel):
    email_or_mobile: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# Course schemas
class CourseCreate(BaseModel):
    # Basic Course Information
    name: str
    description: str
    category: str  # frontend, web, business, data, devops, database, support
    duration: str
    level: str  # beginner, intermediate, advanced
    price: int
    
    # Course Details
    icon: Optional[str] = None
    icon_name: Optional[str] = None
    career_path: Optional[str] = None
    instructor: Optional[str] = None
    
    # Course Content
    topics: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    projects: Optional[List[str]] = None
    prerequisites: Optional[List[str]] = None
    syllabus: Optional[List[str]] = None
    
    # Enrollment & Status
    enrolled_students: Optional[List[str]] = None
    students_count: Optional[str] = None  # Display string like "500+"
    status: Optional[str] = "published"  # draft, published, archived

class CourseResponse(BaseModel):
    id: int
    # Basic Course Information
    name: str
    description: str
    category: str
    duration: str
    level: str
    price: int
    
    # Course Details
    icon: Optional[str] = Field(alias="image")
    icon_name: Optional[str] = Field(alias="iconName")
    careerPath: Optional[str] = Field(alias="careerPath")  # Map career_path to careerPath (camelCase)
    instructor: Optional[str]
    
    # Course Content
    topics: Optional[List[str]]
    skills: Optional[List[str]]
    projects: Optional[List[str]]
    prerequisites: Optional[List[str]]
    syllabus: Optional[List[str]]
    
    # Enrollment & Status
    enrolled_students: Optional[List[str]] = Field(alias="enrolledStudents")
    students: Optional[str]  # Changed from students_count to students (string)
    status: str
    
    # System Fields
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
    
    class Config:
        from_attributes = True
        populate_by_name = True

class CourseUpdate(BaseModel):
    # All fields optional for updates
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    duration: Optional[str] = None
    level: Optional[str] = None
    price: Optional[int] = None
    icon: Optional[str] = None
    icon_name: Optional[str] = None
    career_path: Optional[str] = None
    instructor: Optional[str] = None
    topics: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    projects: Optional[List[str]] = None
    prerequisites: Optional[List[str]] = None
    syllabus: Optional[List[str]] = None
    enrolled_students: Optional[List[str]] = None
    students_count: Optional[str] = None
    status: Optional[str] = None

# Candidate schemas
class CandidateCreate(BaseModel):
    # Admin-Required Fields (for account creation)
    full_name: str
    email: EmailStr
    phone_number: str
    date_of_birth: Optional[datetime] = None
    gender: Optional[str] = None  # male, female, other, prefer-not-to-say
    address: str
    pincode: str
    password: str
    course: Optional[str] = None
    joining_date: Optional[datetime] = None
    fees_transaction_number: Optional[str] = None
    job_admission: Optional[bool] = False
    
    # Optional fields that can be filled later
    profile_title: Optional[str] = None
    current_job_status: Optional[str] = None  # employed, unemployed, student
    total_experience_years: Optional[int] = None
    total_experience_months: Optional[int] = None
    current_employer: Optional[str] = None
    current_job_title: Optional[str] = None
    primary_skills: Optional[List[str]] = None
    secondary_skills: Optional[List[str]] = None
    skill_proficiency_level: Optional[str] = None  # beginner, intermediate, advanced, expert
    certifications: Optional[List[str]] = None
    highest_qualification: Optional[str] = None
    specialization: Optional[str] = None
    university: Optional[str] = None
    year_of_passing: Optional[int] = None
    grades: Optional[str] = None
    preferred_job_type: Optional[str] = None  # full-time, part-time, internship, remote
    preferred_industry: Optional[str] = None
    preferred_roles: Optional[List[str]] = None
    expected_salary: Optional[str] = None
    work_mode_preference: Optional[str] = None  # on-site, hybrid, remote
    notice_period: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    languages: Optional[List[dict]] = None  # [{"language": "English", "proficiency": "native"}]
    work_authorization: Optional[str] = None
    
    # System fields
    status: Optional[str] = "pending"  # pending, approved, rejected
    priority: Optional[str] = "medium"  # low, medium, high

class CandidateResponse(BaseModel):
    id: int
    # Admin-Required Fields
    full_name: str = Field(alias="fullName")
    email: str
    phone_number: str = Field(alias="phoneNumber")
    date_of_birth: Optional[datetime] = Field(alias="dateOfBirth")
    gender: Optional[str]
    address: str
    pincode: str
    course: Optional[str]
    joining_date: Optional[datetime] = Field(alias="joiningDate")
    fees_transaction_number: Optional[str] = Field(alias="feesTransactionNumber")
    job_admission: bool = Field(alias="jobAdmission")
    
    # Candidate Self-Update Fields
    profile_title: Optional[str] = Field(alias="profileTitle")
    current_job_status: Optional[str] = Field(alias="currentJobStatus")
    total_experience_years: Optional[int] = Field(alias="totalExperienceYears")
    total_experience_months: Optional[int] = Field(alias="totalExperienceMonths")
    current_employer: Optional[str] = Field(alias="currentEmployer")
    current_job_title: Optional[str] = Field(alias="currentJobTitle")
    primary_skills: Optional[List[str]] = Field(alias="primarySkills")
    secondary_skills: Optional[List[str]] = Field(alias="secondarySkills")
    skill_proficiency_level: Optional[str] = Field(alias="skillProficiencyLevel")
    certifications: Optional[List[str]]
    highest_qualification: Optional[str] = Field(alias="highestQualification")
    specialization: Optional[str]
    university: Optional[str]
    year_of_passing: Optional[int] = Field(alias="yearOfPassing")
    grades: Optional[str]
    preferred_job_type: Optional[str] = Field(alias="preferredJobType")
    preferred_industry: Optional[str] = Field(alias="preferredIndustry")
    preferred_roles: Optional[List[str]] = Field(alias="preferredRoles")
    expected_salary: Optional[str] = Field(alias="expectedSalary")
    work_mode_preference: Optional[str] = Field(alias="workModePreference")
    notice_period: Optional[str] = Field(alias="noticePeriod")
    linkedin_url: Optional[str] = Field(alias="linkedinUrl")
    portfolio_url: Optional[str] = Field(alias="portfolioUrl")
    languages: Optional[List[dict]]
    work_authorization: Optional[str] = Field(alias="workAuthorization")
    
    # System Fields
    status: str
    priority: str
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
    
    class Config:
        from_attributes = True
        populate_by_name = True

class CandidateUpdate(BaseModel):
    # All fields optional for updates
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    pincode: Optional[str] = None
    password: Optional[str] = None
    course: Optional[str] = None
    joining_date: Optional[datetime] = None
    fees_transaction_number: Optional[str] = None
    job_admission: Optional[bool] = None
    profile_title: Optional[str] = None
    current_job_status: Optional[str] = None
    total_experience_years: Optional[int] = None
    total_experience_months: Optional[int] = None
    current_employer: Optional[str] = None
    current_job_title: Optional[str] = None
    primary_skills: Optional[List[str]] = None
    secondary_skills: Optional[List[str]] = None
    skill_proficiency_level: Optional[str] = None
    certifications: Optional[List[str]] = None
    highest_qualification: Optional[str] = None
    specialization: Optional[str] = None
    university: Optional[str] = None
    year_of_passing: Optional[int] = None
    grades: Optional[str] = None
    preferred_job_type: Optional[str] = None
    preferred_industry: Optional[str] = None
    preferred_roles: Optional[List[str]] = None
    expected_salary: Optional[str] = None
    work_mode_preference: Optional[str] = None
    notice_period: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    languages: Optional[List[dict]] = None
    work_authorization: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None

# Job schemas
class JobCreate(BaseModel):
    # Basic Job Information
    job_title: str
    job_description: str
    job_type: str  # full-time, part-time, contract, internship, freelance
    work_mode: str  # on-site, hybrid, remote
    industry: str
    department: str
    role: str
    
    # Company Details
    company_id: Optional[str] = None
    company_name: str
    company_location: Optional[str] = None
    
    # Location Details
    location: str
    city: str
    state: Optional[str] = None
    country: Optional[str] = None
    pincode: Optional[str] = None
    
    # Skills & Requirements
    required_skills: Optional[List[str]] = None
    preferred_skills: Optional[List[str]] = None
    experience_min_years: Optional[int] = None
    experience_max_years: Optional[int] = None
    education_required: Optional[str] = None
    certifications: Optional[List[str]] = None
    languages: Optional[List[dict]] = None  # [{"language": "English", "proficiency": "fluent"}]
    
    # Compensation
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    currency: Optional[str] = "USD"
    additional_benefits: Optional[List[str]] = None
    
    # Other Job Attributes
    number_of_openings: Optional[int] = 1
    employment_start_date: Optional[datetime] = None
    application_deadline: Optional[datetime] = None
    shift_timing: Optional[str] = None  # day, night, rotational
    notice_period_preference: Optional[str] = None
    work_authorization_requirements: Optional[List[str]] = None
    
    # System / Metadata
    status: Optional[str] = "active"  # active, closed, draft
    priority: Optional[str] = "medium"  # low, medium, high
    posted_by: str  # Recruiter/Admin ID

class JobResponse(BaseModel):
    id: int
    # Basic Job Information
    job_title: str = Field(alias="jobTitle")
    job_description: str = Field(alias="jobDescription")
    job_type: str = Field(alias="jobType")
    work_mode: str = Field(alias="workMode")
    industry: str
    department: str
    role: str
    
    # Company Details
    company_id: Optional[str] = Field(alias="companyId")
    company_name: str = Field(alias="companyName")
    company_location: Optional[str] = Field(alias="companyLocation")
    
    # Location Details
    location: str
    city: str
    state: Optional[str]
    country: Optional[str]
    pincode: str
    
    # Skills & Requirements
    required_skills: Optional[List[str]] = Field(alias="requiredSkills")
    preferred_skills: Optional[List[str]] = Field(alias="preferredSkills")
    experience_min_years: Optional[int] = Field(alias="experienceMinYears")
    experience_max_years: Optional[int] = Field(alias="experienceMaxYears")
    education_required: Optional[str] = Field(alias="educationRequired")
    certifications: Optional[List[str]]
    languages: Optional[List[dict]]
    
    # Compensation
    salary_min: Optional[int] = Field(alias="salaryMin")
    salary_max: Optional[int] = Field(alias="salaryMax")
    currency: str
    additional_benefits: Optional[List[str]] = Field(alias="additionalBenefits")
    
    # Other Job Attributes
    number_of_openings: int = Field(alias="numberOfOpenings")
    employment_start_date: Optional[datetime] = Field(alias="employmentStartDate")
    application_deadline: Optional[datetime] = Field(alias="applicationDeadline")
    shift_timing: Optional[str] = Field(alias="shiftTiming")
    notice_period_preference: Optional[str] = Field(alias="noticePeriodPreference")
    work_authorization_requirements: Optional[List[str]] = Field(alias="workAuthorizationRequirements")
    
    # System / Metadata
    status: str
    priority: str
    date_posted: datetime = Field(alias="datePosted")
    last_updated: datetime = Field(alias="lastUpdated")
    posted_by: str = Field(alias="postedBy")
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
    
    class Config:
        from_attributes = True
        populate_by_name = True

class JobUpdate(BaseModel):
    # All fields optional for updates
    job_title: Optional[str] = None
    job_description: Optional[str] = None
    job_type: Optional[str] = None
    work_mode: Optional[str] = None
    industry: Optional[str] = None
    department: Optional[str] = None
    role: Optional[str] = None
    company_id: Optional[str] = None
    company_name: Optional[str] = None
    company_location: Optional[str] = None
    location: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    pincode: Optional[str] = None
    required_skills: Optional[List[str]] = None
    preferred_skills: Optional[List[str]] = None
    experience_min_years: Optional[int] = None
    experience_max_years: Optional[int] = None
    education_required: Optional[str] = None
    certifications: Optional[List[str]] = None
    languages: Optional[List[dict]] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    currency: Optional[str] = None
    additional_benefits: Optional[List[str]] = None
    number_of_openings: Optional[int] = None
    employment_start_date: Optional[datetime] = None
    application_deadline: Optional[datetime] = None
    shift_timing: Optional[str] = None
    notice_period_preference: Optional[str] = None
    work_authorization_requirements: Optional[List[str]] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    posted_by: Optional[str] = None

# Enquiry schemas
class EnquiryCreate(BaseModel):
    name: str
    mobile: str
    email: EmailStr
    pass_out_year: int
    technology: List[str]

class EnquiryResponse(BaseModel):
    id: int
    name: str
    mobile: str
    email: str
    pass_out_year: int = Field(alias="passOutYear")
    technology: List[str]
    status: str
    priority: str
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
    
    class Config:
        from_attributes = True
        populate_by_name = True

class EnquiryUpdate(BaseModel):
    name: Optional[str] = None
    mobile: Optional[str] = None
    email: Optional[EmailStr] = None
    pass_out_year: Optional[int] = None
    technology: Optional[List[str]] = None
    status: Optional[str] = None
    priority: Optional[str] = None
