from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, func
from typing import List, Optional
import json
from datetime import datetime
import uuid

from ..database import get_db
from ..models import Course, User
from ..schemas import CourseCreate, CourseResponse, CourseUpdate
from ..auth import get_current_user

router = APIRouter()

def serialize_json_fields(course_data: dict) -> dict:
    """Convert list fields to JSON strings for database storage"""
    json_fields = ['topics', 'skills', 'projects', 'prerequisites', 'syllabus', 'enrolled_students']
    for field in json_fields:
        if field in course_data and course_data[field] is not None:
            course_data[field] = json.dumps(course_data[field])
    return course_data

def deserialize_json_fields(course: Course) -> dict:
    """Convert JSON strings back to lists for API response"""
    course_dict = {
        'id': course.id,
        'name': course.name,
        'description': course.description,
        'category': course.category,
        'duration': course.duration,
        'level': course.level,
        'price': course.price,
        'icon': course.icon,
        'icon_name': course.icon_name,
        'career_path': course.career_path,
        'instructor': course.instructor,
        'topics': json.loads(course.topics) if course.topics else None,
        'skills': json.loads(course.skills) if course.skills else None,
        'projects': json.loads(course.projects) if course.projects else None,
        'prerequisites': json.loads(course.prerequisites) if course.prerequisites else None,
        'syllabus': json.loads(course.syllabus) if course.syllabus else None,
        'enrolled_students': json.loads(course.enrolled_students) if course.enrolled_students else None,
        'students_count': course.students_count,
        'status': course.status,
        'created_at': course.created_at,
        'updated_at': course.updated_at
    }
    return course_dict

