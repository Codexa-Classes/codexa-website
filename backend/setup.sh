#!/bin/bash

# Codexa Backend Startup Script

echo "🚀 Starting Codexa Backend API..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your database credentials before running the application"
fi

# Check if MySQL is running (optional)
echo "🔍 Checking MySQL connection..."
if command -v mysql &> /dev/null; then
    mysql -u root -p -e "SELECT 1;" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ MySQL is running"
    else
        echo "⚠️  MySQL connection failed. Please check your database setup."
    fi
else
    echo "⚠️  MySQL client not found. Please install MySQL or use Docker."
fi

echo ""
echo "🎯 Setup complete! To start the application:"
echo "   source venv/bin/activate"
echo "   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "📚 API Documentation will be available at:"
echo "   http://localhost:8000/docs"
echo ""
echo "🐳 Or use Docker:"
echo "   docker-compose up -d"
