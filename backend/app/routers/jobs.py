from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
from datetime import datetime

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
async def create_job(job: JobCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Prepare job data
    job_data = job.dict(exclude_unset=True)
    
    # Serialize JSON fields
    job_data = serialize_json_fields(job_data)
    
    # Create job
    db_job = Job(**job_data)
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    # Return deserialized response
    return deserialize_json_fields(db_job)

@router.get("/", response_model=List[JobResponse])
async def read_jobs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    jobs = db.query(Job).filter(Job.status == "active").offset(skip).limit(limit).all()
    return [deserialize_json_fields(job) for job in jobs]

@router.get("/{job_id}", response_model=JobResponse)
async def read_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return deserialize_json_fields(job)

@router.put("/{job_id}", response_model=JobResponse)
async def update_job(job_id: int, job: JobUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
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
    
    db_job.last_updated = datetime.utcnow()
    db.commit()
    db.refresh(db_job)
    
    # Return deserialized response
    return deserialize_json_fields(db_job)

@router.delete("/{job_id}")
async def delete_job(job_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job.status = "closed"
    db.commit()
    return {"message": "Job closed successfully"}
