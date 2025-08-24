import { Enquiry, CreateEnquiryData, UpdateEnquiryData, EnquiryFilters, EnquiryStats } from '@/types/enquiry';

const ENQUIRIES_STORAGE_KEY = 'codexa-enquiries';

class EnquiryService {
  private getEnquiriesFromStorage(): Enquiry[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading enquiries from localStorage:', error);
      return [];
    }
  }

  private saveEnquiriesToStorage(enquiries: Enquiry[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    } catch (error) {
      console.error('Error saving enquiries to localStorage:', error);
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Get all enquiries
  getAllEnquiries(): Enquiry[] {
    return this.getEnquiriesFromStorage();
  }

  // Get enquiry by ID
  getEnquiryById(id: string): Enquiry | null {
    const enquiries = this.getEnquiriesFromStorage();
    return enquiries.find(enquiry => enquiry.id === id) || null;
  }

  // Create new enquiry
  createEnquiry(data: CreateEnquiryData): Enquiry {
    const enquiries = this.getEnquiriesFromStorage();
    const now = new Date().toISOString();
    
    const newEnquiry: Enquiry = {
      id: this.generateId(),
      ...data,
      createdAt: now,
      updatedAt: now,
      status: 'pending',
      priority: 'medium'
    };

    enquiries.push(newEnquiry);
    this.saveEnquiriesToStorage(enquiries);
    
    return newEnquiry;
  }

  // Update enquiry
  updateEnquiry(data: UpdateEnquiryData): Enquiry | null {
    const enquiries = this.getEnquiriesFromStorage();
    const index = enquiries.findIndex(enquiry => enquiry.id === data.id);
    
    if (index === -1) return null;

    const updatedEnquiry: Enquiry = {
      ...enquiries[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    enquiries[index] = updatedEnquiry;
    this.saveEnquiriesToStorage(enquiries);
    
    return updatedEnquiry;
  }

  // Delete enquiry
  deleteEnquiry(id: string): boolean {
    const enquiries = this.getEnquiriesFromStorage();
    const filteredEnquiries = enquiries.filter(enquiry => enquiry.id !== id);
    
    if (filteredEnquiries.length === enquiries.length) {
      return false; // No enquiry was deleted
    }
    
    this.saveEnquiriesToStorage(filteredEnquiries);
    return true;
  }

  // Filter enquiries
  filterEnquiries(filters: EnquiryFilters): Enquiry[] {
    let enquiries = this.getEnquiriesFromStorage();

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      enquiries = enquiries.filter(enquiry =>
        enquiry.name.toLowerCase().includes(searchTerm) ||
        enquiry.email.toLowerCase().includes(searchTerm) ||
        enquiry.mobile.includes(searchTerm) ||
        (Array.isArray(enquiry.technology) ? enquiry.technology.some(tech => tech.toLowerCase().includes(searchTerm)) : (enquiry.technology as string).toLowerCase().includes(searchTerm))
      );
    }

    if (filters.technology) {
      enquiries = enquiries.filter(enquiry => 
        (Array.isArray(enquiry.technology) ? enquiry.technology.some(tech => tech.toLowerCase() === filters.technology!.toLowerCase()) : (enquiry.technology as string).toLowerCase() === filters.technology!.toLowerCase())
      );
    }

    if (filters.passOutYear) {
      enquiries = enquiries.filter(enquiry => 
        enquiry.passOutYear === filters.passOutYear
      );
    }

    if (filters.status) {
      enquiries = enquiries.filter(enquiry => enquiry.status === filters.status);
    }

    if (filters.priority) {
      enquiries = enquiries.filter(enquiry => enquiry.priority === filters.priority);
    }

    return enquiries;
  }

  // Get unique technologies
  getUniqueTechnologies(): string[] {
    const enquiries = this.getEnquiriesFromStorage();
    const allTechnologies = enquiries.flatMap(enquiry => 
      Array.isArray(enquiry.technology) ? enquiry.technology : [enquiry.technology as string]
    );
    return [...new Set(allTechnologies)].sort();
  }

  // Get unique pass out years
  getUniquePassOutYears(): number[] {
    const enquiries = this.getEnquiriesFromStorage();
    const years = enquiries.map(enquiry => enquiry.passOutYear);
    return [...new Set(years)].sort((a, b) => b - a); // Sort descending
  }

  // Get enquiry statistics
  getEnquiryStats(): EnquiryStats {
    const enquiries = this.getEnquiriesFromStorage();
    
    const stats: EnquiryStats = {
      total: enquiries.length,
      byStatus: { pending: 0, contacted: 0, enrolled: 0, rejected: 0 },
      byPriority: { low: 0, medium: 0, high: 0 },
      byTechnology: {},
      byYear: {}
    };

          enquiries.forEach(enquiry => {
        // Count by status
        stats.byStatus[enquiry.status]++;
        
        // Count by priority
        stats.byPriority[enquiry.priority]++;
        
        // Count by technology (handle both string and array)
        if (Array.isArray(enquiry.technology)) {
          enquiry.technology.forEach(tech => {
            stats.byTechnology[tech] = (stats.byTechnology[tech] || 0) + 1;
          });
        } else if (typeof enquiry.technology === 'string') {
          // Handle legacy enquiries with string technology
          stats.byTechnology[enquiry.technology] = (stats.byTechnology[enquiry.technology] || 0) + 1;
        }
        
        // Count by year
        stats.byYear[enquiry.passOutYear] = (stats.byYear[enquiry.passOutYear] || 0) + 1;
      });

    return stats;
  }

  // Clear all enquiries (for testing/reset purposes)
  clearAllEnquiries(): void {
    this.saveEnquiriesToStorage([]);
  }
}

export const enquiryService = new EnquiryService();
