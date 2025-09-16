from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, func
from typing import List, Optional
import json
from datetime import datetime
import uuid

from ..database import get_db
from ..models import Job, User
from ..schemas import JobCreate, JobResponse, JobUpdate
from ..auth import get_current_user

router = APIRouter()

def serialize_json_fields(job_data: dict) -> dict:
    """Convert list fields to JSON strings for database storage"""
    json_fields = ['required_skills', 'preferred_skills', 'certifications', 'languages', 'additional_benefits', 'work_authorization_requirements']
    for field in json_fields:
        if field in job_data and job_data[field] is not None:
            job_data[field] = json.dumps(job_data[field])
    return job_data

def deserialize_json_fields(job: Job) -> dict:
    """Convert JSON strings back to lists for API response"""
    job_dict = {
        'id': job.id,
        'job_title': job.job_title,
        'job_description': job.job_description,
        'job_type': job.job_type,
        'work_mode': job.work_mode,
        'industry': job.industry,
        'department': job.department,
        'role': job.role,
        'company_id': job.company_id,
        'company_name': job.company_name,
        'company_location': job.company_location,
        'location': job.location,
        'city': job.city,
        'state': job.state,
        'country': job.country,
        'pincode': job.pincode,
        'required_skills': json.loads(job.required_skills) if job.required_skills else None,
        'preferred_skills': json.loads(job.preferred_skills) if job.preferred_skills else None,
        'experience_min_years': job.experience_min_years,
        'experience_max_years': job.experience_max_years,
        'education_required': job.education_required,
        'certifications': json.loads(job.certifications) if job.certifications else None,
        'languages': json.loads(job.languages) if job.languages else None,
        'salary_min': job.salary_min,
        'salary_max': job.salary_max,
        'currency': job.currency,
        'additional_benefits': json.loads(job.additional_benefits) if job.additional_benefits else None,
        'number_of_openings': job.number_of_openings,
        'employment_start_date': job.employment_start_date,
        'application_deadline': job.application_deadline,
        'shift_timing': job.shift_timing,
        'notice_period_preference': job.notice_period_preference,
        'work_authorization_requirements': json.loads(job.work_authorization_requirements) if job.work_authorization_requirements else None,
        'status': job.status,
        'priority': job.priority,
        'date_posted': job.date_posted,
        'last_updated': job.last_updated,
        'posted_by': job.posted_by,
        'created_at': job.created_at,
        'updated_at': job.updated_at
    }
    return job_dict

