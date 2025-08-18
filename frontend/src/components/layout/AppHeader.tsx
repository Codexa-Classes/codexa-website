"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import { Logo } from '../Logo';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function AppHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0
  });
  
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/super10", label: "Super10" },
    { href: "/certificate", label: "Certificate" },
    { href: "/contact", label: "Contact" }
  ];

  // Update underline position and width when pathname changes
  useEffect(() => {
    if (navRef.current) {
      const activeIndex = navItems.findIndex(item => item.href === pathname);
      if (activeIndex !== -1) {
        const navElement = navRef.current;
        // Get only the Link elements (navigation items), filter out the underline div
        const navLinkElements = Array.from(navElement.children).filter(
          child => child.tagName === 'A'
        );
        
        if (navLinkElements[activeIndex]) {
          const activeItem = navLinkElements[activeIndex] as HTMLElement;
          const rect = activeItem.getBoundingClientRect();
          const navRect = navElement.getBoundingClientRect();
          
          setUnderlineStyle({
            width: rect.width,
            left: rect.left - navRect.left,
            opacity: 1
          });
        }
      }
    }
  }, [pathname]);

  return (
    <header className="bg-white border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center space-x-8 relative">
            {/* Animated Sliding Underline */}
            <div 
              className="absolute -bottom-1 h-0.5 bg-primary rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${underlineStyle.width}px`,
                left: `${underlineStyle.left}px`,
                opacity: underlineStyle.opacity
              }}
            />
            
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.href === "/super10" && (
                    <img src="/super10.gif" alt="super10" className="mr-2 h-6 w-6 inline" />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <SidebarTrigger className="md:hidden" />
            
            {/* Desktop Sign In Button */}
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