@router.post("/", response_model=CourseResponse)
def create_course(
    course: CourseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new course"""
    # Prepare course data
    course_data = course.dict(exclude_unset=True)
    
    # Serialize JSON fields
    course_data = serialize_json_fields(course_data)
    
    # Create course
    db_course = Course(**course_data)
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    
    return deserialize_json_fields(db_course)

@router.get("/", response_model=List[CourseResponse])
def get_courses(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    search: Optional[str] = Query(None, description="Search in name, description, instructor"),
    category: Optional[str] = Query(None, description="Filter by category"),
    level: Optional[str] = Query(None, description="Filter by level"),
    status: Optional[str] = Query(None, description="Filter by status"),
    price_min: Optional[int] = Query(None, ge=0, description="Minimum price"),
    price_max: Optional[int] = Query(None, ge=0, description="Maximum price"),
    instructor: Optional[str] = Query(None, description="Filter by instructor"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get courses with search and filter options"""
    query = db.query(Course)
    
    # Search functionality
    if search:
        search_filter = or_(
            Course.name.ilike(f"%{search}%"),
            Course.description.ilike(f"%{search}%"),
            Course.instructor.ilike(f"%{search}%"),
            Course.career_path.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)
    
    # Category filter
    if category:
        query = query.filter(Course.category == category)
    
    # Level filter
    if level:
        query = query.filter(Course.level == level)
    
    # Status filter
    if status:
        query = query.filter(Course.status == status)
    
    # Price filter
    if price_min is not None:
        query = query.filter(Course.price >= price_min)
    
    if price_max is not None:
        query = query.filter(Course.price <= price_max)
    
    # Instructor filter
    if instructor:
        query = query.filter(Course.instructor.ilike(f"%{instructor}%"))
    
    # Apply pagination
    courses = query.offset(skip).limit(limit).all()
    
    return [deserialize_json_fields(course) for course in courses]

@router.get("/published", response_model=List[CourseResponse])
def get_published_courses(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    category: Optional[str] = Query(None, description="Filter by category"),
    level: Optional[str] = Query(None, description="Filter by level"),
    db: Session = Depends(get_db)
):
    """Get published courses (public endpoint)"""
    query = db.query(Course).filter(Course.status == "published")
    
    # Category filter
    if category:
        query = query.filter(Course.category == category)
    
    # Level filter
    if level:
        query = query.filter(Course.level == level)
    
    # Apply pagination
    courses = query.offset(skip).limit(limit).all()
    
    return [deserialize_json_fields(course) for course in courses]

@router.get("/search", response_model=List[CourseResponse])
def search_courses(
    q: str = Query(..., description="Search query"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Search courses by query string"""
    search_filter = or_(
        Course.name.ilike(f"%{q}%"),
        Course.description.ilike(f"%{q}%"),
        Course.instructor.ilike(f"%{q}%"),
        Course.career_path.ilike(f"%{q}%"),
        Course.category.ilike(f"%{q}%")
    )
    
    courses = db.query(Course).filter(search_filter).all()
    return [deserialize_json_fields(course) for course in courses]

@router.get("/stats")
def get_course_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get course statistics"""
    total_courses = db.query(Course).count()
    
    # Status breakdown
    status_stats = db.query(
        Course.status,
        func.count(Course.id).label('count')
    ).group_by(Course.status).all()
    
    # Category breakdown
    category_stats = db.query(
        Course.category,
        func.count(Course.id).label('count')
    ).group_by(Course.category).all()
    
    # Level breakdown
    level_stats = db.query(
        Course.level,
        func.count(Course.id).label('count')
    ).group_by(Course.level).all()
    
    # Price statistics
    price_stats = db.query(
        func.avg(Course.price).label('avg_price'),
        func.min(Course.price).label('min_price'),
        func.max(Course.price).label('max_price')
    ).first()
    
    return {
        "total_courses": total_courses,
        "status_breakdown": {stat.status: stat.count for stat in status_stats},
        "category_breakdown": {stat.category: stat.count for stat in category_stats},
        "level_breakdown": {stat.level: stat.count for stat in level_stats},
        "price_stats": {
            "average_price": round(price_stats.avg_price, 2) if price_stats.avg_price else 0,
            "min_price": price_stats.min_price or 0,
            "max_price": price_stats.max_price or 0
        }
    }

@router.get("/by-category/{category}")
def get_courses_by_category(
    category: str,
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    db: Session = Depends(get_db)
):
    """Get courses by category (public endpoint)"""
    courses = db.query(Course).filter(
        and_(
            Course.category == category,
            Course.status == "published"
        )
    ).offset(skip).limit(limit).all()
    
    return [deserialize_json_fields(course) for course in courses]

@router.get("/by-instructor/{instructor}")
def get_courses_by_instructor(
    instructor: str,
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    db: Session = Depends(get_db)
):
    """Get courses by instructor (public endpoint)"""
    courses = db.query(Course).filter(
        and_(
            Course.instructor.ilike(f"%{instructor}%"),
            Course.status == "published"
        )
    ).offset(skip).limit(limit).all()
    
    return [deserialize_json_fields(course) for course in courses]

@router.get("/{course_id}", response_model=CourseResponse)
def get_course(
    course_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific course by ID"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return deserialize_json_fields(course)

@router.get("/slug/{slug}", response_model=CourseResponse)
def get_course_by_slug(
    slug: str,
    db: Session = Depends(get_db)
):
    """Get a course by slug (public endpoint)"""
    course = db.query(Course).filter(Course.id == slug).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return deserialize_json_fields(course)

@router.put("/{course_id}", response_model=CourseResponse)
def update_course(
    course_id: str,
    course: CourseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a course"""
    db_course = db.query(Course).filter(Course.id == course_id).first()
    if db_course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Prepare update data
    course_data = course.dict(exclude_unset=True)
    
    # Serialize JSON fields
    course_data = serialize_json_fields(course_data)
    
    # Update course
    for key, value in course_data.items():
        setattr(db_course, key, value)
    
    db_course.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_course)
    
    return deserialize_json_fields(db_course)

@router.patch("/{course_id}/status")
def update_course_status(
    course_id: str,
    status: str = Query(..., description="New status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update course status"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    
    course.status = status
    course.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Status updated successfully", "status": status}

@router.patch("/{course_id}/enroll")
def enroll_student(
    course_id: str,
    student_id: str = Query(..., description="Student ID to enroll"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Enroll a student in a course"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Get current enrolled students
    enrolled_students = json.loads(course.enrolled_students) if course.enrolled_students else []
    
    # Add student if not already enrolled
    if student_id not in enrolled_students:
        enrolled_students.append(student_id)
        course.enrolled_students = json.dumps(enrolled_students)
        course.updated_at = datetime.utcnow()
        db.commit()
    
    return {"message": "Student enrolled successfully", "enrolled_students": enrolled_students}

@router.patch("/{course_id}/unenroll")
def unenroll_student(
    course_id: str,
    student_id: str = Query(..., description="Student ID to unenroll"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Unenroll a student from a course"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Get current enrolled students
    enrolled_students = json.loads(course.enrolled_students) if course.enrolled_students else []
    
    # Remove student if enrolled
    if student_id in enrolled_students:
        enrolled_students.remove(student_id)
        course.enrolled_students = json.dumps(enrolled_students)
        course.updated_at = datetime.utcnow()
        db.commit()
    
    return {"message": "Student unenrolled successfully", "enrolled_students": enrolled_students}

@router.delete("/{course_id}")
def delete_course(
    course_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a course"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.delete(course)
    db.commit()
    return {"message": "Course deleted successfully"}