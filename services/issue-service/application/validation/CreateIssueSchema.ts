import { z } from 'zod';
import { uuid } from './validationPrimitives';

export const CreateIssueSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  createdBy: uuid,
});
