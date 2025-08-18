"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Course } from "@/types/course"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface DataTableColumn<T> {
  id: string;
  header: React.ReactNode | (() => React.ReactNode);
  cell: (props: { row: { getValue: (key: string) => any; original: T } }) => React.ReactNode;
}

export const columns: DataTableColumn<Course>[] = [
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

      return (
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm" asChild className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 w-8 h-8 p-0">
            <Link href={`/admin/courses/${course.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 w-8 h-8 p-0">
            <Link href={`/admin/courses/${course.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 w-8 h-8 p-0"
            onClick={() => handleDeleteCourse(course.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
