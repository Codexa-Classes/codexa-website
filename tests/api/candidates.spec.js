const { test, expect } = require('@playwright/test');
const { mockCandidates } = require('../fixtures/candidates-data');

test.describe('Candidates API Tests', () => {
  let authToken;

  test.beforeAll(async ({ request }) => {
    // Register and login as admin for testing
    const registerResponse = await request.post('/auth/register', {
      data: {
        email: "admin@test.com",
        mobile: "9876543212",
        password: "AdminPassword123!",
        full_name: "Test Admin"
      }
    });
    
    const loginResponse = await request.post('/auth/login', {
      data: {
        email_or_mobile: "admin@test.com",
        password: "AdminPassword123!"
      }
    });
    
    const loginData = await loginResponse.json();
    authToken = loginData.access_token;
  });

  test('POST /candidates/ - Create candidate successfully', async ({ request }) => {
    const response = await request.post('/candidates/', {
      data: mockCandidates.validCandidate,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    
    const responseData = await response.json();
    expect(responseData).toHaveProperty('id');
    expect(responseData).toHaveProperty('fullName', mockCandidates.validCandidate.full_name);
    expect(responseData).toHaveProperty('email', mockCandidates.validCandidate.email);
    expect(responseData).toHaveProperty('phoneNumber', mockCandidates.validCandidate.phone_number);
    expect(responseData).toHaveProperty('status', 'pending');
    expect(responseData).toHaveProperty('priority', 'medium');
  });

  test('POST /candidates/ - Create candidate with duplicate email should fail', async ({ request }) => {
    // First create a candidate
    await request.post('/candidates/', {
      data: mockCandidates.validCandidate,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    // Try to create another with same email
    const response = await request.post('/candidates/', {
      data: mockCandidates.validCandidate,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(400);
    const errorData = await response.json();
    expect(errorData.detail).toContain('Email already registered');
  });

  test('GET /candidates/ - Get all candidates', async ({ request }) => {
    // Create a candidate first
    await request.post('/candidates/', {
      data: mockCandidates.minimalCandidate,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    const response = await request.get('/candidates/', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    
    const candidates = await response.json();
    expect(Array.isArray(candidates)).toBe(true);
    expect(candidates.length).toBeGreaterThan(0);
  });

  test('GET /candidates/search - Search candidates', async ({ request }) => {
    const response = await request.get('/candidates/search?q=John', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    
    const candidates = await response.json();
    expect(Array.isArray(candidates)).toBe(true);
  });

  test('GET /candidates/stats - Get candidate statistics', async ({ request }) => {
    const response = await request.get('/candidates/stats', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    
    const stats = await response.json();
    expect(stats).toHaveProperty('total_candidates');
    expect(stats).toHaveProperty('status_breakdown');
    expect(stats).toHaveProperty('priority_breakdown');
    expect(stats).toHaveProperty('experience_stats');
  });

  test('GET /candidates/{id} - Get specific candidate', async ({ request }) => {
    // Create a candidate first
    const createResponse = await request.post('/candidates/', {
      data: mockCandidates.minimalCandidate,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    const candidateData = await createResponse.json();
    const candidateId = candidateData.id;
    
    const response = await request.get(`/candidates/${candidateId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    
    const candidate = await response.json();
    expect(candidate).toHaveProperty('id', candidateId);
    expect(candidate).toHaveProperty('fullName', mockCandidates.minimalCandidate.full_name);
  });

  test('PUT /candidates/{id} - Update candidate', async ({ request }) => {
    // Create a candidate first
    const createResponse = await request.post('/candidates/', {
      data: mockCandidates.minimalCandidate,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    const candidateData = await createResponse.json();
    const candidateId = candidateData.id;
    
    // Update candidate
    const updateData = {
      profile_title: "Senior Developer",
      current_job_status: "employed",
      primary_skills: ["JavaScript", "React", "Node.js", "TypeScript"]
    };
    
    const response = await request.put(`/candidates/${candidateId}`, {
      data: updateData,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    
    const updatedCandidate = await response.json();
    expect(updatedCandidate).toHaveProperty('profileTitle', 'Senior Developer');
    expect(updatedCandidate).toHaveProperty('currentJobStatus', 'employed');
  });

  test('PATCH /candidates/{id}/status - Update candidate status', async ({ request }) => {
    // Create a candidate first
    const createResponse = await request.post('/candidates/', {
      data: mockCandidates.minimalCandidate,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    const candidateData = await createResponse.json();
    const candidateId = candidateData.id;
    
    const response = await request.patch(`/candidates/${candidateId}/status?status=approved`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    
    const result = await response.json();
    expect(result).toHaveProperty('message', 'Status updated successfully');
    expect(result).toHaveProperty('status', 'approved');
  });

  test('DELETE /candidates/{id} - Delete candidate', async ({ request }) => {
    // Create a candidate first
    const createResponse = await request.post('/candidates/', {
      data: mockCandidates.minimalCandidate,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    const candidateData = await createResponse.json();
    const candidateId = candidateData.id;
    
    const response = await request.delete(`/candidates/${candidateId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    
    const result = await response.json();
    expect(result).toHaveProperty('message', 'Candidate deleted successfully');
  });
});
