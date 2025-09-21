#!/bin/bash

# =====================================================
# DATABASE SETUP SCRIPT
# Codexa Classes - Complete Database Migration
# =====================================================

echo "🚀 Starting Codexa Classes Database Setup..."
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if MySQL is running
echo -e "${BLUE}📋 Checking MySQL service...${NC}"
if ! systemctl is-active --quiet mysql; then
    echo -e "${YELLOW}⚠️  MySQL service is not running. Starting MySQL...${NC}"
    sudo systemctl start mysql
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ MySQL service started successfully${NC}"
    else
        echo -e "${RED}❌ Failed to start MySQL service${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ MySQL service is running${NC}"
fi

# Check if MySQL client is available
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL client is not installed${NC}"
    echo "Please install MySQL client: sudo apt-get install mysql-client"
    exit 1
fi

# Prompt for MySQL root password
echo -e "${BLUE}🔐 Please enter MySQL root password:${NC}"
read -s MYSQL_PASSWORD

# Test MySQL connection
echo -e "${BLUE}🔍 Testing MySQL connection...${NC}"
mysql -u root -p$MYSQL_PASSWORD -e "SELECT 1;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ MySQL connection successful${NC}"
else
    echo -e "${RED}❌ MySQL connection failed. Please check your password${NC}"
    exit 1
fi

# Backup existing database if it exists
echo -e "${BLUE}💾 Checking for existing database...${NC}"
if mysql -u root -p$MYSQL_PASSWORD -e "USE codexa_db;" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Existing codexa_db found. Creating backup...${NC}"
    BACKUP_FILE="codexa_db_backup_$(date +%Y%m%d_%H%M%S).sql"
    mysqldump -u root -p$MYSQL_PASSWORD codexa_db > "$BACKUP_FILE"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Backup created: $BACKUP_FILE${NC}"
    else
        echo -e "${RED}❌ Backup failed${NC}"
        exit 1
    fi
fi

# Run the migration script
echo -e "${BLUE}🔄 Running database migration...${NC}"
mysql -u root -p$MYSQL_PASSWORD < complete_database_migration.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database migration completed successfully!${NC}"
else
    echo -e "${RED}❌ Database migration failed${NC}"
    exit 1
fi

# Verify the migration
echo -e "${BLUE}🔍 Verifying migration...${NC}"
mysql -u root -p$MYSQL_PASSWORD -e "
USE codexa_db;
SELECT 'USERS' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'CANDIDATES', COUNT(*) FROM candidates
UNION ALL
SELECT 'COURSES', COUNT(*) FROM courses
UNION ALL
SELECT 'JOBS', COUNT(*) FROM jobs
UNION ALL
SELECT 'JOB_APPLICATIONS', COUNT(*) FROM job_applications
UNION ALL
SELECT 'COURSE_ENROLLMENTS', COUNT(*) FROM course_enrollments
UNION ALL
SELECT 'ENQUIRIES', COUNT(*) FROM enquiries;
"

echo ""
echo -e "${GREEN}🎉 DATABASE SETUP COMPLETED SUCCESSFULLY! 🎉${NC}"
echo "=============================================="
echo -e "${BLUE}📊 Database Summary:${NC}"
echo "• Database: codexa_db"
echo "• Tables: 8 (users, candidates, courses, jobs, job_applications, course_enrollments, enquiries, audit_logs)"
echo "• Views: 2 (candidate_details_view, job_applications_view)"
echo "• Stored Procedures: 2 (GetCandidateStats, GetJobStats)"
echo "• Sample Data: Inserted"
echo "• Admin User: sugatraj@codexa.com (mobile: 7972908961)"
echo ""
echo -e "${BLUE}🔗 Test the API endpoints:${NC}"
echo "• GET /candidates/1 - Get candidate details"
echo "• GET /jobs/ - Get all jobs"
echo "• GET /courses/ - Get all courses"
echo "• GET /enquiries/ - Get all enquiries"
echo ""
echo -e "${GREEN}✅ Ready to start your FastAPI server!${NC}"
