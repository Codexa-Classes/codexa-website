import Link from 'next/link';
import { INSTRUCTOR } from '@/lib/constants';

interface LogoProps {
  showLink?: boolean;
  className?: string;
  logoContainerClassName?: string;
  textClassName?: string;
  byTextClassName?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  showLink = true,
  className = "",
  logoContainerClassName = "",
  textClassName = "",
  byTextClassName = "",
  size = 'md'
}) => {
  const sizeClasses = {
    sm: {
      logo: 'w-8 h-8',
      text: 'h-6',
      byText: 'text-xs'
    },
    md: {
      logo: 'w-10 h-10',
      text: 'h-8',
      byText: 'text-sm'
    },
    lg: {
      logo: 'w-12 h-12',
      text: 'h-10',
      byText: 'text-base'
    }
  };

  const currentSize = sizeClasses[size];

  const logoContent = (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className={`${currentSize.logo} flex items-center justify-center ${logoContainerClassName}`}>
        <img 
          src="/Codex Classes.png" 
          alt="Codexa Classes Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <img 
          src="/Codexa LOGO 1.png" 
          alt="Codexa Classes Logo" 
          className={`${currentSize.text} object-contain mb-1 ${textClassName}`}
        />
        <span className={`text-black ${currentSize.byText} ${byTextClassName}`}>
          by {INSTRUCTOR.name}
        </span>
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
