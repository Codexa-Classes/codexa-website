import { Brain, CheckCircle, Monitor } from 'lucide-react';
import DevIcon from '@/components/DevIcon';
import {
  COURSE_CARD_THEMES,
  type CourseCardData,
} from '@/lib/constants/courseCards';

interface CourseCardProps {
  course: CourseCardData;
}

export default function CourseCard({ course }: CourseCardProps) {
  const theme = COURSE_CARD_THEMES[course.theme];

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className={`flex min-h-[72px] flex-1 flex-wrap items-center gap-2 rounded-xl p-3 ${theme.iconBg}`}
        >
          {course.id === 'frontend' && (
            <Monitor className="h-10 w-10 shrink-0 text-purple-500" strokeWidth={1.5} />
          )}
          {course.id === 'rag-prompt' && (
            <Brain className="h-10 w-10 shrink-0 text-pink-500" strokeWidth={1.5} />
          )}
          {course.icons.map((icon) => (
            <DevIcon key={icon} name={icon} size={course.icons.length === 1 ? 40 : 28} />
          ))}
        </div>
        <span className="text-3xl font-bold leading-none text-gray-200">
          {course.number}
        </span>
      </div>

      <h3 className="mb-1 text-xl font-bold text-gray-900">{course.title}</h3>
      <p className={`mb-3 text-sm font-medium ${theme.techStack}`}>
        {course.techStack}
      </p>
      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        {course.description}
      </p>

      <div className="flex-1">
        <h4 className="mb-2 text-sm font-semibold text-gray-900">
          What You&apos;ll Learn:
        </h4>
        <ul className="space-y-1.5">
          {course.topics.map((topic) => (
            <li key={topic} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
