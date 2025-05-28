import { z } from 'zod';

export const updateIssueBodySchema = z
  .object({
    title: z.string().min(1).max(255).optional(),
    description: z.string().min(1).max(1000).optional(),
  })
  .refine((data) => data.title || data.description, {
    message: 'At least one field (title or description) must be provided',
  });
