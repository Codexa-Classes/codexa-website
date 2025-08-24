"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { courseService, initializeCourses } from "@/lib/services/coursesService"
import { Course, EnrolledCourse } from "@/types/course"
import { Search, Clock, Users, Award, BookOpen, Filter, Download, CheckCircle, Circle } from "lucide-react"
import { toast } from "sonner"

export default function UserCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    initializeCourses()
    loadEnrolledCourses()
  }, [])

  const loadEnrolledCourses = async () => {
    try {
      // Mock enrolled courses - in real app, this would come from user's enrollment data
      const allCourses = await courseService.getPublished()
      // Simulate some enrolled courses with progress
      const mockEnrolledCourses: EnrolledCourse[] = allCourses.slice(0, 3).map((course, index) => ({
        ...course,
        progress: Math.floor(Math.random() * 100), // Random progress for demo
        completedTopics: Math.floor(Math.random() * course.syllabus.length), // Random completed topics
        isCompleted: index === 0 ? true : false, // First course is completed for demo
        enrollmentDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random enrollment date
      }))
      setEnrolledCourses(mockEnrolledCourses)
    } catch (error) {
      console.error("Error loading enrolled courses:", error)
      toast.error("Failed to load enrolled courses")
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { value: "all", label: "All Courses" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "database", label: "Database" },
    { value: "framework", label: "Framework" }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'bg-blue-100 text-blue-800'
      case 'backend':
        return 'bg-purple-100 text-purple-800'
      case 'database':
        return 'bg-orange-100 text-orange-800'
      case 'framework':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-yellow-500'
    if (progress >= 40) return 'bg-blue-500'
    return 'bg-gray-300'
  }

  const handleDownloadCertificate = (courseId: string) => {
    toast.success(`Certificate for course ${courseId} downloaded successfully!`)
    // In real app, this would trigger actual certificate download
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">Loading your enrolled courses...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">My Enrolled Courses</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Track your progress and continue learning with your enrolled courses
        </p>
      </div>

      {/* Enrolled Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No enrolled courses found</h3>
          <p className="text-muted-foreground">
            You haven't enrolled in any courses yet. Browse our course catalog to get started!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{course.image}</div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getCategoryColor(course.category)}>
                      {course.category}
                    </Badge>
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl">{course.name}</CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.enrolledStudents.length} students</span>
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Enrolled on {course.enrollmentDate.toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Syllabus with Progress Indicators */}
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">Course Progress:</h4>
                  <ul className="space-y-2">
                    {course.syllabus.slice(0, 5).map((topic, index) => {
                      const isCompleted = index < course.completedTopics
                      return (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          {isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300 mt-1 flex-shrink-0" />
                          )}
                          <span className={`line-clamp-2 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                            {topic}
                          </span>
                        </li>
                      )
                    })}
                    {course.syllabus.length > 5 && (
                      <li className="text-sm text-muted-foreground">
                        +{course.syllabus.length - 5} more topics...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                {course.isCompleted ? (
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleDownloadCertificate(course.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                    <Button variant="outline" className="w-full">
                      Review Course
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button className="w-full">
                      Continue Learning
                    </Button>
                    {course.progress > 0 && (
                      <Button variant="outline" className="w-full">
                        Resume from {course.progress}%
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Learning Statistics */}
      <div className="mt-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div>
            <div className="text-3xl font-bold text-primary">{enrolledCourses.length}</div>
            <div className="text-sm text-muted-foreground">Enrolled Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">
              {enrolledCourses.filter(course => course.isCompleted).length}
            </div>
            <div className="text-sm text-muted-foreground">Completed Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">
              {Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Average Progress</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">
              {enrolledCourses.reduce((sum, course) => sum + course.completedTopics, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Topics Completed</div>
          </div>
        </div>
      </div>
    </div>
  )
}
