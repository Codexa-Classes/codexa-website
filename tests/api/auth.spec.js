const { test, expect } = require('@playwright/test');
const { mockUsers, loginCredentials } = require('../fixtures/auth-data');

test.describe('Authentication API Tests', () => {
  
  test('POST /auth/register - Register new user successfully', async ({ request }) => {
    // Generate unique user data for this test
    const timestamp = Date.now();
    const uniqueUser = {
      email: `test${timestamp}@example.com`,
      mobile: `9876543${timestamp.toString().slice(-3)}`,
      password: "TestPassword123!",
      full_name: "Test User"
    };
    
    const response = await request.post('/auth/register', {
      data: uniqueUser
    });
    
    expect(response.status()).toBe(200);
    
    const responseData = await response.json();
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('email', uniqueUser.email);
    expect(responseData).toHaveProperty('mobile', uniqueUser.mobile);
    expect(responseData).toHaveProperty('full_name', uniqueUser.full_name);
    expect(responseData).toHaveProperty('is_active', true);
    expect(responseData).toHaveProperty('is_admin', false);
  });

  test('POST /auth/register - Register with duplicate email should fail', async ({ request }) => {
    // First registration
    await request.post('/auth/register', {
      data: mockUsers.validUser
    });
    
    // Second registration with same email should fail
    const response = await request.post('/auth/register', {
      data: mockUsers.validUser
    });
    
    expect(response.status()).toBe(400);
    const errorData = await response.json();
    expect(errorData.detail).toContain('Email already registered');
  });

  test('POST /auth/login - Login with valid credentials', async ({ request }) => {
    // First register a user
    await request.post('/auth/register', {
      data: mockUsers.validUser
    });
    
    // Then login
    const response = await request.post('/auth/login', {
      data: loginCredentials.valid
    });
    
    expect(response.status()).toBe(200);
    
    const responseData = await response.json();
    expect(responseData).toHaveProperty('access_token');
    expect(responseData).toHaveProperty('token_type', 'bearer');
    expect(responseData).toHaveProperty('user');
    expect(responseData.user).toHaveProperty('email', mockUsers.validUser.email);
  });

  test('POST /auth/login - Login with invalid credentials should fail', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: loginCredentials.invalid
    });
    
    expect(response.status()).toBe(401);
    const errorData = await response.json();
    expect(errorData.detail).toBe('Invalid credentials');
  });

  test('GET /auth/me - Get current user info with valid token', async ({ request }) => {
    // Register and login first
    await request.post('/auth/register', {
      data: mockUsers.validUser
    });
    
    const loginResponse = await request.post('/auth/login', {
      data: loginCredentials.valid
    });
    
    const loginData = await loginResponse.json();
    const token = loginData.access_token;
    
    // Get current user info
    const response = await request.get('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    expect(response.status()).toBe(200);
    
    const userData = await response.json();
    expect(userData).toHaveProperty('email', mockUsers.validUser.email);
    expect(userData).toHaveProperty('mobile', mockUsers.validUser.mobile);
    expect(userData).toHaveProperty('full_name', mockUsers.validUser.full_name);
  });

  test('GET /auth/me - Get current user info without token should fail', async ({ request }) => {
    const response = await request.get('/auth/me');
    
    expect(response.status()).toBe(403);
  });

  test('GET /auth/stats - Get user statistics (admin only)', async ({ request }) => {
    // Register admin user
    await request.post('/auth/register', {
      data: mockUsers.adminUser
    });
    
    // Login as admin
    const loginResponse = await request.post('/auth/login', {
      data: {
        email_or_mobile: mockUsers.adminUser.email,
        password: mockUsers.adminUser.password
      }
    });
    
    const loginData = await loginResponse.json();
    const token = loginData.access_token;
    
    // Get stats - this will fail with 403 because user is not admin
    const response = await request.get('/auth/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Expect 403 Forbidden since user is not admin
    expect(response.status()).toBe(403);
    
    const errorData = await response.json();
    expect(errorData.detail).toBe('Admin access required');
  });
});
