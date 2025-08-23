import React from 'react';

interface DevIconProps {
  name: string;
  size?: number;
  className?: string;
}

// Color mapping based on actual brand colors from each technology
export const getIconColors = (iconName: string) => {
  const colorMap: { [key: string]: { primary: string; secondary: string; accent: string } } = {
    // Frontend Frameworks
    'react': { primary: '#61DAFB', secondary: '#282C34', accent: '#764ABC' }, // React blue + purple
    'vuejs': { primary: '#4FC08D', secondary: '#35495E', accent: '#42B883' }, // Vue green
    'angular': { primary: '#DD0031', secondary: '#A6120D', accent: '#C3002F' }, // Angular red
    'svelte': { primary: '#FF3E00', secondary: '#FF8E3C', accent: '#FF6B35' }, // Svelte orange
    
    // Backend & Languages
    'php': { primary: '#777BB4', secondary: '#4F5D95', accent: '#8993BE' }, // PHP purple
    'python': { primary: '#3776AB', secondary: '#FFD43B', accent: '#306998' }, // Python blue + yellow
    'java': { primary: '#ED8B00', secondary: '#5382A1', accent: '#F89820' }, // Java orange + blue
    'nodejs': { primary: '#339933', secondary: '#68A063', accent: '#4CAF50' }, // Node.js green
    'typescript': { primary: '#3178C6', secondary: '#235A97', accent: '#4A9EFF' }, // TypeScript blue
    'javascript': { primary: '#F7DF1E', secondary: '#000000', accent: '#FFD600' }, // JavaScript yellow
    
    // CSS & Styling
    'css3': { primary: '#1572B6', secondary: '#33A9DC', accent: '#E34F26' }, // CSS3 blue + orange
    'tailwindcss': { primary: '#06B6D4', secondary: '#0891B2', accent: '#0EA5E9' }, // Tailwind cyan
    'bootstrap': { primary: '#7952B3', secondary: '#563D7C', accent: '#6F42C1' }, // Bootstrap purple
    
    // Backend Frameworks
    'django': { primary: '#092E20', secondary: '#44B78B', accent: '#2BA977' }, // Django green
    'flask': { primary: '#000000', secondary: '#FFFFFF', accent: '#3776AB' }, // Flask black + Python blue
    'laravel': { primary: '#FF2D20', secondary: '#F05340', accent: '#E74430' }, // Laravel red
    
    // Databases
    'mysql': { primary: '#4479A1', secondary: '#00758F', accent: '#00B4DB' }, // MySQL blue
    'postgresql': { primary: '#336791', secondary: '#4C85D1', accent: '#2E5A88' }, // PostgreSQL blue
    'mongodb': { primary: '#47A248', secondary: '#4DB33D', accent: '#66C14F' }, // MongoDB green
    'oracle': { primary: '#F80000', secondary: '#FF0000', accent: '#DC143C' }, // Oracle red
    'redis': { primary: '#DC382D', secondary: '#A41E11', accent: '#CC0000' }, // Redis red
    
    // Cloud & DevOps
    'aws': { primary: '#FF9900', secondary: '#232F3E', accent: '#F90' }, // AWS orange + dark blue
    'azure': { primary: '#0089D6', secondary: '#0078D4', accent: '#00A1F1' }, // Azure blue
    'docker': { primary: '#2496ED', secondary: '#0DB7ED', accent: '#00A6FB' }, // Docker blue
    'kubernetes': { primary: '#326CE5', secondary: '#4C5AE5', accent: '#5B73E7' }, // Kubernetes blue
    
    // Operating Systems
    'linux': { primary: '#FCC624', secondary: '#000000', accent: '#F0B90B' }, // Linux yellow + black
    'ubuntu': { primary: '#E95420', secondary: '#772953', accent: '#DD4814' }, // Ubuntu orange + purple
    
    // Mobile Development
    'android': { primary: '#3DDC84', secondary: '#073042', accent: '#4CAF50' }, // Android green
    'flutter': { primary: '#02569B', secondary: '#027DFD', accent: '#00D4AA' }, // Flutter blue + teal
    
    // Testing & Tools
    'jest': { primary: '#C21325', secondary: '#99425B', accent: '#E31B23' }, // Jest red
    'git': { primary: '#F05032', secondary: '#DD4C35', accent: '#F14F32' }, // Git orange
    'github': { primary: '#181717', secondary: '#24292E', accent: '#2F80ED' }, // GitHub black + blue
    
    // Data Science & ML
    'tensorflow': { primary: '#FF6F00', secondary: '#FF8F00', accent: '#FF9800' }, // TensorFlow orange
    'pandas': { primary: '#130654', secondary: '#150458', accent: '#1F0B7A' }, // Pandas dark blue
    
    // Default fallback
    'default': { primary: '#3B82F6', secondary: '#1D4ED8', accent: '#60A5FA' }
  };

  return colorMap[iconName.toLowerCase()] || colorMap['default'];
};

