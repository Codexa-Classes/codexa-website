from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, func
from typing import List, Optional
import json
from datetime import datetime
import uuid

from ..database import get_db
from ..models import Candidate, User
from ..schemas import CandidateCreate, CandidateResponse, CandidateUpdate, PaginatedCandidatesResponse
from ..auth import get_current_user, get_password_hash

router = APIRouter()

def serialize_json_fields(candidate_data: dict) -> dict:
    """Convert list fields to JSON strings for database storage"""
    json_fields = ['primary_skills', 'secondary_skills', 'certifications', 'preferred_roles', 'languages']
    for field in json_fields:
        if field in candidate_data and candidate_data[field] is not None:
            candidate_data[field] = json.dumps(candidate_data[field])
    return candidate_data

def deserialize_json_fields(candidate: Candidate) -> dict:
    """Convert JSON strings back to lists for API response"""
    candidate_dict = {
        'id': candidate.id,
        'full_name': candidate.full_name,
        'email': candidate.email,
        'phone_number': candidate.phone_number,
        'date_of_birth': candidate.date_of_birth,
        'gender': candidate.gender,
        'address': candidate.address,
        'city': candidate.city,
        'state': candidate.state,
        'pincode': candidate.pincode,
        'course': candidate.course,
        'joining_date': candidate.joining_date,
        'fees_transaction_number': candidate.fees_transaction_number,
        'job_admission': candidate.job_admission,
        'profile_title': candidate.profile_title,
        'current_job_status': candidate.current_job_status,
        'total_experience_years': candidate.total_experience_years,
        'total_experience_months': candidate.total_experience_months,
        'current_employer': candidate.current_employer,
        'current_job_title': candidate.current_job_title,
        'primary_skills': json.loads(candidate.primary_skills) if candidate.primary_skills else None,
        'secondary_skills': json.loads(candidate.secondary_skills) if candidate.secondary_skills else None,
        'skill_proficiency_level': candidate.skill_proficiency_level,
        'certifications': json.loads(candidate.certifications) if candidate.certifications else None,
        'highest_qualification': candidate.highest_qualification,
        'specialization': candidate.specialization,
        'university': candidate.university,
        'year_of_passing': candidate.year_of_passing,
        'grades': candidate.grades,
        'preferred_job_type': candidate.preferred_job_type,
        'preferred_industry': candidate.preferred_industry,
        'preferred_roles': json.loads(candidate.preferred_roles) if candidate.preferred_roles else None,
        'expected_salary': candidate.expected_salary,
        'work_mode_preference': candidate.work_mode_preference,
        'notice_period': candidate.notice_period,
        'linkedin_url': candidate.linkedin_url,
        'portfolio_url': candidate.portfolio_url,
        'languages': json.loads(candidate.languages) if candidate.languages else None,
        'work_authorization': candidate.work_authorization,
        'status': candidate.status,
        'priority': candidate.priority,
        'created_at': candidate.created_at,
        'updated_at': candidate.updated_at
    }
    return candidate_dict

