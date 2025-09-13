#!/usr/bin/env python3
"""
Script to create tables and admin user for Codexa API
"""

import os
import sys
from sqlalchemy.orm import Session

# Add the app directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app'))

from app.database import SessionLocal, engine
from app.models import Base, User

def create_tables():
    """Create all database tables"""
    try:
        print("🔄 Creating database tables...")
        Base.metadata.create_all(bind=engine)
        print("✅ All tables created successfully!")
        return True
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        return False

def create_admin():
    """Create an admin user"""
    db = SessionLocal()
    
    try:
        # Check if admin already exists
        existing_admin = db.query(User).filter(User.email == "admin@codexa.com").first()
        if existing_admin:
            print("✅ Admin user already exists!")
            print(f"   Email: {existing_admin.email}")
            print(f"   Mobile: {existing_admin.mobile}")
            print(f"   Password: {existing_admin.password}")
            print(f"   Is Admin: {existing_admin.is_admin}")
            return True
        
        # Create new admin user
        admin_user = User(
            email="admin@codexa.com",
            mobile="9876543210",
            password="admin123",  # Plain text password for development
            full_name="Admin User",
            is_active=True,
            is_admin=True
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print("🎉 Admin user created successfully!")
        print(f"   ID: {admin_user.id}")
        print(f"   Email: {admin_user.email}")
        print(f"   Mobile: {admin_user.mobile}")
        print(f"   Password: admin123")
        print(f"   Is Admin: {admin_user.is_admin}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
        db.rollback()
        return False
    finally:
        db.close()

def main():
    """Main function"""
    print("🚀 Codexa Database Setup")
    print("=" * 30)
    
    # Step 1: Create tables
    if not create_tables():
        print("❌ Failed to create tables. Exiting.")
        return False
    
    # Step 2: Create admin
    if not create_admin():
        print("❌ Failed to create admin user.")
        return False
    
    print("\n🎉 Setup completed successfully!")
    print("\n📝 Admin Login Credentials:")
    print("   Mobile: 9876543210")
    print("   Password: admin123")
    print("   Email: admin@codexa.com")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
