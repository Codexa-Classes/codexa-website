from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
from datetime import datetime

from ..database import get_db
from ..models import Candidate, User
from ..schemas import CandidateCreate, CandidateResponse, CandidateUpdate
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
async def create_candidate(candidate: CandidateCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Check if candidate with email already exists
    existing_candidate = db.query(Candidate).filter(Candidate.email == candidate.email).first()
    if existing_candidate:
        raise HTTPException(
            status_code=400,
            detail="Candidate with this email already exists"
        )
    
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
    
    # Return deserialized response
    return deserialize_json_fields(db_candidate)

@router.get("/", response_model=List[CandidateResponse])
async def read_candidates(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    candidates = db.query(Candidate).offset(skip).limit(limit).all()
    return [deserialize_json_fields(candidate) for candidate in candidates]

@router.get("/{candidate_id}", response_model=CandidateResponse)
async def read_candidate(candidate_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return deserialize_json_fields(candidate)

@router.put("/{candidate_id}", response_model=CandidateResponse)
async def update_candidate(candidate_id: int, candidate: CandidateUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if db_candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
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
    
    # Return deserialized response
    return deserialize_json_fields(db_candidate)

@router.delete("/{candidate_id}")
async def delete_candidate(candidate_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    
    db.delete(candidate)
    db.commit()
    return {"message": "Candidate deleted successfully"}
