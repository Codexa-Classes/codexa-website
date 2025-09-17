from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import json
from datetime import datetime

from ..database import get_db
from ..models import JobApplication, Job, Candidate, User
from ..schemas import JobApplicationCreate, JobApplicationResponse, JobApplicationUpdate
from ..auth import get_current_user

router = APIRouter()

@router.post("/", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
async def create_job_application(
    application: JobApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new job application"""
    
    # Check if job exists
    job = db.query(Job).filter(Job.id == application.job_id).first()
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    # Check if candidate exists
    candidate = db.query(Candidate).filter(Candidate.id == application.candidate_id).first()
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found"
        )
    
    # Check if application already exists
    existing_application = db.query(JobApplication).filter(
        JobApplication.job_id == application.job_id,
        JobApplication.candidate_id == application.candidate_id
    ).first()
    
    if existing_application:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Application already exists for this job and candidate"
        )
    
    # Create new application
    db_application = JobApplication(
        job_id=application.job_id,
        candidate_id=application.candidate_id,
        user_id=application.user_id or current_user.id,
        cover_letter=application.cover_letter,
        resume_url=application.resume_url,
        portfolio_url=application.portfolio_url,
        expected_salary=application.expected_salary,
        notice_period=application.notice_period,
        availability_date=application.availability_date,
        status=application.status,
        priority=application.priority
    )
    
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    
    return db_application

@router.get("/", response_model=List[JobApplicationResponse])
async def get_job_applications(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: Optional[str] = Query(None),
    job_id: Optional[int] = Query(None),
    candidate_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all job applications with optional filtering"""
    
    query = db.query(JobApplication)
    
    # Apply filters
    if status:
        query = query.filter(JobApplication.status == status)
    if job_id:
        query = query.filter(JobApplication.job_id == job_id)
    if candidate_id:
        query = query.filter(JobApplication.candidate_id == candidate_id)
    
    # Apply pagination
    applications = query.offset(skip).limit(limit).all()
    
    return applications

@router.get("/{application_id}", response_model=JobApplicationResponse)
async def get_job_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific job application by ID"""
    
    application = db.query(JobApplication).filter(JobApplication.id == application_id).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job application not found"
        )
    
    return application

@router.put("/{application_id}", response_model=JobApplicationResponse)
async def update_job_application(
    application_id: int,
    application_update: JobApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a job application"""
    
    application = db.query(JobApplication).filter(JobApplication.id == application_id).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job application not found"
        )
    
    # Update fields
    update_data = application_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(application, field, value)
    
    application.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(application)
    
    return application

@router.patch("/{application_id}/status", response_model=JobApplicationResponse)
async def update_application_status(
    application_id: int,
    status: str = Query(..., description="New status for the application"),
    priority: Optional[str] = Query(None, description="Priority level"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update the status of a job application"""
    
    application = db.query(JobApplication).filter(JobApplication.id == application_id).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job application not found"
        )
    
    # Validate status
    valid_statuses = ["applied", "under_review", "shortlisted", "interviewed", "offered", "rejected", "withdrawn"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    
    application.status = status
    if priority:
        application.priority = priority
    
    application.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(application)
    
    return application

@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_job_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a job application"""
    
    application = db.query(JobApplication).filter(JobApplication.id == application_id).first()
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job application not found"
        )
    
    db.delete(application)
    db.commit()
    
    return None

@router.get("/jobs/{job_id}/applications", response_model=List[JobApplicationResponse])
async def get_job_applications_by_job(
    job_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all applications for a specific job"""
    
    # Check if job exists
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    query = db.query(JobApplication).filter(JobApplication.job_id == job_id)
    
    if status:
        query = query.filter(JobApplication.status == status)
    
    applications = query.offset(skip).limit(limit).all()
    
    return applications

@router.get("/candidates/{candidate_id}/applications", response_model=List[JobApplicationResponse])
async def get_candidate_applications(
    candidate_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all applications for a specific candidate"""
    
    # Check if candidate exists
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found"
        )
    
    query = db.query(JobApplication).filter(JobApplication.candidate_id == candidate_id)
    
    if status:
        query = query.filter(JobApplication.status == status)
    
    applications = query.offset(skip).limit(limit).all()
    
    return applications

@router.get("/stats/summary")
async def get_application_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get application statistics summary"""
    
    total_applications = db.query(JobApplication).count()
    
    # Status breakdown
    status_counts = {}
    statuses = ["applied", "under_review", "shortlisted", "interviewed", "offered", "rejected", "withdrawn"]
    
    for status in statuses:
        count = db.query(JobApplication).filter(JobApplication.status == status).count()
        status_counts[status] = count
    
    # Priority breakdown
    priority_counts = {}
    priorities = ["low", "medium", "high"]
    
    for priority in priorities:
        count = db.query(JobApplication).filter(JobApplication.priority == priority).count()
        priority_counts[priority] = count
    
    # Recent applications (last 30 days)
    thirty_days_ago = datetime.utcnow().replace(day=datetime.utcnow().day - 30)
    recent_applications = db.query(JobApplication).filter(
        JobApplication.applied_at >= thirty_days_ago
    ).count()
    
    return {
        "total_applications": total_applications,
        "status_breakdown": status_counts,
        "priority_breakdown": priority_counts,
        "recent_applications": recent_applications,
        "generated_at": datetime.utcnow()
    }
