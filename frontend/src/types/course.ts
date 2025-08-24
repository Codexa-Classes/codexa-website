export interface Course {
  id: string;
  name: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'framework';
  duration: string;
  price: number;
  image: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'published' | 'archived';
  prerequisites: string[];
  syllabus: string[];
  enrolledStudents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EnrolledCourse extends Course {
  progress: number; // 0-100
  completedTopics: number;
  isCompleted: boolean;
  enrollmentDate: Date;
  certificateId?: string;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'graduated';
  enrolledCourses: string[];
  completedCourses: string[];
  joinDate: string;
  lastActive: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  status: 'enrolled' | 'in-progress' | 'completed' | 'dropped';
  enrolledAt: string;
  completedAt?: string;
  progress: number; // 0-100
  certificateId?: string;
}
