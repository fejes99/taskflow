import { IIssueRepository } from './../ports/IIssueRepository';

import { IssueDto } from './../dtos/IssueDto';
import { IQuery } from './../contracts/IQuery';
import { NotFoundError } from '../../shared/errors/NotFoundError';
import { IssueMapper } from '../mappers/IssueMapper';
import { logger } from '../../infrastructure/logger';

export class GetIssueByIdQuery implements IQuery<string, IssueDto> {
  constructor(private readonly issueRepo: IIssueRepository) {}

  async execute(id: string): Promise<IssueDto> {
    logger.info({ id }, 'Executing GetIssueByIdQuery');

    const issue = await this.issueRepo.findById(id);
    if (!issue) throw new NotFoundError('Issue');

    const dto = IssueMapper.toDto(issue);

    logger.info({ id }, 'Mapped issue to DTO');
    return dto;
  }
}
