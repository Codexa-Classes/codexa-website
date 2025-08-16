"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { courseService, initializeCourses } from "@/lib/services/coursesService"
import { Course } from "@/types/course"
import { Search, Clock, Users, Award, BookOpen, Filter } from "lucide-react"
import { toast } from "sonner"

export default function UserCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    initializeCourses()
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const coursesData = await courseService.getPublished()
      setCourses(coursesData)
    } catch (error) {
      console.error("Error loading courses:", error)
      toast.error("Failed to load courses")
    } finally {
      setLoading(false)
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { value: "all", label: "All Categories" },
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

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">Loading courses...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Available Courses</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore our comprehensive courses designed to help you master in-demand skills
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
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
                    <span>₹{course.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-3">What You&apos;ll Learn:</h4>
                  <ul className="space-y-2">
                    {course.syllabus.slice(0, 3).map((topic, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="line-clamp-2">{topic}</span>
                      </li>
                    ))}
                    {course.syllabus.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        +{course.syllabus.length - 3} more topics...
                      </li>
                    )}
                  </ul>
                </div>

                <Button className="w-full">
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Course Statistics */}
      <div className="mt-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-bold text-primary">{courses.length}</div>
            <div className="text-sm text-muted-foreground">Total Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">
              {courses.reduce((sum, course) => sum + course.enrolledStudents.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">
              {courses.reduce((sum, course) => sum + course.price, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </div>
        </div>
      </div>
    </div>
  )
}
