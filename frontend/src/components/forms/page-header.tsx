import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Filter, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  label: string;
  value: string;
  options?: FilterOption[];
  onChange: (value: string) => void;
  type?: 'select' | 'search';
  placeholder?: string;
}

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  actionButton?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  filters?: FilterConfig[];
}

export function PageHeader({
  title,
  onBack,
  actionButton,
  filters,
}: PageHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Main header row */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>
        
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        
        {actionButton && (
          <Button 
            onClick={actionButton.onClick}
            className={actionButton.text.toLowerCase().includes('create') ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            {actionButton.icon || <Plus className="h-4 w-4" />}
            <span className="hidden sm:inline">{actionButton.text}</span>
          </Button>
        )}
      </div>

      {/* Filters row - right aligned */}
      {filters && filters.length > 0 && (
        <div className="flex items-center justify-end gap-4 flex-wrap">
          {filters.map((filter, index) => (
            <div key={index} className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">
                {filter.label}:
              </label>
              {filter.type === 'search' ? (
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={filter.placeholder || "Search..."}
                    value={filter.value}
                    onChange={(e) => filter.onChange(e.target.value)}
                    className="w-[200px] h-8 pl-8"
                  />
                </div>
              ) : (
                <Select value={filter.value} onValueChange={filter.onChange}>
                  <SelectTrigger className="w-[140px] h-8">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
