"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { enquiryService } from '@/lib/services/enquiry/enquiryService';
import { CreateEnquiryData } from '@/types/enquiry';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Mobile number must start with 6, 7, 8, or 9 and be exactly 10 digits'),
  email: z.string().email('Please enter a valid email address'),
  passOutYear: z.number().min(2000).max(new Date().getFullYear() + 1, 'Please enter a valid year'),
  technology: z.string().min(1, 'Please select a technology')
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const technologyOptions = [
  'Full Stack Development',
  'Frontend Development',
  'Backend Development',
  'Mobile App Development',
  'Data Science & Analytics',
  'Machine Learning & AI',
  'DevOps & Cloud Computing',
  'Cybersecurity',
  'Database Management',
  'UI/UX Design',
  'Digital Marketing',
  'Other'
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 25 }, (_, i) => currentYear - i + 1);

export function EnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      passOutYear: currentYear,
      technology: ''
    }
  });

  const onSubmit = async (data: CreateEnquiryData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEnquiry = enquiryService.createEnquiry(data);
      console.log('Enquiry created:', newEnquiry);
      
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTechnologyChange = (value: string) => {
    setValue('technology', value);
  };

  const handleYearChange = (value: string) => {
    setValue('passOutYear', parseInt(value));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Course Enquiry Form</CardTitle>
          <CardDescription>
            Fill out the form below and we'll get back to you with course details and enrollment information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitStatus === 'success' && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Thank you! Your enquiry has been submitted successfully. We'll contact you soon.
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === 'error' && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Row 1: Name, Mobile, Email */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Mobile Field */}
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  placeholder="Enter your 10-digit mobile number"
                  {...register('mobile')}
                  className={errors.mobile ? 'border-red-500' : ''}
                />
                {errors.mobile && (
                  <p className="text-sm text-red-600">{errors.mobile.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: Pass Out Year, Technology */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pass Out Year Field */}
              <div className="space-y-2">
                <Label htmlFor="passOutYear">Pass Out Year *</Label>
                <Select onValueChange={handleYearChange} defaultValue={currentYear.toString()}>
                  <SelectTrigger className={`w-full ${errors.passOutYear ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select your pass out year" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.passOutYear && (
                  <p className="text-sm text-red-600">{errors.passOutYear.message}</p>
                )}
              </div>

              {/* Technology Field */}
              <div className="space-y-2">
                <Label htmlFor="technology">Technology Interest *</Label>
                <Select onValueChange={handleTechnologyChange} defaultValue="">
                  <SelectTrigger className={`w-full ${errors.technology ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select your technology interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {technologyOptions.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.technology && (
                  <p className="text-sm text-red-600">{errors.technology.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Enquiry'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>By submitting this form, you agree to receive communications from Codexa Classes.</p>
            <p className="mt-1">We respect your privacy and will never share your information with third parties.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
