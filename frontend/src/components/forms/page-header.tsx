import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  actionButton?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export function PageHeader({
  title,
  onBack,
  actionButton,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Back</span>
      </Button>
      
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      
      {actionButton && (
        <Button onClick={actionButton.onClick}>
          {actionButton.icon || <Plus className="h-4 w-4" />}
          <span className="hidden sm:inline">{actionButton.text}</span>
        </Button>
      )}
    </div>
  );
}
