from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
from dotenv import load_dotenv

from .database import engine, Base
from .routers import auth, courses, candidates, jobs

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Codexa API",
    description="A FastAPI backend with MySQL database for Codexa educational platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["authentication"])
app.include_router(courses.router, prefix="/courses", tags=["courses"])
app.include_router(candidates.router, prefix="/candidates", tags=["candidates"])
app.include_router(jobs.router, prefix="/jobs", tags=["jobs"])

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Codexa API", 
        "version": "1.0.0",
        "docs": "/docs",
        "timestamp": datetime.utcnow()
    }

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "timestamp": datetime.utcnow(),
        "environment": os.getenv("ENVIRONMENT", "development")
    }

# Create database tables
@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)