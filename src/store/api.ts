import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Job {
  company: string;
  type: string;
  location: string;
  experience: string;
  salary: string;
  requirements: any;
  responsibilities: any;
  isApplied: any;
  id: number;
  title: string;
  description: string;
  role: string;
  skills: string[];
  contactNumber: string;
  email: string;
  postedDate: string;
}

export interface JobResponse {
  jobs: Job[];
}

export interface CompanyRegistrationData {
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'recruiter' | 'job_seeker';
  };
}

export interface PostJobData {
  title: string;
  description: string;
  role: string;
  skills: string[];
  contactNumber: string;
  email: string;
}

export interface UserRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.50:443'
  }),
  endpoints: (builder) => ({
    getJobs: builder.query<[], void>({
      query: () => {
        const token = localStorage.getItem('token');
        console.log('token', token)
        return {
          url: 'jobs',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      
    }),
    getJobById: builder.query<Job, string>({
      query: (id) => {
        const token = localStorage.getItem('token');
        return {
          url: `/jobs/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
     
    }),
    applyForJob: builder.mutation<void, { jobId: number; resume: File }>({
      query: ({ jobId, resume }) => ({
        url: `jobs/${jobId}/apply`,
        method: 'POST',
        body: resume,
      }),
    }),
    registerCompany: builder.mutation<void, CompanyRegistrationData>({
      query: (data) => ({
        url: 'companies/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    postJob: builder.mutation<void, PostJobData>({
      query: (data) => {
        const token = localStorage.getItem('token');
        return {
          url: 'jobs',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: data,
        };
      },
    }),
    registerUser: builder.mutation<void, UserRegistrationData>({
      query: (data) => ({
        url: 'users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useApplyForJobMutation,
  useRegisterCompanyMutation,
  useLoginMutation,
  usePostJobMutation,
  useRegisterUserMutation,
} = api; 