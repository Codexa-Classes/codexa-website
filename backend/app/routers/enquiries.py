from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, func
from typing import List, Optional
import json
from datetime import datetime
import uuid

from ..database import get_db
from ..models import Enquiry, User
from ..schemas import EnquiryCreate, EnquiryResponse, EnquiryUpdate
from ..auth import get_current_user

router = APIRouter()

def serialize_json_fields(enquiry_data: dict) -> dict:
    """Convert list fields to JSON strings for database storage"""
    if 'technology' in enquiry_data and enquiry_data['technology'] is not None:
        enquiry_data['technology'] = json.dumps(enquiry_data['technology'])
    return enquiry_data

def deserialize_json_fields(enquiry: Enquiry) -> dict:
    """Convert JSON strings back to lists for API response"""
    enquiry_dict = {
        'id': enquiry.id,
        'name': enquiry.name,
        'mobile': enquiry.mobile,
        'email': enquiry.email,
        'pass_out_year': enquiry.pass_out_year,
        'technology': json.loads(enquiry.technology) if enquiry.technology else [],
        'status': enquiry.status,
        'priority': enquiry.priority,
        'created_at': enquiry.created_at,
        'updated_at': enquiry.updated_at
    }
    return enquiry_dict

@router.post("/", response_model=EnquiryResponse)
def create_enquiry(
    enquiry: EnquiryCreate,
    db: Session = Depends(get_db)
):
    """Create a new enquiry (public endpoint)"""
    # Check for duplicate enquiry
    existing_enquiry = db.query(Enquiry).filter(
        or_(
            Enquiry.email == enquiry.email,
            Enquiry.mobile == enquiry.mobile
        )
    ).first()
    
    if existing_enquiry:
        raise HTTPException(status_code=400, detail="Enquiry with this email or mobile already exists")
    
    # Prepare enquiry data
    enquiry_data = enquiry.dict(exclude_unset=True)
    
    # Serialize JSON fields
    enquiry_data = serialize_json_fields(enquiry_data)
    
    # Create enquiry
    db_enquiry = Enquiry(**enquiry_data)
    db.add(db_enquiry)
    db.commit()
    db.refresh(db_enquiry)
    
    return deserialize_json_fields(db_enquiry)

