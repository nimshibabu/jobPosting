/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetJobsQuery } from '@/store/api';
import Link from 'next/link';
import { isAuthenticated, getUserRole } from '@/utils/auth';

interface Job {
  id: number;
  title: string;
  description: string;
  role: string;
  skills: string[];
  contactNumber: string;
  email: string;
  createdAt: string;
}

const JobCard = ({ job }: { job: Job }) =>{ 
  return (

  
  <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{job.role}</p>
      </div>
      <span className="text-sm text-gray-500">
        Posted {new Date(job.createdAt).toLocaleDateString()}
      </span>
    </div>

    <p className="mt-4 text-gray-600 line-clamp-3">{job.description}</p>

    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-900">Required Skills:</h4>
      <div className="mt-2 flex flex-wrap gap-2">
        {job?.skills && JSON.parse(job?.skills as any).map((skill: string) => (
          <span
            key={skill}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-4 flex justify-between items-center">
      <div className="text-sm text-gray-500">
        <p>Contact: {job.contactNumber}</p>
        <p>Email: {job.email}</p>
      </div>
      <div className="flex space-x-3">
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View Details
        </Link>
        <Link
          href={`/jobs/${job.id}/applications`}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          View Applications
        </Link>
      </div>
    </div>
  </div>
)};

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="mt-2">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
        </div>
        <div className="mt-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function RecruiterDashboardPage() {
  const router = useRouter();
  const { data, isLoading, error } = useGetJobsQuery();

  console.log(data);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const userRole = getUserRole();
    if (userRole !== 'job_seeker') {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600">Error loading jobs. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">User Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
             
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Posted Jobs</h2>
            <div className="flex space-x-4">
              <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                <option>All Jobs</option>
                <option>Active</option>
                <option>Closed</option>
              </select>
              <input
                type="text"
                placeholder="Search jobs..."
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => <LoadingSkeleton key={i} />)
            ) : (
              data?.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 