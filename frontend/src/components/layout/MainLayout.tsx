'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { MobileSidebar } from './MobileSidebar';
import AppHeader from './AppHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider side="right">
      <div className="flex h-screen w-full">
        {/* Main Content */}
        <div className="flex flex-1 flex-col min-w-0 w-full">
          <AppHeader />
          <main className="flex-1 min-w-0 w-full overflow-auto">
            {children}
          </main>
        </div>
        
        {/* Mobile Sidebar - Only visible on mobile, positioned on right */}
        <div className="md:hidden">
          <MobileSidebar />
        </div>
      </div>
    </SidebarProvider>
  );
}
