'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { PageHeader } from '@/components/forms';
import { 
  ArrowLeft, 
  Save, 
  Edit, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Star,
  Plus,
  X,
  Camera,
  Download,
  Upload,
  Eye,
  EyeOff,
  Shield,
  Globe,
  Calendar,
  Award,
  BookOpen,
  Languages,
  Zap,
  FileText
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  city: string;
  state: string;
  country: string;
  bio: string;
  experience: number;
  education: string;
  currentRole: string;
  desiredRole: string;
  skills: string[];
  languages: Array<{
    language: string;
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  }>;
  certifications: string[];
  availability: 'immediate' | '2-weeks' | '1-month' | '3-months' | 'negotiable';
  workMode: 'on-site' | 'hybrid' | 'remote' | 'flexible';
  expectedSalary: number;
  currency: string;
  resumeUrl?: string;
  profilePicture?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}

export default function UserProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCertification, setNewCertification] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'user') {
      router.push(ROUTES.login);
      return;
    }
    
    // Simulate loading user profile
    setTimeout(() => {
      const mockProfile: UserProfile = {
        id: user.id,
        name: user.name,
        email: 'rajx@example.com',
        phone: '+91 8308377302',
        location: 'Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        bio: 'Experienced frontend developer with 5+ years of experience in React, TypeScript, and modern web technologies. Passionate about creating user-friendly applications and staying up-to-date with industry trends.',
        experience: 5,
        education: 'Bachelor of Engineering in Computer Science',
        currentRole: 'Senior Frontend Developer',
        desiredRole: 'Lead Frontend Developer',
        skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Git', 'AWS'],
        languages: [
          { language: 'English', proficiency: 'fluent' },
          { language: 'Hindi', proficiency: 'native' },
          { language: 'Kannada', proficiency: 'conversational' }
        ],
        certifications: [
          'AWS Certified Developer Associate',
          'React Developer Certification',
          'TypeScript Advanced Certification'
        ],
        availability: '1-month',
        workMode: 'hybrid',
        expectedSalary: 1500000,
        currency: 'INR',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/rajx',
          github: 'https://github.com/rajx',
          portfolio: 'https://rajx.dev'
        }
      };
      
      setProfile(mockProfile);
      setIsLoading(false);
    }, 1000);
  }, [user, router]);

  if (!user || user.role !== 'user') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">Unable to load your profile information.</p>
          <Button onClick={() => router.push(ROUTES.user.dashboard)}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => prev ? {
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      } : null);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile(prev => prev ? {
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    } : null);
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      setProfile(prev => prev ? {
        ...prev,
        languages: [...prev.languages, { language: newLanguage.trim(), proficiency: 'conversational' }]
      } : null);
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (languageToRemove: string) => {
    setProfile(prev => prev ? {
      ...prev,
      languages: prev.languages.filter(lang => lang.language !== languageToRemove)
    } : null);
  };

  const handleAddCertification = () => {
    if (newCertification.trim() && !profile.certifications.includes(newCertification.trim())) {
      setProfile(prev => prev ? {
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      } : null);
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (certToRemove: string) => {
    setProfile(prev => prev ? {
      ...prev,
      certifications: prev.certifications.filter(cert => cert !== certToRemove)
    } : null);
  };

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile(prev => prev ? { ...prev, [field]: value } : null);
  };

  const updateLanguage = (language: string, proficiency: 'basic' | 'conversational' | 'fluent' | 'native') => {
    setProfile(prev => prev ? {
      ...prev,
      languages: prev.languages.map(lang => 
        lang.language === language ? { ...lang, proficiency } : lang
      )
    } : null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PageHeader
            title="My Profile"
            onBack={() => router.push(ROUTES.user.dashboard)}
            actionButton={isEditing ? {
              text: "Save Changes",
              onClick: handleSave,
              icon: <Save className="mr-2 h-4 w-4" />
            } : {
              text: "Edit Profile",
              onClick: () => setIsEditing(true),
              icon: <Edit className="mr-2 h-4 w-4" />
            }}
          />
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  {/* Profile Picture */}
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                      {profile.profilePicture ? (
                        <img 
                          src={profile.profilePicture} 
                          alt="Profile" 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    {isEditing && (
                      <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8">
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => updateProfile('name', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => updateProfile('email', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => updateProfile('phone', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => updateProfile('location', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => updateProfile('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentRole">Current Role</Label>
                    <Input
                      id="currentRole"
                      value={profile.currentRole}
                      onChange={(e) => updateProfile('currentRole', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="desiredRole">Desired Role</Label>
                    <Input
                      id="desiredRole"
                      value={profile.desiredRole}
                      onChange={(e) => updateProfile('desiredRole', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={profile.experience}
                      onChange={(e) => updateProfile('experience', parseInt(e.target.value))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      value={profile.education}
                      onChange={(e) => updateProfile('education', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select 
                      value={profile.availability} 
                      onValueChange={(value) => updateProfile('availability', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="3-months">3 Months</SelectItem>
                        <SelectItem value="negotiable">Negotiable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="workMode">Preferred Work Mode</Label>
                    <Select 
                      value={profile.workMode} 
                      onValueChange={(value) => updateProfile('workMode', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-site">On-Site</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="expectedSalary">Expected Salary (Annual)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="expectedSalary"
                      type="number"
                      value={profile.expectedSalary}
                      onChange={(e) => updateProfile('expectedSalary', parseInt(e.target.value))}
                      disabled={!isEditing}
                    />
                    <Select 
                      value={profile.currency} 
                      onValueChange={(value) => updateProfile('currency', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <Button onClick={handleAddSkill} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {profile.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{lang.language}</span>
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <Select 
                            value={lang.proficiency} 
                            onValueChange={(value) => updateLanguage(lang.language, value as any)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic</SelectItem>
                              <SelectItem value="conversational">Conversational</SelectItem>
                              <SelectItem value="fluent">Fluent</SelectItem>
                              <SelectItem value="native">Native</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant="outline">{lang.proficiency}</Badge>
                        )}
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveLanguage(lang.language)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new language"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
                    />
                    <Button onClick={handleAddLanguage} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span>{cert}</span>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCertification(cert)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new certification"
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCertification()}
                    />
                    <Button onClick={handleAddCertification} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Resume Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.resumeUrl ? (
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">Resume uploaded</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">No resume uploaded</p>
                    <Button className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Resume
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={profile.socialLinks.linkedin || ''}
                    onChange={(e) => updateProfile('socialLinks', { ...profile.socialLinks, linkedin: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={profile.socialLinks.github || ''}
                    onChange={(e) => updateProfile('socialLinks', { ...profile.socialLinks, github: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio</Label>
                  <Input
                    id="portfolio"
                    value={profile.socialLinks.portfolio || ''}
                    onChange={(e) => updateProfile('socialLinks', { ...profile.socialLinks, portfolio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Basic Info</span>
                    <Badge variant="secondary">100%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Skills</span>
                    <Badge variant="secondary">90%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Experience</span>
                    <Badge variant="secondary">85%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Resume</span>
                    <Badge variant="outline">60%</Badge>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
                  <div className="text-sm text-gray-600">Overall Complete</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