@router.get("/", response_model=List[EnquiryResponse])
def get_enquiries(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    search: Optional[str] = Query(None, description="Search in name, email, mobile"),
    status: Optional[str] = Query(None, description="Filter by status"),
    priority: Optional[str] = Query(None, description="Filter by priority"),
    technology: Optional[str] = Query(None, description="Filter by technology"),
    year_min: Optional[int] = Query(None, ge=1900, description="Minimum pass out year"),
    year_max: Optional[int] = Query(None, ge=1900, description="Maximum pass out year"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get enquiries with search and filter options (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    query = db.query(Enquiry)
    
    # Search functionality
    if search:
        search_filter = or_(
            Enquiry.name.ilike(f"%{search}%"),
            Enquiry.email.ilike(f"%{search}%"),
            Enquiry.mobile.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    
    # Status filter
    if status:
        query = query.filter(Enquiry.status == status)
    
    # Priority filter
    if priority:
        query = query.filter(Enquiry.priority == priority)
    
    # Technology filter
    if technology:
        query = query.filter(Enquiry.technology.ilike(f"%{technology}%"))
    
    # Year filter
    if year_min is not None:
        query = query.filter(Enquiry.pass_out_year >= year_min)
    
    if year_max is not None:
        query = query.filter(Enquiry.pass_out_year <= year_max)
    
    # Apply pagination
    enquiries = query.offset(skip).limit(limit).all()
    
    return [deserialize_json_fields(enquiry) for enquiry in enquiries]

@router.get("/search", response_model=List[EnquiryResponse])
def search_enquiries(
    q: str = Query(..., description="Search query"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Search enquiries by query string (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    search_filter = or_(
        Enquiry.name.ilike(f"%{q}%"),
        Enquiry.email.ilike(f"%{q}%"),
        Enquiry.mobile.ilike(f"%{q}%"),
        Enquiry.technology.ilike(f"%{q}%")
    )
    
    enquiries = db.query(Enquiry).filter(search_filter).all()
    return [deserialize_json_fields(enquiry) for enquiry in enquiries]

@router.get("/stats")
def get_enquiry_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get enquiry statistics (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    total_enquiries = db.query(Enquiry).count()
    
    # Status breakdown
    status_stats = db.query(
        Enquiry.status,
        func.count(Enquiry.id).label('count')
    ).group_by(Enquiry.status).all()
    
    # Priority breakdown
    priority_stats = db.query(
        Enquiry.priority,
        func.count(Enquiry.id).label('count')
    ).group_by(Enquiry.priority).all()
    
    # Year breakdown
    year_stats = db.query(
        Enquiry.pass_out_year,
        func.count(Enquiry.id).label('count')
    ).group_by(Enquiry.pass_out_year).order_by(Enquiry.pass_out_year.desc()).all()
    
    # Recent enquiries (last 30 days)
    from datetime import timedelta
    recent_date = datetime.utcnow() - timedelta(days=30)
    recent_enquiries = db.query(Enquiry).filter(Enquiry.created_at >= recent_date).count()
    
    return {
        "total_enquiries": total_enquiries,
        "status_breakdown": {stat.status: stat.count for stat in status_stats},
        "priority_breakdown": {stat.priority: stat.count for stat in priority_stats},
        "year_breakdown": {stat.pass_out_year: stat.count for stat in year_stats},
        "recent_enquiries": recent_enquiries
    }

@router.get("/by-technology/{technology}")
def get_enquiries_by_technology(
    technology: str,
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get enquiries by technology (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    enquiries = db.query(Enquiry).filter(
        Enquiry.technology.ilike(f"%{technology}%")
    ).offset(skip).limit(limit).all()
    
    return [deserialize_json_fields(enquiry) for enquiry in enquiries]

@router.get("/by-year/{year}")
def get_enquiries_by_year(
    year: int,
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get enquiries by pass out year (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    enquiries = db.query(Enquiry).filter(
        Enquiry.pass_out_year == year
    ).offset(skip).limit(limit).all()
    
    return [deserialize_json_fields(enquiry) for enquiry in enquiries]

@router.get("/{enquiry_id}", response_model=EnquiryResponse)
def get_enquiry(
    enquiry_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific enquiry by ID (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if enquiry is None:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return deserialize_json_fields(enquiry)

@router.put("/{enquiry_id}", response_model=EnquiryResponse)
def update_enquiry(
    enquiry_id: str,
    enquiry: EnquiryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update an enquiry (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if db_enquiry is None:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    
    # Check for duplicate email/mobile if being updated
    if enquiry.email and enquiry.email != db_enquiry.email:
        existing_enquiry = db.query(Enquiry).filter(Enquiry.email == enquiry.email).first()
        if existing_enquiry:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    if enquiry.mobile and enquiry.mobile != db_enquiry.mobile:
        existing_enquiry = db.query(Enquiry).filter(Enquiry.mobile == enquiry.mobile).first()
        if existing_enquiry:
            raise HTTPException(status_code=400, detail="Mobile number already registered")
    
    # Prepare update data
    enquiry_data = enquiry.dict(exclude_unset=True)
    
    # Serialize JSON fields
    enquiry_data = serialize_json_fields(enquiry_data)
    
    # Update enquiry
    for key, value in enquiry_data.items():
        setattr(db_enquiry, key, value)
    
    db_enquiry.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_enquiry)
    
    return deserialize_json_fields(db_enquiry)

@router.patch("/{enquiry_id}/status")
def update_enquiry_status(
    enquiry_id: str,
    status: str = Query(..., description="New status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update enquiry status (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if enquiry is None:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    
    enquiry.status = status
    enquiry.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Status updated successfully", "status": status}

@router.patch("/{enquiry_id}/priority")
def update_enquiry_priority(
    enquiry_id: str,
    priority: str = Query(..., description="New priority"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update enquiry priority (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if enquiry is None:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    
    enquiry.priority = priority
    enquiry.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Priority updated successfully", "priority": priority}

@router.delete("/{enquiry_id}")
def delete_enquiry(
    enquiry_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete an enquiry (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if enquiry is None:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    
    db.delete(enquiry)
    db.commit()
    return {"message": "Enquiry deleted successfully"}