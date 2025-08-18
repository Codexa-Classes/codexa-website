'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { MobileSidebar } from './MobileSidebar';
import AppHeader from './AppHeader';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Mobile Sidebar - Only visible on mobile */}
        <div className="md:hidden">
          <MobileSidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex flex-1 flex-col min-w-0 w-full">
          <AppHeader />
          <main className="flex-1 min-w-0 w-full overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
