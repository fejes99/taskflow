import * as dotenv from 'dotenv';
import { PrismaClient } from './prisma-client/generated/prisma';

dotenv.config({ path: './.env' });

export const prisma = new PrismaClient();
