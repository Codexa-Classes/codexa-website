'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '../Logo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NAVIGATION_ITEMS } from '@/lib/constants/navigation';

export function MobileSidebar() {
  const pathname = usePathname();
  
  const navItems = NAVIGATION_ITEMS;

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    {item.icon === "super10" && (
                      <img src="/super10.gif" alt="super10" className="h-5 w-5" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        
        {/* Sign In Button */}
        <div className="p-4 border-t border-border mt-4">
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">
              Sign In
            </Link>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
