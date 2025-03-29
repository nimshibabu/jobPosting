# Job Posting Application

A modern web application for job seekers and recruiters built with Next.js, TypeScript, and Tailwind CSS.

## Features

### For Job Seekers
- User registration and authentication
- Browse available jobs
- View detailed job information
- Apply for jobs with resume upload
- Track application status

### For Recruiters
- Company registration
- Post new job listings
- Manage job postings
- View job applications
- Contact applicants

## Tech Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit with RTK Query
- **Form Handling**: React Hook Form with Yup validation
- **UI Components**: Custom components with Tailwind CSS
- **Authentication**: JWT-based authentication
- **API Integration**: RESTful API with fetchBaseQuery

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- API server running at `http://192.168.1.50:8000`

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd job-posting
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://192.168.1.50:8000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Job seeker dashboard
│   ├── login/            # Login page
│   ├── register/         # User registration
│   ├── register-company/ # Company registration
│   ├── recruiter-dashboard/ # Recruiter dashboard
│   └── jobs/             # Job details and application
├── components/           # Reusable components
├── store/               # Redux store and API slice
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /users` - User registration
- `POST /companies/register` - Company registration

### Jobs
- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get job details
- `POST /jobs` - Create new job posting
- `POST /jobs/:id/apply` - Apply for a job

## Features in Detail

### User Registration
- Email and password authentication
- First and last name
- Phone number
- Form validation
- Success/error notifications

### Job Posting
- Job title and description
- Required skills
- Contact information
- Role specification
- Form validation
- Success/error handling

### Job Application
- Resume upload
- Application status tracking
- Job details view
- Company information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Redux Toolkit team for the state management solution
- Tailwind CSS team for the utility-first CSS framework

## Environment Variables

The application uses environment variables for configuration. Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://192.168.1.50:8000
```

You can copy the `.env.example` file to `.env.local` and modify the values as needed:

```bash
cp .env.example .env.local
```

### Available Environment Variables

- `NEXT_PUBLIC_API_URL`: The base URL of the API server (required)

Note: All environment variables prefixed with `NEXT_PUBLIC_` will be exposed to the browser.
