#!/bin/bash

echo "🚀 Codexa Backend Quick Setup"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "app/main.py" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

echo "📁 Current directory structure:"
echo "✅ Backend directory found"
echo "✅ App directory found"
echo "✅ Scripts directory found"
echo "✅ Data/samples directory found"
echo "✅ Docs directory found"

echo ""
echo "🔧 Available commands:"
echo ""
echo "1. Setup database and admin:"
echo "   python scripts/setup_admin.py"
echo ""
echo "2. Import sample courses:"
echo "   python scripts/bulk_import.py --file data/samples/sample_courses.csv --table courses"
echo ""
echo "3. Import sample users:"
echo "   python scripts/bulk_import.py --file data/samples/sample_users.csv --table users"
echo ""
echo "4. Import sample candidates:"
echo "   python scripts/bulk_import.py --file data/samples/sample_candidates.csv --table candidates"
echo ""
echo "5. Import sample jobs:"
echo "   python scripts/bulk_import.py --file data/samples/sample_jobs.csv --table jobs"
echo ""
echo "6. Start development server:"
echo "   uvicorn app.main:app --reload"
echo ""
echo "7. View API documentation:"
echo "   http://localhost:8000/docs"
echo ""
echo "📖 For detailed documentation:"
echo "   - docs/BULK_IMPORT_README.md"
echo "   - DIRECTORY_STRUCTURE.md"
echo "   - scripts/README.md"
echo "   - data/samples/README.md"
echo ""
echo "🎉 Setup complete! Choose a command above to get started."
