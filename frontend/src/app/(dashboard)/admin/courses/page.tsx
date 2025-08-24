"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { courseService, initializeCourses } from "@/lib/services/coursesService"
import { Course } from "@/types/course"
import { Plus, BookOpen, Users, TrendingUp, Home } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/forms"
import { ROUTES } from "@/lib/constants"
import { ActionButtons } from "@/components/ui/action-buttons"

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    initializeCourses()
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const coursesData = await courseService.getAll()
      setCourses(coursesData)
    } catch (error) {
      console.error("Error loading courses:", error)
      toast.error("Failed to load courses")
    }
    // Remove finally block
  }

  const handleDeleteCourse = (courseId: string | number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      courseService.delete(courseId as string)
        .then(() => {
          setCourses(courses.filter(c => c.id !== courseId))
          toast.success("Course deleted successfully!")
        })
        .catch((error) => {
          console.error("Error deleting course:", error)
          toast.error("Failed to delete course")
        })
    }
  }

  // Apply search and status filters
  const filteredCourses = courses.filter(course => {
    // Safety check: ensure course is valid
    if (!course || typeof course !== 'object') {
      return false;
    }
    
    // Safety check: ensure required properties exist
    if (!course.name) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && course.status !== statusFilter) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = course.name.toLowerCase().includes(searchLower);
      const categoryMatch = course.category?.toLowerCase().includes(searchLower) || false;
      const instructorMatch = course.instructor?.toLowerCase().includes(searchLower) || false;
      
      if (!nameMatch && !categoryMatch && !instructorMatch) {
        return false;
      }
    }
    
    return true;
  });

  const stats = {
    totalCourses: courses.length,
    publishedCourses: courses.filter(c => c.status === 'published').length,
    totalStudents: courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0),
    totalRevenue: courses.reduce((sum, course) => sum + course.price, 0)
  }

  const handleBackToDashboard = () => {
    // Navigate back to dashboard
    window.history.back()
  }

  const handleAddCourse = () => {
    // Navigate to add course page
    window.location.href = "/admin/courses/add"
  }

  // Remove loading check

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { href: ROUTES.admin.dashboard, label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
          { href: ROUTES.admin.courses, label: 'Courses' },
        ]}
      />

      <Card>
        <CardHeader>
          <PageHeader
            title="Courses"
            onBack={handleBackToDashboard}
            actionButton={{
              text: "Create",
              onClick: handleAddCourse
            }}
            filters={[
              {
                label: "Search",
                value: searchTerm,
                type: "search",
                placeholder: "Search courses...",
                onChange: setSearchTerm
              },
              {
                label: "Status",
                value: statusFilter,
                options: [
                  { value: "all", label: "All Status" },
                  { value: "draft", label: "Draft" },
                  { value: "published", label: "Published" },
                  { value: "archived", label: "Archived" }
                ],
                onChange: setStatusFilter
              }
            ]}
          />
        </CardHeader>
        
        <CardContent className="space-y-6">

          {/* Table: Clean data display with horizontal scroll on mobile */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Course Name</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Category</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Instructor</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Level</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Duration</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Price</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Students</th>
                    <th className="px-4 py-3 text-center text-sm font-medium whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="border-t hover:bg-muted/25">
                      <td className="px-4 py-3 text-center">
                        <div>
                          <div className="text-sm font-medium whitespace-nowrap">{course.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground capitalize">
                          {course.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap text-center">{course.instructor}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-1 text-xs rounded-full border border-border capitalize">
                          {course.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap text-center">{course.duration}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm font-medium">
                          ₹{course.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                          course.status === 'published' ? 'bg-green-100 text-green-800' :
                          course.status === 'archived' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm">{course.enrolledStudents.length}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ActionButtons
                          id={course.id}
                          basePath="/admin/courses"
                          onDelete={handleDeleteCourse}
                          size="sm"
                          showView={true}
                          showEdit={true}
                          showDelete={true}
                          deleteConfirmTitle={`Delete ${course.name}?`}
                          deleteConfirmDescription={`Are you sure you want to delete ${course.name}? This action cannot be undone and will permanently remove this course from the system.`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination: Page controls at bottom */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border rounded-md text-sm">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-sm text-muted-foreground">
                Showing 1 to {filteredCourses.length} of {filteredCourses.length} entries
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>
              <span className="text-sm text-muted-foreground">Page 1 of 1</span>
              <Button variant="outline" size="sm" disabled>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
