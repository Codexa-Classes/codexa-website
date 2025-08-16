'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { JobProfile } from '@/components/jobs/job-profile';
import { jobsService } from '@/lib/services/jobsService';
import { useEffect, useState } from 'react';
import { Job } from '@/components/jobs/jobs-columns';

export default function ViewJobPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      const jobData = jobsService.getJobById(jobId);
      setJob(jobData);
      setIsLoading(false);
    }
  }, [jobId]);

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    router.push(ROUTES.login);
    return null;
  }

  const handleBack = () => {
    router.push(ROUTES.admin.jobs);
  };

  const handleEdit = () => {
    router.push(`/admin/jobs/${jobId}/edit`);
  };

  const handleDelete = () => {
    if (job && confirm('Are you sure you want to delete this job?')) {
      jobsService.deleteJob(jobId);
      router.push(ROUTES.admin.jobs);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading job...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-600">Job not found</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <JobProfile 
        job={job}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
