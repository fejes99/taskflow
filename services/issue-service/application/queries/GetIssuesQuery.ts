import { IssueMapper } from './../mappers/IssueMapper';
import { logger } from '../../infrastructure/logger';
import { IQuery } from '../contracts/IQuery';
import { IIssueRepository } from '../ports/IIssueRepository';
import { IssueDto } from '../dtos/IssueDto';

export class GetIssuesQuery implements IQuery<void, IssueDto[]> {
  constructor(private readonly issueRepo: IIssueRepository) {}

  async execute(): Promise<IssueDto[]> {
    logger.info('Executing GetIssuesQuery...');

    const issues = await this.issueRepo.findAll();
    const dtos = issues.map((issue) => IssueMapper.toDto(issue));

    logger.info({ count: dtos.length }, 'Mapped issues to DTOs');
    return dtos;
  }
}
