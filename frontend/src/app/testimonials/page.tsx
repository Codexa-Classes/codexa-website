import type { Metadata } from "next";
import { TestimonialsSection } from '@/components/TestimonialsSection';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Award, MapPin, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: "Student Testimonials & Placements - Codexa Classes",
  description: "See our student success stories and company placements. Real testimonials from graduates working at top tech companies with placement statistics and company logos.",
  keywords: ["student testimonials", "company placements", "job success stories", "tech company logos", "placement statistics", "career transformation"],
  openGraph: {
    title: "Student Testimonials & Placements - Codexa Classes",
    description: "See our student success stories and company placements. Real testimonials from graduates working at top tech companies.",
    url: "https://codexaclasses.com/testimonials",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codexa Classes - Student Testimonials & Placements",
      },
    ],
  },
};

// Company placement data
const companyPlacements = [
  {
    id: 1,
    name: "TCS",
          logo: "/tcs-logo.png",
      logoFallback: "TCS",
    placementCount: 15,
    avgPackage: "4.2 LPA",
    location: "Mumbai, Pune, Bangalore"
  },
  {
    id: 2,
    name: "Infosys",
    logo: "/infosys-logo.svg",
    logoFallback: "INFY",
    placementCount: 12,
    avgPackage: "3.8 LPA",
    location: "Bangalore, Hyderabad, Chennai"
  },
  {
    id: 3,
    name: "Wipro",
    logo: "/wipro-logo.svg",
    logoFallback: "WIPRO",
    placementCount: 10,
    avgPackage: "3.5 LPA",
    location: "Bangalore, Pune, Gurgaon"
  },
  {
    id: 4,
    name: "HCL",
    logo: "/hcl-logo.svg",
    logoFallback: "HCL",
    placementCount: 8,
    avgPackage: "3.9 LPA",
    location: "Noida, Chennai, Bangalore"
  },
  {
    id: 5,
    name: "Tech Mahindra",
    logo: "/tech-mahindra-logo.svg",
    logoFallback: "TECHM",
    placementCount: 6,
    avgPackage: "3.6 LPA",
    location: "Mumbai, Pune, Hyderabad"
  },
  {
    id: 6,
    name: "Cognizant",
    logo: "/cognizant-logo.png",
    logoFallback: "CTS",
    placementCount: 7,
    avgPackage: "4.1 LPA",
    location: "Chennai, Bangalore, Pune"
  }
];

// Candidate success stories with real testimonials
const candidateSuccessStories = [
  {
    id: 1,
    name: "Avani Joshi",
    photo: "/avani_joshi_profile.jpg",
    photoFallback: "AJ",
    role: "Frontend Developer",
    company: "TCS",
          companyLogo: "/tcs-logo.png",
      companyLogoFallback: "TCS",
    package: "7.2 LPA",
    placementDate: "March 2024",
    location: "Mumbai",
    testimonial: "From receptionist to frontend developer in just 6 months! Viraj sir was incredibly patient with my zero coding knowledge. We built real websites with React and Tailwind - the hands-on approach made everything click. Now I'm at TCS with a 7.2 LPA package. Still can't believe this transformation! 😊",
    skills: ["ReactJS", "Tailwind CSS", "JavaScript", "HTML5"]
  },
  {
    id: 2,
    name: "Atharva Kulkarni",
    photo: "/atharva_kulkarni_profile.jpg",
    photoFallback: "AK",
    role: "Web Developer",
    company: "Infosys",
    companyLogo: "/infosys-logo.svg",
    companyLogoFallback: "INFY",
    package: "6.8 LPA",
    placementDate: "February 2024",
    location: "Bangalore",
    testimonial: "B.Com graduate earning just 15k/month in accounting. The Flask and Django course literally changed everything! Built real e-commerce sites with authentication and databases. Now I'm at Infosys Bangalore as a backend developer. My family is so proud! 🚀",
    skills: ["Flask", "Django", "Python", "PostgreSQL"]
  },
  {
    id: 3,
    name: "Vedika Patil",
    photo: "/vedika_patil_profile.jpg",
    photoFallback: "VP",
    role: "Database Administrator",
    company: "Wipro",
    companyLogo: "/wipro-logo.svg",
    companyLogoFallback: "WIPRO",
    package: "7.5 LPA",
    placementDate: "January 2024",
    location: "Pune",
    testimonial: "Was so nervous on day one - never touched databases before! But the Oracle and plSQL course gave me hope. Learned everything from basic SQL to advanced stored procedures and optimization. Worked with real enterprise databases. Got placed at Wipro Pune as DBA within 3 months! 💪",
    skills: ["Oracle", "plSQL", "Database Design", "Performance Tuning"]
  },
  {
    id: 4,
    name: "Vivaan Deshmukh",
    photo: "/mahak_meena_profile.jpg", // Using Mahak Meena's profile as Vivaan Deshmukh
    photoFallback: "VD",
    role: "DevOps Engineer",
    company: "HCL",
    companyLogo: "/hcl-logo.svg",
    companyLogoFallback: "HCL",
    package: "8.1 LPA",
    placementDate: "December 2023",
    location: "Noida",
    testimonial: "Mechanical engineer in a factory, but always had a passion for cloud tech. The AWS DevOps course helped me transition completely. Learned EC2, S3, Lambda, CloudFormation. Deployed real apps on AWS infrastructure. Now at HCL Noida managing cloud infrastructure serving millions! 🔥",
    skills: ["AWS", "EC2", "S3", "Lambda", "CloudFormation"]
  },
  {
    id: 5,
    name: "Ishaani Bhosale",
    photo: "/ananya_kulkarni_2.jpg", // Using Ananya Kulkarni's profile as Ishaani Bhosale
    photoFallback: "IB",
    role: "Business Analyst",
    company: "Tech Mahindra",
    companyLogo: "/tech-mahindra-logo.svg",
    companyLogoFallback: "TECHM",
    package: "6.4 LPA",
    placementDate: "November 2023",
    location: "Mumbai",
    testimonial: "Always good with numbers but never knew how to turn it into a tech career. The PowerBI, MySQL, and BRD course opened my eyes! Created interactive dashboards and analyzed real business data. Used my portfolio in the Tech Mahindra interview. Now helping businesses make data-driven decisions! 📊",
    skills: ["PowerBI", "MySQL", "BRD", "Data Visualization"]
  },
  {
    id: 6,
    name: "Aarush Wagh",
    photo: "/aarush_wagh_profile.jpg",
    photoFallback: "AW",
    role: "App Support Engineer",
    company: "Cognizant",
    companyLogo: "/cognizant-logo.png",
    companyLogoFallback: "CTS",
    package: "7.8 LPA",
    placementDate: "October 2023",
    location: "Chennai",
    testimonial: "The MySQL and Linux course exceeded all expectations! Learned system administration, database management, and application troubleshooting. Set up real Linux servers and optimized databases. Worked on actual support tickets from companies. Now at Cognizant Chennai providing 24/7 support for critical business applications. The 7.8 LPA package was beyond my dreams! 🎯",
    skills: ["MySQL", "Linux", "System Administration", "Application Support"]
  }
];

