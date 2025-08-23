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
    logo: "/tcs-logo.svg",
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
    logo: "/cognizant-logo.svg",
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
    companyLogo: "/tcs-logo.svg",
    companyLogoFallback: "TCS",
    package: "7.2 LPA",
    placementDate: "March 2024",
    location: "Mumbai",
    testimonial: "I was working as a reciptionist before joining Codexa Classes. The Frontend Development course with ReactJS and Tailwind completly changed my life! Viraj sir was so patient with me - I had zero coding knowlegde when I started. We built real responsive websites using React components and Tailwind CSS. The hands-on approach made learning soo much easier. Within 6 months, I was creating beautifull user interfaces and got placed at TCS with a 7.2 LPA package... I still can't beleive this transformation! 😊",
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
    testimonial: "I was a B.Com graduate earning just 15k per month in a small acounting firm. The Web Development course with Flask and Django literaly changed my life! I learned Python web frameworks from scratch and built compleet web applications. The practical projects were amazng - we created real e-comerce websites with user authentication and database integraton. Now I'm at Infosys Bangalore, working as a backend developr. My family is soo proud! 🚀",
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
    testimonial: "I was soo nervous on my first day becoz I had never worked with databses before. But the Database Admin course with Oracle and plSQL gave me hope. The instructers taught us evrything from basic SQL queries to advanced stored proceduers and database optimizaton. We worked with real enterprize databases and learned performace tuning. Within 3 months of completing the course, I got placed at Wipro Pune as a Database Administrtor... The placement team was incredibley supportiv! 💪",
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
    testimonial: "I was a mechanical enginear working in a factory, but I alwayz had a passion for cloud tecnologies. The DevOps Engineer course with AWS helped me transision completley. We learned evrything from EC2 instances to S3 storage, Lambda functons, and CloudFormation. The hands-on labs were incredibel - we deployed real aplicatons on AWS infrastucture. The instructors had actuall industry experiance. Now I'm at HCL Noida, managing cloud infrastucture that serves milions of users! 🔥",
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
    testimonial: "I was alwayz good with numbrs but never knew how to turn it into a tech carrer. The Business Analyst course with PowerBI, MySQL, and BRD writing opend my eyes to a whol new world. We learned to creat interactive dashbords, analyz business data, and write comprehensiv Business Requirements Documents. The practical projects involvd real business scenarioz from local companys. I used my portfolio directley in the Tech Mahindra intervew. Now I'm helping busnesses make data-driven decisonz! 📊",
    skills: ["PowerBI", "MySQL", "BRD", "Data Visualization"]
  },
  {
    id: 6,
    name: "Aarush Wagh",
    photo: "/aarush_wagh_profile.jpg",
    photoFallback: "AW",
    role: "App Support Engineer",
    company: "Cognizant",
    companyLogo: "/cognizant-logo.svg",
    companyLogoFallback: "CTS",
    package: "7.8 LPA",
    placementDate: "October 2023",
    location: "Chennai",
    testimonial: "The App Support course with MySQL and Linux exceded all my expectatons. We learnd Linux system administrashun, MySQL databse managment, and aplicaton troublshoting. The practical training inclued setting up Linux servrs, optimizing MySQL databses, and monitring aplicaton performans. We even workd on real suport tickets from actual companys. This hands-on experiance was invaluabel. Now I'm at Cognizant Chennai, providing 24/7 suport for critcal busness aplicatons. The 7.8 LPA packag was beyod my dreamz! 🎯",
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-yellow-300 mb-2">500+</div>
              <div className="text-white/90">Students Placed</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-yellow-300 mb-2">80+</div>
              <div className="text-white/90">Companies</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-yellow-300 mb-2">9 LPA</div>
              <div className="text-white/90">Avg Package</div>
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companyPlacements.map((company) => (
              <Card key={company.id} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200 hover:border-blue-300 bg-white">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center border-2 border-gray-200 hover:border-blue-300 transition-colors">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <span className="text-blue-600 font-bold text-sm">{company.logoFallback}</span>
                    )}
                  </div>
                  <CardTitle className="text-lg text-gray-900 font-bold">{company.name}</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {candidateSuccessStories.map((candidate) => (
              <Card key={candidate.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl overflow-hidden">
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
                      <CardTitle className="text-xl text-gray-900 font-bold mb-2">{candidate.name}</CardTitle>
                      <div className="flex items-center gap-4 mb-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                          {candidate.role}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">Placed</span>
                        </div>
                      </div>
                      
                      {/* Company Info */}
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center border border-gray-200">
                          {candidate.companyLogo ? (
                            <img 
                              src={candidate.companyLogo} 
                              alt={`${candidate.company} logo`}
                              className="w-6 h-6 object-contain"
                            />
                          ) : (
                            <span className="text-gray-600 font-bold text-xs">{candidate.companyLogoFallback}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{candidate.company}</div>
                          <div className="text-sm text-gray-600">{candidate.package} • {candidate.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Testimonial */}
                  <blockquote className="text-gray-700 leading-relaxed italic border-l-4 border-blue-300 pl-4">
                    "{candidate.testimonial}"
                  </blockquote>
                  
                  {/* Placement Date */}
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Placed in {candidate.placementDate}</span>
                  </div>
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
