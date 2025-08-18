import React from 'react';
import Link from 'next/link';
import { Button } from './button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

interface ActionButtonsProps {
  id: string | number;
  basePath: string;
  onDelete: (id: any) => void;
  size?: 'sm' | 'default' | 'lg';
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  getViewRoute?: (id: string | number) => string;
  deleteConfirmTitle?: string;
  deleteConfirmDescription?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  id,
  basePath,
  onDelete,
  size = 'sm',
  showView = true,
  showEdit = true,
  showDelete = true,
  getViewRoute,
  deleteConfirmTitle = 'Are you absolutely sure?',
  deleteConfirmDescription = 'This action cannot be undone. This will permanently delete this item.',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 p-0',
    default: 'w-9 h-9 p-0',
    lg: 'w-10 h-10 p-0',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    default: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  // Use custom view route function if provided, otherwise fall back to default behavior
  const viewRoute = getViewRoute ? getViewRoute(id) : `${basePath}/${id}`;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {showView && (
        <Button 
          variant="ghost" 
          size={size} 
          asChild 
          className={`text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 ${sizeClasses[size]}`}
        >
          <Link href={viewRoute}>
            <Eye className={iconSizes[size]} />
          </Link>
        </Button>
      )}
      
      {showEdit && (
        <Button 
          variant="ghost" 
          size={size} 
          asChild 
          className={`text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 ${sizeClasses[size]}`}
        >
          <Link href={`${basePath}/${id}/edit`}>
            <Edit className={iconSizes[size]} />
          </Link>
        </Button>
      )}
      
      {showDelete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size={size} 
              className={`text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 ${sizeClasses[size]}`}
            >
              <Trash2 className={iconSizes[size]} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{deleteConfirmTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {deleteConfirmDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};