@router.post("/", response_model=JobResponse)
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new job posting"""
    # Prepare job data
    job_data = job.dict(exclude_unset=True)
    
    # Serialize JSON fields
    job_data = serialize_json_fields(job_data)
    
    # Set posted_by to current user
    job_data['posted_by'] = current_user.id
    
    # Create job
    db_job = Job(**job_data)
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    return deserialize_json_fields(db_job)

@router.get("/", response_model=List[JobResponse])
def get_jobs(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    search: Optional[str] = Query(None, description="Search in job title, description, company"),
    status: Optional[str] = Query(None, description="Filter by status"),
    job_type: Optional[str] = Query(None, description="Filter by job type"),
    work_mode: Optional[str] = Query(None, description="Filter by work mode"),
    industry: Optional[str] = Query(None, description="Filter by industry"),
    location: Optional[str] = Query(None, description="Filter by location"),
    skills: Optional[str] = Query(None, description="Filter by required skills (comma-separated)"),
    salary_min: Optional[int] = Query(None, ge=0, description="Minimum salary"),
    salary_max: Optional[int] = Query(None, ge=0, description="Maximum salary"),
    experience_min: Optional[int] = Query(None, ge=0, description="Minimum experience in years"),
    experience_max: Optional[int] = Query(None, ge=0, description="Maximum experience in years"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get jobs with search and filter options"""
    query = db.query(Job)
    
    # Search functionality
    if search:
        search_filter = or_(
            Job.job_title.ilike(f"%{search}%"),
            Job.job_description.ilike(f"%{search}%"),
            Job.company_name.ilike(f"%{search}%"),
            Job.industry.ilike(f"%{search}%"),
            Job.department.ilike(f"%{search}%"),
            Job.role.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    
    # Status filter
    if status:
        query = query.filter(Job.status == status)
    
    # Job type filter
    if job_type:
        query = query.filter(Job.job_type == job_type)
    
    # Work mode filter
    if work_mode:
        query = query.filter(Job.work_mode == work_mode)
    
    # Industry filter
    if industry:
        query = query.filter(Job.industry == industry)
    
    # Location filter
    if location:
        location_filter = or_(
            Job.location.ilike(f"%{location}%"),
            Job.city.ilike(f"%{location}%"),
            Job.state.ilike(f"%{location}%"),
            Job.country.ilike(f"%{location}%")
        )
        query = query.filter(location_filter)
    
    # Skills filter
    if skills:
        skill_list = [skill.strip() for skill in skills.split(",")]
        for skill in skill_list:
            query = query.filter(Job.required_skills.ilike(f"%{skill}%"))
    
    # Salary filter
    if salary_min is not None:
        query = query.filter(Job.salary_min >= salary_min)
    
    if salary_max is not None:
        query = query.filter(Job.salary_max <= salary_max)
    
    # Experience filter
    if experience_min is not None:
        query = query.filter(Job.experience_min_years >= experience_min)
    
    if experience_max is not None:
        query = query.filter(Job.experience_max_years <= experience_max)
    
    # Apply pagination
    jobs = query.offset(skip).limit(limit).all()
    
    return [deserialize_json_fields(job) for job in jobs]

@router.get("/active", response_model=List[JobResponse])
def get_active_jobs(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    db: Session = Depends(get_db)
):
    """Get active jobs (public endpoint)"""
    jobs = db.query(Job).filter(Job.status == "active").offset(skip).limit(limit).all()
    return [deserialize_json_fields(job) for job in jobs]

@router.get("/search", response_model=List[JobResponse])
def search_jobs(
    q: str = Query(..., description="Search query"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Search jobs by query string"""
    search_filter = or_(
        Job.job_title.ilike(f"%{q}%"),
        Job.job_description.ilike(f"%{q}%"),
        Job.company_name.ilike(f"%{q}%"),
        Job.industry.ilike(f"%{q}%"),
        Job.department.ilike(f"%{q}%"),
        Job.role.ilike(f"%{q}%"),
        Job.location.ilike(f"%{q}%"),
        Job.city.ilike(f"%{q}%")
    )
    
    jobs = db.query(Job).filter(search_filter).all()
    return [deserialize_json_fields(job) for job in jobs]

@router.get("/stats")
def get_job_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get job statistics"""
    total_jobs = db.query(Job).count()
    
    # Status breakdown
    status_stats = db.query(
        Job.status,
        func.count(Job.id).label('count')
    ).group_by(Job.status).all()
    
    # Job type breakdown
    type_stats = db.query(
        Job.job_type,
        func.count(Job.id).label('count')
    ).group_by(Job.job_type).all()
    
    # Industry breakdown
    industry_stats = db.query(
        Job.industry,
        func.count(Job.id).label('count')
    ).group_by(Job.industry).all()
    
    # Salary statistics
    salary_stats = db.query(
        func.avg(Job.salary_min).label('avg_min_salary'),
        func.avg(Job.salary_max).label('avg_max_salary'),
        func.min(Job.salary_min).label('min_salary'),
        func.max(Job.salary_max).label('max_salary')
    ).first()
    
    return {
        "total_jobs": total_jobs,
        "status_breakdown": {stat.status: stat.count for stat in status_stats},
        "type_breakdown": {stat.job_type: stat.count for stat in type_stats},
        "industry_breakdown": {stat.industry: stat.count for stat in industry_stats},
        "salary_stats": {
            "average_min_salary": round(salary_stats.avg_min_salary, 2) if salary_stats.avg_min_salary else 0,
            "average_max_salary": round(salary_stats.avg_max_salary, 2) if salary_stats.avg_max_salary else 0,
            "min_salary": salary_stats.min_salary or 0,
            "max_salary": salary_stats.max_salary or 0
        }
    }

@router.get("/expiring")
def get_expiring_jobs(
    days: int = Query(7, ge=1, description="Number of days to check for expiring jobs"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get jobs expiring within specified days"""
    from datetime import timedelta
    expiry_date = datetime.utcnow() + timedelta(days=days)
    
    jobs = db.query(Job).filter(
        and_(
            Job.application_deadline <= expiry_date,
            Job.application_deadline >= datetime.utcnow(),
            Job.status == "active"
        )
    ).all()
    
    return [deserialize_json_fields(job) for job in jobs]

@router.get("/recent")
def get_recent_jobs(
    days: int = Query(7, ge=1, description="Number of days to check for recent jobs"),
    limit: int = Query(10, ge=1, le=100, description="Number of recent jobs to return"),
    db: Session = Depends(get_db)
):
    """Get recently posted jobs (public endpoint)"""
    from datetime import timedelta
    recent_date = datetime.utcnow() - timedelta(days=days)
    
    jobs = db.query(Job).filter(
        and_(
            Job.date_posted >= recent_date,
            Job.status == "active"
        )
    ).order_by(Job.date_posted.desc()).limit(limit).all()
    
    return [deserialize_json_fields(job) for job in jobs]

@router.get("/{job_id}", response_model=JobResponse)
def get_job(
    job_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific job by ID"""
    job = db.query(Job).filter(Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return deserialize_json_fields(job)

@router.put("/{job_id}", response_model=JobResponse)
def update_job(
    job_id: str,
    job: JobUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a job"""
    db_job = db.query(Job).filter(Job.id == job_id).first()
    if db_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Prepare update data
    job_data = job.dict(exclude_unset=True)
    
    # Serialize JSON fields
    job_data = serialize_json_fields(job_data)
    
    # Update job
    for key, value in job_data.items():
        setattr(db_job, key, value)
    
    db_job.updated_at = datetime.utcnow()
    db_job.last_updated = datetime.utcnow()
    db.commit()
    db.refresh(db_job)
    
    return deserialize_json_fields(db_job)

@router.patch("/{job_id}/status")
def update_job_status(
    job_id: str,
    status: str = Query(..., description="New status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update job status"""
    job = db.query(Job).filter(Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job.status = status
    job.updated_at = datetime.utcnow()
    job.last_updated = datetime.utcnow()
    db.commit()
    
    return {"message": "Status updated successfully", "status": status}

@router.patch("/{job_id}/priority")
def update_job_priority(
    job_id: str,
    priority: str = Query(..., description="New priority"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update job priority"""
    job = db.query(Job).filter(Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job.priority = priority
    job.updated_at = datetime.utcnow()
    job.last_updated = datetime.utcnow()
    db.commit()
    
    return {"message": "Priority updated successfully", "priority": priority}

@router.delete("/{job_id}")
def delete_job(
    job_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a job"""
    job = db.query(Job).filter(Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    
    db.delete(job)
    db.commit()
    return {"message": "Job deleted successfully"}