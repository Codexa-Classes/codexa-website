import type { Metadata } from "next";
import { TestimonialsSection } from '@/components/TestimonialsSection';
import PageLayout from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: "Student Testimonials - Codexa Classes",
  description: "Read what our students say about their learning experience at Codexa Classes. Real stories from graduates who transformed their careers with our IT training programs.",
  keywords: ["student testimonials", "Codexa Classes reviews", "IT training success stories", "graduate feedback", "career transformation stories"],
  openGraph: {
    title: "Student Testimonials - Codexa Classes",
    description: "Read what our students say about their learning experience at Codexa Classes. Real stories from graduates who transformed their careers.",
    url: "https://codexaclasses.com/testimonials",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codexa Classes - Student Testimonials",
      },
    ],
  },
};

export default function TestimonialsPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Student <span className="text-yellow-300">Testimonials</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Discover how our comprehensive IT training programs have transformed careers and opened new opportunities for our students
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </PageLayout>
  );
}
