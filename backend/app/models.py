from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    mobile = Column(String(20), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Course(Base):
    __tablename__ = "courses"
    
    # Primary fields
    id = Column(Integer, primary_key=True, index=True)
    
    # Basic Course Information
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)  # frontend, web, business, data, devops, database, support
    duration = Column(String(100), nullable=False)
    level = Column(String(20), nullable=False)  # beginner, intermediate, advanced
    price = Column(Integer, nullable=False)
    
    # Course Details
    icon = Column(String(255), nullable=True)
    icon_name = Column(String(100), nullable=True)
    career_path = Column(Text, nullable=True)
    instructor = Column(String(255), nullable=True)
    
    # Course Content
    topics = Column(Text, nullable=True)  # JSON string
    skills = Column(Text, nullable=True)  # JSON string
    projects = Column(Text, nullable=True)  # JSON string
    prerequisites = Column(Text, nullable=True)  # JSON string
    syllabus = Column(Text, nullable=True)  # JSON string
    
    # Enrollment & Status
    enrolled_students = Column(Text, nullable=True)  # JSON string
    students_count = Column(String(50), nullable=True)  # Display string like "500+"
    status = Column(String(20), default="published")  # draft, published, archived
    
    # System Fields
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Candidate(Base):
    __tablename__ = "candidates"
    
    # Primary fields
    id = Column(Integer, primary_key=True, index=True)
    
    # Admin-Required Fields (for account creation)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone_number = Column(String(20), nullable=False)
    date_of_birth = Column(DateTime, nullable=True)
    gender = Column(String(20), nullable=True)  # male, female, other, prefer-not-to-say
    address = Column(Text, nullable=False)
    pincode = Column(String(10), nullable=False)
    password = Column(String(255), nullable=False)  # hashed password for login
    course = Column(String(100), nullable=True)
    joining_date = Column(DateTime, nullable=True)
    fees_transaction_number = Column(String(100), nullable=True)
    job_admission = Column(Boolean, default=False)
    
    # Candidate Self-Update Fields (can be updated later)
    profile_title = Column(String(255), nullable=True)
    current_job_status = Column(String(20), nullable=True)  # employed, unemployed, student
    total_experience_years = Column(Integer, nullable=True)
    total_experience_months = Column(Integer, nullable=True)
    current_employer = Column(String(255), nullable=True)
    current_job_title = Column(String(255), nullable=True)
    primary_skills = Column(Text, nullable=True)  # JSON string
    secondary_skills = Column(Text, nullable=True)  # JSON string
    skill_proficiency_level = Column(String(20), nullable=True)  # beginner, intermediate, advanced, expert
    certifications = Column(Text, nullable=True)  # JSON string
    highest_qualification = Column(String(255), nullable=True)
    specialization = Column(String(255), nullable=True)
    university = Column(String(255), nullable=True)
    year_of_passing = Column(Integer, nullable=True)
    grades = Column(String(50), nullable=True)
    preferred_job_type = Column(String(20), nullable=True)  # full-time, part-time, internship, remote
    preferred_industry = Column(String(255), nullable=True)
    preferred_roles = Column(Text, nullable=True)  # JSON string
    expected_salary = Column(String(100), nullable=True)
    work_mode_preference = Column(String(20), nullable=True)  # on-site, hybrid, remote
    notice_period = Column(String(50), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    portfolio_url = Column(String(500), nullable=True)
    languages = Column(Text, nullable=True)  # JSON string
    work_authorization = Column(String(255), nullable=True)
    
    # System Fields
    status = Column(String(20), default="pending")  # pending, approved, rejected
    priority = Column(String(10), default="medium")  # low, medium, high
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Job(Base):
    __tablename__ = "jobs"
    
    # Primary fields
    id = Column(Integer, primary_key=True, index=True)
    
    # Basic Job Information
    job_title = Column(String(255), nullable=False)
    job_description = Column(Text, nullable=False)
    job_type = Column(String(20), nullable=False)  # full-time, part-time, contract, internship, freelance
    work_mode = Column(String(20), nullable=False)  # on-site, hybrid, remote
    industry = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False)
    
    # Company Details
    company_id = Column(String(50), nullable=True)
    company_name = Column(String(255), nullable=False)
    company_location = Column(String(255), nullable=True)
    
    # Location Details
    location = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True)
    pincode = Column(String(20), nullable=True)
    
    # Skills & Requirements
    required_skills = Column(Text, nullable=True)  # JSON string
    preferred_skills = Column(Text, nullable=True)  # JSON string
    experience_min_years = Column(Integer, nullable=True)
    experience_max_years = Column(Integer, nullable=True)
    education_required = Column(String(255), nullable=True)
    certifications = Column(Text, nullable=True)  # JSON string
    languages = Column(Text, nullable=True)  # JSON string
    
    # Compensation
    salary_min = Column(Integer, nullable=True)
    salary_max = Column(Integer, nullable=True)
    currency = Column(String(10), default="USD")
    additional_benefits = Column(Text, nullable=True)  # JSON string
    
    # Other Job Attributes
    number_of_openings = Column(Integer, default=1)
    employment_start_date = Column(DateTime, nullable=True)
    application_deadline = Column(DateTime, nullable=True)
    shift_timing = Column(String(20), nullable=True)  # day, night, rotational
    notice_period_preference = Column(String(50), nullable=True)
    work_authorization_requirements = Column(Text, nullable=True)  # JSON string
    
    # System / Metadata
    status = Column(String(20), default="active")  # active, closed, draft
    priority = Column(String(10), default="medium")  # low, medium, high
    date_posted = Column(DateTime, default=datetime.utcnow)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    posted_by = Column(String(100), nullable=False)  # Recruiter/Admin ID
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
