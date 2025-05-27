import { Issue } from '../../domain/entities/Issue';

export interface IIssueRepository {
  findAll(): Promise<Issue[]>;
}
