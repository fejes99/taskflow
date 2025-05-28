import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { GetIssuesQuery } from '../application/queries/GetIssuesQuery';
import { PrismaIssueRepository } from '../infrastructure/repositories/PrismaIssueRepository';
import { logger } from '../infrastructure/logger';
import { GetIssueByIdQuery } from '../application/queries/GetIssueByIdQuery';
import { CreateIssueSchema } from '../application/validation/CreateIssueSchema';
import { CreateIssueCommand } from '../application/commands/CreateIssueCommand';
import { UpdateIssueCommand } from '../application/commands/UpdateIssueCommand';
import { updateIssueBodySchema } from '../application/validation/UpdateIssueSchema';
import { AssignIssueBodySchema } from '../application/validation/AssignIssueSchema';
import { AssignIssueCommand } from '../application/commands/AssignIssueCommand';
import { idParamSchema } from '../application/validation/validationPrimitives';
import { ResolveIssueCommand } from '../application/commands/ResolveIssueCommand';
import { ReopenIssueCommand } from '../application/commands/ReopenIssueCommand';

export const issueRoutes = async (app: FastifyInstance) => {
  const issueRepository = new PrismaIssueRepository();

  app.get('/issues', async (request: FastifyRequest, reply: FastifyReply) => {
    logger.info(
      { url: request.url, method: request.method },
      'Handling GET /issues',
    );

    const command = new GetIssuesQuery(issueRepository);

    const result = await command.execute();
    logger.info({ count: result.length }, 'Returned issues');
    reply.send(result);
  });

  app.get(
    '/issues/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = idParamSchema.parse(request.params);

      logger.info(
        { url: request.url, method: request.method },
        `Handling GET /issues/${params.id}`,
      );

      const command = new GetIssueByIdQuery(issueRepository);

      const result = await command.execute(params.id);
      logger.info({ id: result.id }, 'Returned issue');
      reply.send(result);
    },
  );

  app.post('/issues', async (request: FastifyRequest, reply: FastifyReply) => {
    console.log('BODY: ', request.body);
    const body = CreateIssueSchema.parse(request.body);

    logger.info(
      { url: request.url, method: request.method },
      'Handling POST /issues',
    );

    const command = new CreateIssueCommand(issueRepository);

    const result = await command.execute(body);
    logger.info({ id: result.id }, 'Created issue');
    reply.code(201).send(result);
  });

  app.patch(
    '/issues/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = idParamSchema.parse(request.params);
      const body = updateIssueBodySchema.parse(request.body);

      logger.info(
        { url: request.url, method: request.method },
        `Handling PATCH /issues/${params.id}`,
      );

      const command = new UpdateIssueCommand(issueRepository);
      const result = await command.execute({ id: params.id, ...body });

      logger.info({ id: result.id }, 'Updated issue');
      reply.code(200).send(result);
    },
  );

  app.patch(
    '/issues/:id/assign',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = idParamSchema.parse(request.params);
      const body = AssignIssueBodySchema.parse(request.body);

      logger.info(
        { url: request.url, method: request.method },
        `Handling PATCH /issues/${params.id}/assign`,
      );

      const command = new AssignIssueCommand(issueRepository);
      const result = await command.execute({ issueId: params.id, ...body });

      logger.info({ id: result.id }, 'Assigned issue');
      reply.code(200).send(result);
    },
  );

  app.patch(
    '/issues/:id/resolve',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = idParamSchema.parse(request.params);

      logger.info(
        { url: request.url, method: request.method },
        `Handling PATCH /issues/${params.id}/resolve`,
      );

      const command = new ResolveIssueCommand(issueRepository);
      const result = await command.execute(params.id);

      logger.info({ id: result.id }, 'Resolved issue');
      reply.code(200).send(result);
    },
  );

  app.patch(
    '/issues/:id/reopen',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = idParamSchema.parse(request.params);

      logger.info(
        { url: request.url, method: request.method },
        `Handling PATCH /issues/${params.id}/reopen`,
      );

      const command = new ReopenIssueCommand(issueRepository);
      const result = await command.execute(params.id);

      logger.info({ id: result.id }, 'Reopened issue');
      reply.code(200).send(result);
    },
  );
};
