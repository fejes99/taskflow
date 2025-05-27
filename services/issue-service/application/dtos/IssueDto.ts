export interface IssueDto {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
}
