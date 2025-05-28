import { Issue } from '../../domain/entities/Issue';
import { UpdateIssueCommandInput } from '../commands/UpdateIssueCommand';
import { IssueCreateDto } from '../dtos/IssueCreateDto';
import { IssueDto } from '../dtos/IssueDto';

export class IssueMapper {
  static toDto = (issue: Issue): IssueDto => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    status: issue.status,
    createdAt: issue.createdAt.toISOString(),
    updatedAt: issue.updatedAt.toISOString(),
    createdBy: issue.createdBy,
    assignedTo: issue.assignedTo,
  });

  static fromCreateDto = (dto: IssueCreateDto): Issue =>
    Issue.create(dto.title, dto.description, dto.createdBy);
}
