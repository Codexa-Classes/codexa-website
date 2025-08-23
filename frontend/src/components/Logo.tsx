import Link from 'next/link';

interface LogoProps {
  showLink?: boolean;
  className?: string;
  logoContainerClassName?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Logo: React.FC<LogoProps> = ({
  showLink = true,
  className = "",
  logoContainerClassName = "",
  size = 'md'
}) => {
  const sizeClasses = {
    xs: {
      logo: 'w-16 h-5',
      text: 'h-4',
      byText: 'text-xs'
    },
    sm: {
      logo: 'w-24 h-8',
      text: 'h-6',
      byText: 'text-xs'
    },
    md: {
      logo: 'w-32 h-10',
      text: 'h-8',
      byText: 'text-sm'
    },
    lg: {
      logo: 'w-40 h-12',
      text: 'h-10',
      byText: 'text-base'
    },
    xl: {
      logo: 'w-48 h-14',
      text: 'h-12',
      byText: 'text-lg'
    },
    '2xl': {
      logo: 'w-56 h-16',
      text: 'h-14',
      byText: 'text-xl'
    }
  };

  const currentSize = sizeClasses[size];

  const logoContent = (
    <div className={`flex items-center ${className}`}>
      <div className={`${currentSize.logo} flex items-center justify-center ${logoContainerClassName}`}>
        <img 
          src="/codexa_full_logo.png" 
          alt="Codexa Logo" 
          className="w-full h-full object-contain"
        />
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
