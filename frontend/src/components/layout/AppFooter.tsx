"use client";

import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="bg-muted/50 border-t border-border/40 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Codexa Classes</span>
            </div>
            <p className="text-muted-foreground">
              Empowering futures through quality IT education. Learn programming, web development, and database management with industry experts.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
              <li><Link href="/super10" className="text-muted-foreground hover:text-primary transition-colors">Super10 Program</Link></li>
              <li><Link href="/certificate" className="text-muted-foreground hover:text-primary transition-colors">Certificates</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: hiVirajKadam@gmail.com</li>
              <li>All courses: ₹10,000</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center text-muted-foreground border-t border-border/40 pt-8">
          © 2024 Codexa Classes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
