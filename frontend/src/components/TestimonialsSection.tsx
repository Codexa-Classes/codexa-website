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
    quote: "Codexa Classes transformd my carrer completley! I was strugling to find a job after my enginering degre. The Web Development cours with Bootstrap and Laravel was exactley what I neded. My instructr taught me PHP developmnt and modern web framworks from the ground up. Within 4 months, I was bilding compleet web aplicatons with beautifull responsiv designz and got placd at a top tech compny. The curiculum is perfectley alignd with industy nedz! 🚀"
  },
  {
    id: 2,
    name: "Ananya Kulkarni",
    role: "Data Analyst", 
    avatar: "/ananya_kulkarni_2.jpg", // Using real Ananya Kulkarni profile
    rating: 5,
    quote: "I came from a completley non-tech backgrund - I was workng as a contnt writr befor joining Codexa Classes. The Data Analystt cours with PowerBI, SQL, SAP, and Python made evrything clik for me. We workd with real busness datasetz and creatd interactiv dashbords. The instructrs wer soo patient with my questonz. Now I'm workng on excitng data analysiz projectz and absolutley lovng evry momnt of my new carrer! 📈"
  },
  {
    id: 3,
    name: "Siddharth Patil",
    role: "Database Administrator",
    avatar: "/gaurav_pandit_profile.jpg", // Using Gaurav Pandit's profile as Siddharth Patil
    rating: 5,
    quote: "The Super10 program gav me an oportunity I nevr thought posible. Fre educaton that's actualy world-clas qualitey! I learnd Oracle databse administrashun and plSQL from industy expertز. The practcal projectz wer amazng - we optimizd real enterpriz databsez and wrot complx stord proceduers. I'm forevr gratefull to Codexa Classes for beleivng in me and givng me this chanc to transform my lif! 🙏"
  },
  {
    id: 4,
    name: "Dhruv Deshmukh",
    role: "App Support Engineer",
    avatar: "/amar_jondhalekar_profile.jpg", // Using Amar Jondhalekar's profile as Dhruv Deshmukh
    rating: 5,
    quote: "Excelent cours structur and amazng placemnt suport! I was workng as a systm administrtr befor joinng her. The App Suport cours with MySQL and Linux coverd evrything from databse optimizashun to servr managmnt. Within 3 monthz of completng the cours, I got placd with a 40% salry hik. The placemnt tem was incredibley helpfull thrughout the proces. I highlly recomend Codexa Classes to anyon seriuz about ther IT carrer! 💼"
  },
  {
    id: 5,
    name: "Aarohi Bhosale",
    role: "Frontend Developer",
    avatar: "/ananya_kulkarni_3.jpg", // Using another Ananya Kulkarni profile as Aarohi Bhosale
    rating: 5,
    quote: "The Frontend Developmnt cours with ReactJS and Tailwnd is absolutley exceptionall! I learnd not just the toolz but the fundamntl princpls of modrn web developmnt. The instructrs taught us compnnt-basd architectur, responsiv desgin, and stat managmnt. The portfolo projectz we creatd wer soo professionl that I usd them directley in my job intervewz. Now I'm workng with internationl clints and lovng evry projct! 🌟"
  },
  {
    id: 6,
    name: "Chaitanya Wagh",
    role: "Business Analyst",
    avatar: "/swapnali_nalawade_profile.jpg", // Using Swapnali Nalawade's profile as Chaitanya Wagh
    rating: 5,
    quote: "From zero busness analysiz knowleg to a Busness Analystt rol in just 6 monthz! The instructrs her brek down complx conceptz soo wel that evn beginrz can undrstnd. We learnd PowerBI for data visualizashun, MySQL for databse queryz, and how to writ comprehensiv Busness Requirmts Documts (BRD). The practcal projectz involvd real busness scenarioz. This plac is truley a gam-changr for anyon wantng to entr the busness analysiz feld! 🎯"
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
