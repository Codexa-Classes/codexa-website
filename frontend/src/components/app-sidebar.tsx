'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  Briefcase,
  User,
  Home,
  Building2,
  FileText,
  BookOpen,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  console.log('AppSidebar: Current pathname:', pathname);
  console.log('AppSidebar: Current user:', user);
  console.log('AppSidebar: User role:', user?.role);

  const adminMenuItems = [
    {
      title: 'Dashboard',
      url: ROUTES.admin.dashboard,
      icon: Home,
    },
    {
      title: 'Candidates',
      url: ROUTES.admin.candidates,
      icon: Users,
    },
    {
      title: 'Jobs',
      url: ROUTES.admin.jobs,
      icon: Briefcase,
    },
    {
      title: 'Courses',
      url: ROUTES.admin.courses,
      icon: BookOpen,
    },
  ];

  const userMenuItems = [
    {
      title: 'Dashboard',
      url: ROUTES.user.dashboard,
      icon: Home,
    },
    {
      title: 'Courses',
      url: ROUTES.user.courses,
      icon: BookOpen,
    },
    {
      title: 'Applied Jobs',
      url: ROUTES.user.appliedJobs,
      icon: FileText,
    },
    {
      title: 'My Profile',
      url: ROUTES.user.profile,
      icon: User,
    },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  console.log('AppSidebar: Menu items:', menuItems);
  console.log('AppSidebar: Admin routes:', ROUTES.admin);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          <span className="font-semibold group-data-[collapsible=icon]:hidden">
          Codexa Classes
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    onClick={() => console.log('Sidebar navigation clicked:', item.title, item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}