# Playwright API Testing Suite

This directory contains comprehensive API tests for the Codexa backend using Playwright.

## 🚀 Quick Start

### Prerequisites
- Node.js v20+ installed
- FastAPI backend running on `http://localhost:8000`
- Playwright installed (`npm install --save-dev @playwright/test`)

### Running Tests

```bash
# Run all tests
npm run test

# Run only authentication tests
npm run test:auth

# Run tests with interactive UI
npm run test:ui

# View HTML test report
npm run test:report
```

## 📁 Test Structure

```
tests/
├── api/                    # API test files
│   ├── auth.spec.js       # Authentication API tests
│   └── candidates.spec.js # Candidates API tests
├── fixtures/              # Mock data files
│   ├── auth-data.js       # Authentication test data
│   └── candidates-data.js # Candidates test data
└── README.md              # This file
```

## 🧪 Test Coverage

### Authentication API (`/auth`)
- ✅ User registration (success & duplicate email)
- ✅ User login (valid & invalid credentials)
- ✅ Protected endpoints (with/without token)
- ✅ Admin-only endpoints
- ✅ Error handling

### Candidates API (`/candidates`)
- ✅ Create candidate (success & duplicate email)
- ✅ Get all candidates with pagination
- ✅ Search candidates
- ✅ Get candidate statistics
- ✅ Get specific candidate by ID
- ✅ Update candidate
- ✅ Update candidate status
- ✅ Delete candidate

## 📊 Test Reports

After running tests, you can view detailed HTML reports:

```bash
npm run test:report
```

The report includes:
- Test results with pass/fail status
- Request/response data
- Screenshots on failure
- Performance metrics
- Trace viewer for debugging

## 🔧 Configuration

The test configuration is in `playwright.config.js`:

- **Base URL**: `http://localhost:8000` (FastAPI backend)
- **Reporter**: HTML reports with screenshots
- **Parallel execution**: Enabled for faster testing
- **Retries**: 2 retries on failure (CI only)

## 🎯 Adding New Tests

1. Create test file in `tests/api/` directory
2. Add mock data in `tests/fixtures/` directory
3. Follow the existing pattern for consistency
4. Update this README with new test coverage

## 🐛 Troubleshooting

### Backend Not Running
Make sure your FastAPI backend is running on `http://localhost:8000`:
```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Authentication Issues
- Ensure admin user is created for protected endpoints
- Check token expiration in long-running tests
- Verify JWT secret configuration

### Test Data Conflicts
- Tests use mock data to avoid conflicts
- Each test cleans up after itself
- Use unique email addresses for each test run

## 📈 Next Steps

- [ ] Add Jobs API tests
- [ ] Add Courses API tests  
- [ ] Add Enquiries API tests
- [ ] Add performance testing
- [ ] Add CI/CD integration
