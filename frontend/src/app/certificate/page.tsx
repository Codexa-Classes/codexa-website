"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { 
  Download, 
  Search, 
  Award, 
  CheckCircle,
  Shield,
  Globe,
  FileText,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';
import Super10Section from '@/components/Super10Section';

export default function Certificate() {
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleDownloadCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId.trim()) {
      toast.error("Please enter your Student ID");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll simulate finding a certificate
      if (studentId.toLowerCase().includes("tech") || studentId.length >= 6) {
        toast.success("Certificate Found! Your certificate is ready for download.");
        // In a real app, this would trigger the actual download
        console.log("Downloading certificate for student:", studentId);
      } else {
        toast.error("Certificate Not Found. Please check your Student ID and try again.");
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleVerification = () => {
    if (!certificateId.trim()) {
      setVerificationResult("Please enter a certificate ID.");
      return;
    }

    setVerificationResult("Verifying certificate...");
    // Simulate API call
    setTimeout(() => {
      if (certificateId.toLowerCase().includes("valid")) {
        setVerificationResult("Certificate is valid. You can download it.");
      } else {
        setVerificationResult("Certificate not found or invalid.");
      }
    }, 1500);
  };

  const certificateFeatures = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Blockchain Verified",
      description: "Tamper-proof digital certificates with blockchain verification"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Globally Recognized",
      description: "Industry-standard certificates recognized by employers worldwide"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Detailed Curriculum",
      description: "Complete course outline and skills covered included"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Quality Assured",
      description: "Issued only after successful completion and assessment"
    }
  ];

  const sampleCertificates = [
    {
      course: "PHP Development",
      student: "John Doe",
      completionDate: "March 2024",
      grade: "A+",
      skills: ["PHP Fundamentals", "Laravel Framework", "Database Integration", "API Development"]
    },
    {
      course: "Python Programming", 
      student: "Jane Smith",
      completionDate: "February 2024",
      grade: "A",
      skills: ["Python Syntax", "Django Framework", "Machine Learning", "Web Scraping"]
    },
    {
      course: "React Development",
      student: "Mike Johnson", 
      completionDate: "January 2024",
      grade: "A+",
      skills: ["React Components", "State Management", "TypeScript", "Testing"]
    }
  ];

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Download Section - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Download Info */}
            <div className="space-y-6">
              <div className="text-left">
                <Badge variant="secondary" className="mb-4 bg-blue-400 text-white border-blue-400 font-medium">
                  🎓 Certificate Portal
                </Badge>
                <h1 className="text-4xl font-bold mb-6 text-gray-900">Download Your Certificate</h1>
                <p className="text-xl text-gray-700 mb-8 font-medium">
                  Access your official course completion certificate. Our certificates are digitally 
                  verified and recognized by industry professionals worldwide.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white rounded-2xl p-8">
                <p className="text-sm text-white/90 mb-2 font-medium">Certificate Included</p>
                <p className="text-4xl font-bold text-yellow-300 mb-2">Free with Every Course</p>
                <p className="text-sm text-white/90 font-medium">No additional fees</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900">How to Download</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <p className="text-gray-700 text-sm font-medium">Enter your Student ID in the form</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <p className="text-gray-700 text-sm font-medium">Click Download Certificate button</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <p className="text-gray-700 text-sm font-medium">Your certificate will be downloaded</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Download Form */}
            <div>
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900 font-bold">Certificate Download</CardTitle>
                  <CardDescription className="text-gray-700 font-medium">
                    Enter your Student ID to download your course completion certificate
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleDownloadCertificate} className="space-y-4">
                    <div>
                      <Label htmlFor="studentId" className="text-gray-900 font-medium">Student ID</Label>
                      <Input
                        id="studentId"
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="Enter your Student ID (e.g., TECH2024001)"
                        className="mt-1 border-gray-300 focus:border-blue-500 bg-white"
                      />
                      <p className="text-sm text-gray-600 mt-1 font-medium">
                        Your Student ID was provided via email upon course enrollment
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium" 
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Search className="mr-2 h-4 w-4 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download Certificate
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-1">Need help finding your Student ID?</p>
                        <p>Check your enrollment confirmation email or contact us at hiVirajKadam@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Certificate Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Certificate Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {certificateFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700 text-sm font-medium">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Certificates */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Recent Graduates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sampleCertificates.map((cert, index) => (
                <Card key={index} className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Award className="h-6 w-6 text-green-600" />
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-300 font-medium">
                        Grade: {cert.grade}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-gray-900 font-bold">{cert.course}</CardTitle>
                    <CardDescription className="text-gray-700 font-medium">
                      Completed by {cert.student} in {cert.completionDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-gray-900">Skills Certified:</h4>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs border-gray-300 text-gray-700 font-medium">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Verification Info */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16 border border-gray-200">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Certificate Verification</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
                All our certificates can be independently verified using the unique certificate ID. 
                Employers can verify the authenticity of any certificate issued by Codexa Classes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-700 font-medium">Online Verification</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-sm text-gray-700 font-medium">Authentic Certificates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-sm text-gray-700 font-medium">Certificates Issued</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}