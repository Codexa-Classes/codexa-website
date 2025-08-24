"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, Save, UserPlus, CalendarIcon } from "lucide-react";
import { CreateCandidateData } from "@/lib/services/candidatesService";
import { Toast } from "@/components/ui/toast";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ROUTES } from "@/lib/constants";
import { Home } from "lucide-react";
import { FormHeader, PasswordInput, FormLayout } from "@/components/forms";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface AddCandidateFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function AddCandidateForm({
  onCancel,
  onSuccess,
}: AddCandidateFormProps) {
  const [formData, setFormData] = useState<CreateCandidateData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    pincode: "",
    password: "",
    course: "",
    joiningDate: undefined,
    feesTransactionNumber: "",
    profileTitle: "",
    currentJobStatus: "employed",
    primarySkills: [],
    skillProficiencyLevel: "intermediate",
    preferredJobType: "full-time",
    expectedSalary: "",
    status: "pending",
    priority: "medium",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    setIsSubmitting(true);

    try {
      // Import the service dynamically to avoid SSR issues
      const { candidatesService } = await import(
        "@/lib/services/candidatesService"
      );

      // Create the candidate
      candidatesService.createCandidate(formData);

      // Show success toast
      setToastMessage("Candidate created successfully!");
      setToastType("success");
      setShowToast(true);

      // Redirect after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error) {
      console.error("Error creating candidate:", error);
      setToastMessage("Failed to create candidate. Please try again.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateCandidateData, value: string | string[] | Date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = Boolean(
    formData.fullName?.trim() &&
    formData.email?.trim() &&
    formData.phoneNumber?.trim() &&
    formData.address?.trim() &&
    formData.pincode?.trim() &&
    formData.password?.trim()
  );

  return (
    <FormLayout
      breadcrumbItems={[
        {
          href: ROUTES.admin.dashboard,
          label: "Dashboard",
          icon: <Home className="h-4 w-4" />,
        },
        { href: ROUTES.admin.candidates, label: "Candidates" },
        { label: "Add New" },
      ]}
      header={
        <FormHeader
          title="Add New Candidate"
          onCancel={onCancel}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
          submitButtonText="Create"
          submitButtonIcon={<Save className="mr-2 h-4 w-4" />}
          loadingText="Creating..."
        />
      }
      showToast={showToast}
      toastMessage={toastMessage}
      toastType={toastType}
      onToastClose={() => setShowToast(false)}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Name */}
          <div>
            <Label htmlFor="fullName" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Full Name
            </Label>
            <Input
              id="fullName"
              placeholder="Enter candidate's full name"
              value={formData.fullName || ""}
              onChange={(e) =>
                handleInputChange("fullName", e.target.value)
              }
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="gender" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Gender
            </Label>
            <Select
              value={formData.gender || ""}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phoneNumber" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={formData.phoneNumber || ""}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow digits and limit to 10 characters
                if (/^\d{0,10}$/.test(value)) {
                  handleInputChange("phoneNumber", value);
                }
              }}
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              title="Phone number must be 10 digits starting with 6, 7, 8, or 9"
              required
            />
            {formData.phoneNumber &&
              formData.phoneNumber.length === 10 &&
              !/^[6-9]/.test(formData.phoneNumber) && (
                <p className="text-red-500 text-xs mt-1">
                  Phone number must start with 6, 7, 8, or 9
                </p>
              )}
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Address
            </Label>
            <Input
              id="address"
              placeholder="Enter address"
              value={formData.address || ""}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
          </div>

          {/* Pincode */}
          <div>
            <Label htmlFor="pincode" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Pincode
            </Label>
            <Input
              id="pincode"
              type="text"
              placeholder="Enter pincode"
              value={formData.pincode || ""}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow digits and limit to 6 characters (standard pincode length)
                if (/^\d{0,6}$/.test(value)) {
                  handleInputChange("pincode", value);
                }
              }}
              maxLength={6}
              pattern="[0-9]{6}"
              title="Pincode must be 6 digits"
              required
            />
          </div>

          {/* Password */}
          <PasswordInput
            id="password"
            label="Password"
            value={formData.password || ""}
            onChange={(value) => handleInputChange("password", value)}
            placeholder="Enter password"
            required
          />

          {/* Course */}
          <div>
            <Label htmlFor="course" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Course
            </Label>
            <Select
              value={formData.course || ""}
              onValueChange={(value) => handleInputChange("course", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="mobile-development">Mobile Development</SelectItem>
                <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                <SelectItem value="ai-ml">AI/ML</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Joining Date */}
          <div>
            <Label htmlFor="joiningDate" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Joining Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.joiningDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.joiningDate ? (
                    dayjs(formData.joiningDate).format("DD MMM YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.joiningDate}
                  onSelect={(date) => {
                    if (date) {
                      handleInputChange("joiningDate", date);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Fees Transaction Number */}
          <div>
            <Label htmlFor="feesTransactionNumber" className="mb-2 block">
              <span className="text-red-500 mr-1">*</span>Fees Transaction Number
            </Label>
            <Input
              id="feesTransactionNumber"
              placeholder="Enter transaction number"
              value={formData.feesTransactionNumber || ""}
              onChange={(e) =>
                handleInputChange("feesTransactionNumber", e.target.value)
              }
              required
            />
          </div>

          {/* Date of Birth - moved to end as it's not in the main sequence */}
          <div>
            <Label htmlFor="dateOfBirth" className="mb-2 block">
              Date of Birth
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dateOfBirth && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateOfBirth ? (
                    dayjs(formData.dateOfBirth).format("DD MMM YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dateOfBirth}
                  onSelect={(date) => {
                    if (date) {
                      handleInputChange("dateOfBirth", date);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </form>
    </FormLayout>
  );
}
