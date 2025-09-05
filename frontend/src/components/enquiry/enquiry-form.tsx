"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { firestoreEnquiryService } from '@/lib/services/enquiry/firestoreEnquiryService';
import { CreateEnquiryData } from '@/types/enquiry';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Mobile number must start with 6, 7, 8, or 9 and be exactly 10 digits'),
  email: z.string().email('Please enter a valid email address'),
  passOutYear: z.number().min(2000).max(new Date().getFullYear() + 1, 'Please enter a valid year'),
  technology: z.array(z.string()).min(1, 'Please select at least one technology')
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const technologyOptions = [
  'Full Stack Development',
  'Web Development',
  'Business Analyst',
  'Data Analyst',
  'DevOps Engineer',
  'Database Admin',
  'App Support',
  'Others'
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 18 }, (_, i) => 2027 - i);

// reCAPTCHA configuration
const RECAPTCHA_SITE_KEY = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY 
  : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key for development

// Add a check to ensure the key is present in production
if (process.env.NODE_ENV === 'production' && !RECAPTCHA_SITE_KEY) {
  console.error('ERROR: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set in production environment. reCAPTCHA will likely fail.');
}

// Debug logging
console.log('reCAPTCHA Site Key:', RECAPTCHA_SITE_KEY);
console.log('Environment:', process.env.NODE_ENV);
console.log('Raw env var:', process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

export function EnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTechnologyOpen, setIsTechnologyOpen] = useState(false);
  const [otherTechnology, setOtherTechnology] = useState('');
  const [activeToasts, setActiveToasts] = useState<Set<string>>(new Set());
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [recaptchaRef, setRecaptchaRef] = useState<ReCAPTCHA | null>(null);

  // Helper function to show deduplicated toasts
  const showToast = (type: 'error' | 'warning', title: string, description: string) => {
    const toastKey = `${type}-${title}-${description}`;
    
    // If this exact toast is already active, don't show another one
    if (activeToasts.has(toastKey)) {
      return;
    }
    
    // Show new toast
    toast[type](title, {
      description,
      duration: 2000,
    });
    
    // Add to active toasts
    setActiveToasts(prev => new Set(prev).add(toastKey));
    
    // Remove from active toasts after duration
    setTimeout(() => {
      setActiveToasts(prev => {
        const newSet = new Set(prev);
        newSet.delete(toastKey);
        return newSet;
      });
    }, 2000);
  };

  // reCAPTCHA handlers
  const onRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const onRecaptchaError = () => {
    showToast("error", "reCAPTCHA Error", "Please refresh the page and try again");
  };

  const onRecaptchaExpired = () => {
    setRecaptchaValue(null);
    showToast("warning", "reCAPTCHA Expired", "Please complete the verification again");
  };

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
      technology: []
    }
  });

  // Watch form values for conditional submit button
  const watchedValues = watch();

  // Check if form is valid for submit button
  const isFormValid = () => {
    const { name, mobile, email, passOutYear, technology } = watchedValues;
    
    // Check if all required fields are filled
    const hasRequiredFields = name?.trim() && 
                             mobile?.trim() && 
                             email?.trim() && 
                             passOutYear && 
                             technology?.length > 0;
    
    // Check if mobile is exactly 10 digits
    const isMobileValid = mobile && /^[6-9]\d{9}$/.test(mobile);
    
    // Check if email format is valid
    const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    // Check if name is at least 2 characters
    const isNameValid = name && name.trim().length >= 2;
    
    // Check if technology selection is valid
    const isTechnologyValid = technology && technology.length > 0;
    
    // If "Others" is selected, check if otherTechnology is provided
    const isOthersValid = !technology?.includes('Others') || 
                         (technology?.includes('Others') && otherTechnology.trim());
    
    // Check if reCAPTCHA is completed
    const isRecaptchaValid = recaptchaValue !== null;
    
    return hasRequiredFields && 
           isMobileValid && 
           isEmailValid && 
           isNameValid && 
           isTechnologyValid && 
           isOthersValid &&
           isRecaptchaValid;
  };

  const onSubmit = async (data: CreateEnquiryData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Verify reCAPTCHA
      if (!recaptchaValue) {
        showToast("error", "Verification Required", "Please complete the reCAPTCHA verification");
        return;
      }
      // Check for duplicate submissions
      const isDuplicate = await firestoreEnquiryService.checkDuplicateEnquiry(data.email, data.mobile);
      if (isDuplicate) {
        setSubmitStatus('error');
        setErrorMessage('An enquiry with this email or mobile number already exists. Please use different contact details.');
        return;
      }

      // Handle "Others" technology with custom text
      const finalTechnology = [...data.technology];
      if (data.technology.includes('Others') && otherTechnology.trim()) {
        // Replace "Others" with the custom technology text
        const othersIndex = finalTechnology.indexOf('Others');
        finalTechnology[othersIndex] = otherTechnology.trim();
      }

      // Create enquiry data with processed technology
      const enquiryData = {
        ...data,
        technology: finalTechnology
      };

      // Submit to Firestore
      const newEnquiry = await firestoreEnquiryService.createEnquiry(enquiryData);
      console.log('Enquiry created:', newEnquiry);
      
      setSubmitStatus('success');
      reset();
      setOtherTechnology('');
      setRecaptchaValue(null);
      recaptchaRef?.reset();
      
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

  const handleYearChange = (value: string) => {
    setValue('passOutYear', parseInt(value));
  };

  // Close dropdown when clicking outside




  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="w-full">

      <CardContent className="pt-6 pb-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Course Enquiry
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interested in our technology courses? Fill out the form below and our team will get back to you with detailed course information, pricing, and enrollment details.
            </p>
          </div>
        </CardContent>
        <CardContent>
          {submitStatus === 'success' && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Thank you! Your enquiry has been submitted successfully. We&apos;ll contact you soon.
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
                <Label htmlFor="name"><span className="text-red-500">*</span> Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                                     onKeyDown={(e) => {
                     // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
                     if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
                         // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                         (e.keyCode === 65 && e.ctrlKey === true) ||
                         (e.keyCode === 67 && e.ctrlKey === true) ||
                         (e.keyCode === 86 && e.ctrlKey === true) ||
                         (e.keyCode === 88 && e.ctrlKey === true)) {
                       return;
                     }
                     // Allow only letters and spaces
                     if (!/^[a-zA-Z\s]$/.test(e.key)) {
                       e.preventDefault();
                       showToast("error", "Invalid Input", "Name can only contain letters and spaces");
                     }
                   }}
                  onInput={(e) => {
                    // Remove any non-letter characters except spaces
                    const value = e.currentTarget.value.replace(/[^a-zA-Z\s]/g, '');
                    e.currentTarget.value = value;
                    setValue('name', value);
                  }}
                  onPaste={(e) => {
                    const pastedText = e.clipboardData.getData('text');
                    if (!/^[a-zA-Z\s]*$/.test(pastedText)) {
                      showToast("warning", "Invalid Content Pasted", "Only letters and spaces are allowed in the name field");
                    }
                  }}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Mobile Field */}
              <div className="space-y-2">
                <Label htmlFor="mobile"><span className="text-red-500">*</span> Mobile Number</Label>
                <Input
                  id="mobile"
                  placeholder="Enter your 10-digit mobile number"
                  {...register('mobile')}
                  className={errors.mobile ? 'border-red-500' : ''}
                  maxLength={10}
                                     onKeyDown={(e) => {
                     // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
                     if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
                         // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                         (e.keyCode === 65 && e.ctrlKey === true) ||
                         (e.keyCode === 67 && e.ctrlKey === true) ||
                         (e.keyCode === 86 && e.ctrlKey === true) ||
                         (e.keyCode === 88 && e.ctrlKey === true)) {
                       return;
                     }
                     // Only allow digits 6-9
                     if (!/^[6-9]$/.test(e.key)) {
                       e.preventDefault();
                       showToast("error", "Invalid Mobile Number", "Mobile number must start with 6, 7, 8, or 9");
                     }
                   }}
                  onInput={(e) => {
                    // Remove any non-digit characters and only keep 6-9
                    const value = e.currentTarget.value.replace(/[^6-9]/g, '');
                    e.currentTarget.value = value;
                    setValue('mobile', value);
                  }}
                  onPaste={(e) => {
                    const pastedText = e.clipboardData.getData('text');
                    if (!/^[6-9]*$/.test(pastedText)) {
                      showToast("warning", "Invalid Mobile Number Pasted", "Mobile number must only contain digits 6, 7, 8, or 9");
                    }
                  }}
                />
                {errors.mobile && (
                  <p className="text-sm text-red-600">{errors.mobile.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email"><span className="text-red-500">*</span> Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                                     onKeyDown={(e) => {
                     // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
                     if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
                         // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                         (e.keyCode === 65 && e.ctrlKey === true) ||
                         (e.keyCode === 67 && e.ctrlKey === true) ||
                         (e.keyCode === 86 && e.ctrlKey === true) ||
                         (e.keyCode === 88 && e.ctrlKey === true)) {
                       return;
                     }
                     // Allow letters, numbers, @, ., -, and _
                     if (!/^[a-zA-Z0-9@._-]$/.test(e.key)) {
                       e.preventDefault();
                       showToast("error", "Invalid Email Character", "Email can only contain letters, numbers, @, ., -, and _");
                     }
                   }}
                  onInput={(e) => {
                    // Remove any invalid email characters
                    const value = e.currentTarget.value.replace(/[^a-zA-Z0-9@._-]/g, '');
                    e.currentTarget.value = value;
                    setValue('email', value);
                  }}
                  onPaste={(e) => {
                    const pastedText = e.clipboardData.getData('text');
                    if (!/^[a-zA-Z0-9@._-]*$/.test(pastedText)) {
                      showToast("warning", "Invalid Email Pasted", "Email can only contain letters, numbers, @, ., -, and _");
                    }
                  }}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

              {/* Row 2: Pass Out Year, Technology Interest, and Others Input */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pass Out Year Field */}
              <div className="space-y-2">
                <Label htmlFor="passOutYear"><span className="text-red-500">*</span> Pass Out Year</Label>
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
                <Label htmlFor="technology"><span className="text-red-500">*</span> Technology Interest</Label>
                <DropdownMenu open={isTechnologyOpen} onOpenChange={setIsTechnologyOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isTechnologyOpen}
                      className={`w-full justify-between ${errors.technology ? 'border-red-500' : ''}`}
                    >
                      {watch('technology')?.length > 0 
                        ? `${watch('technology')?.length} technology${watch('technology')?.length === 1 ? 'y' : 'ies'} selected`
                        : 'Select your technology interests'
                      }
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full min-w-[200px] max-h-60 overflow-auto">
                    {technologyOptions.map((tech) => (
                      <div key={tech} className="flex items-center space-x-2 px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={watch('technology')?.includes(tech) || false}
                          onChange={(e) => {
                            const currentTechs = watch('technology') || [];
                            if (e.target.checked) {
                              const newTechs = [...currentTechs, tech];
                              setValue('technology', newTechs);
                            } else {
                              const newTechs = currentTechs.filter(t => t !== tech);
                              setValue('technology', newTechs);
                              if (tech === 'Others') {
                                setOtherTechnology('');
                              }
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm">{tech}</span>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {errors.technology && (
                  <p className="text-sm text-red-600">{errors.technology.message}</p>
                )}
              </div>

              {/* Others Technology Input - Only shows when "Others" is selected */}
              {(watch('technology')?.includes('Others') || false) && (
                <div className="space-y-2">
                  <Label htmlFor="otherTechnology">Other Technology</Label>
                  <Input
                    id="otherTechnology"
                    placeholder="Specify other technology"
                    value={otherTechnology}
                    onChange={(e) => setOtherTechnology(e.target.value)}
                    className="w-full"
                                         onKeyDown={(e) => {
                       // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
                       if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
                           // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                           (e.keyCode === 65 && e.ctrlKey === true) ||
                           (e.keyCode === 67 && e.ctrlKey === true) ||
                           (e.keyCode === 86 && e.ctrlKey === true) ||
                           (e.keyCode === 88 && e.ctrlKey === true)) {
                         return;
                       }
                       // Allow letters, numbers, spaces, and common tech symbols
                       if (!/^[a-zA-Z0-9\s&+.-]$/.test(e.key)) {
                         e.preventDefault();
                         showToast("error", "Invalid Technology Name", "Technology name can only contain letters, numbers, spaces, and symbols: & + . -");
                       }
                     }}
                    onInput={(e) => {
                      // Remove any invalid characters
                      const value = e.currentTarget.value.replace(/[^a-zA-Z0-9\s&+.-]/g, '');
                      e.currentTarget.value = value;
                      setOtherTechnology(value);
                    }}
                    onPaste={(e) => {
                      const pastedText = e.clipboardData.getData('text');
                      if (!/^[a-zA-Z0-9\s&+.-]*$/.test(pastedText)) {
                        showToast("warning", "Invalid Technology Name Pasted", "Technology name can only contain letters, numbers, spaces, and symbols: & + . -");
                      }
                    }}
                  />
                </div>
              )}
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={(ref: ReCAPTCHA | null) => setRecaptchaRef(ref)}
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={onRecaptchaChange}
                onErrored={onRecaptchaError}
                onExpired={onRecaptchaExpired}
                theme="light"
                size="normal"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
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
