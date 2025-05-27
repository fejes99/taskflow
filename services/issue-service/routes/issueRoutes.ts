import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { GetIssuesQuery } from '../application/queries/GetIssuesQuery';
import { PrismaIssueRepository } from '../infrastructure/repositories/PrismaIssueRepository';
import { logger } from '../infrastructure/logger';

export async function issueRoutes(app: FastifyInstance) {
  const issueRepository = new PrismaIssueRepository();
  const getIssuesQuery = new GetIssuesQuery(issueRepository);

  app.get('/issues', async (request: FastifyRequest, reply: FastifyReply) => {
    logger.info(
      { url: request.url, method: request.method },
      'Handling GET /issues',
    );

    const result = await getIssuesQuery.execute();

    logger.info({ count: result.length }, 'Returned issues');
    reply.send(result);
  });
}
