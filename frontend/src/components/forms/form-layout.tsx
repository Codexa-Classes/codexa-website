import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Toast } from "@/components/ui/toast";

interface FormLayoutProps {
  breadcrumbItems: Array<{
    href?: string;
    label: string;
    icon?: ReactNode;
  }>;
  header: ReactNode;
  children: ReactNode;
  showToast?: boolean;
  toastMessage?: string;
  toastType?: "success" | "error";
  onToastClose?: () => void;
}

export function FormLayout({
  breadcrumbItems,
  header,
  children,
  showToast = false,
  toastMessage = "",
  toastType = "success",
  onToastClose,
}: FormLayoutProps) {
  return (
    <div className="w-full space-y-4">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      <Card className="w-full">
        <CardHeader>{header}</CardHeader>
        <CardContent>
          {/* Toast Notification */}
          {showToast && (
            <Toast
              message={toastMessage}
              type={toastType}
              onClose={onToastClose}
              className="mt-12"
            />
          )}

          {children}
        </CardContent>
      </Card>
    </div>
  );
}
