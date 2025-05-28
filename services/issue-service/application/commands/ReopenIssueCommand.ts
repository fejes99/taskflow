import { logger } from '../../infrastructure/logger';
import { NotFoundError } from '../../shared/errors/NotFoundError';
import { ICommand } from '../contracts/ICommand';
import { IssueDto } from '../dtos/IssueDto';
import { IssueMapper } from '../mappers/IssueMapper';
import { IIssueRepository } from '../ports/IIssueRepository';

export class ReopenIssueCommand implements ICommand<string, IssueDto> {
  constructor(private readonly issueRepo: IIssueRepository) {}

  async execute(id: string): Promise<IssueDto> {
    logger.info({ id }, 'Reopening issue...');

    const issue = await this.issueRepo.findById(id);
    if (!issue || issue.isDeleted)
      throw new NotFoundError(`Issue with ${id} not found.`);

    issue.reopen();

    const saved = await this.issueRepo.update(issue);
    const result = IssueMapper.toDto(saved);

    logger.info({ id: result.id }, 'Issue reopened.');
    return result;
  }
}
