import React from 'react';
import Link from 'next/link';
import { Button } from './button';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  id: string | number;
  basePath: string;
  onDelete: (id: any) => void;
  size?: 'sm' | 'default' | 'lg';
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  id,
  basePath,
  onDelete,
  size = 'sm',
  showView = true,
  showEdit = true,
  showDelete = true,
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

  return (
    <div className="flex items-center justify-center gap-2">
      {showView && (
        <Button 
          variant="ghost" 
          size={size} 
          asChild 
          className={`text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 ${sizeClasses[size]}`}
        >
          <Link href={`${basePath}/${id}`}>
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
        <Button 
          variant="ghost" 
          size={size} 
          className={`text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 ${sizeClasses[size]}`}
          onClick={() => onDelete(id)}
        >
          <Trash2 className={iconSizes[size]} />
        </Button>
      )}
    </div>
  );
};
