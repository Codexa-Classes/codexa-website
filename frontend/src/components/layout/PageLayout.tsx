"use client";

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export default function PageLayout({ 
  children, 
  showFooter = true 
}: PageLayoutProps) {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();

  // Force light mode for main website pages
  useEffect(() => {
    const mainWebsitePages = ['/', '/about', '/courses', '/super10', '/certificate', '/contact'];
    
    if (mainWebsitePages.includes(pathname) && setTheme && resolvedTheme !== 'light') {
      // Type assertion since we know setTheme exists at this point
      (setTheme as (theme: string) => void)('light');
    }
  }, [pathname, setTheme, resolvedTheme]);

  return (
    <div className="min-h-screen">
      <AppHeader />
      
      <main className="">
        {children}
      </main>
      
      {showFooter && <AppFooter />}
    </div>
  );
}