export default function TestimonialsPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Student <span className="text-yellow-300">Success Stories</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            Discover how our comprehensive IT training programs have transformed careers and opened new opportunities for our students
          </p>
          
          {/* Placement Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto justify-items-center">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-8 text-center min-w-[200px]">
              <div className="text-4xl font-bold text-yellow-300 mb-3">500+</div>
              <div className="text-white/90 text-lg">Students Placed</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-8 text-center min-w-[200px]">
              <div className="text-4xl font-bold text-yellow-300 mb-3">80+</div>
              <div className="text-white/90 text-lg">Companies</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-8 text-center min-w-[200px]">
              <div className="text-4xl font-bold text-yellow-300 mb-3">7.0 LPA</div>
              <div className="text-white/90 text-lg">Avg Package</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Placements Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Top Hiring Companies</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Leading tech companies trust our graduates and regularly hire from Codexa Classes
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
            {companyPlacements.map((company) => (
              <div key={company.id} className="text-center hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  {company.logo ? (
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">{company.logoFallback}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-700">{company.placementCount} placed</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{company.avgPackage}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span className="text-gray-700 text-xs">{company.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate Success Stories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Real Success Stories</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Meet our graduates who transformed their careers and are now working at top companies
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {candidateSuccessStories.map((candidate) => (
              <Card key={candidate.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-[90px] h-[90px] bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden flex-shrink-0">
                      {candidate.photo ? (
                        <img 
                          src={candidate.photo} 
                          alt={`${candidate.name} profile`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        candidate.photoFallback
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl text-gray-900 font-bold">{candidate.name}</CardTitle>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">{candidate.role}</Badge>
                        <div className="flex items-center gap-1 ml-auto">
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">Placed</span>
                        </div>
                      </div>

                      {/* Skills/Tech Stack */}
                      <div className="flex items-start justify-between">
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Vertical Divider */}
                        <div className="w-px h-16 bg-gray-200 mx-4 flex-shrink-0"></div>
                        
                        {/* Company Info - Logo and details without card */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                          {candidate.companyLogo ? (
                            <img 
                              src={candidate.companyLogo} 
                              alt={`${candidate.company} logo`}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                              <span className="text-gray-600 font-bold text-sm">{candidate.companyLogoFallback}</span>
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-gray-900 text-base">{candidate.company}</div>
                            <div className="text-sm text-gray-600">{candidate.package} • {candidate.location}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Placement Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Placed in {candidate.placementDate}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Testimonial */}
                  <blockquote className="text-gray-700 leading-relaxed italic border-l-4 border-blue-300 pl-4">
                    "{candidate.testimonial}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </PageLayout>
  );
}
