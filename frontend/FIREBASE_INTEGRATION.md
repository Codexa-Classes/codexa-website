# Firebase Integration for Enquiry Form

## Overview
This project now integrates with Firebase Firestore to store and manage course enquiries. The integration includes:

- **Firestore Database**: Stores enquiry data with proper structure
- **Real-time Data**: Enquiries are stored in real-time
- **Admin Dashboard**: View and manage all enquiries
- **Duplicate Prevention**: Prevents duplicate submissions
- **Data Export**: Export enquiries to CSV

## Database Structure

### Collection: `enquiries`
Each document contains:
- `id`: Auto-generated document ID
- `name`: Student's full name
- `mobile`: 10-digit mobile number
- `email`: Email address
- `passOutYear`: Year of graduation
- `technology`: Comma-separated string of selected technologies
- `timestamp`: When the enquiry was submitted
- `status`: Current status (new, contacted, enrolled, rejected)

## Features Implemented

### 1. Enquiry Form (`/enquiry`)
- ✅ Form validation with Zod
- ✅ Real-time submission to Firestore
- ✅ Duplicate prevention (email/mobile check)
- ✅ Success/error handling
- ✅ Technology selection with custom "Others" option

### 2. Admin Dashboard (`/admin/enquiries`)
- ✅ View all enquiries in a table
- ✅ Search and filter functionality
- ✅ Status tracking
- ✅ Export to CSV
- ✅ Real-time statistics

### 3. Firebase Configuration
- ✅ Project: `sparknova-56ba9`
- ✅ Database: Firestore (Standard edition)
- ✅ Location: `nam5` (United States)
- ✅ Security: Test mode (30 days)

## Security Rules

Currently using test mode rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 10, 5);
    }
  }
}
```

**Important**: Update security rules before the 30-day test mode expires.

## Usage

### For Students
1. Visit the enquiry form
2. Fill in personal details and technology interests
3. Submit the form
4. Receive confirmation message

### For Admins
1. Visit `/admin/enquiries`
2. View all submitted enquiries
3. Use search and filters to find specific enquiries
4. Export data to CSV for external processing

## Files Created/Modified

### New Files
- `src/lib/firebase.ts` - Firebase configuration
- `src/lib/services/enquiry/firestoreEnquiryService.ts` - Firestore service
- `src/components/admin/enquiry-dashboard.tsx` - Admin dashboard
- `src/components/ui/badge.tsx` - Badge component
- `src/components/ui/table.tsx` - Table component
- `src/app/admin/enquiries/page.tsx` - Admin page

### Modified Files
- `src/components/enquiry/enquiry-form.tsx` - Updated to use Firestore

## Next Steps

1. **Security Rules**: Update Firestore security rules for production
2. **Authentication**: Add admin authentication for the dashboard
3. **Email Notifications**: Send email notifications for new enquiries
4. **Status Updates**: Allow admins to update enquiry status
5. **Analytics**: Add analytics for enquiry trends

## Environment Variables

No environment variables are required as the Firebase config is embedded in the code. For production, consider moving sensitive config to environment variables.

## Dependencies Added

- `firebase`: ^10.x.x (Firebase SDK for web)
