# 📁 Backend Directory Structure

This directory contains the FastAPI backend for the Codexa educational platform.

## 🗂️ Directory Structure

```
backend/
├── app/                    # Main application code
│   ├── __init__.py
│   ├── auth.py            # Authentication utilities
│   ├── database.py        # Database configuration
│   ├── main.py           # FastAPI application entry point
│   ├── models.py         # SQLAlchemy database models
│   ├── schemas.py        # Pydantic schemas
│   └── routers/          # API route handlers
│       ├── auth.py       # Authentication routes
│       ├── candidates.py # Candidate management routes
│       ├── courses.py    # Course management routes
│       └── jobs.py       # Job management routes
│
├── scripts/               # Utility scripts
│   ├── bulk_import.py    # Bulk data import tool
│   └── setup_admin.py    # Admin user creation script
│
├── data/                 # Data files
│   └── samples/          # Sample data files
│       ├── sample_courses.csv
│       ├── sample_courses.json
│       ├── sample_users.csv
│       ├── sample_candidates.csv
│       └── sample_jobs.csv
│
├── docs/                 # Documentation
│   └── BULK_IMPORT_README.md
│
├── venv/                 # Python virtual environment
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile           # Docker configuration
├── env.example          # Environment variables template
├── init.sql             # Database initialization script
├── README.md            # Main project documentation
├── requirements.txt     # Python dependencies
└── setup.sh            # Setup script
```

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Database
```bash
# Copy environment template
cp env.example .env

# Edit .env with your database credentials
# Start MySQL service
sudo systemctl start mysql
```

### 3. Create Database Tables
```bash
# Option 1: Auto-create when starting server
uvicorn app.main:app --reload

# Option 2: Manual script
python scripts/setup_admin.py
```

### 4. Import Sample Data
```bash
# Import courses
python scripts/bulk_import.py --file data/samples/sample_courses.csv --table courses

# Import users
python scripts/bulk_import.py --file data/samples/sample_users.csv --table users

# Import candidates
python scripts/bulk_import.py --file data/samples/sample_candidates.csv --table candidates

# Import jobs
python scripts/bulk_import.py --file data/samples/sample_jobs.csv --table jobs
```

### 5. Start Development Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📚 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔧 Available Scripts

### Database Management
- `scripts/setup_admin.py` - Create admin user and tables
- `scripts/bulk_import.py` - Import data from CSV/JSON files

### Sample Data
- `data/samples/sample_courses.csv` - Course data
- `data/samples/sample_users.csv` - User data
- `data/samples/sample_candidates.csv` - Candidate data
- `data/samples/sample_jobs.csv` - Job data

## 📖 Documentation

- `docs/BULK_IMPORT_README.md` - Complete bulk import guide
- `README.md` - Main project documentation

## 🐳 Docker Support

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d
```

## 🔐 Default Admin Credentials

After running `setup_admin.py`:
- **Email**: admin@codexa.com
- **Mobile**: 9876543210
- **Password**: admin123

## 📊 Database Tables

- **users** - User accounts and authentication
- **courses** - Course information and content
- **candidates** - Student/candidate profiles
- **jobs** - Job postings and requirements

## 🛠️ Development

### Adding New Routes
1. Create route handler in `app/routers/`
2. Import and include in `app/main.py`
3. Add corresponding schemas in `app/schemas.py`

### Database Changes
1. Update models in `app/models.py`
2. Create migration script if needed
3. Update schemas in `app/schemas.py`

### Testing
```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app
```

---

**Happy Coding! 🚀**
