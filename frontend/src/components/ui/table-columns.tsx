import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import dayjs from "dayjs"

// Generic column types
export interface BaseColumn {
  id: string;
  header: React.ReactNode | (() => React.ReactNode);
  cell: (props: { row: { getValue: (key: string) => any; original: any } }) => React.ReactNode;
}

// Common column patterns
export const createTextColumn = (
  id: string,
  header: string,
  maxWidth?: number
): BaseColumn => ({
  id,
  header,
  cell: ({ row }) => (
    <div className={`font-medium ${maxWidth ? `max-w-[${maxWidth}px] truncate` : ''}`}>
      {row.getValue(id)}
    </div>
  ),
});

export const createDescriptionColumn = (
  id: string,
  header: string,
  maxWidth: number = 200
): BaseColumn => ({
  id,
  header,
  cell: ({ row }) => (
    <div className={`text-muted-foreground max-w-[${maxWidth}px] truncate`}>
      {row.getValue(id)}
    </div>
  ),
});

export const createBadgeColumn = (
  id: string,
  header: string,
  variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'secondary'
): BaseColumn => ({
  id,
  header,
  cell: ({ row }) => (
    <Badge variant={variant}>{row.getValue(id)}</Badge>
  ),
});

export const createPriorityColumn = (
  id: string,
  header: string
): BaseColumn => ({
  id,
  header,
  cell: ({ row }) => {
    const priority = row.getValue(id);
    const variant = priority === 'high' ? 'destructive' : priority === 'medium' ? 'default' : 'secondary';
    return <Badge variant={variant}>{priority}</Badge>;
  },
});

export const createStatusColumn = (
  id: string,
  header: string
): BaseColumn => ({
  id,
  header,
  cell: ({ row }) => {
    const status = row.getValue(id);
    const variant = status === 'approved' ? 'default' : status === 'rejected' ? 'destructive' : 'secondary';
    return <Badge variant={variant}>{status}</Badge>;
  },
});

export const createDateColumn = (
  id: string,
  header: string,
  options?: {
    format?: string;
    showTime?: boolean;
  }
): ColumnDef<any> => ({
  id,
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {header}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    )
  },
  cell: ({ row }) => {
    const date = row.getValue(id)
    if (!date) return "Not specified"
    
    const format = options?.format || "DD MMM YYYY"
    return dayjs(date).format(format)
  },
  sortingFn: "datetime",
})

export const createActionsColumn = (
  id: string = 'actions',
  header: string = 'Actions',
  actions: Array<{ label: string; onClick?: () => void; variant?: 'default' | 'destructive' }> = []
): BaseColumn => ({
  id,
  header,
  cell: ({ row }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className={action.variant === 'destructive' ? 'text-red-600' : ''}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ),
});

// Utility function to create common action sets
export const createCommonActions = () => [
  { label: 'View details' },
  { label: 'Edit' },
  { label: 'Delete', variant: 'destructive' as const },
];
