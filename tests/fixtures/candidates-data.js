// Mock data for candidates testing
const mockCandidates = {
  validCandidate: {
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone_number: "9876543210",
    date_of_birth: "1995-01-15T00:00:00Z",
    gender: "male",
    address: "123 Main Street, City",
    pincode: "123456",
    password: "CandidatePassword123!",
    course: "Full Stack Development",
    joining_date: "2024-01-01T00:00:00Z",
    fees_transaction_number: "TXN123456789",
    job_admission: true,
    profile_title: "Full Stack Developer",
    current_job_status: "employed",
    total_experience_years: 3,
    total_experience_months: 6,
    current_employer: "Tech Corp",
    current_job_title: "Software Developer",
    primary_skills: ["JavaScript", "React", "Node.js"],
    secondary_skills: ["Python", "SQL"],
    skill_proficiency_level: "intermediate",
    certifications: ["AWS Certified", "React Developer"],
    highest_qualification: "Bachelor of Engineering",
    specialization: "Computer Science",
    university: "University of Technology",
    year_of_passing: 2017,
    grades: "First Class",
    preferred_job_type: "full-time",
    preferred_industry: "Technology",
    preferred_roles: ["Software Developer", "Full Stack Developer"],
    expected_salary: "8-12 LPA",
    work_mode_preference: "hybrid",
    notice_period: "2 months",
    linkedin_url: "https://linkedin.com/in/johndoe",
    portfolio_url: "https://johndoe.dev",
    languages: [
      { language: "English", proficiency: "fluent" },
      { language: "Hindi", proficiency: "native" }
    ],
    work_authorization: "Indian Citizen"
  },
  minimalCandidate: {
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    phone_number: "9876543211",
    address: "456 Oak Avenue, Town",
    pincode: "654321",
    password: "JanePassword123!"
  }
};

module.exports = {
  mockCandidates
};
