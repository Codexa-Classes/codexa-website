'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Users,
  Briefcase,
  User,
  Home,
  Building2,
  FileText,
  LogOut,
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

// Changed from "Sidebar" to "AppSidebar"
export const AppSidebar = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
  };

  const adminNavItems = [
    {
      title: 'Dashboard',
      href: ROUTES.admin.dashboard,
      icon: Home,
      description: 'Admin overview',
    },
    {
      title: 'Candidates',
      href: ROUTES.admin.candidates,
      icon: Users,
      description: 'Manage candidates',
    },
    {
      title: 'Jobs',
      href: ROUTES.admin.jobs,
      icon: Briefcase,
      description: 'Manage job postings',
    },
    {
      title: 'Company',
      href: '/admin/company',
      icon: Building2,
      description: 'Company settings',
    },
  ];

  const userNavItems = [
    {
      title: 'Dashboard',
      href: ROUTES.user.dashboard,
      icon: Home,
      description: 'User overview',
    },
    {
      title: 'Browse Jobs',
      href: ROUTES.user.jobs,
      icon: Briefcase,
      description: 'Find job opportunities',
    },
    {
      title: 'My Profile',
      href: ROUTES.user.profile,
      icon: User,
      description: 'Profile information',
    },
    {
      title: 'Applications',
      href: '/user/applications',
      icon: FileText,
      description: 'My job applications',
    },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-lg">Codexa Classes</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>User Info</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center space-x-3 px-4 py-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role} • {user?.type}
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};