// Generate complementary gradients based on icon colors
export const getIconGradient = (iconName: string) => {
  // Use CSS custom properties defined in globals.css for Tailwind v4
  const gradientMap: { [key: string]: string } = {
    'react': 'var(--gradient-react)',
    'python': 'var(--gradient-python)',
    'php': 'var(--gradient-php)',
    'mysql': 'var(--gradient-mysql)',
    'aws': 'var(--gradient-aws)',
    'oracle': 'var(--gradient-oracle)',
    'linux': 'var(--gradient-linux)',
    'java': 'var(--gradient-java)',
    'nodejs': 'var(--gradient-nodejs)',
    'typescript': 'var(--gradient-typescript)',
    'javascript': 'var(--gradient-javascript)',
    'docker': 'var(--gradient-docker)',
    'kubernetes': 'var(--gradient-kubernetes)',
    'git': 'var(--gradient-git)',
    'github': 'var(--gradient-github)',
    'vuejs': 'var(--gradient-vuejs)',
    'angular': 'var(--gradient-angular)',
    'svelte': 'var(--gradient-svelte)',
    'nextjs': 'var(--gradient-nextjs)',
    'tailwindcss': 'var(--gradient-tailwindcss)',
    'bootstrap': 'var(--gradient-bootstrap)',
    'django': 'var(--gradient-django)',
    'flask': 'var(--gradient-flask)',
    'laravel': 'var(--gradient-laravel)',
    'express': 'var(--gradient-express)',
    'spring': 'var(--gradient-spring)',
    'postgresql': 'var(--gradient-postgresql)',
    'mongodb': 'var(--gradient-mongodb)',
    'redis': 'var(--gradient-redis)',
    'azure': 'var(--gradient-azure)',
    'gcp': 'var(--gradient-gcp)',
    'jenkins': 'var(--gradient-jenkins)',
    'gitlab': 'var(--gradient-gitlab)',
    'ubuntu': 'var(--gradient-ubuntu)',
    'android': 'var(--gradient-android)',
    'flutter': 'var(--gradient-flutter)',
    'tensorflow': 'var(--gradient-tensorflow)',
    'pytorch': 'var(--gradient-pytorch)',
    'pandas': 'var(--gradient-pandas)',
    'numpy': 'var(--gradient-numpy)',
    'wordpress': 'var(--gradient-wordpress)',
    'figma': 'var(--gradient-figma)',
    'unity': 'var(--gradient-unity)',
    'ethereum': 'var(--gradient-ethereum)'
  };
  
  return gradientMap[iconName.toLowerCase()] || 'var(--gradient-react)';
};

const DevIcon: React.FC<DevIconProps> = ({ name, size = 24, className = "" }) => {
  const iconMap: { [key: string]: string } = {
    // Backend & Languages
    'php': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    'csharp': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    'go': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
    'rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-plain.svg',
    'nodejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'ruby': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ruby/ruby-original.svg',
    'scala': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scala/scala-original.svg',
    'kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    'swift': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg',
    
    // Frontend Frameworks
    'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'vuejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
    'angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
    'svelte': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg',
    'nextjs': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    'nuxtjs': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg',
    'gatsby': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gatsby/gatsby-plain.svg',
    'ember': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ember/ember-original-wordmark.svg',
    
    // CSS & Styling
    'css3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
    'less': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/less/less-plain-wordmark.svg',
    'tailwindcss': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-plain.svg',
    'bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
    'materialui': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg',
    'bulma': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bulma/bulma-plain.svg',
    
    // Backend Frameworks
    'django': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
    'flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
    'laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-plain.svg',
    'express': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    'spring': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
    'aspnet': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg',
    'dotnet': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg',
    'rails': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rails/rails-original-wordmark.svg',
    'fastapi': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
    
    // Databases
    'mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
    'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    'redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
    'sqlite': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
    'oracle': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg',
    'mariadb': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg',
    'cassandra': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cassandra/cassandra-original.svg',
    
    // Cloud & DevOps
    'aws': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
    'gcp': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg',
    'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    'kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg',
    'jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg',
    'gitlab': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg',
    'github': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'terraform': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg',
    'ansible': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg',
    
    // Operating Systems
    'linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    'ubuntu': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-plain.svg',
    'centos': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/centos/centos-original.svg',
    'debian': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/debian/debian-original.svg',
    'windows': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg',
    'macos': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg',
    
    // Mobile Development
    'android': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg',
    'ios': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg',
    'flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    'reactnative': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'xamarin': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xamarin/xamarin-original.svg',
    
    // Testing & Tools
    'jest': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg',
    'cypress': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypress/cypress-plain.svg',
    'selenium': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
    'postman': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
    'vscode': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    'intellij': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg',
    'eclipse': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eclipse/eclipse-original.svg',
    'vim': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vim/vim-original.svg',
    
    // Web Servers & Tools
    'nginx': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
    'apache': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg',
    'tomcat': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tomcat/tomcat-original.svg',
    'webpack': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg',
    'babel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/babel/babel-original.svg',
    'eslint': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg',
    'prettier': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prettier/prettier-original.svg',
    'npm': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg',
    'yarn': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yarn/yarn-original.svg',
    
    // Data Science & ML
    'tensorflow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'pytorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg',
    'pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
    'numpy': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',
    'jupyter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg',
    'r': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg',
    'matlab': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg',
    
    // Blockchain & Web3
    'ethereum': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ethereum/ethereum-original.svg',
    'solidity': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg',
    'web3js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/web3js/web3js-original.svg',
    
    // CMS & E-commerce
    'wordpress': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg',
    'drupal': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/drupal/drupal-original.svg',
    'joomla': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/joomla/joomla-original.svg',
    'magento': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/magento/magento-original.svg',
    'shopify': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/shopify/shopify-original.svg',
    
    // Game Development
    'unity': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
    'unreal': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unrealengine/unrealengine-original.svg',
    'godot': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/godot/godot-original.svg',
    
    // Other Popular Tools
    'figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    'sketch': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sketch/sketch-original.svg',
    'adobe': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/adobe/adobe-original.svg',
    'slack': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg',
    'discord': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/discord/discord-original.svg',
    'trello': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-plain.svg',
    'jira': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg',
    'confluence': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/confluence/confluence-original.svg'
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
