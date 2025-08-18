'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES, getCandidateEditRoute, getCandidateViewRoute } from '@/lib/constants';
import { candidatesService } from '@/lib/services/candidatesService';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { CandidateProfile } from '@/components/candidates/candidate-profile';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHeader } from '@/components/forms';
import { ActionButtons } from '@/components/ui/action-buttons';
import { Candidate } from '@/components/candidates/candidates-columns';

export default function CandidatesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Get candidate ID from URL query params
  const candidateId = searchParams?.get('id') || null;
  const viewMode = candidateId ? 'profile' : 'list';
  const selectedCandidate = candidateId ? candidates.find(c => c.id === candidateId) : null;

  useEffect(() => {
    console.log('CandidatesPage: User role:', user?.role);
    console.log('CandidatesPage: Current user:', user);
    
    if (!user || user.role !== 'admin') {
      console.log('CandidatesPage: Redirecting to login');
      router.push(ROUTES.login);
      return;
    }
    
    console.log('CandidatesPage: User authenticated as admin');
    
    try {
      // Initialize with one sample candidate if storage is empty
      candidatesService.initializeWithSampleData();
      const storedCandidates = candidatesService.getAllCandidates();
      console.log('CandidatesPage: Loaded candidates:', storedCandidates);
      
      // Set candidates from localStorage
      setCandidates(storedCandidates);
    } catch (error) {
      console.error('CandidatesPage: Error loading candidates:', error);
      setCandidates([]);
    }
  }, [user, router]);

  // Debug: Log candidates data
  useEffect(() => {
    console.log('CandidatesPage: Current candidates state:', candidates);
    console.log('CandidatesPage: Candidates length:', candidates?.length);
    if (candidates && candidates.length > 0) {
      console.log('CandidatesPage: First candidate sample:', candidates[0]);
    }
  }, [candidates]);

  // Handle URL changes and ensure candidate data is available
  useEffect(() => {
    if (candidateId && candidates.length > 0) {
      const candidate = candidates.find(c => c.id === candidateId);
      if (!candidate) {
        console.log('Candidate not found, redirecting to list');
        router.push(ROUTES.admin.candidates);
      }
    }
  }, [candidateId, candidates, router]);

  // Refresh candidates when page gains focus (e.g., returning from add/edit)
  useEffect(() => {
    const handleFocus = () => {
      refreshCandidates();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (!user || user.role !== 'admin') {
    console.log('CandidatesPage: Rendering null - user not admin');
    return null;
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
    if (!candidate.fullName) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && candidate.status !== statusFilter) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = candidate.fullName.toLowerCase().includes(searchLower);
      const titleMatch = candidate.profileTitle?.toLowerCase().includes(searchLower) || false;
      const skillsMatch = candidate.primarySkills?.some(skill => 
        skill.toLowerCase().includes(searchLower)
      ) || false;
      const locationMatch = candidate.location?.toLowerCase().includes(searchLower) || false;
      
      if (!nameMatch && !titleMatch && !skillsMatch && !locationMatch) {
        return false;
      }
    }
    
    return true;
  });

  const handleAddCandidate = () => {
    router.push(ROUTES.admin.candidates + '/add');
  };

  const refreshCandidates = () => {
    const storedCandidates = candidatesService.getAllCandidates();
    setCandidates(storedCandidates);
  };

  const handleDeleteCandidate = (candidate: Candidate) => {
    if (confirm(`Are you sure you want to delete ${candidate.fullName}?`)) {
      const success = candidatesService.deleteCandidate(candidate.id);
      if (success) {
        refreshCandidates();
        // Show success message
        alert(`Successfully deleted ${candidate.fullName}`);
      } else {
        alert('Failed to delete candidate');
      }
    }
  };

  const handleBackToDashboard = () => {
    router.push(ROUTES.admin.dashboard);
  };

  const handleBackToList = () => {
    router.push(ROUTES.admin.candidates);
  };

  const handleScheduleInterview = (candidate: Candidate) => {
    // TODO: Implement interview scheduling
    console.log('Schedule interview for:', candidate.fullName);
  };

  const handleApprove = (candidate: Candidate) => {
    // TODO: Implement candidate approval
    console.log('Approve candidate:', candidate.fullName);
  };

  const handleReject = (candidate: Candidate) => {
    // TODO: Implement candidate rejection
    console.log('Reject candidate:', candidate.fullName);
  };

  // Show detailed profile view
  if (viewMode === 'profile' && selectedCandidate) {
    return (
      <CandidateProfile
        candidate={selectedCandidate}
        onBack={handleBackToList}
        onDelete={() => handleDeleteCandidate(selectedCandidate)}
        onEdit={() => router.push(getCandidateEditRoute(selectedCandidate.id))}
      />
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
          ...(selectedCandidate ? [{ href: getCandidateViewRoute(selectedCandidate.id), label: selectedCandidate.fullName }] : []),
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
          />
        </CardHeader>
      
        <CardContent className="space-y-6">

          {/* Table: Clean data display with horizontal scroll on mobile */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-t hover:bg-muted/25">
                      <td className="px-4 py-3">
                        <div>
                          <div className="text-sm font-medium whitespace-nowrap">{candidate.fullName}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{candidate.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                          candidate.status === 'approved' ? 'bg-green-100 text-green-800' :
                          candidate.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ActionButtons
                          id={candidate.id}
                          basePath="/admin/candidates"
                          onDelete={handleDeleteCandidate}
                          size="sm"
                          showView={true}
                          showEdit={true}
                          showDelete={true}
                          getViewRoute={getCandidateViewRoute}
                          deleteConfirmTitle={`Delete ${candidate.fullName}?`}
                          deleteConfirmDescription={`Are you sure you want to delete ${candidate.fullName}? This action cannot be undone and will permanently remove this candidate from the system.`}
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
