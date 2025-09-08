# Codexa Backend API

A FastAPI backend application with MySQL database for the Codexa educational platform.

## Features

- **FastAPI Framework**: Modern, fast web framework for building APIs
- **MySQL Database**: Robust relational database with SQLAlchemy ORM
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **CORS Support**: Cross-origin resource sharing enabled
- **Docker Support**: Containerized deployment with Docker Compose
- **Modular Structure**: Organized codebase with separate routers and models
- **API Documentation**: Automatic OpenAPI/Swagger documentation

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── auth.py              # Authentication utilities
│   └── routers/             # API route modules
│       ├── __init__.py
│       ├── auth.py          # Authentication routes
│       ├── courses.py       # Course management routes
│       ├── candidates.py    # Candidate management routes
│       └── jobs.py          # Job management routes
├── requirements.txt         # Python dependencies
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Multi-container setup
├── init.sql               # Database initialization
└── env.example            # Environment variables template
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token
- `GET /auth/me` - Get current user information

### Courses
- `GET /courses/` - List all active courses
- `POST /courses/` - Create a new course (authenticated)
- `GET /courses/{id}` - Get course details
- `PUT /courses/{id}` - Update course (authenticated)
- `DELETE /courses/{id}` - Deactivate course (authenticated)

### Candidates
- `GET /candidates/` - List all candidates (authenticated)
- `POST /candidates/` - Add new candidate (authenticated)
- `GET /candidates/{id}` - Get candidate details (authenticated)
- `PUT /candidates/{id}` - Update candidate (authenticated)
- `DELETE /candidates/{id}` - Delete candidate (authenticated)

### Jobs
- `GET /jobs/` - List all active jobs
- `POST /jobs/` - Create a new job (authenticated)
- `GET /jobs/{id}` - Get job details
- `PUT /jobs/{id}` - Update job (authenticated)
- `DELETE /jobs/{id}` - Deactivate job (authenticated)

## Quick Start

### Prerequisites

- Python 3.11+
- MySQL 8.0+
- Docker and Docker Compose (optional)

### Local Development Setup

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

5. **Set up MySQL database**
   ```sql
   CREATE DATABASE codexa_db;
   CREATE USER 'codexa_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON codexa_db.* TO 'codexa_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

6. **Run the application**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

7. **Access the API**
   - API: http://localhost:8000
   - Documentation: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Docker Setup (Recommended)

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **Check logs**
   ```bash
   docker-compose logs -f backend
   ```

3. **Access services**
   - API: http://localhost:8000
   - phpMyAdmin: http://localhost:8080
   - MySQL: localhost:3306

4. **Stop services**
   ```bash
   docker-compose down
   ```

## Environment Variables

Create a `.env` file based on `env.example`:

```env
# Database Configuration
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/codexa_db

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Settings
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Environment
ENVIRONMENT=development
DEBUG=True
```

## Database Models

### User
- `id`: Primary key
- `email`: Unique email address
- `username`: Unique username
- `hashed_password`: Bcrypt hashed password
- `full_name`: User's full name
- `is_active`: Account status
- `is_admin`: Admin privileges
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Course
- `id`: Primary key
- `title`: Course title
- `description`: Course description
- `duration`: Course duration
- `price`: Course price
- `instructor`: Instructor name
- `is_active`: Course status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Candidate
- `id`: Primary key
- `name`: Candidate name
- `email`: Unique email address
- `phone`: Phone number
- `course_id`: Associated course
- `status`: Enrollment status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Job
- `id`: Primary key
- `title`: Job title
- `company`: Company name
- `location`: Job location
- `description`: Job description
- `requirements`: Job requirements
- `salary_range`: Salary range
- `is_active`: Job status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register**: Create a new user account
2. **Login**: Get an access token
3. **Protected Routes**: Include token in Authorization header
   ```
   Authorization: Bearer <your-token>
   ```

## Development

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
black app/
isort app/
```

### Type Checking
```bash
mypy app/
```

## Production Deployment

1. **Update environment variables**
   - Set `ENVIRONMENT=production`
   - Use strong `SECRET_KEY`
   - Configure proper `CORS_ORIGINS`
   - Use production database credentials

2. **Use production WSGI server**
   ```bash
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

3. **Docker production setup**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
