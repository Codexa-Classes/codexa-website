import apiClient from './client';
import { API_CONFIG } from '../config/api';

// Candidate types matching backend response
export interface CandidateAPI {
  id: number;
  name: string;
  email: string;
  status: string;
}

// Pagination metadata from backend
export interface PaginationMeta {
  skip: number;
  limit: number;
  total: number;
  current_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
  showing_from: number;
  showing_to: number;
}

// Paginated response from backend
export interface PaginatedCandidatesResponse {
  data: CandidateAPI[];
  pagination: PaginationMeta;
}

// Pagination parameters for API calls
export interface PaginationParams {
  skip?: number;
  limit?: number;
  search?: string;
  status?: string;
}

// Candidates API service
export class CandidatesAPI {
  /**
   * Get candidates with pagination (admin only)
   */
  static async getCandidates(params: PaginationParams = {}): Promise<PaginatedCandidatesResponse> {
    try {
      const { skip = 0, limit = 20, search, status } = params;

      const response = await apiClient.get<PaginatedCandidatesResponse>(
        API_CONFIG.ENDPOINTS.CANDIDATES.LIST,
        {
          params: {
            skip,
            limit,
            ...(search && { search }),
            ...(status && status !== 'all' && { status }),
          }
        }
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
