from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# User schemas
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    full_name: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str]
    is_active: bool
    is_admin: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Course schemas
class CourseCreate(BaseModel):
    title: str
    description: Optional[str] = None
    duration: Optional[str] = None
    price: Optional[str] = None
    instructor: Optional[str] = None

class CourseResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    duration: Optional[str]
    price: Optional[str]
    instructor: Optional[str]
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[str] = None
    price: Optional[str] = None
    instructor: Optional[str] = None

# Candidate schemas
class CandidateCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    course_id: Optional[int] = None

class CandidateResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    course_id: Optional[int]
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class CandidateUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    course_id: Optional[int] = None
    status: Optional[str] = None

# Job schemas
class JobCreate(BaseModel):
    title: str
    company: str
    location: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    salary_range: Optional[str] = None

class JobResponse(BaseModel):
    id: int
    title: str
    company: str
    location: Optional[str]
    description: Optional[str]
    requirements: Optional[str]
    salary_range: Optional[str]
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class JobUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    salary_range: Optional[str] = None
