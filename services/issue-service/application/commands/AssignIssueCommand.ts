import { logger } from '../../infrastructure/logger';
import { NotFoundError } from '../../shared/errors/NotFoundError';
import { ICommand } from '../contracts/ICommand';
import { IssueDto } from '../dtos/IssueDto';
import { IssueMapper } from '../mappers/IssueMapper';
import { IIssueRepository } from '../ports/IIssueRepository';

export interface AssignIssueCommandInput {
  issueId: string;
  userId: string;
}

export class AssignIssueCommand
  implements ICommand<AssignIssueCommandInput, IssueDto>
{
  constructor(private readonly issueRepo: IIssueRepository) {}

  async execute(input: AssignIssueCommandInput): Promise<IssueDto> {
    const { issueId, userId } = input;
    logger.info({ issueId }, 'Assigning issue...');

    const issue = await this.issueRepo.findById(issueId);
    if (!issue || issue.isDeleted)
      throw new NotFoundError(`Issue with ${issueId} not found.`);

    issue.assign(userId);

    const saved = await this.issueRepo.update(issue);
    const result = IssueMapper.toDto(saved);

    logger.info({ id: result.id }, 'Issue assigned.');
    return result;
  }
}