@router.post("/", response_model=CandidateResponse)
def create_candidate(
    candidate: CandidateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new candidate"""
    # Check if email already exists
    existing_candidate = db.query(Candidate).filter(Candidate.email == candidate.email).first()
    if existing_candidate:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Prepare candidate data
    candidate_data = candidate.dict(exclude_unset=True)
    
    # Hash password if provided
    if 'password' in candidate_data:
        candidate_data['password'] = get_password_hash(candidate_data['password'])
    
    # Serialize JSON fields
    candidate_data = serialize_json_fields(candidate_data)
    
    # Create candidate
    db_candidate = Candidate(**candidate_data)
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    
    return deserialize_json_fields(db_candidate)

@router.get("/", response_model=PaginatedCandidatesResponse)
def get_candidates(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(20, ge=1, le=100, description="Number of records to return"),  # ✅ Default 20
    search: Optional[str] = Query(None, description="Search in name, email, phone"),
    status: Optional[str] = Query(None, description="Filter by status"),
    priority: Optional[str] = Query(None, description="Filter by priority"),
    location: Optional[str] = Query(None, description="Filter by city/state"),
    skills: Optional[str] = Query(None, description="Filter by skills (comma-separated)"),
    experience_min: Optional[int] = Query(None, ge=0, description="Minimum experience in years"),
    experience_max: Optional[int] = Query(None, ge=0, description="Maximum experience in years"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get candidates with pagination and filters"""
    query = db.query(Candidate)
    
    # Apply all filters (same as current code)
    if search:
        search_filter = or_(
            Candidate.full_name.ilike(f"%{search}%"),
            Candidate.email.ilike(f"%{search}%"),
            Candidate.phone_number.ilike(f"%{search}%"),
            Candidate.profile_title.ilike(f"%{search}%"),
            Candidate.current_employer.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    
    if status:
        query = query.filter(Candidate.status == status)
    
    if priority:
        query = query.filter(Candidate.priority == priority)
    
    if location:
        location_filter = or_(
            Candidate.address.ilike(f"%{location}%"),
            Candidate.city.ilike(f"%{location}%"),
            Candidate.state.ilike(f"%{location}%")
        )
        query = query.filter(location_filter)
    
    if skills:
        skill_list = [skill.strip() for skill in skills.split(",")]
        for skill in skill_list:
            query = query.filter(
                or_(
                    Candidate.primary_skills.ilike(f"%{skill}%"),
                    Candidate.secondary_skills.ilike(f"%{skill}%")
                )
            )
    
    if experience_min is not None:
        query = query.filter(Candidate.total_experience_years >= experience_min)
    
    if experience_max is not None:
        query = query.filter(Candidate.total_experience_years <= experience_max)
    
    # ✅ GET TOTAL COUNT (CRITICAL FOR UI)
    total_count = query.count()
    
    # Apply pagination
    candidates = query.offset(skip).limit(limit).all()
    
    # ✅ CALCULATE UI PAGINATION DATA
    current_page = (skip // limit) + 1
    total_pages = (total_count + limit - 1) // limit if total_count > 0 else 1
    showing_from = skip + 1 if total_count > 0 else 0
    showing_to = min(skip + len(candidates), total_count)
    
    return {
        "data": [
            {
                "id": candidate.id,
                "name": candidate.full_name,
                "email": candidate.email,
                "status": candidate.status
            }
            for candidate in candidates
        ],
        "pagination": {
            "skip": skip,
            "limit": limit,
            "total": total_count,
            "current_page": current_page,
            "total_pages": total_pages,
            "has_next": skip + limit < total_count,
            "has_prev": skip > 0,
            "showing_from": showing_from,
            "showing_to": showing_to
        }
    }

@router.get("/search", response_model=List[CandidateResponse])
def search_candidates(
    q: str = Query(..., description="Search query"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Search candidates by query string"""
    search_filter = or_(
        Candidate.full_name.ilike(f"%{q}%"),
        Candidate.email.ilike(f"%{q}%"),
        Candidate.phone_number.ilike(f"%{q}%"),
        Candidate.profile_title.ilike(f"%{q}%"),
        Candidate.current_employer.ilike(f"%{q}%"),
        Candidate.current_job_title.ilike(f"%{q}%"),
        Candidate.highest_qualification.ilike(f"%{q}%"),
        Candidate.specialization.ilike(f"%{q}%"),
        Candidate.university.ilike(f"%{q}%"),
        Candidate.preferred_industry.ilike(f"%{q}%")
    )
    
    candidates = db.query(Candidate).filter(search_filter).all()
    return [deserialize_json_fields(candidate) for candidate in candidates]

@router.get("/stats")
def get_candidate_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get candidate statistics"""
    total_candidates = db.query(Candidate).count()
    
    # Status breakdown
    status_stats = db.query(
        Candidate.status,
        func.count(Candidate.id).label('count')
    ).group_by(Candidate.status).all()
    
    # Priority breakdown
    priority_stats = db.query(
        Candidate.priority,
        func.count(Candidate.id).label('count')
    ).group_by(Candidate.priority).all()
    
    # Experience breakdown
    experience_stats = db.query(
        func.count(Candidate.id).label('total'),
        func.count(Candidate.total_experience_years).label('with_experience'),
        func.avg(Candidate.total_experience_years).label('avg_experience')
    ).first()
    
    return {
        "total_candidates": total_candidates,
        "status_breakdown": {stat.status: stat.count for stat in status_stats},
        "priority_breakdown": {stat.priority: stat.count for stat in priority_stats},
        "experience_stats": {
            "total": experience_stats.total,
            "with_experience": experience_stats.with_experience,
            "average_experience": round(experience_stats.avg_experience, 2) if experience_stats.avg_experience else 0
        }
    }

@router.get("/{candidate_id}", response_model=CandidateResponse)
def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific candidate by ID"""
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return deserialize_json_fields(candidate)

@router.put("/{candidate_id}", response_model=CandidateResponse)
def update_candidate(
    candidate_id: int,
    candidate: CandidateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a candidate"""
    db_candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if db_candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    # Check if email is being updated and if it already exists
    if candidate.email and candidate.email != db_candidate.email:
        existing_candidate = db.query(Candidate).filter(Candidate.email == candidate.email).first()
        if existing_candidate:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    # Prepare update data
    candidate_data = candidate.dict(exclude_unset=True)
    
    # Hash password if provided
    if 'password' in candidate_data:
        candidate_data['password'] = get_password_hash(candidate_data['password'])
    
    # Serialize JSON fields
    candidate_data = serialize_json_fields(candidate_data)
    
    # Update candidate
    for key, value in candidate_data.items():
        setattr(db_candidate, key, value)
    
    db_candidate.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_candidate)
    
    return deserialize_json_fields(db_candidate)

@router.patch("/{candidate_id}/status")
def update_candidate_status(
    candidate_id: int,
    status: str = Query(..., description="New status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update candidate status"""
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    candidate.status = status
    candidate.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Status updated successfully", "status": status}

@router.patch("/{candidate_id}/priority")
def update_candidate_priority(
    candidate_id: int,
    priority: str = Query(..., description="New priority"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update candidate priority"""
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    candidate.priority = priority
    candidate.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Priority updated successfully", "priority": priority}

@router.delete("/{candidate_id}")
def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a candidate"""
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    db.delete(candidate)
    db.commit()
    return {"message": "Candidate deleted successfully"}