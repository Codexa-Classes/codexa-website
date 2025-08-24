import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

interface FormHeaderProps {
  title: string;
  onCancel: () => void;
  onSubmit: (e?: React.FormEvent) => void | Promise<void>;
  isSubmitting: boolean;
  isFormValid: boolean;
  submitButtonText: string;
  submitButtonIcon?: React.ReactNode;
  loadingText?: string;
}

export function FormHeader({
  title,
  onCancel,
  onSubmit,
  isSubmitting,
  isFormValid,
  submitButtonText,
  submitButtonIcon = <Save className="h-4 w-4" />,
  loadingText = "Processing...",
}: FormHeaderProps) {
  // Determine button variant based on submitButtonText
  const buttonVariant = submitButtonText === "Create" ? "default" : "default";
  const buttonClassName = submitButtonText === "Create" 
    ? "px-2 sm:px-4 bg-green-600 hover:bg-green-700" 
    : "px-2 sm:px-4";

  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onCancel} className="px-2 sm:px-4">
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline ml-2">Back</span>
      </Button>
      
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
      
      <Button 
        onClick={() => onSubmit()}
        disabled={!isFormValid || isSubmitting}
        className={buttonClassName}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="hidden sm:inline ml-2">{loadingText}</span>
          </>
        ) : (
          <>
            {submitButtonIcon}
            <span className="hidden sm:inline ml-2">{submitButtonText}</span>
          </>
        )}
      </Button>
    </div>
  );
}