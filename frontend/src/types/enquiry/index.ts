export interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  passOutYear: number;
  technology: string[];
  createdAt: string;
  updatedAt: string;
  status: EnquiryStatus;
  priority: EnquiryPriority;
}

export interface CreateEnquiryData {
  name: string;
  mobile: string;
  email: string;
  passOutYear: number;
  technology: string[];
}

export interface UpdateEnquiryData extends Partial<CreateEnquiryData> {
  id: string;
  status?: EnquiryStatus;
  priority?: EnquiryPriority;
}

export type EnquiryStatus = 'pending' | 'contacted' | 'enrolled' | 'rejected';
export type EnquiryPriority = 'low' | 'medium' | 'high';

export interface EnquiryFilters {
  technology?: string;
  passOutYear?: number;
  status?: EnquiryStatus;
  priority?: EnquiryPriority;
  searchTerm?: string;
}

export interface EnquiryStats {
  total: number;
  byStatus: Record<EnquiryStatus, number>;
  byPriority: Record<EnquiryPriority, number>;
  byTechnology: Record<string, number>;
  byYear: Record<number, number>;
}
