"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Award, 
  Users, 
  Code2, 
  Building, 
  Mail,
  ArrowRight,
  CheckCircle,
  Trophy
} from "lucide-react";
import PageLayout from '@/components/layout/PageLayout';

export default function About() {
  const instructor = {
    name: "Viraj Kadam",
    title: "Business Analyst & Technology Consultant",
    experience: "8+ Years",
    currentRole: "Data Analyst - Sr. Manager at Kotak Mahindra Bank",
    email: "hiVirajKadam@gmail.com",
    expertise: [
      "PHP & Laravel Framework",
      "Python & Django Development", 
      "Web Development (LAMP, MEAN, MERN)",
      "Linux & System Administration",
      "Cloud Computing (AWS, DigitalOcean)",
      "Database Management (Oracle, MySQL)",
      "Machine Learning & Data Analysis"
    ],
    organizations: [
      "Kotak Mahindra Bank Ltd.",
      "Nitor Infotech Pvt. Ltd.",
      "Clover Infotech Pvt. Ltd.",
      "Infodeal Technologies Pvt. Ltd.",
      "OS3 Infotech Pvt. Ltd."
    ]
  };

  const achievements = [
    { icon: <Trophy className="h-6 w-6" />, title: "60+", description: "Projects Completed" },
    { icon: <Code2 className="h-6 w-6" />, title: "8+", description: "Years Experience" },
    { icon: <Users className="h-6 w-6" />, title: "500+", description: "Students Trained" },
    { icon: <Award className="h-6 w-6" />, title: "100%", description: "Job Placement Rate" }
  ];

  return (
    <PageLayout>
      {/* Main Content */}
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-orange-400 text-white border-orange-400 font-medium">
              About Shraddha Classes
            </Badge>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Learn from Industry Experts</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Our mission is to provide world-class IT education that bridges the gap between 
              academic learning and industry requirements, making technology accessible to everyone.
            </p>
          </div>

          {/* Instructor Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-gray-900 font-bold">{instructor.name}</CardTitle>
                    <CardDescription className="text-lg text-gray-700 font-medium">{instructor.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700 font-medium">{instructor.currentRole}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700 font-medium">{instructor.experience} Industry Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <a 
                    href={`mailto:${instructor.email}`}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    {instructor.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Technical Expertise</h3>
              <div className="grid grid-cols-1 gap-3">
                {instructor.expertise.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16 border border-gray-200">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Our Achievements</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{achievement.title}</div>
                  <div className="text-sm text-gray-700 font-medium">{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Professional Experience</h3>
              <div className="space-y-4">
                {instructor.organizations.map((org, index) => (
                  <Card key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Building className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{org}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Commitment</h3>
              <div className="space-y-6">
                <Card className="bg-blue-50 border-blue-200 shadow-md">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Quality Education</h4>
                    <p className="text-gray-700 font-medium">
                      We focus on practical, hands-on learning with real-world projects 
                      that prepare students for actual industry challenges.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 border-green-200 shadow-md">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Affordable Learning</h4>
                    <p className="text-gray-700 font-medium">
                      All our courses are priced at just ₹10,000, making quality IT education 
                      accessible to everyone regardless of their financial background.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200 shadow-md">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-lg mb-2 text-gray-900">Social Impact</h4>
                    <p className="text-gray-700 font-medium">
                      Through our Super10 program, we provide completely free education 
                      to underprivileged students, creating opportunities for all.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              Join our community of learners and transform your career with industry-relevant skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-white/90 font-medium">
                <Link href="/courses">
                  View Our Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 font-medium">
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}