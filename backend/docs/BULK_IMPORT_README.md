# 🚀 Codexa Bulk Import Tool

A comprehensive Python script for bulk importing data into the Codexa database. Supports CSV and JSON formats for all tables: **courses**, **users**, **candidates**, and **jobs**.

## 📋 Features

- ✅ **Multiple Formats**: CSV and JSON support
- ✅ **All Tables**: Courses, Users, Candidates, Jobs
- ✅ **Full Fields**: All database fields supported
- ✅ **Update Mode**: Update existing records or skip duplicates
- ✅ **Dry Run**: Preview imports without executing
- ✅ **Error Handling**: Detailed error reporting
- ✅ **Statistics**: Import summary with counts
- ✅ **JSON Fields**: Automatic JSON parsing for complex fields
- ✅ **Date Parsing**: Multiple datetime format support

## 🛠️ Usage

### Basic Syntax
```bash
python bulk_import.py --file <file_path> --table <table_name> [options]
```

### Examples

#### Import Courses from CSV
```bash
python bulk_import.py --file sample_courses.csv --table courses
```

#### Import Users from JSON
```bash
python bulk_import.py --file users.json --table users --format json
```

#### Update Existing Records
```bash
python bulk_import.py --file updated_courses.csv --table courses --update
```

#### Dry Run (Preview)
```bash
python bulk_import.py --file sample_courses.csv --table courses --dry-run
```

## 📊 Supported Tables

### 1. **Courses** (`courses`)
**Required Fields:**
- `name` - Course name
- `description` - Course description  
- `category` - frontend, web, business, data, devops, database, support
- `duration` - Course duration
- `level` - beginner, intermediate, advanced
- `price` - Course price (integer)

**Optional Fields:**
- `icon`, `icon_name`, `career_path`, `instructor`
- `topics`, `skills`, `projects`, `prerequisites`, `syllabus` (JSON arrays)
- `enrolled_students` (JSON array)
- `students_count`, `status`

### 2. **Users** (`users`)
**Required Fields:**
- `email` - User email
- `mobile` - Mobile number
- `password` - Password (plain text for development)

**Optional Fields:**
- `full_name`, `is_active`, `is_admin`

### 3. **Candidates** (`candidates`)
**Required Fields:**
- `full_name`, `email`, `phone_number`, `address`, `pincode`, `password`

**Optional Fields:**
- `date_of_birth`, `gender`, `course`, `joining_date`
- `current_job_status`, `total_experience_years`, `total_experience_months`
- `primary_skills`, `secondary_skills` (JSON arrays)
- `highest_qualification`, `preferred_job_type`, `expected_salary`
- `status`, `priority`

### 4. **Jobs** (`jobs`)
**Required Fields:**
- `job_title`, `job_description`, `job_type`, `work_mode`
- `industry`, `department`, `role`, `company_name`
- `location`, `city`

**Optional Fields:**
- `company_id`, `company_location`, `state`, `country`, `pincode`
- `required_skills`, `preferred_skills` (JSON arrays)
- `experience_min_years`, `experience_max_years`
- `salary_min`, `salary_max`, `currency`
- `number_of_openings`, `status`, `priority`, `posted_by`

## 📄 File Formats

### CSV Format
```csv
name,description,category,duration,level,price
"React Course","Learn React development","frontend","8 weeks","beginner",10000
```

### JSON Format
```json
[
  {
    "name": "React Course",
    "description": "Learn React development",
    "category": "frontend",
    "duration": "8 weeks",
    "level": "beginner",
    "price": 10000
  }
]
```

## 🔧 JSON Field Handling

For fields that store JSON data, you can provide:

### As JSON String (CSV)
```csv
topics,skills
"[""React"",""JavaScript""]","[""Frontend"",""Web Development""]"
```

### As Array (JSON)
```json
{
  "topics": ["React", "JavaScript"],
  "skills": ["Frontend", "Web Development"]
}
```

## 📅 Date Format Support

The tool automatically detects these date formats:
- `YYYY-MM-DD HH:MM:SS`
- `YYYY-MM-DD`
- `DD/MM/YYYY`
- `MM/DD/YYYY`
- `YYYY-MM-DDTHH:MM:SS`

## 🚨 Error Handling

- **Duplicate Records**: Skipped by default, use `--update` to update
- **Invalid Data**: Detailed error messages with row information
- **Missing Required Fields**: Clear validation errors
- **JSON Parsing**: Graceful fallback for malformed JSON

## 📈 Output Example

```
🚀 Codexa Bulk Import Tool
📁 File: sample_courses.csv
📊 Table: courses
📄 Format: csv
🔄 Update existing: False
🧪 Dry run: False
--------------------------------------------------
📄 Loaded 3 rows from CSV: sample_courses.csv
📚 Importing 3 courses...
✅ Created course: Frontend Development (ReactJS + Tailwind)
✅ Created course: Web Development (Flask + Django)
✅ Created course: Business Analyst (PowerBI + MySQL + BRD)

==================================================
📊 IMPORT STATISTICS
==================================================
     COURSES: Created:   3 | Updated:   0 | Errors:   0
--------------------------------------------------
       TOTAL: Created:   3 | Updated:   0 | Errors:   0
==================================================

✅ Import completed successfully!
```

## 📁 Sample Files

The repository includes sample files:
- `sample_courses.csv` - Course data in CSV format
- `sample_courses.json` - Course data in JSON format  
- `sample_users.csv` - User data
- `sample_candidates.csv` - Candidate data
- `sample_jobs.csv` - Job data

## 🔧 Command Line Options

| Option | Short | Description |
|--------|-------|-------------|
| `--file` | `-f` | Path to CSV or JSON file (required) |
| `--table` | `-t` | Target table: courses, users, candidates, jobs (required) |
| `--format` | | File format: csv, json (auto-detected if not specified) |
| `--update` | `-u` | Update existing records instead of skipping |
| `--dry-run` | | Preview import without executing |

## 🎯 Quick Start

1. **Create your data file** (CSV or JSON)
2. **Run the import**:
   ```bash
   python bulk_import.py --file your_data.csv --table courses
   ```
3. **Check the results** in your database

## 💡 Tips

- Use `--dry-run` first to validate your data
- Check the sample files for proper formatting
- JSON arrays in CSV should be properly escaped
- Empty fields are automatically converted to NULL
- Use `--update` carefully to avoid overwriting data

## 🐛 Troubleshooting

**"File not found"**: Check the file path
**"No data to import"**: Verify file format and content
**"Error importing"**: Check required fields and data types
**"JSON parsing error"**: Ensure JSON arrays are properly formatted

---

**Happy Importing! 🚀**
