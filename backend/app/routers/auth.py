from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import User, Course, Candidate
from ..schemas import UserCreate, UserResponse, UserLogin, Token, CourseCreate, CourseResponse, CourseUpdate, CandidateCreate
from ..auth import get_password_hash, verify_password, create_access_token, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta

router = APIRouter()

# Authentication routes
@router.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(User).filter(
        (User.email == user.email) | (User.mobile == user.mobile)
    ).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email or mobile number already registered"
        )
    
    # Create new user with plain password
    db_user = User(
        email=user.email,
        mobile=user.mobile,
        password=user.password,  # Store password directly
        full_name=user.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login", response_model=Token)
async def login_user(user_credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.mobile == user_credentials.mobile).first()
    if not user or not verify_password(user_credentials.password, user.password):  # Changed from hashed_password to password
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect mobile number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.mobile}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": user
    }

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

# Candidate registration (creates a user account for candidates)
@router.post("/register-candidate", response_model=UserResponse)
async def register_candidate(candidate: CandidateCreate, db: Session = Depends(get_db)):
    # Check if candidate already exists
    existing_candidate = db.query(Candidate).filter(Candidate.email == candidate.email).first()
    if existing_candidate:
        raise HTTPException(
            status_code=400,
            detail="Candidate with this email already exists"
        )
    
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == candidate.email).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User with this email already exists"
        )
    
    # Create username from email (before @ symbol)
    username = candidate.email.split('@')[0]
    
    # Ensure username is unique
    counter = 1
    original_username = username
    while db.query(User).filter(User.username == username).first():
        username = f"{original_username}{counter}"
        counter += 1
    
    # Create user account for candidate with plain password
    db_user = User(
        email=candidate.email,
        username=username,
        password="candidate123",  # Store plain password directly
        full_name=candidate.name,
        is_active=True,
        is_admin=False
    )
    db.add(db_user)
    db.flush()  # Get the user ID
    
    # Create candidate record
    db_candidate = Candidate(
        name=candidate.name,
        email=candidate.email,
        phone=candidate.phone,
        course_id=candidate.course_id,
        status="pending"
    )
    db.add(db_candidate)
    db.commit()
    db.refresh(db_user)
    
    return db_user

# Get all users (admin only)
@router.get("/users", response_model=List[UserResponse])
async def get_all_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    users = db.query(User).all()
    return users
