// frontend/src/components/layout/AppLayout.tsx
'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col min-w-0 w-full">
          <AppHeader />
          <main className="flex-1 min-w-0 w-full overflow-auto p-4 max-w-none">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}