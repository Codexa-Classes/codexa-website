from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import json
from datetime import datetime

from ..database import get_db
from ..models import Enrollment, Course, Candidate, User
from ..schemas import EnrollmentCreate, EnrollmentResponse, EnrollmentUpdate
from ..auth import get_current_user

router = APIRouter()

@router.post("/", response_model=EnrollmentResponse, status_code=status.HTTP_201_CREATED)
async def create_enrollment(
    enrollment: EnrollmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new course enrollment"""
    
    # Check if course exists
    course = db.query(Course).filter(Course.id == enrollment.course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Check if candidate exists
    candidate = db.query(Candidate).filter(Candidate.id == enrollment.candidate_id).first()
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found"
        )
    
    # Check if enrollment already exists
    existing_enrollment = db.query(Enrollment).filter(
        Enrollment.course_id == enrollment.course_id,
        Enrollment.candidate_id == enrollment.candidate_id
    ).first()
    
    if existing_enrollment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Enrollment already exists for this course and candidate"
        )
    
    # Set total fees from course if not provided
    total_fees = enrollment.total_fees or course.price * 100  # Convert to cents
    
    # Create new enrollment
    db_enrollment = Enrollment(
        course_id=enrollment.course_id,
        candidate_id=enrollment.candidate_id,
        user_id=enrollment.user_id or current_user.id,
        status=enrollment.status,
        progress=enrollment.progress,
        total_fees=total_fees,
        payment_status=enrollment.payment_status
    )
    
    db.add(db_enrollment)
    db.commit()
    db.refresh(db_enrollment)
    
    return db_enrollment

@router.get("/", response_model=List[EnrollmentResponse])
async def get_enrollments(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: Optional[str] = Query(None),
    course_id: Optional[int] = Query(None),
    candidate_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all enrollments with optional filtering"""
    
    query = db.query(Enrollment)
    
    # Apply filters
    if status:
        query = query.filter(Enrollment.status == status)
    if course_id:
        query = query.filter(Enrollment.course_id == course_id)
    if candidate_id:
        query = query.filter(Enrollment.candidate_id == candidate_id)
    
    # Apply pagination
    enrollments = query.offset(skip).limit(limit).all()
    
    return enrollments

@router.get("/{enrollment_id}", response_model=EnrollmentResponse)
async def get_enrollment(
    enrollment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific enrollment by ID"""
    
    enrollment = db.query(Enrollment).filter(Enrollment.id == enrollment_id).first()
    
    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found"
        )
    
    return enrollment

@router.put("/{enrollment_id}", response_model=EnrollmentResponse)
async def update_enrollment(
    enrollment_id: int,
    enrollment_update: EnrollmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update an enrollment"""
    
    enrollment = db.query(Enrollment).filter(Enrollment.id == enrollment_id).first()
    
    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found"
        )
    
    # Update fields
    update_data = enrollment_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field == "completed_topics" and value is not None:
            # Convert list to JSON string for storage
            setattr(enrollment, field, json.dumps(value))
        else:
            setattr(enrollment, field, value)
    
    # Update last_accessed if progress is being updated
    if "progress" in update_data:
        enrollment.last_accessed = datetime.utcnow()
    
    # Set completed_at if status is being changed to completed
    if update_data.get("status") == "completed" and enrollment.status != "completed":
        enrollment.completed_at = datetime.utcnow()
    
    enrollment.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(enrollment)
    
    return enrollment

@router.patch("/{enrollment_id}/status", response_model=EnrollmentResponse)
async def update_enrollment_status(
    enrollment_id: int,
    status: str = Query(..., description="New status for the enrollment"),
    progress: Optional[int] = Query(None, ge=0, le=100, description="Progress percentage"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update the status of an enrollment"""
    
    enrollment = db.query(Enrollment).filter(Enrollment.id == enrollment_id).first()
    
    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found"
        )
    
    # Validate status
    valid_statuses = ["enrolled", "in_progress", "completed", "dropped", "suspended"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}"
        )
    
    enrollment.status = status
    if progress is not None:
        enrollment.progress = progress
        enrollment.last_accessed = datetime.utcnow()
    
    # Set completed_at if status is being changed to completed
    if status == "completed" and enrollment.status != "completed":
        enrollment.completed_at = datetime.utcnow()
    
    enrollment.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(enrollment)
    
    return enrollment

@router.patch("/{enrollment_id}/progress", response_model=EnrollmentResponse)
async def update_enrollment_progress(
    enrollment_id: int,
    progress: int = Query(..., ge=0, le=100, description="Progress percentage"),
    completed_topics: Optional[List[str]] = Query(None, description="List of completed topic IDs"),
    current_topic: Optional[str] = Query(None, description="Current topic being studied"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update the progress of an enrollment"""
    
    enrollment = db.query(Enrollment).filter(Enrollment.id == enrollment_id).first()
    
    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found"
        )
    
    enrollment.progress = progress
    enrollment.last_accessed = datetime.utcnow()
    
    if completed_topics is not None:
        enrollment.completed_topics = json.dumps(completed_topics)
    
    if current_topic is not None:
        enrollment.current_topic = current_topic
    
    # Auto-update status based on progress
    if progress == 100 and enrollment.status != "completed":
        enrollment.status = "completed"
        enrollment.completed_at = datetime.utcnow()
    elif progress > 0 and enrollment.status == "enrolled":
        enrollment.status = "in_progress"
    
    enrollment.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(enrollment)
    
    return enrollment

@router.delete("/{enrollment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_enrollment(
    enrollment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete an enrollment"""
    
    enrollment = db.query(Enrollment).filter(Enrollment.id == enrollment_id).first()
    
    if not enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found"
        )
    
    db.delete(enrollment)
    db.commit()
    
    return None

@router.get("/courses/{course_id}/enrollments", response_model=List[EnrollmentResponse])
async def get_course_enrollments(
    course_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all enrollments for a specific course"""
    
    # Check if course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    query = db.query(Enrollment).filter(Enrollment.course_id == course_id)
    
    if status:
        query = query.filter(Enrollment.status == status)
    
    enrollments = query.offset(skip).limit(limit).all()
    
    return enrollments

@router.get("/candidates/{candidate_id}/enrollments", response_model=List[EnrollmentResponse])
async def get_candidate_enrollments(
    candidate_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all enrollments for a specific candidate"""
    
    # Check if candidate exists
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate not found"
        )
    
    query = db.query(Enrollment).filter(Enrollment.candidate_id == candidate_id)
    
    if status:
        query = query.filter(Enrollment.status == status)
    
    enrollments = query.offset(skip).limit(limit).all()
    
    return enrollments

@router.get("/stats/summary")
async def get_enrollment_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get enrollment statistics summary"""
    
    total_enrollments = db.query(Enrollment).count()
    
    # Status breakdown
    status_counts = {}
    statuses = ["enrolled", "in_progress", "completed", "dropped", "suspended"]
    
    for status_type in statuses:
        count = db.query(Enrollment).filter(Enrollment.status == status_type).count()
        status_counts[status_type] = count
    
    # Payment status breakdown
    payment_counts = {}
    payment_statuses = ["pending", "partial", "paid", "refunded"]
    
    for payment_status in payment_statuses:
        count = db.query(Enrollment).filter(Enrollment.payment_status == payment_status).count()
        payment_counts[payment_status] = count
    
    # Recent enrollments (last 30 days)
    thirty_days_ago = datetime.utcnow().replace(day=datetime.utcnow().day - 30)
    recent_enrollments = db.query(Enrollment).filter(
        Enrollment.enrollment_date >= thirty_days_ago
    ).count()
    
    # Average progress
    avg_progress_result = db.query(Enrollment.progress).filter(
        Enrollment.status.in_(["enrolled", "in_progress"])
    ).all()
    avg_progress = sum(row[0] for row in avg_progress_result) / len(avg_progress_result) if avg_progress_result else 0
    
    return {
        "total_enrollments": total_enrollments,
        "status_breakdown": status_counts,
        "payment_breakdown": payment_counts,
        "recent_enrollments": recent_enrollments,
        "average_progress": round(avg_progress, 2),
        "generated_at": datetime.utcnow()
    }
