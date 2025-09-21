# API Configuration Guide

This guide explains how to configure API endpoints for different environments (localhost vs production).

## 📁 Files Created/Modified

### Environment Files
- `env.example` - Template file with all environment variables
- `env.development` - Development environment configuration
- `env.production` - Production environment configuration

### Configuration Files
- `src/lib/config/api.ts` - Centralized API configuration
- `src/lib/api/client.ts` - Updated to use new configuration

## 🔧 Setup Instructions

### 1. For Local Development

```bash
# Copy the development environment file
cp env.development .env.local

# Or create .env.local manually with:
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENVIRONMENT=development
```

### 2. For Production Deployment

```bash
# Copy the production environment file
cp env.production .env.production

# Edit .env.production and update the API URL:
NEXT_PUBLIC_API_URL=https://your-production-api-domain.com
NEXT_PUBLIC_ENVIRONMENT=production
```

### 3. For Staging (Optional)

```bash
# Create staging environment file
cp env.example .env.staging

# Edit .env.staging:
NEXT_PUBLIC_API_URL=https://your-staging-api-domain.com
NEXT_PUBLIC_ENVIRONMENT=staging
```

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8000` or `https://api.yourdomain.com` |
| `NEXT_PUBLIC_ENVIRONMENT` | Current environment | `development`, `production`, `staging` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Codexa` |
| `NEXT_PUBLIC_APP_VERSION` | Application version | `1.0.0` |

## 🚀 Usage

### Quick Environment Switching

**For Development:**
```bash
# Start development server
npm run dev
# Uses .env.local or .env.development
```

**For Production Build:**
```bash
# Build for production
npm run build
# Uses .env.production
```

### API Configuration Access

```typescript
import { API_CONFIG, getApiUrl } from '@/lib/config/api';

// Get base URL
console.log(API_CONFIG.BASE_URL); // http://localhost:8000

// Get full endpoint URL
const candidatesUrl = getApiUrl('/candidates');
console.log(candidatesUrl); // http://localhost:8000/candidates

// Check environment
import { isDevelopment, isProduction } from '@/lib/config/api';
if (isDevelopment()) {
  console.log('Running in development mode');
}
```

### Using Predefined Endpoints

```typescript
import { API_CONFIG } from '@/lib/config/api';

// Instead of hardcoding endpoints
const response = await fetch(`${API_CONFIG.BASE_URL}/candidates`);

// Use predefined endpoints
const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.CANDIDATES.LIST));
```

## 🔄 Deployment Instructions

### 1. Local Development
```bash
# 1. Copy environment file
cp env.development .env.local

# 2. Start development server
npm run dev
```

### 2. Production Deployment
```bash
# 1. Copy and configure production environment
cp env.production .env.production

# 2. Edit .env.production with your production API URL
nano .env.production

# 3. Build and deploy
npm run build
npm start
```

### 3. Vercel/Netlify Deployment
Add environment variables in your deployment platform:
- `NEXT_PUBLIC_API_URL=https://your-production-api-domain.com`
- `NEXT_PUBLIC_ENVIRONMENT=production`

## 🔍 Current API Endpoints

The configuration includes all your current endpoints:

- **Auth:** `/auth/login`, `/auth/register`, etc.
- **Candidates:** `/candidates`, `/candidates/{id}`, etc.
- **Courses:** `/courses`, `/courses/{id}`, etc.
- **Jobs:** `/jobs`, `/jobs/{id}`, etc.
- **Enquiries:** `/enquiries`, `/enquiries/{id}`, etc.

## 🛠️ Troubleshooting

### Common Issues

1. **API calls failing:**
   - Check if `.env.local` exists and has correct `NEXT_PUBLIC_API_URL`
   - Verify your backend is running on the specified port

2. **Environment not detected:**
   - Restart your development server after changing environment files
   - Make sure environment variables start with `NEXT_PUBLIC_`

3. **Production API not working:**
   - Verify your production API URL is accessible
   - Check CORS settings on your backend
   - Ensure SSL certificate is valid for HTTPS URLs

### Debug Mode

The configuration automatically logs API details in development mode. Check your browser console for:
```
🔗 API Configuration: { baseUrl: "http://localhost:8000", environment: "development" }
```

## 📝 Notes

- Environment files starting with `.env` are ignored by git for security
- The `env.*` files (without dot) are templates you can commit
- Always use `NEXT_PUBLIC_` prefix for client-side environment variables
- The API client automatically handles authentication tokens and error responses
