import { z } from 'zod';

/**
 * Reusable UUID string validator
 */
export const uuid = z.string().uuid({ message: 'Invalid UUID format' });

/**
 * Reusable ID param schema: { id: uuid }
 */
export const idParamSchema = z.object({
  id: uuid,
});
