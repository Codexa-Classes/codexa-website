import apiClient from './client';
import { API_CONFIG } from '../config/api';

// Candidate types matching backend response
export interface CandidateAPI {
  id: number;
  name: string;  // Backend returns 'name' not 'full_name'
  email: string;
  status: string;
}

// Candidates API service
export class CandidatesAPI {
  /**
   * Get all candidates (admin only)
   */
  static async getCandidates(): Promise<CandidateAPI[]> {
    try {
      const response = await apiClient.get<CandidateAPI[]>(
        API_CONFIG.ENDPOINTS.CANDIDATES.LIST
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized. Admin access required');
      } else if (error.response?.status === 403) {
        throw new Error('Forbidden. Admin access required');
      } else if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      } else {
        throw new Error('Failed to fetch candidates');
      }
    }
  }
}
