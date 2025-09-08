from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
from datetime import datetime

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
async def create_course(course: CourseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Prepare course data
    course_data = course.dict(exclude_unset=True)
    
    # Serialize JSON fields
    course_data = serialize_json_fields(course_data)
    
    # Create course
    db_course = Course(**course_data)
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    
    # Return deserialized response
    return deserialize_json_fields(db_course)

@router.get("/", response_model=List[CourseResponse])
async def read_courses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    courses = db.query(Course).filter(Course.status == "published").offset(skip).limit(limit).all()
    return [deserialize_json_fields(course) for course in courses]

@router.get("/{course_id}", response_model=CourseResponse)
async def read_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return deserialize_json_fields(course)

@router.put("/{course_id}", response_model=CourseResponse)
async def update_course(course_id: int, course: CourseUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
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
    
    db.commit()
    db.refresh(db_course)
    
    # Return deserialized response
    return deserialize_json_fields(db_course)

@router.delete("/{course_id}")
async def delete_course(course_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    
    course.status = "archived"
    db.commit()
    return {"message": "Course archived successfully"}
