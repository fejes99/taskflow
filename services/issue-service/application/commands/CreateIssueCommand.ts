import { logger } from '../../infrastructure/logger';
import { IssueCreateDto } from '../dtos/IssueCreateDto';
import { IssueDto } from '../dtos/IssueDto';
import { IssueMapper } from '../mappers/IssueMapper';
import { IIssueRepository } from '../ports/IIssueRepository';
import { ICommand } from './../contracts/ICommand';

export class CreateIssueCommand implements ICommand<IssueCreateDto, IssueDto> {
  constructor(private readonly issueRepo: IIssueRepository) {}

  async execute(dto: IssueCreateDto): Promise<IssueDto> {
    console.log('🚀 ~ CreateIssueCommand ~ execute ~ dto:', dto);
    logger.info({ title: dto.title }, 'Creating issue...');

    const issue = IssueMapper.fromCreateDto(dto);
    console.log('🚀 ~ CreateIssueCommand ~ execute ~ issue:', issue);
    const saved = await this.issueRepo.create(issue);
    const result = IssueMapper.toDto(saved);

    logger.info({ id: result.id }, 'Issue created.');
    return result;
  }
}
