import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { 
  Clock, 
  Users, 
  Award, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  BookOpen,
  Code2,
  Database,
  Server,
  Globe,
  Phone,
  Mail
} from "lucide-react";
import PageLayout from '@/components/layout/PageLayout';
import DevIcon from '@/components/DevIcon';
import { getCourseById, COURSE_CATEGORIES, COURSE_PRICE } from '@/lib/constants';

interface CourseDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const course = getCourseById(params.id);
  
  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found."
    };
  }

  return {
    title: `${course.name} - Codexa Classes`,
    description: course.description,
    keywords: [
      course.name.toLowerCase(),
      course.category,
      "programming course",
      "IT training",
      "Codexa Classes"
    ],
    openGraph: {
      title: course.name,
      description: course.description,
      url: `https://codexaclasses.com/courses/${course.id}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${course.name} - Codexa Classes`,
        },
      ],
    },
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = getCourseById(params.id);

  if (!course) {
    notFound();
  }

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

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" asChild className="mb-6">
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Link>
            </Button>
          </div>

          {/* Course Header */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Course Icon and Basic Info */}
              <div className="text-center lg:text-left">
                <div className="text-6xl mb-4 flex justify-center lg:justify-start">
                  <DevIcon name={course.icon_name} size={96} />
                </div>
                <Badge className={`text-sm font-semibold mb-3 ${getCategoryBadgeVariant(course.category)}`}>
                  {COURSE_CATEGORIES[course.category]}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.name}</h1>
                <p className="text-lg text-gray-700 mb-6">{course.description}</p>
              </div>

              {/* Course Stats */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">{course.duration}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Students</p>
                    <p className="font-semibold text-gray-900">{course.students}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <Award className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Level</p>
                    <p className="font-semibold text-gray-900">{course.level}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold text-gray-900">₹{course.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center lg:text-right space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Start?</h3>
                  <p className="text-gray-600 mb-4">Join {course.students} students already learning</p>
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium" asChild>
                      <Link href="/contact">
                        Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">
                        <Phone className="mr-2 h-4 w-4" />
                        Talk to Counselor
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.topics.map((topic, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills You'll Gain */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Code2 className="mr-2 h-5 w-5 text-green-600" />
                    Skills You'll Gain
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Projects You'll Build */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Server className="mr-2 h-5 w-5 text-purple-600" />
                    Projects You'll Build
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.projects.map((project, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{project}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Career Path */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Award className="mr-2 h-5 w-5 text-orange-600" />
                    Career Path
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {course.careerPath}
                    </h4>
                    <p className="text-gray-700 mb-4">
                      This course prepares you for a successful career as a {course.careerPath.toLowerCase()}. 
                      You'll gain practical skills and real-world experience through hands-on projects.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        Remote & On-site opportunities
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        Immediate job placement support
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Course Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Industry-recognized certification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">100% practical hands-on training</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Small batch size (max 20 students)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Job placement assistance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Lifetime access to course materials</span>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Course Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold mb-2">₹{course.price.toLocaleString()}</p>
                    <p className="text-blue-100 mb-4">One-time payment</p>
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-medium" asChild>
                      <Link href="/contact">
                        Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Call us for guidance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Email your questions</span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have successfully launched their careers in tech. 
              Start your journey today with our comprehensive {course.name} course.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium" asChild>
                <Link href="/contact">
                  Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">
                  Explore Other Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
