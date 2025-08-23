import type { Metadata } from "next";
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
import Super10Section from '@/components/Super10Section';
import DevIcon from '@/components/DevIcon';
import { COURSES, COURSE_CATEGORIES, COURSE_PRICE } from '@/lib/constants';

export const metadata: Metadata = {
  title: "Programming Courses - PHP, Python, React | Codexa Classes",
  description: "Master in-demand programming skills with our comprehensive courses. Learn PHP, Python, React, MySQL, and Linux. All courses at ₹10,000 with certification and job support.",
  keywords: ["PHP course", "Python training", "React development course", "MySQL course", "Linux administration course", "programming courses"],
      openGraph: {
      title: "Programming Courses - PHP, Python, React",
      description: "Master in-demand programming skills with our comprehensive courses. All courses at ₹10,000 with certification and job support.",
    url: "https://codexaclasses.com/courses",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codexa Classes - Programming Courses",
      },
    ],
  },
};

// Course structured data for SEO
const courseStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Programming Courses at Codexa Classes",
      "description": "Comprehensive IT training courses",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Course",
        "name": "Frontend Development (ReactJS + Tailwind)",
        "description": "Master modern frontend development with ReactJS and Tailwind CSS",
        "provider": {
          "@type": "Organization",
          "name": "Codexa Classes",
          "sameAs": "https://codexaclasses.com"
        },
        "courseMode": "offline",
        "educationalLevel": "Beginner to Advanced",
        "timeRequired": "P8W",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "10000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Course",
        "name": "Web Development (Flask + Django)",
        "description": "Learn Python web development with Flask and Django frameworks",
        "provider": {
          "@type": "Organization",
          "name": "Codexa Classes",
          "sameAs": "https://codexaclasses.com"
        },
        "courseMode": "offline",
        "educationalLevel": "Beginner to Advanced",
        "timeRequired": "P10W",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "10000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Course",
        "name": "Web Development (Bootstrap + Laravel)",
        "description": "Master PHP web development with Laravel framework and Bootstrap",
        "provider": {
          "@type": "Organization",
          "name": "Codexa Classes",
          "sameAs": "https://codexaclasses.com"
        },
        "courseMode": "offline",
        "educationalLevel": "Beginner to Advanced",
        "timeRequired": "P10W",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "10000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Course",
        "name": "Business Analyst (PowerBI + MySQL + BRD)",
        "description": "Become a Business Analyst with expertise in PowerBI, MySQL, and BRD",
        "provider": {
          "@type": "Organization",
          "name": "Codexa Classes",
          "sameAs": "https://codexaclasses.com"
        },
        "courseMode": "offline",
        "educationalLevel": "Intermediate to Advanced",
        "timeRequired": "P8W",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "10000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Course",
        "name": "Data Analyst (PowerBI + SQL + SAP + Python)",
        "description": "Master data analysis with PowerBI, SQL, SAP, and Python",
        "provider": {
          "@type": "Organization",
          "name": "Codexa Classes",
          "sameAs": "https://codexaclasses.com"
        },
        "courseMode": "offline",
        "educationalLevel": "Intermediate to Advanced",
        "timeRequired": "P12W",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "10000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Course",
        "name": "DevOps Engineer (AWS)",
        "description": "Master DevOps practices with AWS cloud infrastructure and automation",
        "provider": {
          "@type": "Organization",
          "name": "Codexa Classes",
          "sameAs": "https://codexaclasses.com"
        },
        "courseMode": "offline",
        "educationalLevel": "Intermediate to Advanced",
        "timeRequired": "P10W",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "10000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 7,
      "item": {
        "@type": "Course",
        "name": "Database Admin (Oracle/PLSQL)",
        "description": "Master Oracle database administration and PL/SQL programming",
        "provider": {
          "@type": "Organization",
          "name": "Codexa Classes",
          "sameAs": "https://codexaclasses.com"
        },
        "courseMode": "offline",
        "educationalLevel": "Intermediate to Advanced",
        "timeRequired": "P8W",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "10000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 8,
      "item": {
        "@type": "Course",
        "name": "App Support (MySQL + Linux)",
        "description": "Learn application support with MySQL database and Linux administration",
        "provider": {
          "@type": "Organization",
          "name": "Codexa Classes",
          "sameAs": "https://codexaclasses.com"
        },
        "courseMode": "offline",
        "educationalLevel": "Beginner to Intermediate",
        "timeRequired": "P8W",
        "inLanguage": "en",
        "offers": {
          "@type": "Offer",
          "price": "10000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }
    }
  ]
};

export default function Courses() {

  const features = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Flexible Schedule",
      description: "Evening and weekend batches available"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Small Batches",
      description: "Maximum 20 students per batch for personalized attention"
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
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseStructuredData),
        }}
      />
      
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
                <p className="text-4xl font-bold text-yellow-300 mb-2">₹{COURSE_PRICE.toLocaleString()}</p>
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
              {COURSES.map((course) => (
                <Card key={course.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">
                        <DevIcon name={course.icon_name} size={48} />
                      </div>
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
          </div>
        </div>
      </PageLayout>
    </>
  );
}