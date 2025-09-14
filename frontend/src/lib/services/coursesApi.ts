import apiClient from '@/lib/api/client';
import { Course } from '@/lib/constants/courses';
import { generateSlug } from '@/lib/utils';

// Backend API response types
export interface CourseApiResponse {
  id: number;
  name: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  price: number;
  icon: string;
  icon_name: string;
  career_path: string;
  instructor: string;
  topics: string[];
  skills: string[];
  projects: string[];
  prerequisites: string[];
  syllabus: string[];
  enrolled_students: string[];
  students_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Transform backend response to frontend Course type
const transformCourseResponse = (apiCourse: CourseApiResponse): Course => {
  return {
    id: generateSlug(apiCourse.name), // Use slug-based ID from course name
    name: apiCourse.name,
    description: apiCourse.description,
    category: apiCourse.category as Course['category'],
    duration: apiCourse.duration,
    students: apiCourse.students_count,
    level: apiCourse.level,
    topics: apiCourse.topics,
    icon_name: apiCourse.icon_name,
    price: apiCourse.price,
    careerPath: apiCourse.career_path,
    skills: apiCourse.skills,
    projects: apiCourse.projects,
    icon: apiCourse.icon
  };
};

// Courses API service
export const coursesApiService = {
  // Get all published courses
  getAll: async (): Promise<Course[]> => {
    try {
      const response = await apiClient.get<CourseApiResponse[]>('/courses/');
      return response.data.map(transformCourseResponse);
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error('Failed to fetch courses');
    }
  },

  // Get course by ID
  getById: async (id: string): Promise<Course | null> => {
    try {
      const response = await apiClient.get<CourseApiResponse>(`/courses/${id}`);
      return transformCourseResponse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  },

  // Get courses by category
  getByCategory: async (category: Course['category']): Promise<Course[]> => {
    try {
      const allCourses = await coursesApiService.getAll();
      return allCourses.filter(course => course.category === category);
    } catch (error) {
      console.error('Error fetching courses by category:', error);
      return [];
    }
  },

  // Get published courses only (same as getAll for now)
  getPublished: async (): Promise<Course[]> => {
    return coursesApiService.getAll();
  }
};

// Admin courses API service (requires authentication)
export const adminCoursesApiService = {
  // Create new course
  create: async (courseData: Partial<CourseApiResponse>): Promise<Course> => {
    try {
      console.log('adminCoursesApiService: create called with data:', courseData);
      const response = await apiClient.post<CourseApiResponse>('/courses/', courseData);
      console.log('adminCoursesApiService: create response:', response.data);
      return transformCourseResponse(response.data);
    } catch (error) {
      console.error('adminCoursesApiService: Error creating course:', error);
      throw new Error('Failed to create course');
    }
  },

  // Update course
  update: async (id: string, updates: Partial<CourseApiResponse>): Promise<Course> => {
    try {
      const response = await apiClient.put<CourseApiResponse>(`/courses/${id}`, updates);
      return transformCourseResponse(response.data);
    } catch (error) {
      console.error('Error updating course:', error);
      throw new Error('Failed to update course');
    }
  },

  // Delete course (soft delete - sets status to archived)
  delete: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/courses/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting course:', error);
      return false;
    }
  },

  // Get all courses (including unpublished) - for admin
  getAllAdmin: async (): Promise<Course[]> => {
    try {
      const response = await apiClient.get<CourseApiResponse[]>('/courses/');
      return response.data.map(transformCourseResponse);
    } catch (error) {
      console.error('Error fetching all courses for admin:', error);
      throw new Error('Failed to fetch courses');
    }
  }
};
