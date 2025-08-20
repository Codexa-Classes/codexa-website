# Constants Usage Guide

This directory contains all the application constants following React best practices for maintainability and reusability.

## Available Constants

### `INSTRUCTOR`
Contains all instructor-related information that can be reused across the application.

```typescript
import { INSTRUCTOR } from '@/lib/constants';

// Usage examples:
console.log(INSTRUCTOR.name); // "Viraj Kadam"
console.log(INSTRUCTOR.experience); // "10+ Years"
console.log(INSTRUCTOR.expertise); // Array of skills
```

### `COURSES`
Comprehensive course information with detailed data for each course.

```typescript
import { COURSES, COURSE_PRICE, COURSE_CATEGORIES } from '@/lib/constants';

// Usage examples:
console.log(COURSES.length); // 6 courses
console.log(COURSE_PRICE); // 10000
console.log(COURSE_CATEGORIES.backend); // "Backend Development"

// Get specific course
const mysqlCourse = COURSES.find(course => course.id === 'mysql');
console.log(mysqlCourse.careerPath); // "Database Administrator"
```

### `APP_CONFIG`
Application configuration constants.

### `ROUTES`
Route definitions and helper functions for navigation.

### `USER_ROLES` & `USER_TYPES`
User role and type definitions.

## Best Practices

1. **Single Source of Truth**: All instructor and course data is now centralized in one place
2. **Type Safety**: Use the `Instructor` and `Course` interfaces for type checking
3. **Immutability**: Constants are marked with `as const` for immutability
4. **Reusability**: Import and use these constants anywhere in your application
5. **Maintainability**: Update instructor or course information in one place, changes reflect everywhere

## Adding New Constants

When adding new constants:

1. Define a TypeScript interface for type safety
2. Export the constant with proper typing
3. Use `as const` for immutable arrays and objects
4. Document the constant in this README

## Example Usage in Components

```typescript
import { INSTRUCTOR, COURSES, COURSE_PRICE } from '@/lib/constants';

export default function CourseCard() {
  return (
    <div>
      <h2>{COURSES[0].name}</h2>
      <p>{COURSES[0].description}</p>
      <p>Price: ₹{COURSE_PRICE}</p>
      <p>Instructor: {INSTRUCTOR.name}</p>
    </div>
  );
}
```

## Course Information

Each course includes:
- **Basic Info**: Name, description, duration, level
- **Career Path**: Specific job role (e.g., "Database Administrator")
- **Skills**: Technical skills learned
- **Projects**: Real-world projects to build
- **Topics**: Detailed curriculum breakdown

## MySQL Database Course Updates

The MySQL Database course has been enhanced with:
- **Career Path**: Database Administrator
- **Extended Topics**: High availability, replication, monitoring
- **Advanced Skills**: Performance tuning, security implementation
- **Professional Projects**: Enterprise-level database solutions
