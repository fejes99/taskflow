import { z } from 'zod';
import { uuid } from './validationPrimitives';

export const AssignIssueBodySchema = z.object({
  userId: uuid,
});
