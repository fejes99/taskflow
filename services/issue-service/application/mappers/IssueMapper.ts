import { Issue } from '../../domain/entities/Issue';
import { IssueDto } from '../dtos/IssueDto';

export class IssueMapper {
  static toDto(issue: Issue): IssueDto {
    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      status: issue.status,
      createdAt: issue.createdAt.toISOString(),
    };
  }

  static fromDto(dto: IssueDto): Issue {
    return new Issue(
      dto.id,
      dto.title,
      dto.description,
      dto.status,
      new Date(dto.createdAt),
    );
  }
}
