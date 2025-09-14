"use client"

import { Badge } from "@/components/ui/badge"
import { Course } from "@/types/course"
import { ActionButtons } from "@/components/ui/action-buttons"
import { generateCourseSlug } from "@/lib/utils"

interface DataTableColumn<T> {
  id: string;
  header: React.ReactNode | (() => React.ReactNode);
  cell: (props: { row: { getValue: (key: string) => any; original: T } }) => React.ReactNode;
}

export const createColumns = (handleDeleteCourse: (id: string | number) => void): DataTableColumn<Course>[] => [
  {
    id: "name",
    header: "Course Name",
    cell: ({ row }) => {
      return row.getValue("name") as string
    },
  },
  {
    id: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return (
        <Badge variant="secondary" className="capitalize">
          {category}
        </Badge>
      )
    },
  },
  {
    id: "instructor",
    header: "Instructor",
    cell: ({ row }) => {
      return row.getValue("instructor") as string
    },
  },
  {
    id: "level",
    header: "Level",
    cell: ({ row }) => {
      const level = row.getValue("level") as string
      return (
        <Badge variant="outline" className="capitalize">
          {level}
        </Badge>
      )
    },
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return row.getValue("duration") as string
    },
  },
  {
    id: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(price)
      return formatted
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusColors = {
        draft: "bg-gray-100 text-gray-800",
        published: "bg-green-100 text-green-800",
        archived: "bg-red-100 text-red-800"
      }
      return (
        <Badge className={`${statusColors[status as keyof typeof statusColors]} capitalize`}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "enrolledStudents",
    header: "Students",
    cell: ({ row }) => {
      const students = row.getValue("enrolledStudents") as string[]
      return students.length
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const course = row.original
      const courseSlug = generateCourseSlug(course.name)

      return (
        <ActionButtons
          id={courseSlug}
          basePath="/admin/courses"
          onDelete={handleDeleteCourse}
        />
      )
    },
  },
]
