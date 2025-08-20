import { Course } from '@/types/course';
import { INSTRUCTOR, COURSES } from '@/lib/constants';

// Simulate API delay
const simulateApiDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Use courses from constants
const mockCourses: Course[] = COURSES.map((course, index) => ({
  id: `course-${index + 1}`,
  name: course.name,
  description: course.description,
  category: course.category,
  duration: course.duration,
  price: course.price,
  image: course.icon,
  instructor: INSTRUCTOR.name,
  level: course.level.toLowerCase().split(' ')[0] as 'beginner' | 'intermediate' | 'advanced',
  status: 'published',
  prerequisites: ['Basic programming knowledge'],
  syllabus: [...course.topics],
  enrolledStudents: ['student-1', 'student-2'],
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00Z'
}));

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
