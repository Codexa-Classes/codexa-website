import React from 'react';
import { StudentTestimonial } from './StudentTestimonial';

export const StudentTestimonialExample: React.FC = () => {
  const testimonials = [
    {
      imageUrl: "https://randomuser.me/api/portraits/women/91.jpg",
      name: "Sarah Johnson",
      role: "Student Success Story",
      company: "TechInnovate",
      testimonial: "This course changed my life! I can't imagine going back to how things were before. Absolutely revolutionary.",
      rating: 5
    },
    {
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Michael Chen",
      role: "Graduate",
      company: "DataCorp",
      testimonial: "The practical approach and real-world projects helped me land my dream job in just 6 months.",
      rating: 5
    },
    {
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Emily Rodriguez",
      role: "Career Changer",
      company: "StartupXYZ",
      testimonial: "From zero coding experience to a full-stack developer. The instructors are amazing and supportive.",
      rating: 5
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">Student Success Stories</h2>
      
      {/* Single testimonial */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-center">Featured Testimonial</h3>
        <StudentTestimonial
          imageUrl={testimonials[0].imageUrl}
          name={testimonials[0].name}
          role={testimonials[0].role}
          company={testimonials[0].company}
          testimonial={testimonials[0].testimonial}
          rating={testimonials[0].rating}
        />
      </div>

      {/* Multiple testimonials in a grid */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-center">More Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <StudentTestimonial
              key={index}
              imageUrl={testimonial.imageUrl}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              testimonial={testimonial.testimonial}
              rating={testimonial.rating}
              className="max-w-sm"
            />
          ))}
        </div>
      </div>

      {/* Custom styling example */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4 text-center">Custom Styled Testimonial</h3>
        <StudentTestimonial
          imageUrl="https://randomuser.me/api/portraits/men/75.jpg"
          name="David Kim"
          role="Senior Developer"
          company="Fortune 500 Company"
          testimonial="The advanced concepts and industry best practices taught here are exactly what I needed to advance my career."
          rating={4}
          className="border-2 border-blue-200 shadow-lg"
        />
      </div>
    </div>
  );
};

export default StudentTestimonialExample;
