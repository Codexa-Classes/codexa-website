"use client";

import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import Super10Section from '../Super10Section';
import { SocialMediaIcons, defaultSocialMediaLinks } from '../SocialMediaIcons';
import { Logo } from '../Logo';
import { INSTRUCTOR } from '@/lib/constants';
import DevIcon from '../DevIcon';

export default function AppFooter() {
  return (

    <>
    <Super10Section />
    <footer className="bg-muted/50 border-t border-border/40 py-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                      <div>
              <div className="mb-4">
                <Logo size="2xl" />
              </div>
              <p className="text-muted-foreground">
              Empowering futures through quality IT education. Learn programming, web development, and database management with industry experts.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/super10" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <img src="/super10.gif" alt="super10" className="h-4 w-4" />
                  Super10 Program
                </Link>
              </li>
              <li>
                <Link href="/certificate" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Certificate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <DevIcon name="react" size={16} />
                  Frontend Development
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <DevIcon name="python" size={16} />
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <DevIcon name="php" size={16} />
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <DevIcon name="powerbi" size={16} />
                  Business Analyst
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <DevIcon name="python" size={16} />
                  Data Analyst
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <DevIcon name="aws" size={16} />
                  DevOps Engineer
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <DevIcon name="oracle" size={16} />
                  Database Admin
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <DevIcon name="mysql" size={16} />
                  App Support
                </Link>
              </li>
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
