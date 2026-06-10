export type CourseCardTheme =
  | 'purple'
  | 'green'
  | 'blue'
  | 'orange'
  | 'indigo'
  | 'violet'
  | 'emerald'
  | 'pink';

export interface CourseCardData {
  id: string;
  number: string;
  title: string;
  techStack: string;
  description: string;
  topics: readonly string[];
  icons: readonly string[];
  theme: CourseCardTheme;
}

export const COURSE_CARDS: readonly CourseCardData[] = [
  {
    id: 'frontend',
    number: '01',
    title: 'Frontend',
    techStack: 'HTML, CSS, JavaScript, Tailwind CSS, React JS',
    description:
      'Learn to build modern, responsive, and interactive websites using frontend technologies.',
    topics: [
      'HTML structure',
      'CSS styling',
      'JavaScript basics',
      'Tailwind CSS',
      'React JS components',
      'Responsive UI design',
    ],
    icons: ['html5', 'css3', 'javascript', 'tailwindcss', 'react'],
    theme: 'purple',
  },
  {
    id: 'backend',
    number: '02',
    title: 'Backend',
    techStack: 'Python, FastAPI, Django',
    description:
      'Learn backend development using Python frameworks for building APIs and web applications.',
    topics: [
      'Python programming',
      'FastAPI',
      'Django',
      'REST API development',
      'Authentication',
      'Backend logic',
    ],
    icons: ['python', 'fastapi', 'django'],
    theme: 'green',
  },
  {
    id: 'database',
    number: '03',
    title: 'Database',
    techStack: 'PL/SQL, MongoDB',
    description:
      'Learn how to store, manage, and retrieve data using SQL and NoSQL databases.',
    topics: [
      'Database basics',
      'PL/SQL queries',
      'Stored procedures',
      'MongoDB collections',
      'CRUD operations',
      'Data management',
    ],
    icons: ['oracle', 'mongodb'],
    theme: 'blue',
  },
  {
    id: 'os',
    number: '04',
    title: 'OS',
    techStack: 'Linux',
    description:
      'Learn Linux operating system basics and command-line usage.',
    topics: [
      'Linux commands',
      'File system',
      'Permissions',
      'Process management',
      'Networking basics',
      'Shell scripting basics',
    ],
    icons: ['linux'],
    theme: 'orange',
  },
  {
    id: 'version-control',
    number: '05',
    title: 'V.C',
    techStack: 'Git, GitHub Pages',
    description:
      'Learn version control and how to manage project code using Git and GitHub.',
    topics: [
      'Git basics',
      'Commit and push',
      'Branching',
      'Pull requests',
      'GitHub repositories',
      'GitHub Pages deployment',
    ],
    icons: ['git', 'github'],
    theme: 'indigo',
  },
  {
    id: 'deploy',
    number: '06',
    title: 'Deploy',
    techStack: 'Linode, AWS, Docker, Netlify',
    description:
      'Learn how to deploy and manage applications on cloud and hosting platforms.',
    topics: [
      'Linode setup',
      'AWS basics',
      'Docker containers',
      'Netlify deployment',
      'Server deployment',
      'CI/CD basics',
    ],
    icons: ['aws', 'docker', 'netlify'],
    theme: 'violet',
  },
  {
    id: 'project-track',
    number: '07',
    title: 'Project Track',
    techStack: 'Jira',
    description:
      'Learn how to track tasks, manage projects, and work with teams using Jira.',
    topics: [
      'Jira basics',
      'Projects and boards',
      'Issues and tasks',
      'Sprint planning',
      'Backlog management',
      'Reports and dashboard',
    ],
    icons: ['jira'],
    theme: 'emerald',
  },
  {
    id: 'rag-prompt',
    number: '08',
    title: 'RAG, Prompt Engg',
    techStack: 'RAG, Prompt Engineering',
    description:
      'Learn AI prompt writing and Retrieval-Augmented Generation concepts.',
    topics: [
      'Prompt engineering basics',
      'LLM concepts',
      'RAG architecture',
      'Vector database basics',
      'AI workflow',
      'Best practices',
    ],
    icons: ['tensorflow'],
    theme: 'pink',
  },
] as const;

export const COURSE_CARD_THEMES: Record<
  CourseCardTheme,
  {
    techStack: string;
    viewDetails: string;
    enroll: string;
    iconBg: string;
  }
> = {
  purple: {
    techStack: 'text-purple-600',
    viewDetails: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200',
    enroll: 'bg-purple-600 text-white hover:bg-purple-700',
    iconBg: 'bg-purple-50',
  },
  green: {
    techStack: 'text-green-600',
    viewDetails: 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200',
    enroll: 'bg-green-600 text-white hover:bg-green-700',
    iconBg: 'bg-green-50',
  },
  blue: {
    techStack: 'text-blue-600',
    viewDetails: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200',
    enroll: 'bg-blue-600 text-white hover:bg-blue-700',
    iconBg: 'bg-blue-50',
  },
  orange: {
    techStack: 'text-orange-600',
    viewDetails: 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200',
    enroll: 'bg-orange-600 text-white hover:bg-orange-700',
    iconBg: 'bg-orange-50',
  },
  indigo: {
    techStack: 'text-indigo-600',
    viewDetails: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200',
    enroll: 'bg-indigo-600 text-white hover:bg-indigo-700',
    iconBg: 'bg-indigo-50',
  },
  violet: {
    techStack: 'text-violet-600',
    viewDetails: 'bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200',
    enroll: 'bg-violet-600 text-white hover:bg-violet-700',
    iconBg: 'bg-violet-50',
  },
  emerald: {
    techStack: 'text-emerald-600',
    viewDetails: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200',
    enroll: 'bg-emerald-600 text-white hover:bg-emerald-700',
    iconBg: 'bg-emerald-50',
  },
  pink: {
    techStack: 'text-pink-600',
    viewDetails: 'bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200',
    enroll: 'bg-pink-600 text-white hover:bg-pink-700',
    iconBg: 'bg-pink-50',
  },
};
