import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aarav Joshi",
    role: "Web Developer",
    avatar: "/mahak_meena_profile.jpg", // Using Mahak Meena's profile as Aarav Joshi
    rating: 5,
    quote: "Codexa Classes completely transformed my career! Struggling to find a job after engineering. The Bootstrap and Laravel course was exactly what I needed. Learned PHP and modern web frameworks from scratch. Within 4 months, I was building complete web applications and got placed at a top tech company! 🚀"
  },
  {
    id: 2,
    name: "Ananya Kulkarni",
    role: "Data Analyst", 
    avatar: "/ananya_kulkarni_2.jpg", // Using real Ananya Kulkarni profile
    rating: 5,
    quote: "Came from a completely non-tech background - was working as a content writer. The PowerBI, SQL, SAP, and Python course made everything click! Worked with real business datasets and created interactive dashboards. Instructors were so patient with my questions. Now working on exciting data analysis projects and absolutely loving every moment! 📈"
  },
  {
    id: 3,
    name: "Siddharth Patil",
    role: "Database Administrator",
    avatar: "/gaurav_pandit_profile.jpg", // Using Gaurav Pandit's profile as Siddharth Patil
    rating: 5,
    quote: "The Super10 program gave me an opportunity I never thought possible. Free education that's actually world-class quality! Learned Oracle database administration and plSQL from industry experts. The practical projects were amazing - we optimized real enterprise databases and wrote complex stored procedures. Forever grateful to Codexa Classes for believing in me! 🙏"
  },
  {
    id: 4,
    name: "Dhruv Deshmukh",
    role: "App Support Engineer",
    avatar: "/amar_jondhalekar_profile.jpg", // Using Amar Jondhalekar's profile as Dhruv Deshmukh
    rating: 5,
    quote: "Excellent course structure and amazing placement support! Was working as a system administrator before joining. The MySQL and Linux course covered everything from database optimization to server management. Within 3 months, I got placed with a 40% salary hike. The placement team was incredibly helpful throughout! 💼"
  },
  {
    id: 5,
    name: "Aarohi Bhosale",
    role: "Frontend Developer",
    avatar: "/ananya_kulkarni_3.jpg", // Using another Ananya Kulkarni profile as Aarohi Bhosale
    rating: 5,
    quote: "The ReactJS and Tailwind course is absolutely exceptional! Learned not just the tools but the fundamental principles of modern web development. Taught us component-based architecture, responsive design, and state management. The portfolio projects were so professional that I used them directly in job interviews. Now working with international clients and loving every project! 🌟"
  },
  {
    id: 6,
    name: "Chaitanya Wagh",
    role: "Business Analyst",
    avatar: "/swapnali_nalawade_profile.jpg", // Using Swapnali Nalawade's profile as Chaitanya Wagh
    rating: 5,
    quote: "From zero business analysis knowledge to a Business Analyst role in just 6 months! The instructors break down complex concepts so well that even beginners can understand. Learned PowerBI for data visualization, MySQL for database queries, and how to write comprehensive Business Requirements Documents. The practical projects involved real business scenarios. This place is truly a game-changer! 🎯"
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">What Our Students Say</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Hear from our graduates about their learning experience and career success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-blue-200">
                    <Image
                      src={testimonial.avatar}
                      alt={`${testimonial.name} profile`}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 font-bold">{testimonial.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{testimonial.role}</CardDescription>
                  
                <div className="flex gap-1 mb-3 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div></div>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
