export interface Course {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'web' | 'business' | 'data' | 'devops' | 'database' | 'support';
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
    id: "frontend-react",
    name: "Frontend Development (ReactJS + Tailwind)",
    icon: "react",
    category: "frontend",
    description: "Master modern frontend development with ReactJS and Tailwind CSS for responsive web applications",
    duration: "8 weeks",
    students: "200+",
    level: "Beginner to Advanced",
    topics: [
      "ReactJS Fundamentals",
      "Component Architecture",
      "State Management (Hooks & Context)",
      "Tailwind CSS Framework",
      "Responsive Design",
      "Modern JavaScript (ES6+)",
      "Routing & Navigation",
      "Testing & Deployment"
    ],
    icon_name: "react",
    price: 10000,
    careerPath: "Frontend Developer",
    skills: [
      "React.js Development",
      "Tailwind CSS",
      "JavaScript ES6+",
      "Component Design",
      "Responsive Web Design",
      "State Management",
      "Modern Frontend Tools"
    ],
    projects: [
      "Responsive E-commerce Frontend",
      "Admin Dashboard",
      "Portfolio Website",
      "Real-time Chat Interface"
    ]
  },
  {
    id: "web-flask-django",
    name: "Web Development (Flask + Django)",
    icon: "python",
    category: "web",
    description: "Learn Python web development with Flask and Django frameworks for building scalable web applications",
    duration: "10 weeks",
    students: "180+",
    level: "Beginner to Advanced",
    topics: [
      "Python Programming Basics",
      "Flask Framework",
      "Django Framework",
      "Database Integration",
      "RESTful API Development",
      "Authentication & Security",
      "Deployment & Hosting",
      "Testing & Debugging"
    ],
    icon_name: "python",
    price: 10000,
    careerPath: "Python Web Developer",
    skills: [
      "Python Programming",
      "Flask Framework",
      "Django Framework",
      "Web Development",
      "Database Design",
      "API Development",
      "Web Security"
    ],
    projects: [
      "E-commerce Platform",
      "Blog Management System",
      "REST API Backend",
      "Content Management System"
    ]
  },
  {
    id: "web-bootstrap-laravel",
    name: "Web Development (Bootstrap + Laravel)",
    icon: "php",
    category: "web",
    description: "Master PHP web development with Laravel framework and Bootstrap for modern, responsive websites",
    duration: "10 weeks",
    students: "220+",
    level: "Beginner to Advanced",
    topics: [
      "PHP Programming",
      "Laravel Framework",
      "Bootstrap CSS Framework",
      "Database Design & MySQL",
      "Authentication & Authorization",
      "RESTful APIs",
      "Frontend-Backend Integration",
      "Deployment & Maintenance"
    ],
    icon_name: "php",
    price: 10000,
    careerPath: "PHP Web Developer",
    skills: [
      "PHP Programming",
      "Laravel Framework",
      "Bootstrap CSS",
      "MySQL Database",
      "Full-stack Development",
      "Web Security",
      "API Development"
    ],
    projects: [
      "Corporate Website",
      "E-learning Platform",
      "Business Management System",
      "Customer Portal"
    ]
  },
  {
    id: "business-analyst",
    name: "Business Analyst (PowerBI + MySQL + BRD)",
    icon: "powerbi",
    category: "business",
    description: "Become a Business Analyst with expertise in PowerBI, MySQL, and Business Requirements Documentation",
    duration: "8 weeks",
    students: "150+",
    level: "Intermediate to Advanced",
    topics: [
      "Business Analysis Fundamentals",
      "PowerBI Data Visualization",
      "MySQL Database Management",
      "Business Requirements Documentation (BRD)",
      "Data Analysis & Reporting",
      "Stakeholder Management",
      "Process Modeling",
      "Business Intelligence Tools"
    ],
    icon_name: "powerbi",
    price: 10000,
    careerPath: "Business Analyst",
    skills: [
      "Business Analysis",
      "PowerBI Development",
      "MySQL Database",
      "BRD Documentation",
      "Data Visualization",
      "Requirements Gathering",
      "Process Analysis"
    ],
    projects: [
      "Business Intelligence Dashboard",
      "Requirements Documentation",
      "Data Analysis Reports",
      "Process Optimization Study"
    ]
  },
  {
    id: "data-analyst",
    name: "Data Analyst (PowerBI + SQL + SAP + Python)",
    icon: "powerbi",
    category: "data",
    description: "Master data analysis with PowerBI, SQL, SAP, and Python for comprehensive business intelligence",
    duration: "12 weeks",
    students: "160+",
    level: "Intermediate to Advanced",
    topics: [
      "Data Analysis Fundamentals",
      "PowerBI Advanced Features",
      "SQL Query Optimization",
      "SAP Business Intelligence",
      "Python for Data Analysis",
      "Statistical Analysis",
      "Data Visualization",
      "Predictive Analytics"
    ],
    icon_name: "powerbi",
    price: 10000,
    careerPath: "Data Analyst",
    skills: [
      "Data Analysis",
      "PowerBI Development",
      "SQL Programming",
      "SAP BI Tools",
      "Python Programming",
      "Statistical Analysis",
      "Data Visualization"
    ],
    projects: [
      "Business Intelligence Dashboard",
      "Data Analysis Reports",
      "Predictive Analytics Model",
      "Performance Metrics Dashboard"
    ]
  },
  {
    id: "devops-aws",
    name: "DevOps Engineer (AWS)",
    icon: "aws",
    category: "devops",
    description: "Master DevOps practices with AWS cloud infrastructure, automation, and deployment pipelines",
    duration: "10 weeks",
    students: "140+",
    level: "Intermediate to Advanced",
    topics: [
      "DevOps Fundamentals",
      "AWS Core Services",
      "Infrastructure as Code",
      "CI/CD Pipeline Development",
      "Containerization (Docker)",
      "Monitoring & Logging",
      "Security & Compliance",
      "Auto Scaling & Load Balancing"
    ],
    icon_name: "aws",
    price: 10000,
    careerPath: "DevOps Engineer",
    skills: [
      "DevOps Practices",
      "AWS Cloud Services",
      "Infrastructure Automation",
      "CI/CD Pipelines",
      "Container Management",
      "Monitoring & Alerting",
      "Cloud Security"
    ],
    projects: [
      "Automated CI/CD Pipeline",
      "Infrastructure as Code",
      "Monitoring Dashboard",
      "Auto-scaling Application"
    ]
  },
  {
    id: "database-admin",
    name: "Database Admin (Oracle/PLSQL)",
    icon: "oracle",
    category: "database",
    description: "Master Oracle database administration and PL/SQL programming for enterprise database management",
    duration: "8 weeks",
    students: "120+",
    level: "Intermediate to Advanced",
    topics: [
      "Oracle Database Architecture",
      "PL/SQL Programming",
      "Database Administration",
      "Performance Tuning",
      "Backup & Recovery",
      "Security & Access Control",
      "High Availability",
      "Database Monitoring"
    ],
    icon_name: "oracle",
    price: 10000,
    careerPath: "Database Administrator",
    skills: [
      "Oracle Database",
      "PL/SQL Programming",
      "Database Administration",
      "Performance Optimization",
      "Backup & Recovery",
      "Security Implementation",
      "High Availability Setup"
    ],
    projects: [
      "Database Design & Setup",
      "Performance Optimization",
      "Backup & Recovery System",
      "Security Implementation"
    ]
  },
  {
    id: "app-support",
    name: "App Support (MySQL + Linux)",
    icon: "linux",
    category: "support",
    description: "Learn application support with MySQL database management and Linux system administration",
    duration: "8 weeks",
    students: "130+",
    level: "Beginner to Intermediate",
    topics: [
      "Linux System Administration",
      "MySQL Database Management",
      "Application Support",
      "Troubleshooting & Debugging",
      "Performance Monitoring",
      "Backup & Maintenance",
      "Security Best Practices",
      "User Support & Documentation"
    ],
    icon_name: "linux",
    price: 10000,
    careerPath: "Application Support Engineer",
    skills: [
      "Linux Administration",
      "MySQL Database",
      "Application Support",
      "Troubleshooting",
      "Performance Monitoring",
      "System Maintenance",
      "User Support"
    ],
    projects: [
      "System Setup & Configuration",
      "Database Management",
      "Monitoring System",
      "Support Documentation"
    ]
  },
  {
    id: "data-powerbi",
    name: "Data Analysis with PowerBI",
    icon: "powerbi",
    category: "data",
    description: "Master data analysis and visualization using Microsoft PowerBI for business intelligence and reporting",
    duration: "8 weeks",
    students: "150+",
    level: "Beginner to Advanced",
    topics: [
      "PowerBI Desktop Fundamentals",
      "Data Modeling & Relationships",
      "DAX (Data Analysis Expressions)",
      "Advanced Visualizations",
      "Power Query & Data Transformation",
      "Dashboard Design Principles",
      "Report Publishing & Sharing",
      "PowerBI Service & Mobile"
    ],
    icon_name: "powerbi",
    price: 10000,
    careerPath: "Data Analyst / BI Developer",
    skills: [
      "PowerBI Development",
      "Data Modeling",
      "DAX Programming",
      "Data Visualization",
      "Business Intelligence",
      "Report Design",
      "Dashboard Creation"
    ],
    projects: [
      "Sales Performance Dashboard",
      "Financial Analytics Report",
      "Customer Insights Dashboard",
      "Operational Metrics Dashboard"
    ]
  }
] as const;

export const COURSE_CATEGORIES = {
  frontend: "Frontend Development",
  web: "Web Development", 
  business: "Business Analysis",
  data: "Data Analysis",
  devops: "DevOps Engineering",
  database: "Database Administration",
  support: "Application Support"
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
