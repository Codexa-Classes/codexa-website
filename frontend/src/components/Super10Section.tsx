import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Super10Section() {
  return (
    <>
      {/* Main Super10 Section */}
      {/* <section className="py-20 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            💫 Special Initiative
          </Badge>
          <h2 className="text-3xl font-bold mb-6">
            <img src="/Discord.gif" alt="Discord" className="mr-2 h-5 w-5 inline" />
            Super10 Program
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            We believe in equal opportunities for all. Our Super10 program provides completely free IT education to 10 underprivileged students in every batch.
          </p>
          <Button asChild size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-orange-600">
            <Link href="/super10">
              Learn More About Super10 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section> */}

      {/* Special Programs Highlight */}
      <section className="py-10 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Enroll?</h3>
              <p className="text-white/90 mb-6 font-medium">
                Start your IT career today with our comprehensive courses. 
                All courses include hands-on projects and job placement support.
              </p>
              <div className="text-3xl font-bold text-yellow-300 mb-2">₹10,000</div>
              <div className="text-sm text-white/80 font-medium">Per course (Complete training + Certificate)</div>
            </div>

            <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                <img src="/Discord.gif" alt="Discord" className="mr-2 h-5 w-5 inline" />
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
          <div className="text-center bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 text-white rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              Don't wait to transform your career. Contact us today to learn more about 
              our courses and start your IT journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-blue-900 hover:bg-white/90 font-medium">
                <Link href="/courses">
                  View Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-blue-900 font-medium">
                <Link href="/super10">
                  <img src="/Discord.gif" alt="Discord" className="mr-2 h-4 w-4 inline" />
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
