"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Users,
  GraduationCap,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import PageLayout from '@/components/layout/PageLayout';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message Sent! Thank you for contacting us. We'll get back to you within 24 hours.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsLoading(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      description: "hiVirajKadam@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      description: "+91 98765 43210"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      description: "Mumbai, Maharashtra"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Office Hours",
      description: "Mon-Sat: 9 AM - 6 PM"
    }
  ];

  const inquiryTypes = [
    { value: "course_enrollment", label: "Course Enrollment" },
    { value: "super10_application", label: "Super10 Application" },
    { value: "certificate_query", label: "Certificate Query" },
    { value: "general_inquiry", label: "General Inquiry" },
    { value: "technical_support", label: "Technical Support" }
  ];

  const courses = [
    "PHP Development",
    "Python Programming", 
    "React Development",
    "ASP.NET Development",
    "MySQL Database",
    "Linux Administration"
  ];

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "You can enroll by filling out the contact form below or emailing us directly. We'll guide you through the entire process."
    },
    {
      question: "What is the duration of each course?",
      answer: "Course duration varies from 4-10 weeks depending on the subject. All details are available on our Courses page."
    },
    {
      question: "How do I apply for Super10?",
      answer: "Submit your application through this contact form with 'Super10 Application' as inquiry type, along with required documents."
    },
    {
      question: "Are there any prerequisites?",
      answer: "Basic computer knowledge is helpful but not mandatory. We start from fundamentals in all our courses."
    }
  ];

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-blue-400 text-white border-blue-400 font-medium">
              📞 Contact Us
            </Badge>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Get in Touch</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 font-medium">
              Ready to start your IT journey? Have questions about our courses? 
              We're here to help you take the next step in your career.
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600">
                    {info.icon}
                  </div>
                  <h3 className="font-semibold text-sm mb-2 text-gray-900">{info.title}</h3>
                  <p className="text-gray-700 text-xs font-medium">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-16 border border-gray-200">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 font-bold">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700 font-medium">{faq.answer}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Special Programs Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Enroll?</h3>
              <p className="text-white/90 mb-6 font-medium">
                Start your IT career today with our comprehensive courses. 
                All courses include hands-on projects and job placement support.
              </p>
              <div className="text-3xl font-bold text-yellow-300 mb-2">₹10,000</div>
              <div className="text-sm text-white/80 font-medium">Per course (Complete training + Certificate)</div>
            </div>

            <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                <img src="/Discord.gif" alt="Discord" className="mr-2 h-5 w-5 inline" />
                Super10 Program
              </h3>
              <p className="text-white/90 mb-6 font-medium">
                Eligible for free education? Apply for our Super10 program and 
                get complete IT training at no cost.
              </p>
              <div className="text-3xl font-bold mb-2">100% FREE</div>
              <div className="text-sm text-white/80 font-medium">For 10 underprivileged students per batch</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              Don't wait to transform your career. Contact us today to learn more about 
              our courses and start your IT journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-white/90 font-medium">
                <Link href="/courses">
                  View Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-blue-900 font-medium">
                <Link href="/super10">
                  <img src="/Discord.gif" alt="Discord" className="mr-2 h-4 w-4 inline" />
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