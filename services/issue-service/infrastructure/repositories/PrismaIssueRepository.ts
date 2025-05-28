import { IIssueRepository } from '../../application/ports/IIssueRepository';
import { Issue, IssueStatus } from '../../domain/entities/Issue';
import { logger } from '../logger';
import { prisma } from '../db';
import { DatabaseError } from '../errors/DatabaseError';

export class PrismaIssueRepository implements IIssueRepository {
  async findAll(): Promise<Issue[]> {
    try {
      logger.info('Querying database for all issues');

      const rows = await prisma.issue.findMany({
        where: { isDeleted: false },
      });

      logger.info({ count: rows.length }, 'Issues retrieved from DB');

      return rows.map((row) =>
        Issue.fromPersistence(
          row.id,
          row.title,
          row.description,
          row.status,
          row.createdAt,
          row.updatedAt,
          row.createdById,
          row.assignedToId,
        ),
      );
    } catch (error) {
      logger.error(error, 'Failed to query issues from DB');
      throw new DatabaseError();
    }
  }

  async findById(id: string): Promise<Issue | null> {
    try {
      logger.info({ id }, 'Querying issue by ID');

      const row = await prisma.issue.findUnique({ where: { id } });

      if (!row) return null;

      return Issue.fromPersistence(
        row.id,
        row.title,
        row.description,
        row.status,
        row.createdAt,
        row.updatedAt,
        row.createdById,
        row.assignedToId,
        row.isDeleted,
      );
    } catch (err) {
      logger.error(err, 'Failed to fetch issue by ID from DB');
      throw new DatabaseError('Failed to fetch issue');
    }
  }

  async create(issue: Issue): Promise<Issue> {
    const created = await prisma.issue.create({
      data: {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        status: issue.status,
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt,
        createdById: issue.createdBy,
      },
    });

    return Issue.fromPersistence(
      created.id,
      created.title,
      created.description,
      created.status,
      created.createdAt,
      created.updatedAt,
      created.createdById,
      created.assignedToId,
      created.isDeleted,
    );
  }

  async update(issue: Issue): Promise<Issue> {
    const updated = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title: issue.title,
        description: issue.description,
        status: issue.status,
      },
    });

    return Issue.fromPersistence(
      updated.id,
      updated.title,
      updated.description,
      updated.status,
      updated.createdAt,
      updated.updatedAt,
      updated.createdById,
      updated.assignedToId,
      updated.isDeleted,
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.issue.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
