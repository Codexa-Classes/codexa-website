import { Course } from '@/types/course';

// Simulate API delay
const simulateApiDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: 'course-1',
    name: 'React Fundamentals',
    description: 'Learn React from scratch with modern hooks and functional components. Build real-world applications and understand React ecosystem.',
    category: 'frontend',
    duration: '8 weeks',
    price: 15000,
    image: '⚛️',
    instructor: 'Viraj Kadam',
    level: 'beginner',
    status: 'published',
    prerequisites: ['Basic JavaScript', 'HTML & CSS'],
    syllabus: [
      'Introduction to React',
      'Components and Props',
      'State and Lifecycle',
      'Hooks (useState, useEffect)',
      'Event Handling',
      'Conditional Rendering',
      'Lists and Keys',
      'Forms and Controlled Components',
      'Context API',
      'Project: Todo App'
    ],
    enrolledStudents: ['student-1', 'student-2'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'course-2',
    name: 'Python Programming',
    description: 'Master Python programming language with practical examples. Learn data structures, OOP, and build real applications.',
    category: 'backend',
    duration: '10 weeks',
    price: 18000,
    image: '🐍',
    instructor: 'Viraj Kadam',
    level: 'beginner',
    status: 'published',
    prerequisites: ['Basic computer knowledge'],
    syllabus: [
      'Python Basics',
      'Data Types and Variables',
      'Control Structures',
      'Functions and Modules',
      'Object-Oriented Programming',
      'File Handling',
      'Error Handling',
      'Working with APIs',
      'Database Integration',
      'Project: Web Scraper'
    ],
    enrolledStudents: ['student-1'],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: 'course-3',
    name: 'MySQL Database',
    description: 'Learn database design and SQL programming with MySQL. Master data modeling, queries, and database administration.',
    category: 'database',
    duration: '6 weeks',
    price: 12000,
    image: '🗄️',
    instructor: 'Viraj Kadam',
    level: 'intermediate',
    status: 'published',
    prerequisites: ['Basic programming knowledge'],
    syllabus: [
      'Database Fundamentals',
      'MySQL Installation & Setup',
      'Data Types and Constraints',
      'SQL Queries (SELECT, INSERT, UPDATE, DELETE)',
      'Joins and Relationships',
      'Indexing and Performance',
      'Stored Procedures',
      'Triggers and Views',
      'Database Security',
      'Project: E-commerce Database'
    ],
    enrolledStudents: ['student-2'],
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  }
];

// LocalStorage key
const STORAGE_KEY = 'job_portal_courses';

// LocalStorage helper functions
const getFromStorage = (): Course[] => {
  if (typeof window === 'undefined') return mockCourses; // Server-side rendering check
  
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : mockCourses;
  } catch (error) {
    console.error('Error reading courses from localStorage:', error);
    return mockCourses;
  }
};

const setToStorage = (courses: Course[]): void => {
  if (typeof window === 'undefined') return; // Server-side rendering check
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  } catch (error) {
    console.error('Error writing courses to localStorage:', error);
  }
};

// Initialize data on first load
export const initializeCourses = () => {
  if (typeof window === 'undefined') return; // Server-side rendering check
  
  const isFirstLoad = !localStorage.getItem(STORAGE_KEY);
  
  if (isFirstLoad) {
    setToStorage(mockCourses);
    console.log('Initialized courses data in localStorage');
  }
};

// Course CRUD Operations
export const courseService = {
  // Get all courses
  getAll: async (): Promise<Course[]> => {
    return getFromStorage();
  },

  // Get course by ID
  getById: async (id: string): Promise<Course | null> => {
    const courses = getFromStorage();
    return courses.find(course => course.id === id) || null;
  },

  // Create new course
  create: async (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'enrolledStudents'>): Promise<Course> => {
    const courses = getFromStorage();
    
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
      enrolledStudents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedCourses = [...courses, newCourse];
    setToStorage(updatedCourses);
    
    return newCourse;
  },

  // Update course
  update: async (id: string, updates: Partial<Course>): Promise<Course | null> => {
    const courses = getFromStorage();
    const courseIndex = courses.findIndex(course => course.id === id);
    
    if (courseIndex === -1) return null;
    
    const updatedCourse = {
      ...courses[courseIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    courses[courseIndex] = updatedCourse;
    setToStorage(courses);
    
    return updatedCourse;
  },

  // Delete course
  delete: async (id: string): Promise<boolean> => {
    const courses = getFromStorage();
    const filteredCourses = courses.filter(course => course.id !== id);
    
    if (filteredCourses.length === courses.length) {
      return false; // Course not found
    }
    
    setToStorage(filteredCourses);
    return true;
  },

  // Get courses by category
  getByCategory: async (category: Course['category']): Promise<Course[]> => {
    const courses = getFromStorage();
    return courses.filter(course => course.category === category);
  },

  // Get published courses only
  getPublished: async (): Promise<Course[]> => {
    const courses = getFromStorage();
    return courses.filter(course => course.status === 'published');
  }
};
