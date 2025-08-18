"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { createColumns } from "@/components/courses"
import { courseService, initializeCourses } from "@/lib/services/coursesService"
import { Course } from "@/types/course"
import { Plus, BookOpen, Users, TrendingUp, Home } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/forms"
import { ROUTES } from "@/lib/constants"

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  // Remove loading state
  const [searchQuery, setSearchQuery] = useState("")

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

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await courseService.delete(courseId)
        setCourses(courses.filter(c => c.id !== courseId))
        toast.success("Course deleted successfully!")
      } catch (error) {
        console.error("Error deleting course:", error)
        toast.error("Failed to delete course")
      }
    }
  }

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCourses}</div>
                <p className="text-xs text-muted-foreground">
                  All courses in the system
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.publishedCourses}</div>
                <p className="text-xs text-muted-foreground">
                  Available for enrollment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">
                  Enrolled across all courses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Combined course value
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Courses Table */}
          <DataTable
            columns={createColumns(handleDeleteCourse)}
            data={filteredCourses}
            searchTerm=""
            onSearchChange={() => {}}
            searchPlaceholder=""
            emptyMessage="No courses found matching your criteria."
            useCard={false}
          />
        </CardContent>
      </Card>
    </div>
  )
}
