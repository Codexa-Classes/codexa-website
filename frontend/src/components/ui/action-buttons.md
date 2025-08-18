# ActionButtons Component

A reusable component that provides consistent action buttons (View, Edit, Delete) for data tables and lists.

## Features

- **Consistent Styling**: Same look and feel across all instances
- **Flexible Sizing**: Supports `sm`, `default`, and `lg` sizes
- **Configurable Actions**: Show/hide individual buttons as needed
- **Type Safe**: Full TypeScript support
- **Accessible**: Proper ARIA labels and keyboard navigation

## Usage

### Basic Usage

```tsx
import { ActionButtons } from '@/components/ui/action-buttons';

<ActionButtons
  id={item.id}
  basePath="/admin/items"
  onDelete={handleDelete}
/>
```

### With Custom Size

```tsx
<ActionButtons
  id={item.id}
  basePath="/admin/items"
  onDelete={handleDelete}
  size="lg"
/>
```

### Hide Specific Actions

```tsx
<ActionButtons
  id={item.id}
  basePath="/admin/items"
  onDelete={handleDelete}
  showView={false}
  showEdit={false}
  showDelete={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string \| number` | Required | Unique identifier for the item |
| `basePath` | `string` | Required | Base URL path for view/edit links |
| `onDelete` | `(id: any) => void` | Required | Function to handle delete action |
| `size` | `'sm' \| 'default' \| 'lg'` | `'sm'` | Button size variant |
| `showView` | `boolean` | `true` | Whether to show the view button |
| `showEdit` | `boolean` | `true` | Whether to show the edit button |
| `showDelete` | `boolean` | `true` | Whether to show the delete button |

## Styling

The component uses consistent color schemes:
- **View Button**: Blue theme (`text-blue-600`, `bg-blue-50`)
- **Edit Button**: Orange theme (`text-orange-600`, `bg-orange-50`)
- **Delete Button**: Red theme (`text-red-600`, `bg-red-50`)

## Examples

### In Data Table Columns

```tsx
export const createColumns = (handleDelete: (id: string) => void) => [
  // ... other columns
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <ActionButtons
        id={row.original.id}
        basePath="/admin/courses"
        onDelete={handleDelete}
      />
    ),
  },
];
```

### In List Items

```tsx
{courses.map(course => (
  <div key={course.id} className="flex items-center justify-between">
    <span>{course.name}</span>
    <ActionButtons
      id={course.id}
      basePath="/admin/courses"
      onDelete={handleDeleteCourse}
    />
  </div>
))}
```

## Migration from Individual Buttons

Replace repeated button code:

```tsx
// Before (repeated code)
<div className="flex items-center justify-center gap-2">
  <Button variant="ghost" size="sm" asChild className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 w-8 h-8 p-0">
    <Link href={`/admin/courses/${course.id}`}>
      <Eye className="h-4 w-4" />
    </Link>
  </Button>
  <Button variant="ghost" size="sm" asChild className="text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 w-8 h-8 p-0">
    <Link href={`/admin/courses/${course.id}/edit`}>
      <Edit className="h-4 w-4" />
    </Link>
  </Button>
  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 w-8 h-8 p-0" onClick={() => handleDelete(course.id)}>
    <Trash2 className="h-4 w-4" />
  </Button>
</div>

// After (clean and reusable)
<ActionButtons
  id={course.id}
  basePath="/admin/courses"
  onDelete={handleDelete}
/>
```
