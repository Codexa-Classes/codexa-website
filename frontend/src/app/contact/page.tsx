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

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 font-bold">Send us a Message</CardTitle>
                <CardDescription className="text-gray-700 font-medium">
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-900 font-medium">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        required
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-900 font-medium">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-900 font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-900 font-medium">Subject</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course-enquiry">Course Enquiry</SelectItem>
                        <SelectItem value="enrollment">Enrollment</SelectItem>
                        <SelectItem value="super10-application">Super10 Application</SelectItem>
                        <SelectItem value="certificate-issue">Certificate Issue</SelectItem>
                        <SelectItem value="general">General Question</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-900 font-medium">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      className="border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <a 
                        href="mailto:hiVirajKadam@gmail.com"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        hiVirajKadam@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <a 
                        href="tel:+919876543210"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-700 font-medium">
                        Shraddha Classes<br />
                        IT Training Center<br />
                        Mumbai, Maharashtra, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Business Hours</h4>
                      <p className="text-gray-700 font-medium">
                        Monday - Friday: 9:00 AM - 8:00 PM<br />
                        Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold mb-4 text-gray-900">Quick Response</h4>
                <p className="text-sm text-gray-700 mb-4 font-medium">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 font-medium">Course information and pricing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 font-medium">Enrollment assistance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700 font-medium">Super10 program applications</span>
                  </div>
                </div>
              </div>
            </div>
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
              <h3 className="text-2xl font-bold mb-4">Super10 Program</h3>
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