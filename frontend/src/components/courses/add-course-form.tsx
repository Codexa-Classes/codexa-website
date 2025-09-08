"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, BookOpen, ArrowLeft, Loader2 } from "lucide-react"
import { FormHeader, FormLayout } from "@/components/forms"
import { adminCoursesApiService } from "@/lib/services/coursesApi"
import { Course } from "@/lib/constants/courses"
import { ROUTES } from "@/lib/constants"
import { Home } from "lucide-react"

export function AddCourseForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Debug logging
  console.log("AddCourseForm: Component rendered")
  console.log("AddCourseForm: Current pathname:", window.location.pathname)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    duration: "",
    price: "",
    icon: "",
    icon_name: "",
    instructor: "",
    level: "",
    status: "published",
    prerequisites: [""],
    syllabus: [""],
    topics: [""],
    skills: [""],
    projects: [""],
    career_path: "",
    students_count: "0+"
  })

  const handleInputChange = (field: string, value: string) => {
    console.log(`AddCourseForm: handleInputChange called for ${field}:`, value)
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: 'prerequisites' | 'syllabus', index: number, value: string) => {
    console.log(`AddCourseForm: handleArrayChange called for ${field}[${index}]:`, value)
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field: 'prerequisites' | 'syllabus') => {
    console.log(`AddCourseForm: addArrayItem called for ${field}`)
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }))
  }

  const removeArrayItem = (field: 'prerequisites' | 'syllabus', index: number) => {
    console.log(`AddCourseForm: removeArrayItem called for ${field}[${index}]`)
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    console.log("AddCourseForm: handleSubmit called with event:", !!e)
    if (e) {
      e.preventDefault()
      console.log("AddCourseForm: Event prevented")
    }
    
    console.log("AddCourseForm: Form validation check")
    if (!formData.name || !formData.description || !formData.category || !formData.duration || !formData.price || !formData.instructor || !formData.level) {
      console.log("AddCourseForm: Validation failed - missing required fields")
      setToastMessage("Please fill in all required fields")
      setToastType("error")
      setShowToast(true)
      return
    }

    console.log("AddCourseForm: Starting course creation")
    setLoading(true)
    try {
      const courseData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        duration: formData.duration,
        price: parseInt(formData.price),
        icon: formData.icon,
        icon_name: formData.icon_name || formData.icon,
        instructor: formData.instructor,
        level: formData.level,
        status: formData.status,
        prerequisites: formData.prerequisites.filter(p => p.trim() !== ""),
        syllabus: formData.syllabus.filter(s => s.trim() !== ""),
        topics: formData.topics.filter(t => t.trim() !== ""),
        skills: formData.skills.filter(s => s.trim() !== ""),
        projects: formData.projects.filter(p => p.trim() !== ""),
        career_path: formData.career_path,
        students_count: formData.students_count
      }

      console.log("AddCourseForm: Course data prepared:", courseData)
      console.log("AddCourseForm: Calling adminCoursesApiService.create")
      
      const result = await adminCoursesApiService.create(courseData)
      console.log("AddCourseForm: Course created successfully:", result)
      
      setToastMessage("Course created successfully!")
      setToastType("success")
      setShowToast(true)
      
      console.log("AddCourseForm: Setting redirect timeout")
      // Redirect after a short delay
      setTimeout(() => {
        console.log("AddCourseForm: Redirecting to /admin/courses")
        router.push("/admin/courses")
      }, 1500)
    } catch (error) {
      console.error("AddCourseForm: Error creating course:", error)
      setToastMessage("Failed to create course")
      setToastType("error")
      setShowToast(true)
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => {
    console.log("AddCourseForm: onCancel called - redirecting to /admin/courses")
    router.push("/admin/courses")
  }

  const isFormValid = Boolean(
    formData.name?.trim() &&
    formData.description?.trim() &&
    formData.category &&
    formData.duration?.trim() &&
    formData.price &&
    formData.instructor?.trim() &&
    formData.level
  )

  console.log("AddCourseForm: isFormValid:", isFormValid)
  console.log("AddCourseForm: formData:", formData)

  return (
    <FormLayout
      breadcrumbItems={[
        {
          // href: ROUTES.admin.dashboard, // Temporarily disabled to test
          label: "Dashboard",
          icon: <Home className="h-4 w-4" />,
        },
        { 
          // href: ROUTES.admin.courses, // Temporarily disabled to test
          label: "Courses" 
        },
        { label: "Add New" },
      ]}
      header={
        <FormHeader
          title="Add New Course"
          onCancel={onCancel}
          onSubmit={handleSubmit}
          isSubmitting={loading}
          isFormValid={isFormValid}
          submitButtonText="Create Course"
          submitButtonIcon={<Save className="mr-2 h-4 w-4" />}
          loadingText="Creating..."
        />
      }
      showToast={showToast}
      toastMessage={toastMessage}
      toastType={toastType}
      onToastClose={() => setShowToast(false)}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="name" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Course Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter course name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="web">Web Development</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
                <SelectItem value="business">Business Analysis</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="animation">Animation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="duration" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Duration
            </Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              placeholder="e.g., 8 weeks"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="price" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Price (INR)
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="15000"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description" className="mb-2 block">
            <span className="text-red-500 mr-1">*</span>Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Enter course description"
            rows={4}
            required
          />
        </div>

        <div>
          <Label htmlFor="career_path" className="mb-2 block">
            Career Path
          </Label>
          <Input
            id="career_path"
            value={formData.career_path}
            onChange={(e) => handleInputChange("career_path", e.target.value)}
            placeholder="e.g., 3D Artist, Game Developer, VFX Artist"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="level" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Level
            </Label>
            <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="instructor" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Instructor
            </Label>
            <Input
              id="instructor"
              value={formData.instructor}
              onChange={(e) => handleInputChange("instructor", e.target.value)}
              placeholder="Enter instructor name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="icon" className="mb-2 block">
              Course Icon
            </Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => handleInputChange("icon", e.target.value)}
              placeholder="e.g., ⚛️, 🐍, 🗄️"
            />
          </div>

          <div>
            <Label htmlFor="status" className="mb-2 block">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Prerequisites</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem("prerequisites")}
            >
              Add Prerequisite
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.prerequisites.map((prerequisite, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={prerequisite}
                  onChange={(e) => handleArrayChange("prerequisites", index, e.target.value)}
                  placeholder="Enter prerequisite"
                  className="flex-1"
                />
                {formData.prerequisites.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("prerequisites", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Syllabus</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addArrayItem("syllabus")}
            >
              Add Topic
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.syllabus.map((topic, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={topic}
                  onChange={(e) => handleArrayChange("syllabus", index, e.target.value)}
                  placeholder="Enter syllabus topic"
                  className="flex-1"
                />
                {formData.syllabus.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("syllabus", index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </FormLayout>
  )
}
