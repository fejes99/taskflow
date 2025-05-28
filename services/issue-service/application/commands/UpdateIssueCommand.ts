import { Issue } from '../../domain/entities/Issue';
import { logger } from '../../infrastructure/logger';
import { NotFoundError } from '../../shared/errors/NotFoundError';
import { ICommand } from '../contracts/ICommand';
import { IssueDto } from '../dtos/IssueDto';
import { IssueMapper } from '../mappers/IssueMapper';
import { IIssueRepository } from '../ports/IIssueRepository';

export interface UpdateIssueCommandInput {
  id: string;
  title?: string;
  description?: string;
}

export class UpdateIssueCommand
  implements ICommand<UpdateIssueCommandInput, IssueDto>
{
  constructor(private readonly issueRepo: IIssueRepository) {}

  async execute(input: UpdateIssueCommandInput): Promise<IssueDto> {
    const { id, title, description } = input;
    logger.info({ id }, 'Updating issue...');

    const issue = await this.issueRepo.findById(id);
    if (!issue || issue.isDeleted)
      throw new NotFoundError(`Issue with ${id} not found.`);

    const updated = issue.updateDetails({
      title,
      description,
    });

    const saved = await this.issueRepo.update(updated);
    const result = IssueMapper.toDto(saved);

    logger.info({ id: result.id }, 'Issue updated.');
    return result;
  }
}
