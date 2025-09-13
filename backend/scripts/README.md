# 🚀 Codexa Backend Scripts

This directory contains utility scripts for managing the Codexa backend.

## 📁 Available Scripts

### `setup_admin.py`
Creates database tables and admin user for development.

**Usage:**
```bash
python scripts/setup_admin.py
```

**Features:**
- Creates all database tables
- Creates admin user with default credentials
- Handles database connection errors
- Provides detailed feedback

**Default Admin Credentials:**
- Email: admin@codexa.com
- Mobile: 9876543210
- Password: admin123

### `bulk_import.py`
Comprehensive bulk import tool for all database tables.

**Usage:**
```bash
# Basic import
python scripts/bulk_import.py --file data/samples/sample_courses.csv --table courses

# Update existing records
python scripts/bulk_import.py --file updated_data.csv --table courses --update

# Preview import (dry run)
python scripts/bulk_import.py --file data.csv --table courses --dry-run
```

**Supported Tables:**
- `courses` - Course data
- `users` - User accounts
- `candidates` - Candidate profiles
- `jobs` - Job postings

**Supported Formats:**
- CSV files
- JSON files

**Features:**
- Full field support for all tables
- JSON field parsing
- Date format detection
- Duplicate handling
- Error reporting
- Import statistics
- Dry run mode

## 📊 Sample Data

Sample data files are available in `data/samples/`:
- `sample_courses.csv` - Course data in CSV format
- `sample_courses.json` - Course data in JSON format
- `sample_users.csv` - User data
- `sample_candidates.csv` - Candidate data
- `sample_jobs.csv` - Job data

## 🔧 Script Requirements

All scripts require:
- Python 3.8+
- Virtual environment activated
- Database connection configured
- Required dependencies installed

## 📖 Documentation

For detailed documentation, see:
- `docs/BULK_IMPORT_README.md` - Complete bulk import guide
- `DIRECTORY_STRUCTURE.md` - Project structure overview

## 🚨 Troubleshooting

**Common Issues:**
1. **Database Connection Error**: Ensure MySQL is running and credentials are correct
2. **Import Errors**: Check file format and required fields
3. **Permission Errors**: Ensure proper file permissions
4. **Module Not Found**: Activate virtual environment

**Getting Help:**
- Check error messages for specific issues
- Use `--dry-run` flag to preview imports
- Verify sample data format before importing custom data

---

**Happy Scripting! 🛠️**
