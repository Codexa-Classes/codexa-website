# robots.txt Validation Guide

## Online Validation Tools

### 1. **Google Search Console Robots.txt Tester**
- **URL**: https://search.google.com/search-console/robots-txt
- **Steps**:
  1. Go to Google Search Console
  2. Navigate to "URL Inspection" → "robots.txt Tester"
  3. Enter your domain: `codexaclasses.com`
  4. Test different user agents (Googlebot, GPTBot, etc.)
  5. Verify all rules are working correctly

### 2. **Bing Webmaster Tools**
- **URL**: https://www.bing.com/webmasters
- **Steps**:
  1. Add your site to Bing Webmaster Tools
  2. Go to "Configure My Site" → "robots.txt"
  3. Test your robots.txt rules
  4. Verify Bingbot access

### 3. **Online Robots.txt Validators**
- **URL**: https://www.freerobots.org/robots-txt-validator
- **URL**: https://www.seoreviewtools.com/robots-txt-checker/
- **Steps**:
  1. Enter your robots.txt URL: `https://codexaclasses.com/robots.txt`
  2. Check for syntax errors
  3. Verify all directives are valid

## Manual Testing Commands

### Test with Different User Agents:
```bash
# Test Googlebot
curl -s -H "User-Agent: Googlebot" http://localhost:3000/robots.txt

# Test GPTBot (should be blocked)
curl -s -H "User-Agent: GPTBot" http://localhost:3000/robots.txt

# Test Bingbot
curl -s -H "User-Agent: Bingbot" http://localhost:3000/robots.txt

# Test ChatGPT-User (should be blocked)
curl -s -H "User-Agent: ChatGPT-User" http://localhost:3000/robots.txt
```

### Test Protected Paths:
```bash
# These should be blocked
curl -I http://localhost:3000/admin/
curl -I http://localhost:3000/dashboard/
curl -I http://localhost:3000/api/
```

## Expected Results

### ✅ **What Should Work:**
- Googlebot can access public pages
- Bingbot can access public pages
- All AI bots are blocked from entire site
- Protected paths are blocked for all crawlers

### ❌ **What Should Be Blocked:**
- GPTBot, ChatGPT-User, CCBot, anthropic-ai, Omgilibot
- /admin/, /dashboard/, /api/, /_next/, /_vercel/, /static/
- /private/, /internal/, /enquiry, /test-icons/

## Production Deployment

### 1. **Deploy to Production**
```bash
# Build and deploy your Next.js app
npm run build
npm start
```

### 2. **Verify Production URLs**
- `https://codexaclasses.com/robots.txt`
- `https://codexaclasses.com/sitemap.xml`

### 3. **Submit to Search Engines**
- Google Search Console (already done)
- Bing Webmaster Tools
- Yandex Webmaster

## Monitoring

### 1. **Google Search Console**
- Monitor crawl errors
- Check robots.txt status
- Review blocked URLs

### 2. **Server Logs**
- Monitor bot traffic
- Check for blocked requests
- Verify crawl delays

### 3. **Regular Updates**
- Review quarterly
- Add new AI bots as needed
- Update protected paths when adding new features














