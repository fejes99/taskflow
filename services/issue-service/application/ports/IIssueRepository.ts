import { Issue } from '../../domain/entities/Issue';

export interface IIssueRepository {
  findAll(): Promise<Issue[]>;
  findById(id: string): Promise<Issue | null>;
  create(issue: Issue): Promise<Issue>;
  update(issue: Issue): Promise<Issue>;
  delete(id: string): Promise<void>;
}
