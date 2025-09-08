"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { adminCoursesApiService } from "@/lib/services/coursesApi"
import { Course } from "@/lib/constants/courses"
import { Plus, BookOpen, Users, TrendingUp, Home, Filter } from "lucide-react"
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
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [durationFilter, setDurationFilter] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const coursesData = await adminCoursesApiService.getAllAdmin()
      setCourses(coursesData)
    } catch (error) {
      console.error("Error loading courses:", error)
      toast.error("Failed to load courses")
    }
  }

  const handleDeleteCourse = (courseId: string | number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      adminCoursesApiService.delete(courseId as string)
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
    
    // Status filter - all courses are published
    // if (statusFilter !== 'all' && course.status !== statusFilter) {
    //   return false;
    // }

    // Category filter
    if (categoryFilter !== 'all' && course.category !== categoryFilter) {
      return false;
    }

    // Level filter
    if (levelFilter !== 'all' && course.level !== levelFilter) {
      return false;
    }

    // Duration filter
    if (durationFilter !== 'all') {
      const courseDuration = course.duration.toLowerCase();
      if (durationFilter === 'short' && !courseDuration.includes('week') && !courseDuration.includes('day')) {
        return false;
      }
      if (durationFilter === 'medium' && !courseDuration.includes('8') && !courseDuration.includes('10')) {
        return false;
      }
      if (durationFilter === 'long' && !courseDuration.includes('12') && !courseDuration.includes('month')) {
        return false;
      }
    }

    // Price range filter
    if (priceRange.min > 0 && course.price < priceRange.min) {
      return false;
    }
    if (priceRange.max > 0 && course.price > priceRange.max) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = course.name.toLowerCase().includes(searchLower);
      const categoryMatch = course.category?.toLowerCase().includes(searchLower) || false;
      const instructorMatch = 'viraj kadam'.toLowerCase().includes(searchLower);
      
      if (!nameMatch && !categoryMatch && !instructorMatch) {
        return false;
      }
    }
    
    return true;
  });

  const stats = {
    totalCourses: courses.length,
    publishedCourses: courses.length, // All courses from API are published
    totalStudents: courses.reduce((sum, course) => {
      const studentCount = parseInt(course.students.replace('+', '')) || 0;
      return sum + studentCount;
    }, 0),
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

  const clearAllFilters = () => {
    setSearchTerm("")
    setStatusFilter('all')
    setCategoryFilter('all')
    setLevelFilter('all')
    setDurationFilter('all')
    setPriceRange({ min: 0, max: 0 })
  }

  // Get unique categories and levels from courses
  const uniqueCategories = Array.from(new Set(courses.map(c => c.category))).filter(Boolean);
  const uniqueLevels = Array.from(new Set(courses.map(c => c.level))).filter(Boolean);

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
            onClearFilters={clearAllFilters}
            filters={[
              {
                label: "Search",
                value: searchTerm,
                type: "search",
                placeholder: "Search courses...",
                onChange: (value) => setSearchTerm(value as string)
              },
              {
                label: "Category",
                value: categoryFilter,
                options: [
                  { value: "all", label: "All Categories" },
                  ...uniqueCategories.map(cat => ({ 
                    value: cat, 
                    label: cat.charAt(0).toUpperCase() + cat.slice(1) 
                  }))
                ],
                onChange: (value) => setCategoryFilter(value as string)
              },
              {
                label: "Level",
                value: levelFilter,
                options: [
                  { value: "all", label: "All Levels" },
                  ...uniqueLevels.map(level => ({ 
                    value: level, 
                    label: level.charAt(0).toUpperCase() + level.slice(1) 
                  }))
                ],
                onChange: (value) => setLevelFilter(value as string)
              },
              {
                label: "Duration",
                value: durationFilter,
                options: [
                  { value: "all", label: "All Durations" },
                  { value: "short", label: "Short" },
                  { value: "medium", label: "Medium" },
                  { value: "long", label: "Long" }
                ],
                onChange: (value) => setDurationFilter(value as string)
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
                onChange: (value) => setStatusFilter(value as string)
              }
            ]}
          />
        </CardHeader>
        
        {/* Filter Summary */}
        {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || levelFilter !== 'all' || durationFilter !== 'all' || priceRange.min > 0 || priceRange.max > 0) && (
          <div className="px-6 py-3 bg-muted/30 border-b">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Active filters:</span>
              {searchTerm && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                  {searchTerm}
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                  {statusFilter}
                </span>
              )}
              {categoryFilter !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                  {categoryFilter}
                </span>
              )}
              {levelFilter !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                  {levelFilter}
                </span>
              )}
              {durationFilter !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                  {durationFilter}
                </span>
              )}
              {(priceRange.min > 0 || priceRange.max > 0) && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                  ₹{priceRange.min > 0 ? priceRange.min.toLocaleString() : '0'} - ₹{priceRange.max > 0 ? priceRange.max.toLocaleString() : '∞'}
                </span>
              )}
            </div>
          </div>
        )}
        
        <CardContent className="space-y-6">

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
            {filteredCourses.length !== courses.length && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear all filters
              </Button>
            )}
          </div>

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
                      <td className="px-4 py-3 text-sm whitespace-nowrap text-center">Viraj Kadam</td>
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
                        <span className="px-2 py-1 text-xs rounded-full whitespace-nowrap bg-green-100 text-green-800">
                          published
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm">{course.students}</span>
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
