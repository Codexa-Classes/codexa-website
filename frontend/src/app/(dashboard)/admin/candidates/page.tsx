'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES, getCandidateEditRoute, getCandidateViewRoute } from '@/lib/constants';
import { CandidatesAPI, CandidateAPI, PaginatedCandidatesResponse, PaginationMeta } from '@/lib/api/candidates';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHeader } from '@/components/forms';
import { ActionButtons } from '@/components/ui/action-buttons';

export default function CandidatesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<CandidateAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  // Get candidate ID from URL query params
  const candidateId = searchParams?.get('id') || null;
  const viewMode = candidateId ? 'profile' : 'list';
  const selectedCandidate = candidateId ? candidates.find(c => c.id.toString() === candidateId) : null;

  // Define fetchCandidates function outside useEffect so it can be called from multiple places
  const fetchCandidates = async (page: number = currentPage, size: number = pageSize) => {
    try {
      setLoading(true);
      setError(null);
      
      const skip = (page - 1) * size;
      const response = await CandidatesAPI.getCandidates({
        skip,
        limit: size,
        search: searchTerm || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      
      setCandidates(response.data);
      setPagination(response.pagination);
      setCurrentPage(response.pagination.current_page);
    } catch (error: any) {
      console.error('CandidatesPage: Error loading candidates:', error);
      setError(error.message || 'Failed to load candidates');
      setCandidates([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push(ROUTES.login);
      return;
    }
    
    fetchCandidates();
  }, [user, router]);

  // Handle URL changes and ensure candidate data is available
  useEffect(() => {
    if (candidateId && candidates.length > 0) {
      const candidate = candidates.find(c => c.id.toString() === candidateId);
      if (!candidate) {
        router.push(ROUTES.admin.candidates);
      }
    }
  }, [candidateId, candidates, router]);

  // Handle search and filter changes
  useEffect(() => {
    if (user && user.role === 'admin') {
      // Reset to first page when filters change
      setCurrentPage(1);
      fetchCandidates(1, pageSize);
    }
  }, [searchTerm, statusFilter]);

  // Define refresh function
  const refreshCandidates = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * pageSize;
      const response = await CandidatesAPI.getCandidates({
        skip,
        limit: pageSize,
        search: searchTerm || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      
      setCandidates(response.data);
      setPagination(response.pagination);
    } catch (error: any) {
      setError(error.message || 'Failed to refresh candidates');
    } finally {
      setLoading(false);
    }
  };

  // Handler functions
  const handleAddCandidate = () => {
    router.push(ROUTES.admin.candidates + '/add');
  };

  const handleDeleteCandidate = (candidate: CandidateAPI) => {
    // TODO: Implement delete API call
    console.log('Delete candidate:', candidate.name);
    // refreshCandidates();
  };

  const handleBackToDashboard = () => {
    router.push(ROUTES.admin.dashboard);
  };

  const handleBackToList = () => {
    router.push(ROUTES.admin.candidates);
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCandidates(page, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    fetchCandidates(1, size);
  };

  // Refresh candidates when page gains focus (e.g., returning from add/edit)
  useEffect(() => {
    const handleFocus = () => {
      refreshCandidates();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [currentPage, pageSize, searchTerm, statusFilter]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => fetchCandidates(currentPage, pageSize)}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show detailed profile view
  if (viewMode === 'profile' && selectedCandidate) {
    return (
      <div className="text-center py-8">
        <p>Candidate profile view - TODO: Update CandidateProfile component to use API structure</p>
        <Button onClick={handleBackToList} className="mt-4">
          Back to List
        </Button>
      </div>
    );
  }

  // Show candidates list view
  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { href: ROUTES.admin.dashboard, label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
          { href: ROUTES.admin.candidates, label: 'Candidates' },
          ...(selectedCandidate ? [{ href: getCandidateViewRoute(selectedCandidate.id.toString()), label: selectedCandidate.name }] : []),
        ]}
      />

      <Card>
        <CardHeader>
          <PageHeader
            title="Candidates"
            onBack={handleBackToDashboard}
            actionButton={{
              text: "Create",
              onClick: handleAddCandidate
            }}
            filters={[
              {
                label: "Search",
                value: searchTerm,
                type: "search",
                placeholder: "Search candidates...",
                onChange: (value) => setSearchTerm(value as string)
              },
              {
                label: "Status",
                value: statusFilter,
                options: [
                  { value: "all", label: "All Status" },
                  { value: "pending", label: "Pending" },
                  { value: "approved", label: "Approved" },
                  { value: "rejected", label: "Rejected" }
                ],
                onChange: (value) => setStatusFilter(value as string)
              }
            ]}
          />
        </CardHeader>
      
        <CardContent className="space-y-6">

          {/* Table: Clean data display with horizontal scroll on mobile */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Name</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Email</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="border-t hover:bg-muted/25">
                      <td className="px-4 py-3 text-center">
                        <div>
                          <div className="text-sm font-medium whitespace-nowrap">{candidate.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap text-center">{candidate.email}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                          candidate.status === 'approved' ? 'bg-green-100 text-green-800' :
                          candidate.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ActionButtons
                          id={candidate.id.toString()}
                          basePath="/admin/candidates"
                          onDelete={handleDeleteCandidate}
                          size="sm"
                          showView={true}
                          showEdit={true}
                          showDelete={true}
                          getViewRoute={getCandidateViewRoute}
                          deleteConfirmTitle={`Delete ${candidate.name}?`}
                          deleteConfirmDescription={`Are you sure you want to delete ${candidate.name}? This action cannot be undone and will permanently remove this candidate from the system.`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination: Page controls at bottom */}
          {pagination && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <select 
                  value={pageSize} 
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm text-muted-foreground">
                  Showing {pagination.showing_from} to {pagination.showing_to} of {pagination.total} entries
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.has_prev}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {pagination.current_page} of {pagination.total_pages}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.has_next}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
