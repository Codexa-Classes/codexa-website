import React from 'react';

interface StudentTestimonialProps {
  imageUrl?: string;
  name: string;
  role: string;
  company?: string;
  testimonial: string;
  rating?: number;
  className?: string;
}

export const StudentTestimonial: React.FC<StudentTestimonialProps> = ({
  imageUrl = "https://randomuser.me/api/portraits/women/91.jpg",
  name,
  role,
  company,
  testimonial,
  rating = 5,
  className = ""
}) => {
  // Generate star icons based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl ${className}`}>
      <div className="md:flex">
        <div className="md:shrink-0">
          <img 
            className="h-84 w-full object-cover md:h-full md:w-32" 
            src={imageUrl} 
            alt={`${name}'s profile picture`}
          />
        </div>
        <div className="p-4">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {role}
          </div>
          <p className="mt-1 text-slate-500 text-sm">
            "{testimonial}"
          </p>
          <div className="mt-2">
            <span className="text-slate-900 font-bold">{name}</span>
            
          </div>{company && (
              <span className="text-slate-600 text-sm"> {company}</span>
            )}
          <div className="mt-2 flex items-center">
            {renderStars(rating)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTestimonial;
