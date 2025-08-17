# SocialMediaIcons Component

A reusable React component for displaying social media icons with customizable links, colors, and styling.

## Features

- **Dynamic Configuration**: Pass custom social media links through props
- **Customizable Styling**: Override default classes and icon sizes
- **Dark Mode Support**: Built-in dark mode hover colors
- **TypeScript Support**: Fully typed with interfaces
- **Accessibility**: Proper `rel` attributes and target handling

## Basic Usage

```tsx
import { SocialMediaIcons, defaultSocialMediaLinks } from '@/components/SocialMediaIcons';

// Use with default social media links
<SocialMediaIcons links={defaultSocialMediaLinks} />
```

## Custom Configuration

```tsx
import { SocialMediaIcons, SocialMediaLink } from '@/components/SocialMediaIcons';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const customLinks: SocialMediaLink[] = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourcompany',
    icon: Twitter,
    hoverColor: 'text-blue-500',
    darkHoverColor: 'text-blue-400'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/yourcompany',
    icon: Instagram,
    hoverColor: 'text-purple-500',
    darkHoverColor: 'text-purple-400'
  }
];

<SocialMediaIcons 
  links={customLinks}
  iconSize={32}
  className="mt-8 text-center"
  containerClassName="flex justify-center space-x-6"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `SocialMediaLink[]` | Required | Array of social media link objects |
| `className` | `string` | `"mt-15 text-center"` | CSS classes for the outer container |
| `iconSize` | `number` | `24` | Size of the icons in pixels |
| `containerClassName` | `string` | `"flex flex-row justify-center space-x-15"` | CSS classes for the icons container |

## SocialMediaLink Interface

```tsx
interface SocialMediaLink {
  name: string;           // Display name for the link
  url: string;            // URL to navigate to
  icon: React.ComponentType<{ size?: number }>;  // Icon component
  hoverColor: string;     // Tailwind class for hover color (light mode)
  darkHoverColor: string; // Tailwind class for hover color (dark mode)
}
```

## Default Social Media Links

The component comes with pre-configured social media links for:
- Twitter/X
- Instagram
- LinkedIn
- Google Business
- Location/Map

## Examples

### Different Icon Sizes
```tsx
<SocialMediaIcons links={defaultSocialMediaLinks} iconSize={48} />
```

### Custom Layout
```tsx
<SocialMediaIcons 
  links={defaultSocialMediaLinks}
  containerClassName="grid grid-cols-3 gap-4"
  className="mt-10"
/>
```

### Minimal Styling
```tsx
<SocialMediaIcons 
  links={defaultSocialMediaLinks}
  className=""
  containerClassName="flex space-x-4"
/>
```

## Notes

- Icons are imported from `lucide-react` by default
- Custom SVG icons can be passed as functions that return JSX
- All links open in new tabs with proper security attributes
- Hover effects use Tailwind CSS classes for consistency
