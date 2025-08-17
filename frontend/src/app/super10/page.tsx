"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Heart, 
  Users, 
  GraduationCap, 
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Award,
  BookOpen
} from "lucide-react";
import PageLayout from '@/components/layout/PageLayout';
import Super10Section from '@/components/Super10Section';

export default function Super10() {
  const eligibilityCriteria = [
    "Annual family income below ₹2,50,000",
    "Age between 18-30 years",
    "Basic computer knowledge",
    "Genuine interest in technology",
    "Commitment to complete the course",
    "Available for full-time learning"
  ];

  const benefits = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "100% Free Education",
      description: "Complete course material, resources, and certification at no cost"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Same Quality Training",
      description: "Identical curriculum and teaching quality as paid students"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Official Certificate",
      description: "Industry-recognized certificate upon successful completion"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Job Placement Support",
      description: "Career guidance and job placement assistance"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Mentorship Program",
      description: "One-on-one mentoring with industry professionals"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Community Support",
      description: "Access to alumni network and peer support groups"
    }
  ];

  const applicationProcess = [
    {
      step: "1",
      title: "Fill Application",
      description: "Submit your details and required documents online"
    },
    {
      step: "2", 
      title: "Document Verification",
      description: "Income certificate, ID proof, and educational documents"
    },
    {
      step: "3",
      title: "Assessment Test",
      description: "Basic aptitude and computer knowledge evaluation"
    },
    {
      step: "4",
      title: "Personal Interview",
      description: "Discussion about your goals and commitment level"
    },
    {
      step: "5",
      title: "Selection Notification",
      description: "Results announced within 7 days of interview"
    }
  ];

  const successStories = [
    {
      name: "Priya Sharma",
      course: "PHP Development",
      achievement: "Now working as Web Developer at TCS",
      quote: "Super10 changed my life completely. From struggling to find basic employment to becoming a software developer!"
    },
    {
      name: "Rahul Kumar", 
      course: "Python Programming",
      achievement: "Freelancing and earning ₹30,000/month",
      quote: "The free education through Super10 gave me skills that now support my entire family."
    },
    {
      name: "Anjali Patel",
      course: "React Development", 
      achievement: "Frontend Developer at startup",
      quote: "I never thought I could afford quality IT training. Super10 made my dreams possible."
    }
  ];

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-orange-400 text-white border-orange-400 font-medium">
              💫 Special Initiative
            </Badge>
            <h1 className="text-4xl font-bold mb-6 text-gray-900"><img src="/super10.gif" alt="super10" className="mr-2 h-14 w-14 inline ml-2" />Super10 Program</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 font-medium">
              Empowering underprivileged students with free, world-class IT education. 
              Every batch, we select 10 deserving candidates to receive complete training at no cost.
            </p>
            
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="text-6xl font-bold mb-2">10</div>
              <div className="text-lg mb-2 font-medium">Free Seats Every Batch</div>
              <div className="text-sm text-white/90 font-medium">
                Complete IT training worth ₹10,000 - Absolutely Free
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16 text-center border border-gray-200">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto font-medium">
              We believe that financial constraints should never limit someone's potential to learn and grow in technology. 
              Super10 is our commitment to creating equal opportunities and building a more inclusive tech community.
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What Super10 Students Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                      {benefit.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-700 text-sm font-medium">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Eligibility Criteria</h2>
              <div className="space-y-4">
                {eligibilityCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{criteria}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-medium">
                  <Link href="/contact">
                    Apply for Super10 <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Application Process</h2>
              <div className="space-y-6">
                {applicationProcess.map((process, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {process.step}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-900">{process.title}</h3>
                      <p className="text-gray-700 text-sm font-medium">{process.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Star className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900 font-bold">{story.name}</CardTitle>
                        <CardDescription className="text-gray-700 font-medium">{story.course}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700 border-green-300 font-medium">
                      {story.achievement}
                    </Badge>
                    <p className="text-gray-700 text-sm italic font-medium">
                      "{story.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Dates */}
          <div className="bg-blue-50 rounded-2xl p-8 mb-16 border border-blue-200">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Important Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">Every Month</div>
                <div className="text-sm text-gray-700 font-medium">New batch applications open</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">7 Days</div>
                <div className="text-sm text-gray-700 font-medium">Selection process duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">1st & 15th</div>
                <div className="text-sm text-gray-700 font-medium">Batch start dates each month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}