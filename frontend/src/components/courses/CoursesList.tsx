"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Clock, 
  Users, 
  Award, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import DevIcon from '@/components/DevIcon';
import { Course } from '@/lib/constants/courses';
import { coursesApiService } from '@/lib/services/coursesApi';

interface CoursesListProps {
  fallbackCourses?: Course[];
}

export default function CoursesList({ fallbackCourses = [] }: CoursesListProps) {
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const apiCourses = await coursesApiService.getAll();
        setCourses(apiCourses);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
        // Keep fallback courses if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'bg-purple-500 text-white border-purple-500';
      case 'web':
        return 'bg-blue-500 text-white border-blue-500';
      case 'business':
        return 'bg-green-500 text-white border-green-500';
      case 'data':
        return 'bg-indigo-500 text-white border-indigo-500';
      case 'devops':
        return 'bg-orange-500 text-white border-orange-500';
      case 'database':
        return 'bg-teal-500 text-white border-teal-500';
      case 'support':
        return 'bg-gray-500 text-white border-gray-500';
      default:
        return 'bg-gray-500 text-white border-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-gray-600">Showing courses from cache...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {courses.map((course) => (
        <Card key={course.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">
                <DevIcon name={course.icon_name} size={48} />
              </div>
              <Badge className={`text-xs font-semibold ${getCategoryBadgeVariant(course.category)}`}>
                {course.category}
              </Badge>
            </div>
            <CardTitle className="text-xl text-gray-900 font-bold">{course.name}</CardTitle>
            <CardDescription className="text-gray-700 font-medium">
              {course.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700 font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700 font-medium">{course.students}</span>
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <Award className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700 font-medium">{course.level}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3 text-gray-900">What You&apos;ll Learn:</h4>
              <ul className="space-y-2">
                {course.topics.slice(0, 4).map((topic, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{topic}</span>
                  </li>
                ))}
                {course.topics.length > 4 && (
                  <li className="text-sm text-gray-600 font-medium">
                    +{course.topics.length - 4} more topics...
                  </li>
                )}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300" asChild>
                <Link href={`/courses/${course.id}`}>
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium" asChild>
                <Link href="/contact">
                  Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
