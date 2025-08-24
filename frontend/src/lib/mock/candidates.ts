import { Candidate } from '@/components/candidates/candidates-columns';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    // Admin-Required Fields
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    phoneNumber: '+1 (555) 123-4567',
    dateOfBirth: new Date('1990-05-15'),
    gender: 'male',
    location: 'San Francisco',
    city: 'San Francisco',
    pincode: '94102',
    password: 'hashed_password_123',
    
    // Candidate Self-Update Fields
    profileTitle: 'Senior Frontend Developer',
    currentJobStatus: 'employed',
    totalExperience: { years: 5, months: 3 },
    currentEmployer: 'TechCorp Inc.',
    currentJobTitle: 'Frontend Developer',
    primarySkills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
    secondarySkills: ['Node.js', 'GraphQL', 'Redux'],
    skillProficiencyLevel: 'advanced',
    certifications: ['AWS Certified Developer', 'React Certification'],
    highestQualification: 'Bachelor of Science',
    specialization: 'Computer Science',
    university: 'Stanford University',
    yearOfPassing: 2018,
    grades: '3.8/4.0',
    preferredJobType: 'full-time',
    preferredIndustry: 'Technology',
    preferredRoles: ['Senior Frontend Developer', 'Frontend Lead', 'UI Developer'],
    expectedSalary: '$130,000 - $150,000',
    workModePreference: 'hybrid',
    noticePeriod: '2 weeks',
    linkedinUrl: 'https://linkedin.com/in/johnsmith',
    portfolioUrl: 'https://johnsmith.dev',
    languages: [
      { language: 'English', proficiency: 'native' },
      { language: 'Spanish', proficiency: 'conversational' }
    ],
    workAuthorization: 'US Citizen',
    
    // System Fields
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    // Admin-Required Fields
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phoneNumber: '+1 (555) 234-5678',
    dateOfBirth: new Date('1988-12-03'),
    gender: 'female',
    location: 'New York',
    city: 'New York',
    pincode: '10001',
    password: 'hashed_password_456',
    
    // Candidate Self-Update Fields
    profileTitle: 'UI/UX Designer',
    currentJobStatus: 'employed',
    totalExperience: { years: 6, months: 0 },
    currentEmployer: 'DesignStudio',
    currentJobTitle: 'Senior Designer',
    primarySkills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
    secondarySkills: ['HTML', 'CSS', 'JavaScript'],
    skillProficiencyLevel: 'expert',
    certifications: ['Google UX Design Certificate'],
    highestQualification: 'Master of Fine Arts',
    specialization: 'Graphic Design',
    university: 'Parsons School of Design',
    yearOfPassing: 2017,
    grades: '3.9/4.0',
    preferredJobType: 'full-time',
    preferredIndustry: 'Design & Technology',
    preferredRoles: ['Senior UX Designer', 'Design Lead', 'Product Designer'],
    expectedSalary: '$110,000 - $130,000',
    workModePreference: 'hybrid',
    noticePeriod: '1 month',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
    portfolioUrl: 'https://sarahjohnson.design',
    languages: [
      { language: 'English', proficiency: 'native' },
      { language: 'French', proficiency: 'fluent' }
    ],
    workAuthorization: 'US Citizen',
    
    // System Fields
    status: 'approved',
    priority: 'medium',
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },
  {
    id: '3',
    // Admin-Required Fields
    fullName: 'Michael Chen',
    email: 'michael.chen@email.com',
    phoneNumber: '+1 (555) 345-6789',
    dateOfBirth: new Date('1992-08-22'),
    gender: 'male',
    location: 'Austin',
    city: 'Austin',
    pincode: '73301',
    password: 'hashed_password_789',
    
    // Candidate Self-Update Fields
    profileTitle: 'Backend Engineer',
    currentJobStatus: 'employed',
    totalExperience: { years: 4, months: 6 },
    currentEmployer: 'DataFlow Systems',
    currentJobTitle: 'Backend Developer',
    primarySkills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis'],
    secondarySkills: ['AWS', 'Docker', 'Kubernetes'],
    skillProficiencyLevel: 'advanced',
    certifications: ['AWS Certified Solutions Architect'],
    highestQualification: 'Bachelor of Engineering',
    specialization: 'Computer Science',
    university: 'University of Texas',
    yearOfPassing: 2019,
    grades: '3.7/4.0',
    preferredJobType: 'full-time',
    preferredIndustry: 'Technology',
    preferredRoles: ['Senior Backend Engineer', 'Backend Lead', 'API Developer'],
    expectedSalary: '$120,000 - $140,000',
    workModePreference: 'remote',
    noticePeriod: '3 weeks',
    linkedinUrl: 'https://linkedin.com/in/michaelchen',
    portfolioUrl: 'https://michaelchen.dev',
    languages: [
      { language: 'English', proficiency: 'native' },
      { language: 'Mandarin', proficiency: 'fluent' }
    ],
    workAuthorization: 'US Citizen',
    
    // System Fields
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    // Admin-Required Fields
    fullName: 'Emily Davis',
    email: 'emily.davis@email.com',
    phoneNumber: '+1 (555) 456-7890',
    dateOfBirth: new Date('1985-03-10'),
    gender: 'female',
    location: 'Seattle',
    city: 'Seattle',
    pincode: '98101',
    password: 'hashed_password_012',
    
    // Candidate Self-Update Fields
    profileTitle: 'Product Manager',
    currentJobStatus: 'employed',
    totalExperience: { years: 7, months: 2 },
    currentEmployer: 'InnovateTech',
    currentJobTitle: 'Senior Product Manager',
    primarySkills: ['Product Strategy', 'User Research', 'Data Analysis', 'Agile', 'Stakeholder Management'],
    secondarySkills: ['SQL', 'Tableau', 'Jira'],
    skillProficiencyLevel: 'expert',
    certifications: ['Certified Scrum Product Owner', 'Google Analytics Individual Qualification'],
    highestQualification: 'Master of Business Administration',
    specialization: 'Business Administration',
    university: 'Stanford Graduate School of Business',
    yearOfPassing: 2016,
    grades: '3.8/4.0',
    preferredJobType: 'full-time',
    preferredIndustry: 'Technology',
    preferredRoles: ['Senior Product Manager', 'Product Lead', 'Director of Product'],
    expectedSalary: '$140,000 - $160,000',
    workModePreference: 'hybrid',
    noticePeriod: '1 month',
    linkedinUrl: 'https://linkedin.com/in/emilydavis',
    portfolioUrl: 'https://emilydavis.product',
    languages: [
      { language: 'English', proficiency: 'native' },
      { language: 'German', proficiency: 'conversational' }
    ],
    workAuthorization: 'US Citizen',
    
    // System Fields
    status: 'rejected',
    priority: 'medium',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  },
  {
    id: '5',
    // Admin-Required Fields
    fullName: 'David Wilson',
    email: 'david.wilson@email.com',
    phoneNumber: '+1 (555) 567-8901',
    dateOfBirth: new Date('1991-11-18'),
    gender: 'male',
    location: 'Remote',
    city: 'Remote',
    pincode: '00000',
    password: 'hashed_password_345',
    
    // Candidate Self-Update Fields
    profileTitle: 'DevOps Engineer',
    currentJobStatus: 'employed',
    totalExperience: { years: 3, months: 9 },
    currentEmployer: 'CloudScale',
    currentJobTitle: 'DevOps Engineer',
    primarySkills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    secondarySkills: ['Python', 'Bash', 'Linux'],
    skillProficiencyLevel: 'advanced',
    certifications: ['AWS Certified DevOps Engineer', 'Kubernetes Administrator'],
    highestQualification: 'Bachelor of Science',
    specialization: 'Information Technology',
    university: 'University of Washington',
    yearOfPassing: 2020,
    grades: '3.6/4.0',
    preferredJobType: 'full-time',
    preferredIndustry: 'Technology',
    preferredRoles: ['Senior DevOps Engineer', 'DevOps Lead', 'Infrastructure Engineer'],
    expectedSalary: '$110,000 - $130,000',
    workModePreference: 'remote',
    noticePeriod: '2 weeks',
    linkedinUrl: 'https://linkedin.com/in/davidwilson',
    portfolioUrl: 'https://davidwilson.devops',
    languages: [
      { language: 'English', proficiency: 'native' }
    ],
    workAuthorization: 'US Citizen',
    
    // System Fields
    status: 'approved',
    priority: 'low',
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-11T11:20:00Z'
  }
];
