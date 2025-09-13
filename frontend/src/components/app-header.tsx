'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';
import {
  User,
  LogOut,
  ChevronDown,
  Menu,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/mode-toggle';

export function AppHeader() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        {/* Left side - Mobile sidebar toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <SidebarTrigger className="lg:hidden" />
        </div>
        
        {/* Center - can be used for breadcrumbs or other elements */}
        <div className="flex-1" />
        
        {/* Right side - Theme toggle and User dropdown */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-9 px-3 hover:bg-accent"
              >
                <User className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{user.name}</span>
                  <span className={`text-xs uppercase font-semibold ${
                    user.role === 'admin' 
                      ? 'text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full' 
                      : 'text-green-600 bg-green-100 px-2 py-0.5 rounded-full'
                  }`}>
                    {user.role === 'admin' ? 'ADMIN' : 'STUDENT'}
                  </span>
                </div>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href={ROUTES.user.profile} className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={logout}
                className="flex items-center gap-2 text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

