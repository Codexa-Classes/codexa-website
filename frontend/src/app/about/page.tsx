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
            <Badge variant="secondary" className="mb-4">About Codexa Classes</Badge>
            <h1 className="text-4xl font-bold mb-6">Learn from Industry Experts</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our mission is to provide world-class IT education that bridges the gap between 
              academic learning and industry requirements, making technology accessible to everyone.
            </p>
          </div>

          {/* Instructor Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="bg-gradient-card border-0">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{instructor.name}</CardTitle>
                    <CardDescription className="text-lg">{instructor.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{instructor.currentRole}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{instructor.experience} Industry Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`mailto:${instructor.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {instructor.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Technical Expertise</h3>
              <div className="grid grid-cols-1 gap-3">
                {instructor.expertise.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-muted/30 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Our Achievements</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{achievement.title}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Professional Experience</h3>
              <div className="space-y-4">
                {instructor.organizations.map((org, index) => (
                  <Card key={index} className="bg-gradient-card border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Building className="h-5 w-5 text-primary" />
                        <span className="font-medium">{org}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Our Commitment</h3>
              <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-2">Quality Education</h4>
                    <p className="text-muted-foreground">
                      We focus on practical, hands-on learning with real-world projects 
                      that prepare students for actual industry challenges.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-2">Affordable Learning</h4>
                    <p className="text-muted-foreground">
                      All our courses are priced at just ₹10,000, making quality IT education 
                      accessible to everyone regardless of their financial background.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-super10/5 border-super10/20">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-2">Social Impact</h4>
                    <p className="text-muted-foreground">
                      Through our Super10 program, we provide completely free education 
                      to underprivileged students, creating opportunities for all.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-hero text-white rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our community of learners and transform your career with industry-relevant skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/courses">
                  View Our Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
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