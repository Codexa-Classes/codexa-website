"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Clock, 
  Users, 
  Award, 
  CheckCircle,
  ArrowRight,
  Code2,
  Database,
  Server,
  Globe
} from "lucide-react";
import PageLayout from '@/components/layout/PageLayout';

export default function Courses() {
  const courses = [
    {
      id: "php",
      name: "PHP Development",
      icon: "🐘",
      category: "backend",
      description: "Learn server-side programming with PHP and Laravel framework",
      duration: "8 weeks",
      students: "150+",
      level: "Beginner to Advanced",
      topics: [
        "PHP Fundamentals & Syntax",
        "Object-Oriented Programming",
        "Laravel Framework",
        "Database Integration",
        "RESTful API Development",
        "Security Best Practices"
      ],
      icon_component: <Server className="h-6 w-6" />
    },
    {
      id: "python",
      name: "Python Programming",
      icon: "🐍", 
      category: "backend",
      description: "Master Python programming and Django web development",
      duration: "10 weeks",
      students: "200+",
      level: "Beginner to Advanced",
      topics: [
        "Python Fundamentals",
        "Data Structures & Algorithms",
        "Django Framework",
        "Machine Learning Basics",
        "Web Scraping",
        "API Development"
      ],
      icon_component: <Code2 className="h-6 w-6" />
    },
    {
      id: "react",
      name: "React Development",
      icon: "⚛️",
      category: "frontend", 
      description: "Build modern user interfaces with React and TypeScript",
      duration: "6 weeks",
      students: "180+",
      level: "Intermediate",
      topics: [
        "React Fundamentals",
        "Components & JSX",
        "State Management",
        "React Hooks",
        "TypeScript Integration",
        "Testing & Deployment"
      ],
      icon_component: <Globe className="h-6 w-6" />
    },
    {
      id: "aspnet",
      name: "ASP.NET Development",
      icon: "🔷",
      category: "framework", 
      description: "Enterprise web development with ASP.NET Core and C#",
      duration: "8 weeks",
      students: "120+",
      level: "Intermediate to Advanced",
      topics: [
        "C# Programming",
        "ASP.NET Core MVC",
        "Entity Framework",
        "Web API Development",
        "Authentication & Security",
        "Azure Deployment"
      ],
      icon_component: <Server className="h-6 w-6" />
    },
    {
      id: "mysql",
      name: "MySQL Database",
      icon: "🗄️",
      category: "database",
      description: "Master database design, queries, and administration",
      duration: "4 weeks",
      students: "250+", 
      level: "Beginner to Advanced",
      topics: [
        "Database Design Principles",
        "SQL Queries & Joins",
        "Stored Procedures",
        "Performance Optimization",
        "Backup & Recovery",
        "Database Security"
      ],
      icon_component: <Database className="h-6 w-6" />
    },
    {
      id: "linux",
      name: "Linux Administration",
      icon: "🐧",
      category: "framework",
      description: "System administration and server management with Linux",
      duration: "6 weeks",
      students: "100+",
      level: "Beginner to Advanced", 
      topics: [
        "Linux Fundamentals",
        "Command Line Mastery",
        "System Administration",
        "Server Configuration",
        "Shell Scripting",
        "Security & Monitoring"
      ],
      icon_component: <Server className="h-6 w-6" />
    }
  ];

  const features = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Flexible Schedule",
      description: "Evening and weekend batches available"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Small Batches",
      description: "Maximum 15 students per batch for personalized attention"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Industry Certificate",
      description: "Get recognized certification upon completion"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "100% Practical",
      description: "Hands-on projects and real-world applications"
    }
  ];

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'backend':
        return 'bg-orange-500 text-white border-orange-500';
      case 'frontend':
        return 'bg-purple-500 text-white border-purple-500';
      case 'database':
        return 'bg-green-500 text-white border-green-500';
      case 'framework':
        return 'bg-blue-500 text-white border-blue-500';
      default:
        return 'bg-gray-500 text-white border-gray-500';
    }
  };

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-orange-400 text-white border-orange-400 font-medium">
              Our Courses
            </Badge>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Choose Your Learning Path</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 font-medium">
              Master in-demand programming skills with our comprehensive courses. 
              All courses include hands-on projects, industry mentorship, and job placement assistance.
            </p>
            
            {/* Pricing Highlight */}
            <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-sm text-white/90 mb-2 font-medium">Flat Rate for All Courses</p>
              <p className="text-4xl font-bold text-yellow-300 mb-2">₹10,000</p>
              <p className="text-sm text-white/90 font-medium">Complete course + Certificate + Job Support</p>
            </div>
          </div>

          {/* Course Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-sm mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 text-xs font-medium">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{course.icon}</div>
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

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium" asChild>
                    <Link href="/contact">
                      Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Course Path Recommendations */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16 border border-gray-200">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Recommended Learning Paths</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 font-bold">🚀 Full-Stack Web Developer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">React (Frontend)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">PHP or Python (Backend)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">MySQL (Database)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">Linux (Deployment)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 font-bold">💼 Enterprise Developer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">ASP.NET (Framework)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">MySQL (Database)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">Linux (Infrastructure)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 font-bold">🔧 Backend Specialist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">Python (Programming)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">PHP (Web Development)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">MySQL (Database)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700 font-medium">Linux (Server Management)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              Join hundreds of students who have successfully transformed their careers with our courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-white/90 font-medium">
                <Link href="/contact">
                  Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 font-medium">
                <Link href="/super10">
                  Apply for Super10
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}