import { Candidate } from '@/components/candidates/candidates-columns';

const CANDIDATES_STORAGE_KEY = 'job-portal-candidates';

export interface CreateCandidateData {
  // Admin-Required Fields (for account creation)
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  address: string;
  pincode: string;
  password: string;
  course?: string;
  joiningDate?: Date;
  feesTransactionNumber?: string;
  
  // Optional fields that can be filled later
  profileTitle?: string;
  currentJobStatus?: 'employed' | 'unemployed' | 'student';
  totalExperience?: {
    years: number;
    months: number;
  };
  currentEmployer?: string;
  currentJobTitle?: string;
  primarySkills?: string[];
  secondarySkills?: string[];
  skillProficiencyLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  certifications?: string[];
  highestQualification?: string;
  specialization?: string;
  university?: string;
  yearOfPassing?: number;
  grades?: string;
  preferredJobType?: 'full-time' | 'part-time' | 'internship' | 'remote';
  preferredIndustry?: string;
  preferredRoles?: string[];
  expectedSalary?: string;
  workModePreference?: 'on-site' | 'hybrid' | 'remote';
  noticePeriod?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  languages?: Array<{
    language: string;
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  }>;
  workAuthorization?: string;
  
  // System fields
  status?: 'pending' | 'approved' | 'rejected';
  priority?: 'low' | 'medium' | 'high';
}

export interface UpdateCandidateData extends Partial<CreateCandidateData> {
  id: string;
}

class CandidatesService {
  private getCandidatesFromStorage(): Candidate[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(CANDIDATES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading candidates from localStorage:', error);
      return [];
    }
  }

  private saveCandidatesToStorage(candidates: Candidate[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(candidates));
    } catch (error) {
      console.error('Error saving candidates to localStorage:', error);
    }
  }

  // Get all candidates
  getAllCandidates(): Candidate[] {
    return this.getCandidatesFromStorage();
  }

  // Get candidate by ID
  getCandidateById(id: string): Candidate | null {
    const candidates = this.getCandidatesFromStorage();
    return candidates.find(candidate => candidate.id === id) || null;
  }

  // Get candidate by email (for login purposes)
  getCandidateByEmail(email: string): Candidate | null {
    const candidates = this.getCandidatesFromStorage();
    return candidates.find(candidate => candidate.email === email) || null;
  }

  // Create new candidate
  createCandidate(data: CreateCandidateData): Candidate {
    const candidates = this.getCandidatesFromStorage();
    
    const newCandidate: Candidate = {
      id: Date.now().toString(), // Simple ID generation
      ...data,
      status: data.status || 'pending',
      priority: data.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    candidates.push(newCandidate);
    this.saveCandidatesToStorage(candidates);
    
    return newCandidate;
  }

  // Update existing candidate
  updateCandidate(id: string, data: Partial<CreateCandidateData>): Candidate | null {
    const candidates = this.getCandidatesFromStorage();
    const index = candidates.findIndex(candidate => candidate.id === id);
    
    if (index === -1) return null;

    candidates[index] = {
      ...candidates[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.saveCandidatesToStorage(candidates);
    return candidates[index];
  }

  // Delete candidate
  deleteCandidate(id: string): boolean {
    const candidates = this.getCandidatesFromStorage();
    const filteredCandidates = candidates.filter(candidate => candidate.id !== id);
    
    if (filteredCandidates.length === candidates.length) {
      return false; // No candidate was deleted
    }

    this.saveCandidatesToStorage(filteredCandidates);
    return true;
  }

  // Initialize with one sample candidate if storage is empty
  initializeWithSampleData(): void {
    const existingCandidates = this.getCandidatesFromStorage();
    
    if (existingCandidates.length === 0) {
      const sampleCandidate: Candidate = {
        id: '1',
        // Admin-Required Fields
        fullName: 'John Smith',
        email: 'john.smith@email.com',
        phoneNumber: '9876543210',
        dateOfBirth: new Date('1990-05-15'),
        gender: 'male',
        address: '123 Main St, San Francisco, CA 94102',
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
      };
      
      this.saveCandidatesToStorage([sampleCandidate]);
    }
  }

  // Search candidates
  searchCandidates(query: string): Candidate[] {
    const candidates = this.getCandidatesFromStorage();
    const lowercaseQuery = query.toLowerCase();
    
    return candidates.filter(candidate => 
      candidate.fullName.toLowerCase().includes(lowercaseQuery) ||
      candidate.email.toLowerCase().includes(lowercaseQuery) ||
      candidate.profileTitle?.toLowerCase().includes(lowercaseQuery) ||
      candidate.primarySkills?.some(skill => skill.toLowerCase().includes(lowercaseQuery)) ||
      candidate.address.toLowerCase().includes(lowercaseQuery) ||
      candidate.pincode.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Filter candidates by status
  filterByStatus(status: Candidate['status']): Candidate[] {
    const candidates = this.getCandidatesFromStorage();
    return candidates.filter(candidate => candidate.status === status);
  }

  // Filter candidates by priority
  filterByPriority(priority: Candidate['priority']): Candidate[] {
    const candidates = this.getCandidatesFromStorage();
    return candidates.filter(candidate => candidate.priority === priority);
  }

  // Filter candidates by location
  filterByLocation(location: string): Candidate[] {
    const candidates = this.getCandidatesFromStorage();
    const lowercaseLocation = location.toLowerCase();
    
    return candidates.filter(candidate => 
      candidate.address.toLowerCase().includes(lowercaseLocation) ||
      candidate.pincode.toLowerCase().includes(lowercaseLocation)
    );
  }

  // Filter candidates by skills
  filterBySkills(skills: string[]): Candidate[] {
    const candidates = this.getCandidatesFromStorage();
    const lowercaseSkills = skills.map(skill => skill.toLowerCase());
    
    return candidates.filter(candidate => 
      candidate.primarySkills?.some(skill => 
        lowercaseSkills.some(searchSkill => skill.toLowerCase().includes(searchSkill))
      ) ||
      candidate.secondarySkills?.some(skill => 
        lowercaseSkills.some(searchSkill => skill.toLowerCase().includes(searchSkill))
      )
    );
  }

  // Get candidates by job type preference
  filterByJobTypePreference(jobType: string): Candidate[] {
    const candidates = this.getCandidatesFromStorage();
    return candidates.filter(candidate => 
      candidate.preferredJobType === jobType || 
      candidate.preferredJobType === 'remote' // Remote candidates can work anywhere
    );
  }

  // Update candidate status
  updateCandidateStatus(id: string, status: Candidate['status']): boolean {
    const candidate = this.updateCandidate(id, { status });
    return !!candidate;
  }

  // Update candidate priority
  updateCandidatePriority(id: string, priority: Candidate['priority']): boolean {
    const candidate = this.updateCandidate(id, { priority });
    return !!candidate;
  }

  // Get candidates statistics
  getCandidatesStats() {
    const candidates = this.getCandidatesFromStorage();
    
    return {
      total: candidates.length,
      byStatus: {
        pending: candidates.filter(c => c.status === 'pending').length,
        approved: candidates.filter(c => c.status === 'approved').length,
        rejected: candidates.filter(c => c.status === 'rejected').length,
      },
      byPriority: {
        high: candidates.filter(c => c.priority === 'high').length,
        medium: candidates.filter(c => c.priority === 'medium').length,
        low: candidates.filter(c => c.priority === 'low').length,
      },
      byLocation: candidates.reduce((acc, candidate) => {
        const location = candidate.address;
        acc[location] = (acc[location] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }
}

export const candidatesService = new CandidatesService();
