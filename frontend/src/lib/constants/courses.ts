export interface Course {
  id: string;
  name: string;
  icon: string;
  category: 'backend' | 'frontend' | 'database' | 'framework';
  description: string;
  duration: string;
  students: string;
  level: string;
  topics: readonly string[];
  icon_name: string;
  price: number;
  careerPath: string;
  skills: readonly string[];
  projects: readonly string[];
}

export const COURSES: readonly Course[] = [
  {
    id: "php",
    name: "PHP Development",
    icon: "devicon-php-plain",
    category: "backend",
    description: "Master server-side programming with PHP and Laravel framework",
    duration: "8 weeks",
    students: "300+",
    level: "Beginner to Advanced",
    topics: [
      "PHP Fundamentals",
      "Object-Oriented Programming",
      "Laravel Framework",
      "Database Integration",
      "API Development",
      "Security Best Practices"
    ],
    icon_name: "php",
    price: 10000,
    careerPath: "Backend Developer",
    skills: [
      "PHP Programming",
      "Laravel Framework",
      "MySQL Database",
      "RESTful APIs",
      "MVC Architecture",
      "Git Version Control"
    ],
    projects: [
      "E-commerce Website",
      "Blog Management System",
      "User Authentication System",
      "API Development"
    ]
  },
  {
    id: "python",
    name: "Python Programming",
    icon: "devicon-python-plain",
    category: "backend",
    description: "Learn Python programming and Django web development framework",
    duration: "10 weeks",
    students: "250+",
    level: "Beginner to Advanced",
    topics: [
      "Python Basics",
      "Data Structures & Algorithms",
      "Django Framework",
      "Web Development",
      "Data Analysis",
      "Machine Learning Basics"
    ],
    icon_name: "python",
    price: 10000,
    careerPath: "Python Developer",
    skills: [
      "Python Programming",
      "Django Framework",
      "Data Analysis",
      "Web Scraping",
      "API Development",
      "Database Design"
    ],
    projects: [
      "Web Application",
      "Data Analysis Tool",
      "Automation Scripts",
      "Machine Learning Model"
    ]
  },
  {
    id: "react",
    name: "React Development",
    icon: "devicon-react-original",
    category: "frontend",
    description: "Build modern user interfaces with React and JavaScript",
    duration: "8 weeks",
    students: "200+",
    level: "Beginner to Advanced",
    topics: [
      "JavaScript ES6+",
      "React Components",
      "State Management",
      "Hooks & Context",
      "Routing & Navigation",
      "Testing & Deployment"
    ],
    icon_name: "react",
    price: 10000,
    careerPath: "Frontend Developer",
    skills: [
      "React.js",
      "JavaScript ES6+",
      "HTML5 & CSS3",
      "State Management",
      "Component Architecture",
      "Responsive Design"
    ],
    projects: [
      "Single Page Application",
      "E-commerce Frontend",
      "Dashboard Interface",
      "Mobile-Responsive Website"
    ]
  },
  {
    id: "aspnet",
    name: "ASP.NET Development",
    icon: "devicon-dotnetcore-plain",
    category: "framework",
    description: "Enterprise web development with ASP.NET Core and C#",
    duration: "10 weeks",
    students: "150+",
    level: "Beginner to Advanced",
    topics: [
      "C# Programming",
      "ASP.NET Core",
      "Entity Framework",
      "Web API Development",
      "Authentication & Authorization",
      "Deployment & Hosting"
    ],
    icon_name: "aspnet",
    price: 10000,
    careerPath: ".NET Developer",
    skills: [
      "C# Programming",
      "ASP.NET Core",
      "Entity Framework",
      "SQL Server",
      "Web API Development",
      "Azure Cloud Services"
    ],
    projects: [
      "Enterprise Web Application",
      "RESTful API Service",
      "Authentication System",
      "Cloud-Based Solution"
    ]
  },
  {
    id: "mysql",
    name: "MySQL Database",
    icon: "devicon-mysql-plain",
    category: "database",
    description: "Master database design, administration, and optimization for Database Administrator role",
    duration: "6 weeks",
    students: "180+",
    level: "Beginner to Advanced",
    topics: [
      "Database Design Principles",
      "SQL Queries & Joins",
      "Stored Procedures & Functions",
      "Performance Optimization",
      "Backup & Recovery",
      "Database Security & Access Control",
      "High Availability & Replication",
      "Monitoring & Maintenance"
    ],
    icon_name: "mysql",
    price: 10000,
    careerPath: "Database Administrator",
    skills: [
      "MySQL Database Design",
      "SQL Query Optimization",
      "Database Administration",
      "Performance Tuning",
      "Backup & Recovery",
      "Security Implementation",
      "High Availability Setup",
      "Database Monitoring"
    ],
    projects: [
      "E-commerce Database Design",
      "Performance Optimization",
      "Backup & Recovery System",
      "Security Implementation",
      "High Availability Setup"
    ]
  },
  {
    id: "linux",
    name: "Linux Administration",
    icon: "devicon-linux-plain",
    category: "framework",
    description: "System administration and server management with Linux",
    duration: "6 weeks",
    students: "120+",
    level: "Beginner to Advanced",
    topics: [
      "Linux Fundamentals",
      "Command Line Mastery",
      "System Administration",
      "Server Configuration",
      "Shell Scripting",
      "Security & Monitoring",
      "Network Configuration",
      "Service Management"
    ],
    icon_name: "linux",
    price: 10000,
    careerPath: "Linux System Administrator",
    skills: [
      "Linux System Administration",
      "Shell Scripting",
      "Server Configuration",
      "Network Administration",
      "Security Implementation",
      "Monitoring & Logging",
      "Automation & DevOps",
      "Troubleshooting"
    ],
    projects: [
      "Server Setup & Configuration",
      "Automation Scripts",
      "Security Hardening",
      "Monitoring System",
      "Backup & Recovery"
    ]
  }
] as const;

export const COURSE_CATEGORIES = {
  backend: "Backend Development",
  frontend: "Frontend Development", 
  database: "Database Management",
  framework: "Framework & Tools"
} as const;

export const COURSE_LEVELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced"
} as const;

export const COURSE_PRICE = 10000;

// Helper functions
export const getCourseById = (id: string): Course | undefined => {
  return COURSES.find(course => course.id === id);
};

export const getCoursesByCategory = (category: Course['category']): Course[] => {
  return COURSES.filter(course => course.category === category);
};

export const getCoursePrice = (): number => COURSE_PRICE;

export const getCourseCount = (): number => COURSES.length;
