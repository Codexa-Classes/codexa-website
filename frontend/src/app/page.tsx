import type { Metadata } from "next";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES, INSTRUCTOR, COURSES, COURSE_PRICE } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Users, 
  GraduationCap, 
  Award, 
  ArrowRight,
  Building,
  Globe,
  Heart,
  Star,
  BookOpen,
  Target,
  Zap
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Super10Section from '@/components/Super10Section';
import DevIcon from '@/components/DevIcon';

export const metadata: Metadata = {
  title: "Best IT Training Institute in Mumbai - Codexa Classes",
  description: "Transform your career with comprehensive IT training in Mumbai. Learn PHP, Python, React, ASP.NET, MySQL, and Linux from industry experts. Affordable courses starting at ₹10,000 with 100% job placement guarantee.",
  keywords: ["IT training Mumbai", "programming courses", "PHP course", "Python training", "React development", "web development course", "IT certification", "job placement"],
  openGraph: {
    title: "Best IT Training Institute in Mumbai - Codexa Classes",
    description: "Transform your career with comprehensive IT training in Mumbai. Learn PHP, Python, React, ASP.NET, MySQL, and Linux from industry experts.",
    url: "https://codexaclasses.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codexa Classes - IT Training Institute Mumbai",
      },
    ],
  },
};

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Codexa Classes",
  "description": "Leading IT training institute in Mumbai offering comprehensive programming courses",
  "url": "https://codexaclasses.com",
  "logo": "https://codexaclasses.com/Codexa%20LOGO.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-98765-43210",
    "contactType": "customer service",
    "email": INSTRUCTOR.email
  },
  "sameAs": [
    "https://facebook.com/codexaclasses",
    "https://twitter.com/codexaclasses",
    "https://linkedin.com/company/codexaclasses"
  ]
};

export default function Home() {
  const popularCourses = COURSES.map(course => ({
    icon: course.icon_name,
    name: course.name.split(' ')[0], // Take first word for display
    category: course.category
  }));

  const whyChooseUs = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Instructors",
      description: `Learn from industry professionals with ${INSTRUCTOR.experience} of experience`
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Certified Programs",
      description: "Get industry-recognized certificates upon course completion"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Hands-on Learning",
      description: "Practice with real-world projects and build your portfolio"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Super10 Program",
      description: "Free education for 10 underprivileged students every batch"
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
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <PageLayout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-6 bg-orange-400 text-white border-orange-400 font-medium">
              ✨ Now Enrolling for New Batch
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Master <span className="text-yellow-300">IT Skills</span> with Professional Training
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8">
              Transform your career with comprehensive programming courses. Learn PHP, Python, React, and more from industry experts.
            </p>
            
            <div className="flex gap-4 items-center justify-center flex-col sm:flex-row mb-12">
              <Button asChild size="lg" className="rounded-full bg-white text-blue-900 hover:bg-white/90 font-medium">
                <Link href="/courses">
                  View All Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white text-black hover:bg-white hover:text-blue-900 font-medium">
                <Link href="/super10">
                <img src="/super10.gif" alt="super10" className="ml-2 h-7 w-7" />
                  Learn About Super10
                </Link>
              </Button>
            </div>

            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 inline-block">
              <p className="text-sm text-white font-medium">All Courses Starting at</p>
              <p className="text-3xl font-bold text-yellow-300">₹{COURSE_PRICE.toLocaleString()}</p>
              <p className="text-sm text-white font-medium">Complete course with certification</p>
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Popular Courses</h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
                Choose from our comprehensive range of programming and development courses
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
              {popularCourses.map((course, index) => (
                <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50">
                  <CardHeader className="pb-2">
                    <div className="text-4xl mb-2">
                      <DevIcon name={course.icon} size={48} />
                    </div>
                    <CardTitle className="text-lg text-gray-900 font-bold">{course.name}</CardTitle>
                    <div className="flex justify-center">
                      <Badge className={`text-xs font-semibold ${getCategoryBadgeVariant(course.category)}`}>
                        {course.category}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium">
                <Link href="/courses">
                  View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose Codexa Classes?</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                We provide comprehensive IT education with a focus on practical skills and real-world applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((feature, index) => (
                <Card key={index} className="text-center bg-white border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 hover:bg-blue-200 transition-colors">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg text-gray-900 font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700 leading-relaxed font-medium">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}