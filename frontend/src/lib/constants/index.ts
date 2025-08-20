export const APP_CONFIG = {
    name: 'Codexa Classes',
    version: '1.0.0',
  } as const;

  export const ROUTES = {
    login: '/login',
    admin: {
      dashboard: '/admin',
      candidates: '/admin/candidates',
      jobs: '/admin/jobs',
      courses: '/admin/courses',
    },
    user: {
      dashboard: '/user',
      profile: '/user/profile',
      jobs: '/user/jobs',
      appliedJobs: '/user/applied-jobs',
      courses: '/user/courses',
    },
  } as const;

  // Helper functions for dynamic routes
  export const getCandidateRoute = (id: string | number) => `/admin/candidates/${id}`;
  export const getCandidateEditRoute = (id: string | number) => `/admin/candidates/${id}/edit`;
  export const getCandidateViewRoute = (id: string | number) => `/admin/candidates?id=${id}`;

  // Job route helper functions
  export const getJobRoute = (id: string | number) => `/admin/jobs/${id}`;
  export const getJobEditRoute = (id: string | number) => `/admin/jobs/${id}/edit`;
  export const getJobViewRoute = (id: string | number) => `/admin/jobs?id=${id}`;

  // Course route helper functions
  export const getCourseRoute = (id: string | number) => `/admin/courses/${id}`;
  export const getCourseEditRoute = (id: string | number) => `/admin/courses/${id}/edit`;
  export const getCourseViewRoute = (id: string | number) => `/admin/courses?id=${id}`;

  export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
  } as const;

  export const USER_TYPES = {
    EMPLOYEE: 'employee',
    CANDIDATE: 'candidate',
  } as const;

export interface Instructor {
  name: string;
  title: string;
  experience: string;
  currentRole: string;
  email: string;
  expertise: readonly string[];
  organizations: readonly string[];
}

export const INSTRUCTOR: Instructor = {
  name: "Viraj Kadam",
  title: "Business Analyst & Technology Consultant",
  experience: "10+ Years",
  currentRole: "Data Analyst - Sr. Manager at Kotak Mahindra Bank",
  email: "hiVirajKadam@gmail.com",
  expertise: [
    "PHP & Laravel Framework",
    "Python & Django Development", 
    "Web Development (LAMP, MEAN, MERN)",
    "Linux & System Administration",
    "Cloud Computing (AWS, DigitalOcean)",
    "Database Management (Oracle, MySQL)",
    "Machine Learning & Data Analysis"
  ],
  organizations: [
    "Kotak Mahindra Bank Ltd.",
    "Nitor Infotech Pvt. Ltd.",
    "Clover Infotech Pvt. Ltd.",
    "Infodeal Technologies Pvt. Ltd.",
    "OS3 Infotech Pvt. Ltd."
  ]
} as const;

// Export courses constants
export * from './courses';