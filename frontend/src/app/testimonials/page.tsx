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
    logo: "/company-logos/tcs-logo.png",
    logoFallback: "TCS",
    placementCount: 15,
    avgPackage: "4.2 LPA",
    location: "Mumbai, Pune, Bangalore"
  },
  {
    id: 2,
    name: "Infosys",
    logo: "/company-logos/infosys-logo.png",
    logoFallback: "INFY",
    placementCount: 12,
    avgPackage: "3.8 LPA",
    location: "Bangalore, Hyderabad, Chennai"
  },
  {
    id: 3,
    name: "Wipro",
    logo: "/company-logos/wipro-logo.png",
    logoFallback: "WIPRO",
    placementCount: 10,
    avgPackage: "3.5 LPA",
    location: "Bangalore, Pune, Gurgaon"
  },
  {
    id: 4,
    name: "HCL",
    logo: "/company-logos/hcl-logo.png",
    logoFallback: "HCL",
    placementCount: 8,
    avgPackage: "3.9 LPA",
    location: "Noida, Chennai, Bangalore"
  },
  {
    id: 5,
    name: "Tech Mahindra",
    logo: "/company-logos/tech-mahindra-logo.png",
    logoFallback: "TECHM",
    placementCount: 6,
    avgPackage: "3.6 LPA",
    location: "Mumbai, Pune, Hyderabad"
  },
  {
    id: 6,
    name: "Cognizant",
    logo: "/company-logos/cognizant-logo.png",
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
    name: "Priya Sharma",
    photo: "/candidate-photos/priya-sharma.jpg",
    photoFallback: "PS",
    role: "Full Stack Developer",
    company: "TCS",
    companyLogo: "/company-logos/tcs-logo.png",
    companyLogoFallback: "TCS",
    package: "4.5 LPA",
    placementDate: "March 2024",
    location: "Mumbai",
    testimonial: "Codexa Classes transformed my career completely! The practical approach and real-world projects helped me land my dream job at TCS. The instructors are incredibly supportive and the curriculum is industry-aligned. I went from zero coding knowledge to a Full Stack Developer role in just 6 months!",
    skills: ["React", "Node.js", "MongoDB", "AWS"]
  },
  {
    id: 2,
    name: "Rahul Kumar",
    photo: "/candidate-photos/rahul-kumar.jpg",
    photoFallback: "RK",
    role: "Frontend Developer",
    company: "Infosys",
    companyLogo: "/company-logos/infosys-logo.png",
    companyLogoFallback: "INFY",
    package: "3.8 LPA",
    placementDate: "February 2024",
    location: "Bangalore",
    testimonial: "I came from a non-tech background (B.Com graduate), but the structured curriculum and hands-on learning made everything click. The Super10 program gave me the opportunity I never thought possible. Now I'm working on exciting projects at Infosys and loving every moment!",
    skills: ["React", "TypeScript", "CSS3", "Git"]
  },
  {
    id: 3,
    name: "Anjali Patel",
    photo: "/candidate-photos/anjali-patel.jpg",
    photoFallback: "AP",
    role: "Backend Developer",
    company: "Wipro",
    companyLogo: "/company-logos/wipro-logo.png",
    companyLogoFallback: "WIPRO",
    package: "4.2 LPA",
    placementDate: "January 2024",
    location: "Pune",
    testimonial: "The Super10 program gave me the opportunity I never thought possible. Free education that's actually world-class quality! I learned Python, Django, and database management. Within 3 months of completing the course, I got placed at Wipro. I'm forever grateful to Codexa Classes.",
    skills: ["Python", "Django", "PostgreSQL", "Docker"]
  },
  {
    id: 4,
    name: "Vikram Singh",
    photo: "/candidate-photos/vikram-singh.jpg",
    photoFallback: "VS",
    role: "DevOps Engineer",
    company: "HCL",
    companyLogo: "/company-logos/hcl-logo.png",
    companyLogoFallback: "HCL",
    package: "4.8 LPA",
    placementDate: "December 2023",
    location: "Noida",
    testimonial: "Excellent course structure and amazing placement support! I learned Linux administration, Docker, Kubernetes, and CI/CD pipelines. The instructors have real industry experience. Within 3 months of completing the course, I got placed with a 40% salary hike. Highly recommended!",
    skills: ["Linux", "Docker", "Kubernetes", "Jenkins"]
  },
  {
    id: 5,
    name: "Meera Reddy",
    photo: "/candidate-photos/meera-reddy.jpg",
    photoFallback: "MR",
    role: "UI/UX Designer",
    company: "Tech Mahindra",
    companyLogo: "/company-logos/tech-mahindra-logo.png",
    companyLogoFallback: "TECHM",
    package: "3.9 LPA",
    placementDate: "November 2023",
    location: "Mumbai",
    testimonial: "The design courses here are exceptional! I learned not just the tools (Figma, Adobe XD) but the principles of good design, user research, and prototyping. The portfolio I built during the course helped me land a role at Tech Mahindra. Now I'm working with international clients!",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"]
  },
  {
    id: 6,
    name: "Arjun Malhotra",
    photo: "/candidate-photos/arjun-malhotra.jpg",
    photoFallback: "AM",
    role: "Data Scientist",
    company: "Cognizant",
    companyLogo: "/company-logos/cognizant-logo.png",
    companyLogoFallback: "CTS",
    package: "5.2 LPA",
    placementDate: "October 2023",
    location: "Chennai",
    testimonial: "From zero coding knowledge to a Data Scientist role in just 6 months! The instructors break down complex concepts so well. I learned Python, Machine Learning, SQL, and data visualization. The real-world projects were challenging but prepared me perfectly for industry. This place is a game-changer!",
    skills: ["Python", "Machine Learning", "SQL", "Tableau"]
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
              <div className="text-3xl font-bold text-yellow-300 mb-2">150+</div>
              <div className="text-white/90">Students Placed</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-yellow-300 mb-2">25+</div>
              <div className="text-white/90">Companies</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-yellow-300 mb-2">4.2 LPA</div>
              <div className="text-white/90">Avg Package</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-yellow-300 mb-2">95%</div>
              <div className="text-white/90">Placement Rate</div>
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
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                    {company.logoFallback}
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
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {candidate.photoFallback}
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
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600 font-bold text-xs">
                          {candidate.companyLogoFallback}
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
