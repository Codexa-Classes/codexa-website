# 📊 Sample Data Files

This directory contains sample data files for testing and development.

## 📁 Available Files

### Course Data
- **`sample_courses.csv`** - Course data in CSV format
- **`sample_courses.json`** - Course data in JSON format

**Contains:**
- Frontend Development (ReactJS + Tailwind)
- Web Development (Flask + Django)
- Business Analyst (PowerBI + MySQL + BRD)

### User Data
- **`sample_users.csv`** - User accounts

**Contains:**
- Admin user
- Instructor account
- Sample student accounts

### Candidate Data
- **`sample_candidates.csv`** - Candidate profiles

**Contains:**
- Sample candidate profiles
- Different experience levels
- Various skill sets

### Job Data
- **`sample_jobs.csv`** - Job postings

**Contains:**
- React Developer position
- Data Analyst role
- Python Developer job

## 🚀 Usage Examples

### Import All Sample Data
```bash
# Import courses
python ../scripts/bulk_import.py --file sample_courses.csv --table courses

# Import users
python ../scripts/bulk_import.py --file sample_users.csv --table users

# Import candidates
python ../scripts/bulk_import.py --file sample_candidates.csv --table candidates

# Import jobs
python ../scripts/bulk_import.py --file sample_jobs.csv --table jobs
```

### Preview Import (Dry Run)
```bash
python ../scripts/bulk_import.py --file sample_courses.csv --table courses --dry-run
```

### Update Existing Data
```bash
python ../scripts/bulk_import.py --file sample_courses.csv --table courses --update
```

## 📋 Data Format

### CSV Format
- First row contains column headers
- JSON arrays are stored as JSON strings
- Empty fields are automatically converted to NULL
- Boolean values: true/false, 1/0, yes/no

### JSON Format
- Array of objects
- JSON arrays are stored as actual arrays
- All field types preserved

## 🔧 Customization

You can modify these files or create new ones following the same format:

1. **Copy existing file**: `cp sample_courses.csv my_courses.csv`
2. **Edit data**: Modify the content as needed
3. **Import**: `python ../scripts/bulk_import.py --file my_courses.csv --table courses`

## 📖 Field Reference

For complete field documentation, see:
- `docs/BULK_IMPORT_README.md` - Detailed field specifications
- `../scripts/README.md` - Script usage guide

## 🚨 Important Notes

- **Backup**: Always backup your database before bulk imports
- **Validation**: Use `--dry-run` to preview changes
- **Duplicates**: Scripts skip duplicates by default (use `--update` to modify)
- **Format**: Ensure proper CSV escaping for JSON fields

---

**Happy Importing! 📊**
