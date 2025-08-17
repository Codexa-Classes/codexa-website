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
  export const getCandidateRoute = (id: string) => `/admin/candidates/${id}`;
  export const getCandidateEditRoute = (id: string) => `/admin/candidates/${id}/edit`;
  export const getCandidateViewRoute = (id: string) => `/admin/candidates?id=${id}`;

  // Job route helper functions
  export const getJobRoute = (id: string) => `/admin/jobs/${id}`;
  export const getJobEditRoute = (id: string) => `/admin/jobs/${id}/edit`;
  export const getJobViewRoute = (id: string) => `/admin/jobs?id=${id}`;

  // Course route helper functions
  export const getCourseRoute = (id: string) => `/admin/courses/${id}`;
  export const getCourseEditRoute = (id: string) => `/admin/courses/${id}/edit`;
  export const getCourseViewRoute = (id: string) => `/admin/courses?id=${id}`;

  export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
  } as const;

  export const USER_TYPES = {
    EMPLOYEE: 'employee',
    CANDIDATE: 'candidate',
  } as const;