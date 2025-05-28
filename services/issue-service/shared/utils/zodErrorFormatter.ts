import { ZodError } from 'zod';

export const formatZodError = (error: unknown): string => {
  if (error instanceof ZodError) {
    return error.errors.map((e) => e.message).join(', ');
  }

  return 'Invalid input';
};
