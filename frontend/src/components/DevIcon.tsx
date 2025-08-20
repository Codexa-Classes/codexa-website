import React from 'react';

interface DevIconProps {
  name: string;
  size?: number;
  className?: string;
}

const DevIcon: React.FC<DevIconProps> = ({ name, size = 24, className = "" }) => {
  const iconMap: { [key: string]: string } = {
    'php': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'aspnet': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg',
    'mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    'aws': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
  };

  const iconValue = iconMap[name.toLowerCase()];

  if (!iconValue) {
    console.warn(`Icon "${name}" not found in DevIcon component`);
    return null;
  }

  // All icons now use SVG for better quality
  return (
    <img 
      src={iconValue} 
      alt={`${name} icon`}
      width={size} 
      height={size}
      className={className}
      style={{ display: 'inline-block' }}
    />
  );
};

export default DevIcon;
