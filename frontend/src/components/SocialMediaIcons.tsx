import { Twitter, Instagram, Linkedin, MapPin } from 'lucide-react';

export interface SocialMediaLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ size?: number }>;
  hoverColor: string;
  darkHoverColor: string;
}

interface SocialMediaIconsProps {
  links: SocialMediaLink[];
  className?: string;
  iconSize?: number;
  containerClassName?: string;
}

export const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({
  links,
  className = "mt-15 text-center",
  iconSize = 24,
  containerClassName = "flex flex-row justify-center space-x-15"
}) => {
  return (
    <div className={className}>
      <div className={containerClassName}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-600 dark:text-gray-400 hover:${link.hoverColor} dark:hover:${link.darkHoverColor} transition-colors duration-200`}
          >
            <link.icon size={iconSize} />
          </a>
        ))}
      </div>
    </div>
  );
};

// Default social media links for convenience
export const defaultSocialMediaLinks: SocialMediaLink[] = [
  {
    name: 'Twitter',
    url: 'https://x.com/adysunventures',
    icon: Twitter,
    hoverColor: 'text-blue-400',
    darkHoverColor: 'text-blue-300'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/adysunventures/',
    icon: Instagram,
    hoverColor: 'text-pink-500',
    darkHoverColor: 'text-pink-400'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/adysun-ventures/',
    icon: Linkedin,
    hoverColor: 'text-blue-600',
    darkHoverColor: 'text-blue-400'
  },
  {
    name: 'Google',
    url: 'https://g.co/kgs/C5Fe6uz',
    icon: ({ size = 24 }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    hoverColor: 'text-red-500',
    darkHoverColor: 'text-red-400'
  },
  {
    name: 'Location',
    url: 'https://maps.app.goo.gl/ABiUMnGGjcG7sT6o6',
    icon: MapPin,
    hoverColor: 'text-green-600',
    darkHoverColor: 'text-green-400'
  }
];
