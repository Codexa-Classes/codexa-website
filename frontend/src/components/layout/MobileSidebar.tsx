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
import { CONTACT } from '@/lib/constants';

export function MobileSidebar() {
  const pathname = usePathname();
  
  const navItems = NAVIGATION_ITEMS;

  return (
    <Sidebar side="right">
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
        
        <div className="px-4 py-3 space-y-2 text-sm border-t border-border mt-4">
          <a
            href={`mailto:${CONTACT.email}`}
            className="block text-muted-foreground hover:text-primary transition-colors"
          >
            {CONTACT.email}
          </a>
          <a
            href={CONTACT.phoneHref}
            className="block text-muted-foreground hover:text-primary transition-colors"
          >
            {CONTACT.phone}
          </a>
        </div>

        {/* Sign In Button */}
        <div className="p-4 border-t border-border">
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
