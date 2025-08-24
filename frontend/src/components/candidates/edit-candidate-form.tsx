"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, Save, Loader2, CalendarIcon } from "lucide-react";
import { CreateCandidateData, candidatesService } from "@/lib/services/candidatesService";
import { Candidate } from "@/components/candidates/candidates-columns";
import { ROUTES } from "@/lib/constants";
import { Home } from "lucide-react";
import { FormHeader, PasswordInput, FormLayout } from "@/components/forms";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface EditCandidateFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function EditCandidateForm({
  onCancel,
  onSuccess,
}: EditCandidateFormProps) {
  const params = useParams();
  const candidateId = params?.id as string;
  
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
    jobAdmission: false,
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

  useEffect(() => {
    const loadCandidate = async () => {
      console.log('EditCandidateForm: Loading candidate with ID:', candidateId);
      
      if (!candidateId) {
        setError("No candidate ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const candidateData = candidatesService.getCandidateById(candidateId);
        console.log('EditCandidateForm: Loaded candidate data:', candidateData);
        
        if (!candidateData) {
          setError("Candidate not found");
          setIsLoading(false);
          return;
        }

        setCandidate(candidateData);
        setFormData({
          fullName: candidateData.fullName || "",
          email: candidateData.email || "",
          phoneNumber: candidateData.phoneNumber || "",
          address: candidateData.address || "",
          pincode: candidateData.pincode || "",
          password: candidateData.password || "",
          course: candidateData.course || "",
          joiningDate: candidateData.joiningDate || undefined,
          feesTransactionNumber: candidateData.feesTransactionNumber || "",
          jobAdmission: candidateData.jobAdmission || false,
          profileTitle: candidateData.profileTitle || "",
          currentJobStatus: candidateData.currentJobStatus || "employed",
          primarySkills: candidateData.primarySkills || [],
          skillProficiencyLevel: candidateData.skillProficiencyLevel || "intermediate",
          preferredJobType: candidateData.preferredJobType || "full-time",
          expectedSalary: candidateData.expectedSalary || "",
          status: candidateData.status || "pending",
          priority: candidateData.priority || "medium",
        });
        console.log('EditCandidateForm: Form data set:', formData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading candidate:", error);
        setError("Failed to load candidate data");
        setIsLoading(false);
      }
    };

    loadCandidate();
  }, [candidateId]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!candidateId) {
        throw new Error("No candidate ID");
      }

      // Update the candidate
      const updatedCandidate = candidatesService.updateCandidate(candidateId, formData);
      
      if (!updatedCandidate) {
        throw new Error("Failed to update candidate");
      }

      // Show success toast
      setToastMessage("Candidate updated successfully!");
      setToastType("success");
      setShowToast(true);

      // Redirect after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error) {
      console.error("Error updating candidate:", error);
      setToastMessage("Failed to update candidate. Please try again.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateCandidateData, value: string | string[] | Date | boolean) => {
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
    formData.password?.trim()
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading candidate...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onCancel} size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Candidates
          </Button>
        </div>
        
        <div className="text-center space-y-4">
          <div className="text-red-500 text-lg font-medium">{error}</div>
          <Button onClick={onCancel} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return null;
  }

  return (
    <FormLayout
      breadcrumbItems={[
        {
          href: ROUTES.admin.dashboard,
          label: "Dashboard",
          icon: <Home className="h-4 w-4" />,
        },
        { href: ROUTES.admin.candidates, label: "Candidates" },
        { label: "Edit" },
      ]}
      header={
        <FormHeader
          title="Edit Candidate"
          onCancel={onCancel}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
          submitButtonText="Update"
          submitButtonIcon={<Save className="mr-2 h-4 w-4" />}
          loadingText="Updating..."
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

          {/* Job Admission - Only available for editing existing candidates */}
          <div>
            <Label htmlFor="jobAdmission" className="mb-2 block">
              Job Admission Status
            </Label>
            <Select
              value={formData.jobAdmission ? "1" : "0"}
              onValueChange={(value) => handleInputChange("jobAdmission", value === "1")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select admission status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Not Admitted</SelectItem>
                <SelectItem value="1">Admitted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </FormLayout>
  );
}
