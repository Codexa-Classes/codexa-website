'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES, getCandidateEditRoute, getCandidateViewRoute } from '@/lib/constants';
import { CandidatesAPI, CandidateAPI } from '@/lib/api/candidates';
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
  
  // Get candidate ID from URL query params
  const candidateId = searchParams?.get('id') || null;
  const viewMode = candidateId ? 'profile' : 'list';
  const selectedCandidate = candidateId ? candidates.find(c => c.id.toString() === candidateId) : null;

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push(ROUTES.login);
      return;
    }
    
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        setError(null);
        const candidatesData = await CandidatesAPI.getCandidates();
        setCandidates(candidatesData);
      } catch (error: any) {
        console.error('CandidatesPage: Error loading candidates:', error);
        setError(error.message || 'Failed to load candidates');
        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

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

  // Define refresh function
  const refreshCandidates = async () => {
    try {
      setLoading(true);
      const candidatesData = await CandidatesAPI.getCandidates();
      setCandidates(candidatesData);
    } catch (error: any) {
      setError(error.message || 'Failed to refresh candidates');
    } finally {
      setLoading(false);
    }
  };

  // Refresh candidates when page gains focus (e.g., returning from add/edit)
  useEffect(() => {
    const handleFocus = () => {
      refreshCandidates();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

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
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Ensure candidates is always an array before filtering
  const validCandidates = Array.isArray(candidates) ? candidates : [];
  
  // Apply search and status filters
  const filteredCandidates = validCandidates.filter(candidate => {
    // Safety check: ensure candidate is valid
    if (!candidate || typeof candidate !== 'object') {
      return false;
    }
    
    // Safety check: ensure required properties exist
    if (!candidate.name) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && candidate.status !== statusFilter) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = candidate.name.toLowerCase().includes(searchLower);
      const emailMatch = candidate.email.toLowerCase().includes(searchLower);
      
      if (!nameMatch && !emailMatch) {
        return false;
      }
    }
    
    return true;
  });

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

  const handleScheduleInterview = (candidate: CandidateAPI) => {
    // TODO: Implement interview scheduling
    console.log('Schedule interview for:', candidate.name);
  };

  const handleApprove = (candidate: CandidateAPI) => {
    // TODO: Implement candidate approval
    console.log('Approve candidate:', candidate.name);
  };

  const handleReject = (candidate: CandidateAPI) => {
    // TODO: Implement candidate rejection
    console.log('Reject candidate:', candidate.name);
  };

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
                  {filteredCandidates.map((candidate) => (
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border rounded-md text-sm">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-sm text-muted-foreground">
                Showing 1 to {filteredCandidates.length} of {filteredCandidates.length} entries
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              <span className="text-sm text-muted-foreground">Page 1 of 1</span>
              <Button variant="outline" size="sm" disabled>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
