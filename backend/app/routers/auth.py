from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, func
from typing import List, Optional
import json
from datetime import datetime
import uuid

from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserResponse, UserUpdate, UserLogin
from ..auth import get_current_user, get_password_hash, verify_password, create_access_token

router = APIRouter()

def serialize_json_fields(user_data: dict) -> dict:
    """Convert list fields to JSON strings for database storage"""
    json_fields = ['skills', 'languages', 'certifications', 'social_links']
    for field in json_fields:
        if field in user_data and user_data[field] is not None:
            user_data[field] = json.dumps(user_data[field])
    return user_data

def deserialize_json_fields(user: User) -> dict:
    """Convert JSON strings back to lists for API response"""
    user_dict = {
        'id': user.id,
        'email': user.email,
        'mobile': user.mobile,
        'password': user.password,  # Note: This should be excluded in production
        'full_name': user.full_name,
        'is_active': user.is_active,
        'is_admin': user.is_admin,
        'created_at': user.created_at,
        'updated_at': user.updated_at
    }
    return user_dict

@router.post("/register", response_model=UserResponse)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    """Register a new user"""
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if mobile already exists
    existing_mobile = db.query(User).filter(User.mobile == user.mobile).first()
    if existing_mobile:
        raise HTTPException(status_code=400, detail="Mobile number already registered")
    
    # Prepare user data
    user_data = user.dict(exclude_unset=True)
    
    # Hash password
    user_data['password'] = get_password_hash(user_data['password'])
    
    # Serialize JSON fields
    user_data = serialize_json_fields(user_data)
    
    # Create user
    db_user = User(**user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return deserialize_json_fields(db_user)

@router.post("/login")
def login_user(
    login_data: UserLogin,
    db: Session = Depends(get_db)
):
    """Login user and return access token"""
    # Find user by email or mobile
    user = db.query(User).filter(
        or_(User.email == login_data.email_or_mobile, User.mobile == login_data.email_or_mobile)
    ).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Verify password
    if not verify_password(login_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Check if user is active
    if not user.is_active:
        raise HTTPException(status_code=401, detail="Account is deactivated")
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": deserialize_json_fields(user)
    }

@router.get("/me", response_model=UserResponse)
def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """Get current user information"""
    return deserialize_json_fields(current_user)

@router.get("/", response_model=List[UserResponse])
def get_users(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    search: Optional[str] = Query(None, description="Search in name, email, mobile"),
    is_active: Optional[bool] = Query(None, description="Filter by active status"),
    is_admin: Optional[bool] = Query(None, description="Filter by admin status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get users with search and filter options (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    query = db.query(User)
    
    # Search functionality
    if search:
        search_filter = or_(
            User.full_name.ilike(f"%{search}%"),
            User.email.ilike(f"%{search}%"),
            User.mobile.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    
    # Active status filter
    if is_active is not None:
        query = query.filter(User.is_active == is_active)
    
    # Admin status filter
    if is_admin is not None:
        query = query.filter(User.is_admin == is_admin)
    
    # Apply pagination
    users = query.offset(skip).limit(limit).all()
    
    return [deserialize_json_fields(user) for user in users]

@router.get("/search", response_model=List[UserResponse])
def search_users(
    q: str = Query(..., description="Search query"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Search users by query string (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    search_filter = or_(
        User.full_name.ilike(f"%{q}%"),
        User.email.ilike(f"%{q}%"),
        User.mobile.ilike(f"%{q}%")
    )
    
    users = db.query(User).filter(search_filter).all()
    return [deserialize_json_fields(user) for user in users]

@router.get("/stats")
def get_user_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get user statistics (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    total_users = db.query(User).count()
    
    # Active/Inactive breakdown
    active_users = db.query(User).filter(User.is_active == True).count()
    inactive_users = total_users - active_users
    
    # Admin/Regular user breakdown
    admin_users = db.query(User).filter(User.is_admin == True).count()
    regular_users = total_users - admin_users
    
    # Recent registrations (last 30 days)
    from datetime import timedelta
    recent_date = datetime.utcnow() - timedelta(days=30)
    recent_registrations = db.query(User).filter(User.created_at >= recent_date).count()
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "inactive_users": inactive_users,
        "admin_users": admin_users,
        "regular_users": regular_users,
        "recent_registrations": recent_registrations
    }

@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific user by ID (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return deserialize_json_fields(user)

@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: str,
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a user (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check if email is being updated and if it already exists
    if user.email and user.email != db_user.email:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if mobile is being updated and if it already exists
    if user.mobile and user.mobile != db_user.mobile:
        existing_mobile = db.query(User).filter(User.mobile == user.mobile).first()
        if existing_mobile:
            raise HTTPException(status_code=400, detail="Mobile number already registered")
    
    # Prepare update data
    user_data = user.dict(exclude_unset=True)
    
    # Hash password if provided
    if 'password' in user_data:
        user_data['password'] = get_password_hash(user_data['password'])
    
    # Serialize JSON fields
    user_data = serialize_json_fields(user_data)
    
    # Update user
    for key, value in user_data.items():
        setattr(db_user, key, value)
    
    db_user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_user)
    
    return deserialize_json_fields(db_user)

@router.put("/me", response_model=UserResponse)
def update_current_user(
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update current user profile"""
    # Check if email is being updated and if it already exists
    if user.email and user.email != current_user.email:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if mobile is being updated and if it already exists
    if user.mobile and user.mobile != current_user.mobile:
        existing_mobile = db.query(User).filter(User.mobile == user.mobile).first()
        if existing_mobile:
            raise HTTPException(status_code=400, detail="Mobile number already registered")
    
    # Prepare update data
    user_data = user.dict(exclude_unset=True)
    
    # Hash password if provided
    if 'password' in user_data:
        user_data['password'] = get_password_hash(user_data['password'])
    
    # Serialize JSON fields
    user_data = serialize_json_fields(user_data)
    
    # Update user
    for key, value in user_data.items():
        setattr(current_user, key, value)
    
    current_user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(current_user)
    
    return deserialize_json_fields(current_user)

@router.patch("/{user_id}/activate")
def activate_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Activate a user (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = True
    user.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "User activated successfully"}

@router.patch("/{user_id}/deactivate")
def deactivate_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Deactivate a user (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = False
    user.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "User deactivated successfully"}

@router.patch("/{user_id}/make-admin")
def make_admin(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Make user an admin (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_admin = True
    user.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "User promoted to admin successfully"}

@router.patch("/{user_id}/remove-admin")
def remove_admin(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Remove admin privileges (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_admin = False
    user.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Admin privileges removed successfully"}

@router.delete("/{user_id}")
def delete_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a user (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}