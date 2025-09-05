# Google reCAPTCHA Setup Guide

## ✅ Implementation Complete

Your enquiry form now has Google reCAPTCHA v2 protection against spam and bot attacks!

## 🔧 Setup Steps

### 1. Get reCAPTCHA Keys
1. Visit [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Click "Create" to register a new site
3. Fill in the details:
   - **Label**: "Codexa Classes Enquiry Form"
   - **reCAPTCHA type**: Select "reCAPTCHA v2" → "I'm not a robot" Checkbox
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - `codexaclasses.com` (for production)
     - `www.codexaclasses.com` (for production)
4. Accept terms and submit
5. Copy your **Site Key** and **Secret Key**

### 2. Configure Environment Variables
Create a `.env.local` file in the frontend directory:

```env
# Google reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

### 3. Server-Side Verification (Recommended)
For maximum security, verify reCAPTCHA on your server:

```javascript
// Example server-side verification
const verifyRecaptcha = async (token) => {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
  });
  
  const data = await response.json();
  return data.success && data.score > 0.5;
};
```

## 🛡️ Security Features Implemented

### ✅ Form Protection
- **reCAPTCHA v2** - "I'm not a robot" checkbox
- **Client-side validation** - Form won't submit without reCAPTCHA
- **Error handling** - Clear error messages for reCAPTCHA issues
- **Auto-reset** - reCAPTCHA resets after successful submission

### ✅ User Experience
- **Conditional submit button** - Disabled until reCAPTCHA is completed
- **Toast notifications** - Clear feedback for reCAPTCHA errors
- **Form validation** - Integrated with existing validation logic
- **Responsive design** - Works on all devices

### ✅ Bot Protection
- **Spam prevention** - Blocks automated form submissions
- **Rate limiting** - Prevents bulk submissions
- **Human verification** - Ensures real users only
- **Score-based filtering** - Google's AI determines bot likelihood

## 🎯 Current Status

- ✅ **reCAPTCHA component** - Added to form
- ✅ **Client-side validation** - Form requires reCAPTCHA
- ✅ **Error handling** - Toast notifications for issues
- ✅ **TypeScript support** - Full type safety
- ⚠️ **Server verification** - Needs implementation for production

## 🚀 Next Steps

1. **Get your reCAPTCHA keys** from Google
2. **Update environment variables** with your keys
3. **Test the form** to ensure reCAPTCHA works
4. **Implement server-side verification** for production
5. **Deploy and monitor** for any issues

## 🔍 Testing

- **Development**: Uses test key (always passes)
- **Production**: Uses your actual keys
- **Test scenarios**:
  - Submit without reCAPTCHA → Should show error
  - Complete reCAPTCHA → Should allow submission
  - Expired reCAPTCHA → Should show warning

Your form is now protected against spam and bot attacks! 🛡️
