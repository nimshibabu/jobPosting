'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetJobByIdQuery, useApplyForJobMutation } from '@/store/api';

const JobDetailsPage = () => {
  const router = useRouter();
  const [resume, setResume] = useState<File | null>(null);
  const [applicationError, setApplicationError] = useState<string>('');
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const id = ""
  const { data: job, isLoading, error } = useGetJobByIdQuery(id);
  const [applyForJob] = useApplyForJobMutation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
      setApplicationError('');
    } else {
      setApplicationError('Please upload a PDF file');
      setResume(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setApplicationError('Please select a resume file');
      return;
    }

    try {
      await applyForJob({ jobId: Number(id), resume }).unwrap();
      setApplicationSuccess(true);
      setApplicationError('');
    } catch (_err) {
      setApplicationError('Failed to submit application. Please try again.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !job) return <div>Error loading job details.</div>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.company}</p>
      <h3>Requirements</h3>
      <ul>
        {job.requirements.map((req: string, index: number) => (
          <li key={index}>{req}</li>
        ))}
      </ul>

      {!job.isApplied && (
        <form onSubmit={handleSubmit}>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          <button type="submit">Apply</button>
        </form>
      )}

      {applicationSuccess && <p>Application submitted successfully!</p>}
      {applicationError && <p>{applicationError}</p>}
    </div>
  );
};

export default JobDetailsPage;
