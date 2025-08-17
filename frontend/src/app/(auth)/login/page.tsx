'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { validateUser } from '@/lib/auth/fakeUsers';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { ModeToggle } from '@/components/mode-toggle';
import { Eye, EyeOff } from 'lucide-react';
import { SocialMediaIcons, defaultSocialMediaLinks } from '@/components/SocialMediaIcons';
import { Logo } from '@/components/Logo';


export default function LoginPage() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, user, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        router.push(ROUTES.admin.dashboard);
      } else {
        router.push(ROUTES.user.dashboard);
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = validateUser(mobile, password);
      
      if (user) {
        login(user);
        
        if (user.role === 'admin') {
          router.push(ROUTES.admin.dashboard);
        } else {
          router.push(ROUTES.user.dashboard);
        }
      } else {
        setError('Invalid mobile number or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking authentication
  if (isAuthenticated === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Theme Toggle in Top Right */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      
      <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <Logo size="md" showLink={false} />
          </div>
          <CardDescription className="text-center dark:text-gray-400">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile" className="dark:text-gray-200">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 text-center">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            <p className="text-center font-medium">Demo Users:</p>
            <div className="mt-2 space-y-1 text-xs">
              <p><strong>Admin:</strong> 7972908961 / 12345</p>
              <p><strong>User:</strong> 8308377302 / 12345</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Links */}
      <div className="mt-6 text-center">
        <nav className="space-y-3">
          <div className="flex flex-row justify-center space-x-10">
            <a 
              href="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200 text-sm"
            >
              Home
            </a>
            <a 
              href="/about" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200 text-sm"
            >
              About
            </a>
            <a 
              href="/courses" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200 text-sm"
            >
              Courses
            </a>
            <a 
              href="/super10" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200 text-sm"
            >
              Super10
            </a>
            <a 
              href="/contact" 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200 text-sm"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>

      {/* Social Media Icons */}
      <SocialMediaIcons links={defaultSocialMediaLinks} gap={65} />
    </div>
  );
}