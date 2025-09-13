# Enquiry Form Testing Guide

## 🧪 Testing the Implementation

### 1. **Public Enquiry Form**
- **URL**: `http://localhost:3000/enquiry`
- **Test Steps**:
  1. Fill out the form with test data
  2. Submit the form
  3. Check localStorage for data persistence
  4. Verify success message appears

### 2. **Admin Enquiry Dashboard**
- **URL**: `http://localhost:3000/admin/enquiry`
- **Test Steps**:
  1. Login as admin user
  2. Navigate to Enquiries in sidebar
  3. View submitted enquiries
  4. Test filtering by Technology and Year
  5. Update enquiry status/priority

### 3. **Admin Dashboard Integration**
- **URL**: `http://localhost:3000/admin`
- **Test Steps**:
  1. Check if "Total Enquiries" card appears
  2. Verify enquiry count is displayed
  3. Test "Go to Enquiries" quick action

## 🔍 Manual Testing Checklist

### Form Validation
- [ ] Name field (min 2 characters)
- [ ] Mobile field (10-digit validation)
- [ ] Email field (email format validation)
- [ ] Pass Out Year (2000-current year+1)
- [ ] Technology (required selection)

### Data Persistence
- [ ] Form submission saves to localStorage
- [ ] Data persists after page refresh
- [ ] Multiple enquiries can be submitted

### Admin Features
- [ ] Admin can view all enquiries
- [ ] Filtering works by Technology
- [ ] Filtering works by Pass Out Year
- [ ] Status can be updated (pending/contacted/enrolled/rejected)
- [ ] Priority can be updated (low/medium/high)
- [ ] Search functionality works

### UI/UX
- [ ] Form is responsive on mobile
- [ ] Error messages display correctly
- [ ] Success messages appear after submission
- [ ] Loading states work during submission
- [ ] Admin table displays all fields correctly

## 🐛 Common Issues & Solutions

### Issue: Form not submitting
- **Solution**: Check browser console for JavaScript errors
- **Check**: Ensure all required fields are filled

### Issue: Admin page not accessible
- **Solution**: Verify user role is 'admin'
- **Check**: Check authentication context

### Issue: Data not persisting
- **Solution**: Check localStorage in browser dev tools
- **Check**: Ensure enquiryService is working correctly

## 📱 Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## 🎯 Success Criteria
✅ Form accessible at `/enquiry`
✅ Data saved to localStorage
✅ Admin can view enquiries at `/admin/enquiry`
✅ Filtering works correctly
✅ Status/priority management works
✅ Responsive design works
✅ Integration with admin dashboard
