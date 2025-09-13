#!/usr/bin/env python3
"""
Comprehensive Bulk Import Script for Codexa Database
Supports CSV and JSON imports for all tables: courses, users, candidates, jobs
"""

import os
import sys
import json
import csv
import argparse
from datetime import datetime
from typing import Dict, List, Any, Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

# Add the app directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app'))

from app.database import SessionLocal
from app.models import Course, User, Candidate, Job

class BulkImporter:
    def __init__(self):
        self.db = SessionLocal()
        self.stats = {
            'courses': {'created': 0, 'updated': 0, 'errors': 0},
            'users': {'created': 0, 'updated': 0, 'errors': 0},
            'candidates': {'created': 0, 'updated': 0, 'errors': 0},
            'jobs': {'created': 0, 'updated': 0, 'errors': 0}
        }
    
    def close(self):
        """Close database connection"""
        self.db.close()
    
    def parse_json_field(self, field_value: str) -> Any:
        """Parse JSON string field"""
        if not field_value or field_value.strip() == '':
            return None
        try:
            return json.loads(field_value)
        except json.JSONDecodeError:
            # If not valid JSON, treat as string
            return field_value
    
    def parse_datetime_field(self, field_value: str) -> Optional[datetime]:
        """Parse datetime field"""
        if not field_value or field_value.strip() == '':
            return None
        try:
            # Try different datetime formats
            formats = [
                '%Y-%m-%d %H:%M:%S',
                '%Y-%m-%d',
                '%d/%m/%Y',
                '%m/%d/%Y',
                '%Y-%m-%dT%H:%M:%S'
            ]
            for fmt in formats:
                try:
                    return datetime.strptime(field_value, fmt)
                except ValueError:
                    continue
            return None
        except:
            return None
    
    def import_courses(self, data: List[Dict[str, Any]], update_existing: bool = False):
        """Import courses from data"""
        print(f"📚 Importing {len(data)} courses...")
        
        for row in data:
            try:
                # Check if course exists
                existing_course = None
                if 'name' in row:
                    existing_course = self.db.query(Course).filter(Course.name == row['name']).first()
                
                if existing_course and not update_existing:
                    print(f"⚠️  Course '{row.get('name', 'Unknown')}' already exists, skipping...")
                    continue
                
                # Prepare course data
                course_data = {
                    'name': row.get('name', ''),
                    'description': row.get('description', ''),
                    'category': row.get('category', ''),
                    'duration': row.get('duration', ''),
                    'level': row.get('level', 'beginner'),
                    'price': int(row.get('price', 0)) if row.get('price') else 0,
                    'icon': row.get('icon'),
                    'icon_name': row.get('icon_name'),
                    'career_path': row.get('career_path'),
                    'instructor': row.get('instructor'),
                    'topics': json.dumps(self.parse_json_field(row.get('topics', '[]'))) if row.get('topics') else None,
                    'skills': json.dumps(self.parse_json_field(row.get('skills', '[]'))) if row.get('skills') else None,
                    'projects': json.dumps(self.parse_json_field(row.get('projects', '[]'))) if row.get('projects') else None,
                    'prerequisites': json.dumps(self.parse_json_field(row.get('prerequisites', '[]'))) if row.get('prerequisites') else None,
                    'syllabus': json.dumps(self.parse_json_field(row.get('syllabus', '[]'))) if row.get('syllabus') else None,
                    'enrolled_students': json.dumps(self.parse_json_field(row.get('enrolled_students', '[]'))) if row.get('enrolled_students') else None,
                    'students_count': row.get('students_count'),
                    'status': row.get('status', 'published')
                }
                
                if existing_course and update_existing:
                    # Update existing course
                    for key, value in course_data.items():
                        if value is not None:
                            setattr(existing_course, key, value)
                    self.stats['courses']['updated'] += 1
                    print(f"✅ Updated course: {course_data['name']}")
                else:
                    # Create new course
                    course = Course(**course_data)
                    self.db.add(course)
                    self.stats['courses']['created'] += 1
                    print(f"✅ Created course: {course_data['name']}")
                
            except Exception as e:
                self.stats['courses']['errors'] += 1
                print(f"❌ Error importing course '{row.get('name', 'Unknown')}': {e}")
        
        self.db.commit()
    
    def import_users(self, data: List[Dict[str, Any]], update_existing: bool = False):
        """Import users from data"""
        print(f"👥 Importing {len(data)} users...")
        
        for row in data:
            try:
                # Check if user exists
                existing_user = None
                if 'email' in row:
                    existing_user = self.db.query(User).filter(User.email == row['email']).first()
                elif 'mobile' in row:
                    existing_user = self.db.query(User).filter(User.mobile == row['mobile']).first()
                
                if existing_user and not update_existing:
                    print(f"⚠️  User '{row.get('email', row.get('mobile', 'Unknown'))}' already exists, skipping...")
                    continue
                
                # Prepare user data
                user_data = {
                    'email': row.get('email', ''),
                    'mobile': row.get('mobile', ''),
                    'password': row.get('password', ''),
                    'full_name': row.get('full_name'),
                    'is_active': bool(row.get('is_active', True)) if row.get('is_active') is not None else True,
                    'is_admin': bool(row.get('is_admin', False)) if row.get('is_admin') is not None else False
                }
                
                if existing_user and update_existing:
                    # Update existing user
                    for key, value in user_data.items():
                        if value is not None and value != '':
                            setattr(existing_user, key, value)
                    self.stats['users']['updated'] += 1
                    print(f"✅ Updated user: {user_data['email'] or user_data['mobile']}")
                else:
                    # Create new user
                    user = User(**user_data)
                    self.db.add(user)
                    self.stats['users']['created'] += 1
                    print(f"✅ Created user: {user_data['email'] or user_data['mobile']}")
                
            except Exception as e:
                self.stats['users']['errors'] += 1
                print(f"❌ Error importing user '{row.get('email', row.get('mobile', 'Unknown'))}': {e}")
        
        self.db.commit()
    
    def import_candidates(self, data: List[Dict[str, Any]], update_existing: bool = False):
        """Import candidates from data"""
        print(f"🎓 Importing {len(data)} candidates...")
        
        for row in data:
            try:
                # Check if candidate exists
                existing_candidate = None
                if 'email' in row:
                    existing_candidate = self.db.query(Candidate).filter(Candidate.email == row['email']).first()
                
                if existing_candidate and not update_existing:
                    print(f"⚠️  Candidate '{row.get('email', 'Unknown')}' already exists, skipping...")
                    continue
                
                # Prepare candidate data
                candidate_data = {
                    'full_name': row.get('full_name', ''),
                    'email': row.get('email', ''),
                    'phone_number': row.get('phone_number', ''),
                    'date_of_birth': self.parse_datetime_field(row.get('date_of_birth', '')),
                    'gender': row.get('gender'),
                    'address': row.get('address', ''),
                    'pincode': row.get('pincode', ''),
                    'password': row.get('password', ''),
                    'course': row.get('course'),
                    'joining_date': self.parse_datetime_field(row.get('joining_date', '')),
                    'fees_transaction_number': row.get('fees_transaction_number'),
                    'job_admission': bool(row.get('job_admission', False)) if row.get('job_admission') is not None else False,
                    'profile_title': row.get('profile_title'),
                    'current_job_status': row.get('current_job_status'),
                    'total_experience_years': int(row.get('total_experience_years', 0)) if row.get('total_experience_years') else None,
                    'total_experience_months': int(row.get('total_experience_months', 0)) if row.get('total_experience_months') else None,
                    'current_employer': row.get('current_employer'),
                    'current_job_title': row.get('current_job_title'),
                    'primary_skills': json.dumps(self.parse_json_field(row.get('primary_skills', '[]'))) if row.get('primary_skills') else None,
                    'secondary_skills': json.dumps(self.parse_json_field(row.get('secondary_skills', '[]'))) if row.get('secondary_skills') else None,
                    'skill_proficiency_level': row.get('skill_proficiency_level'),
                    'certifications': json.dumps(self.parse_json_field(row.get('certifications', '[]'))) if row.get('certifications') else None,
                    'highest_qualification': row.get('highest_qualification'),
                    'specialization': row.get('specialization'),
                    'university': row.get('university'),
                    'year_of_passing': int(row.get('year_of_passing', 0)) if row.get('year_of_passing') else None,
                    'grades': row.get('grades'),
                    'preferred_job_type': row.get('preferred_job_type'),
                    'preferred_industry': row.get('preferred_industry'),
                    'preferred_roles': json.dumps(self.parse_json_field(row.get('preferred_roles', '[]'))) if row.get('preferred_roles') else None,
                    'expected_salary': row.get('expected_salary'),
                    'work_mode_preference': row.get('work_mode_preference'),
                    'notice_period': row.get('notice_period'),
                    'linkedin_url': row.get('linkedin_url'),
                    'portfolio_url': row.get('portfolio_url'),
                    'languages': json.dumps(self.parse_json_field(row.get('languages', '[]'))) if row.get('languages') else None,
                    'work_authorization': row.get('work_authorization'),
                    'status': row.get('status', 'pending'),
                    'priority': row.get('priority', 'medium')
                }
                
                if existing_candidate and update_existing:
                    # Update existing candidate
                    for key, value in candidate_data.items():
                        if value is not None and value != '':
                            setattr(existing_candidate, key, value)
                    self.stats['candidates']['updated'] += 1
                    print(f"✅ Updated candidate: {candidate_data['email']}")
                else:
                    # Create new candidate
                    candidate = Candidate(**candidate_data)
                    self.db.add(candidate)
                    self.stats['candidates']['created'] += 1
                    print(f"✅ Created candidate: {candidate_data['email']}")
                
            except Exception as e:
                self.stats['candidates']['errors'] += 1
                print(f"❌ Error importing candidate '{row.get('email', 'Unknown')}': {e}")
        
        self.db.commit()
    
    def import_jobs(self, data: List[Dict[str, Any]], update_existing: bool = False):
        """Import jobs from data"""
        print(f"💼 Importing {len(data)} jobs...")
        
        for row in data:
            try:
                # Check if job exists (using job_title + company_name as unique identifier)
                existing_job = None
                if 'job_title' in row and 'company_name' in row:
                    existing_job = self.db.query(Job).filter(
                        Job.job_title == row['job_title'],
                        Job.company_name == row['company_name']
                    ).first()
                
                if existing_job and not update_existing:
                    print(f"⚠️  Job '{row.get('job_title', 'Unknown')}' at '{row.get('company_name', 'Unknown')}' already exists, skipping...")
                    continue
                
                # Prepare job data
                job_data = {
                    'job_title': row.get('job_title', ''),
                    'job_description': row.get('job_description', ''),
                    'job_type': row.get('job_type', ''),
                    'work_mode': row.get('work_mode', ''),
                    'industry': row.get('industry', ''),
                    'department': row.get('department', ''),
                    'role': row.get('role', ''),
                    'company_id': row.get('company_id'),
                    'company_name': row.get('company_name', ''),
                    'company_location': row.get('company_location'),
                    'location': row.get('location', ''),
                    'city': row.get('city', ''),
                    'state': row.get('state'),
                    'country': row.get('country'),
                    'pincode': row.get('pincode'),
                    'required_skills': json.dumps(self.parse_json_field(row.get('required_skills', '[]'))) if row.get('required_skills') else None,
                    'preferred_skills': json.dumps(self.parse_json_field(row.get('preferred_skills', '[]'))) if row.get('preferred_skills') else None,
                    'experience_min_years': int(row.get('experience_min_years', 0)) if row.get('experience_min_years') else None,
                    'experience_max_years': int(row.get('experience_max_years', 0)) if row.get('experience_max_years') else None,
                    'education_required': row.get('education_required'),
                    'certifications': json.dumps(self.parse_json_field(row.get('certifications', '[]'))) if row.get('certifications') else None,
                    'languages': json.dumps(self.parse_json_field(row.get('languages', '[]'))) if row.get('languages') else None,
                    'salary_min': int(row.get('salary_min', 0)) if row.get('salary_min') else None,
                    'salary_max': int(row.get('salary_max', 0)) if row.get('salary_max') else None,
                    'currency': row.get('currency', 'USD'),
                    'additional_benefits': json.dumps(self.parse_json_field(row.get('additional_benefits', '[]'))) if row.get('additional_benefits') else None,
                    'number_of_openings': int(row.get('number_of_openings', 1)) if row.get('number_of_openings') else 1,
                    'employment_start_date': self.parse_datetime_field(row.get('employment_start_date', '')),
                    'application_deadline': self.parse_datetime_field(row.get('application_deadline', '')),
                    'shift_timing': row.get('shift_timing'),
                    'notice_period_preference': row.get('notice_period_preference'),
                    'work_authorization_requirements': json.dumps(self.parse_json_field(row.get('work_authorization_requirements', '[]'))) if row.get('work_authorization_requirements') else None,
                    'status': row.get('status', 'active'),
                    'priority': row.get('priority', 'medium'),
                    'posted_by': row.get('posted_by', 'admin')
                }
                
                if existing_job and update_existing:
                    # Update existing job
                    for key, value in job_data.items():
                        if value is not None and value != '':
                            setattr(existing_job, key, value)
                    self.stats['jobs']['updated'] += 1
                    print(f"✅ Updated job: {job_data['job_title']} at {job_data['company_name']}")
                else:
                    # Create new job
                    job = Job(**job_data)
                    self.db.add(job)
                    self.stats['jobs']['created'] += 1
                    print(f"✅ Created job: {job_data['job_title']} at {job_data['company_name']}")
                
            except Exception as e:
                self.stats['jobs']['errors'] += 1
                print(f"❌ Error importing job '{row.get('job_title', 'Unknown')}': {e}")
        
        self.db.commit()
    
    def load_csv(self, file_path: str) -> List[Dict[str, Any]]:
        """Load data from CSV file"""
        data = []
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    # Convert empty strings to None for better handling
                    cleaned_row = {k: v if v.strip() != '' else None for k, v in row.items()}
                    data.append(cleaned_row)
            print(f"📄 Loaded {len(data)} rows from CSV: {file_path}")
        except Exception as e:
            print(f"❌ Error loading CSV file {file_path}: {e}")
            return []
        return data
    
    def load_json(self, file_path: str) -> List[Dict[str, Any]]:
        """Load data from JSON file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
            
            # Handle both single object and array of objects
            if isinstance(data, dict):
                data = [data]
            elif not isinstance(data, list):
                print(f"❌ JSON file must contain an object or array of objects")
                return []
            
            print(f"📄 Loaded {len(data)} rows from JSON: {file_path}")
        except Exception as e:
            print(f"❌ Error loading JSON file {file_path}: {e}")
            return []
        return data
    
    def print_stats(self):
        """Print import statistics"""
        print("\n" + "="*50)
        print("📊 IMPORT STATISTICS")
        print("="*50)
        
        total_created = total_updated = total_errors = 0
        
        for table, stats in self.stats.items():
            created = stats['created']
            updated = stats['updated']
            errors = stats['errors']
            
            total_created += created
            total_updated += updated
            total_errors += errors
            
            print(f"{table.upper():>12}: Created: {created:>3} | Updated: {updated:>3} | Errors: {errors:>3}")
        
        print("-"*50)
        print(f"{'TOTAL':>12}: Created: {total_created:>3} | Updated: {total_updated:>3} | Errors: {total_errors:>3}")
        print("="*50)

def main():
    parser = argparse.ArgumentParser(description='Bulk import data into Codexa database')
    parser.add_argument('--file', '-f', required=True, help='Path to CSV or JSON file')
    parser.add_argument('--table', '-t', required=True, choices=['courses', 'users', 'candidates', 'jobs'], 
                       help='Target table to import into')
    parser.add_argument('--format', choices=['csv', 'json'], help='File format (auto-detected if not specified)')
    parser.add_argument('--update', '-u', action='store_true', help='Update existing records instead of skipping')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be imported without actually importing')
    
    args = parser.parse_args()
    
    # Auto-detect file format if not specified
    if not args.format:
        if args.file.lower().endswith('.csv'):
            args.format = 'csv'
        elif args.file.lower().endswith('.json'):
            args.format = 'json'
        else:
            print("❌ Could not determine file format. Please specify --format csv or --format json")
            return
    
    # Check if file exists
    if not os.path.exists(args.file):
        print(f"❌ File not found: {args.file}")
        return
    
    print(f"🚀 Codexa Bulk Import Tool")
    print(f"📁 File: {args.file}")
    print(f"📊 Table: {args.table}")
    print(f"📄 Format: {args.format}")
    print(f"🔄 Update existing: {args.update}")
    print(f"🧪 Dry run: {args.dry_run}")
    print("-" * 50)
    
    # Initialize importer
    importer = BulkImporter()
    
    try:
        # Load data
        if args.format == 'csv':
            data = importer.load_csv(args.file)
        else:
            data = importer.load_json(args.file)
        
        if not data:
            print("❌ No data to import")
            return
        
        if args.dry_run:
            print(f"\n🧪 DRY RUN - Would import {len(data)} records into {args.table}")
            print("📋 Sample record:")
            if data:
                for key, value in list(data[0].items())[:5]:  # Show first 5 fields
                    print(f"   {key}: {value}")
                if len(data[0]) > 5:
                    print(f"   ... and {len(data[0]) - 5} more fields")
            return
        
        # Import data
        if args.table == 'courses':
            importer.import_courses(data, args.update)
        elif args.table == 'users':
            importer.import_users(data, args.update)
        elif args.table == 'candidates':
            importer.import_candidates(data, args.update)
        elif args.table == 'jobs':
            importer.import_jobs(data, args.update)
        
        # Print statistics
        importer.print_stats()
        
        print(f"\n✅ Import completed successfully!")
        
    except Exception as e:
        print(f"❌ Import failed: {e}")
        return 1
    finally:
        importer.close()
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
