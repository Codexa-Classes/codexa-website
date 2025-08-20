"use client";

import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import Super10Section from '../Super10Section';
import { SocialMediaIcons, defaultSocialMediaLinks } from '../SocialMediaIcons';
import { Logo } from '../Logo';
import { INSTRUCTOR } from '@/lib/constants';

export default function AppFooter() {
  return (

    <>
    <Super10Section />
    <footer className="bg-muted/50 border-t border-border/40 py-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                      <div>
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-muted-foreground">
              Empowering futures through quality IT education. Learn programming, web development, and database management with industry experts.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
              <li>
                <Link href="/super10" className="text-muted-foreground hover:text-primary transition-colors">
                  Super10 Program
                  <img src="/super10.gif" alt="super10" className="mr-2 h-7 w-7 inline ml-2" />
                </Link>
              </li>
              <li><Link href="/certificate" className="text-muted-foreground hover:text-primary transition-colors">Certificate</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                Email: <a 
                  href={`mailto:${INSTRUCTOR.email}`}
                  className="text-primary hover:underline transition-colors"
                >
                  {INSTRUCTOR.email}
                </a>
              </li>
              <li>All courses: ₹10,000</li>
            </ul>
            <div className="mt-4">
              <SocialMediaIcons 
                links={defaultSocialMediaLinks}
                iconSize={20}
                className=""
                containerClassName="flex"
                gap={40}
              />
            </div>
          </div>
        </div>
        
        <div className="text-center text-muted-foreground border-t border-border/40 pt-8">
          © 2025 Codexa Classes. All rights reserved.
        </div>
      </div>
    </footer>
    </>
  );
}
