import { IIssueRepository } from '../../application/ports/IIssueRepository';
import { Issue } from '../../domain/entities/Issue';
import { logger } from '../logger';
import { prisma } from '../db';
import { DatabaseError } from '../errors/DatabaseError';

export class PrismaIssueRepository implements IIssueRepository {
  async findAll(): Promise<Issue[]> {
    try {
      logger.info('Querying database for all issues');

      const rows = await prisma.issue.findMany();

      logger.info({ count: rows.length }, 'Issues retrieved from DB');

      return rows.map(
        (row) =>
          new Issue(
            row.id,
            row.title,
            row.description,
            row.status as 'open' | 'in-progress' | 'resolved',
            row.createdAt,
          ),
      );
    } catch (error) {
      logger.error(error, 'Failed to query issues from DB');
      throw new DatabaseError();
    }
  }
}
