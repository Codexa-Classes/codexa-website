# Constants Usage Guide

This directory contains all the application constants following React best practices for maintainability and reusability.

## Available Constants

### `INSTRUCTOR`
Contains all instructor-related information that can be reused across the application.

```typescript
import { INSTRUCTOR } from '@/lib/constants';

// Usage examples:
console.log(INSTRUCTOR.name); // "Viraj Kadam"
console.log(INSTRUCTOR.experience); // "8+ Years"
console.log(INSTRUCTOR.expertise); // Array of skills
```

### `APP_CONFIG`
Application configuration constants.

### `ROUTES`
Route definitions and helper functions for navigation.

### `USER_ROLES` & `USER_TYPES`
User role and type definitions.

## Best Practices

1. **Single Source of Truth**: All instructor data is now centralized in one place
2. **Type Safety**: Use the `Instructor` interface for type checking
3. **Immutability**: Constants are marked with `as const` for immutability
4. **Reusability**: Import and use these constants anywhere in your application
5. **Maintainability**: Update instructor information in one place, changes reflect everywhere

## Adding New Constants

When adding new constants:

1. Define a TypeScript interface for type safety
2. Export the constant with proper typing
3. Use `as const` for immutable arrays and objects
4. Document the constant in this README

## Example Usage in Components

```typescript
import { INSTRUCTOR } from '@/lib/constants';

export default function InstructorCard() {
  return (
    <div>
      <h2>{INSTRUCTOR.name}</h2>
      <p>{INSTRUCTOR.title}</p>
      <ul>
        {INSTRUCTOR.expertise.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
```
