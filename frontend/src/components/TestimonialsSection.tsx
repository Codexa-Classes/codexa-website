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
    role: "Full Stack Developer",
    avatar: "/mahak_meena_profile.jpg", // Using Mahak Meena's profile as Aarav Joshi
    rating: 5,
    quote: "Codexa Classes transformed my career completely! I was struggling to find a job after my engineering degree. The practical approach and real-world projects here were exactly what I needed. My instructor taught me React and Node.js from the ground up. Within 4 months, I was building full-stack applications and got placed at a top tech company. The instructors are incredibly supportive and the curriculum is perfectly aligned with industry needs."
  },
  {
    id: 2,
    name: "Ananya Kulkarni",
    role: "Frontend Developer",
    avatar: "/ananya_kulkarni_2.jpg", // Using real Ananya Kulkarni profile
    rating: 5,
    quote: "I came from a completely non-tech background - I was working as a content writer before joining Codexa Classes. The structured curriculum and hands-on learning made everything click for me. We built real projects that I could showcase in interviews. The instructors were so patient with my questions. Now I'm working on exciting frontend projects and absolutely loving every moment of my new career!"
  },
  {
    id: 3,
    name: "Siddharth Patil",
    role: "Backend Developer",
    avatar: "/gaurav_pandit_profile.jpg", // Using Gaurav Pandit's profile as Siddharth Patil
    rating: 5,
    quote: "The Super10 program gave me an opportunity I never thought possible. Free education that's actually world-class quality! I learned Python, Django, and database management from industry experts. The practical projects were amazing - we built real APIs and worked with actual databases. I'm forever grateful to Codexa Classes for believing in me and giving me this chance to transform my life."
  },
  {
    id: 4,
    name: "Dhruv Deshmukh",
    role: "DevOps Engineer",
    avatar: "/amar_jondhalekar_profile.jpg", // Using Amar Jondhalekar's profile as Dhruv Deshmukh
    rating: 5,
    quote: "Excellent course structure and amazing placement support! I was working as a system administrator before joining here. The DevOps course covered everything from Linux administration to cloud technologies. Within 3 months of completing the course, I got placed with a 40% salary hike. The placement team was incredibly helpful throughout the process. I highly recommend Codexa Classes to anyone serious about their IT career!"
  },
  {
    id: 5,
    name: "Aarohi Bhosale",
    role: "UI/UX Designer",
    avatar: "/ananya_kulkarni_3.jpg", // Using another Ananya Kulkarni profile as Aarohi Bhosale
    rating: 5,
    quote: "The design courses here are absolutely exceptional! I learned not just the tools like Figma and Adobe XD, but the fundamental principles of good design. The instructors taught us user research, wireframing, and prototyping. The portfolio projects we created were so professional that I used them directly in my job interviews. Now I'm working with international clients and loving every project!"
  },
  {
    id: 6,
    name: "Chaitanya Wagh",
    role: "Data Scientist",
    avatar: "/swapnali_nalawade_profile.jpg", // Using Swapnali Nalawade's profile as Chaitanya Wagh
    rating: 5,
    quote: "From zero coding knowledge to a data scientist role in just 6 months! The instructors here break down complex concepts so well that even beginners can understand. We worked with real datasets, built machine learning models, and learned industry tools like Python, SQL, and Tableau. This place is truly a game-changer for anyone wanting to enter the data science field."
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200">
                    <Image
                      src={testimonial.avatar}
                      alt={`${testimonial.name} profile`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 font-bold">{testimonial.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
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
