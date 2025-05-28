export interface IssueDto {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  assignedTo: string | null;
}
