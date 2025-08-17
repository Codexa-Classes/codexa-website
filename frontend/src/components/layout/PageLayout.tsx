"use client";

import { ReactNode } from 'react';
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
