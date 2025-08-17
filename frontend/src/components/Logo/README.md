# Logo Component

A reusable React component for displaying the Codexa Classes logo with customizable sizes and optional linking.

## Features

- **Multiple Sizes**: Small, medium, and large variants
- **Optional Linking**: Can be displayed as a link or standalone
- **Customizable Styling**: Override default classes for different contexts
- **Responsive**: Automatically scales images based on size prop
- **Consistent Branding**: Ensures logo appears the same across the application

## Basic Usage

```tsx
import { Logo } from '@/components/Logo';

// Default usage (medium size, with link)
<Logo />

// Small size, no link
<Logo size="sm" showLink={false} />

// Large size with custom styling
<Logo size="lg" className="my-4" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant of the logo |
| `showLink` | `boolean` | `true` | Whether to wrap in a link to home page |
| `className` | `string` | `""` | Additional CSS classes for the container |
| `logoContainerClassName` | `string` | `""` | CSS classes for the logo image container |
| `textClassName` | `string` | `""` | CSS classes for the main logo text |
| `byTextClassName` | `string` | `""` | CSS classes for "by Viraj Kadam" text |

## Size Variants

### Small (`size="sm"`)
- Logo: 32x32px (w-8 h-8)
- Text: 24px height (h-6)
- By text: Extra small (text-xs)

### Medium (`size="md"`) - Default
- Logo: 40x40px (w-10 h-10)
- Text: 32px height (h-8)
- By text: Small (text-sm)

### Large (`size="lg"`)
- Logo: 48x48px (w-12 h-12)
- Text: 40px height (h-10)
- By text: Base size (text-base)

## Examples

### Header Usage (Default)
```tsx
<Logo />
// Medium size, with link, standard header styling
```

### Footer Usage (Small, No Link)
```tsx
<Logo size="sm" showLink={false} />
// Small size, no link, perfect for footer
```

### Custom Styling
```tsx
<Logo 
  size="lg"
  className="justify-center"
  logoContainerClassName="bg-gray-100 rounded-lg p-2"
  textClassName="filter brightness-0"
  byTextClassName="text-gray-600"
/>
```

### Landing Page Hero
```tsx
<Logo 
  size="lg"
  className="mx-auto mb-8"
  showLink={false}
/>
```

## File Structure

The component uses these image assets:
- `/Codex Classes.png` - Main logo icon
- `/Codexa LOGO 1.png` - Text logo

## Notes

- When `showLink={true}`, the logo wraps in a Link component with hover effects
- The component maintains aspect ratios for all images
- All text is set to black by default but can be customized
- The component is fully responsive and works in all contexts
