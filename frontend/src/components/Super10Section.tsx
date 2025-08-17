import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Super10Section() {
  return (
    <>
      {/* Special Programs Highlight */}
      <section className="py-10 bg-white">
        <div className="container mx-auto lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 text-gray-800 rounded-2xl p-8 border border-green-200/50">
              <h3 className="text-2xl font-bold mb-4">Ready to Enroll?</h3>
              <p className="text-gray-700 mb-6 font-medium">
                Start your IT career today with our comprehensive courses. 
                All courses include hands-on projects and job placement support.
              </p>
              <div className="text-3xl font-bold text-green-600 mb-2">₹10,000</div>
              <div className="text-sm text-gray-600 font-medium">Per course (Complete training + Certificate)</div>
            </div>

            <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                <img src="/super10.gif" alt="super10" className="mr-2 h-7 w-7 inline" />
                Super10 Program
              </h3>
              <p className="text-white/90 mb-6 font-medium">
                Eligible for free education? Apply for our Super10 program and 
                get complete IT training at no cost.
              </p>
              <div className="text-3xl font-bold mb-2">100% FREE</div>
              <div className="text-sm text-white/80 font-medium">For 10 underprivileged students per batch</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-br from-purple-50 via-violet-100 to-purple-200 text-gray-800 rounded-2xl p-12 border border-purple-200/50">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
              Don't wait to transform your career. Contact us today to learn more about 
              our courses and start your IT journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-purple-600 text-white hover:bg-purple-700 font-medium">
                <Link href="/courses">
                  View Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-medium">
                <Link href="/super10">
                  <img src="/super10.gif" alt="super10" className="mr-2 h-7 w-7 inline" />
                  Apply for Super10
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
