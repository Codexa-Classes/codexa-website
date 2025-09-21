#!/usr/bin/env python3
"""
Test script for the candidate endpoint
"""
import requests
import json

# Base URL
BASE_URL = "http://localhost:8000"

def test_candidate_endpoint():
    print("🚀 Testing Candidate Endpoint")
    print("=" * 50)
    
    # Step 1: Login to get token
    print("1. Getting authentication token...")
    login_data = {
        "mobile": "7972908961",
        "password": "12345"
    }
    
    try:
        login_response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        if login_response.status_code == 200:
            token_data = login_response.json()
            token = token_data["access_token"]
            print(f"✅ Login successful! Token: {token[:20]}...")
        else:
            print(f"❌ Login failed: {login_response.status_code}")
            print(f"Response: {login_response.text}")
            return
    except Exception as e:
        print(f"❌ Login error: {e}")
        return
    
    # Step 2: Test candidates list endpoint
    print("\n2. Testing candidates list endpoint...")
    headers = {"Authorization": f"Bearer {token}"}
    
    try:
        list_response = requests.get(f"{BASE_URL}/candidates/", headers=headers)
        if list_response.status_code == 200:
            candidates_data = list_response.json()
            print(f"✅ Candidates list retrieved! Found {len(candidates_data['data'])} candidates")
            if candidates_data['data']:
                first_candidate = candidates_data['data'][0]
                print(f"   First candidate: ID={first_candidate['id']}, Name={first_candidate['name']}")
                candidate_id = first_candidate['id']
            else:
                print("   No candidates found")
                return
        else:
            print(f"❌ Candidates list failed: {list_response.status_code}")
            print(f"Response: {list_response.text}")
            return
    except Exception as e:
        print(f"❌ Candidates list error: {e}")
        return
    
    # Step 3: Test specific candidate endpoint
    print(f"\n3. Testing candidate details endpoint (ID: {candidate_id})...")
    
    try:
        candidate_response = requests.get(f"{BASE_URL}/candidates/{candidate_id}", headers=headers)
        if candidate_response.status_code == 200:
            candidate_data = candidate_response.json()
            print("✅ Candidate details retrieved successfully!")
            print("\n📋 Candidate Details:")
            print(f"   ID: {candidate_data.get('id')}")
            print(f"   Name: {candidate_data.get('fullName')}")
            print(f"   Email: {candidate_data.get('email')}")
            print(f"   Phone: {candidate_data.get('phoneNumber')}")
            print(f"   City: {candidate_data.get('city', 'Not specified')}")
            print(f"   State: {candidate_data.get('state', 'Not specified')}")
            print(f"   Status: {candidate_data.get('status')}")
            print(f"   Priority: {candidate_data.get('priority')}")
            
            # Check if new fields are present
            if 'city' in candidate_data and 'state' in candidate_data:
                print("✅ New location fields (city, state) are present!")
            else:
                print("❌ New location fields are missing")
                
        else:
            print(f"❌ Candidate details failed: {candidate_response.status_code}")
            print(f"Response: {candidate_response.text}")
    except Exception as e:
        print(f"❌ Candidate details error: {e}")
    
    print("\n" + "=" * 50)
    print("🏁 Test completed!")

if __name__ == "__main__":
    test_candidate_endpoint()
