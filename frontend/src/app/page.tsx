"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants';
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

export default function Home() {
  const popularCourses = [
    { icon: "🐘", name: "PHP", category: "backend" },
    { icon: "🐍", name: "Python", category: "backend" },
    { icon: "⚛️", name: "React", category: "frontend" },
    { icon: "🔷", name: "ASP.NET", category: "framework" },
    { icon: "🗄️", name: "MySQL", category: "database" },
    { icon: "🐧", name: "Linux", category: "framework" }
  ];

  const whyChooseUs = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with 8+ years of experience"
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

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">✨ Now Enrolling for New Batch</Badge>
          <h1 className="text-5xl font-bold mb-6">
            Master <span className="text-primary">IT Skills</span> with Professional Training
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform your career with comprehensive programming courses. Learn PHP, Python, React, and more from industry experts.
          </p>
          
          <div className="flex gap-4 items-center justify-center flex-col sm:flex-row mb-12">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/courses">
                View All Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/super10">
                Learn About Super10
              </Link>
            </Button>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 inline-block">
            <p className="text-sm text-muted-foreground">All Courses Starting at</p>
            <p className="text-3xl font-bold text-primary">₹10,000</p>
            <p className="text-sm text-muted-foreground">Complete course with certification</p>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Popular Courses</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of programming and development courses
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {popularCourses.map((course, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <div className="text-4xl mb-2">{course.icon}</div>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">{course.category}</Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/courses">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Codexa Classes?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide comprehensive IT education with a focus on practical skills and real-world applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Super10 Program Section */}
      <section className="py-20 bg-gradient-super10 text-super10-foreground">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 bg-super10-foreground/20 text-super10-foreground border-super10-foreground/30">
            💫 Special Initiative
          </Badge>
          <h2 className="text-3xl font-bold mb-6">Super10 Program</h2>
          <p className="text-xl text-super10-foreground/90 mb-8 max-w-3xl mx-auto">
            We believe in equal opportunities for all. Our Super10 program provides completely free IT education to 10 underprivileged students in every batch.
          </p>
          <Button asChild size="lg" variant="outline" className="border-super10-foreground text-super10-foreground hover:bg-super10-foreground hover:text-super10">
            <Link href="/super10">
              Learn More About Super10 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your IT Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with our courses
          </p>
          <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
            <Button asChild size="lg">
              <Link href="/courses">
                Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}