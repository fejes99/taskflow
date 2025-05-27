export type IssueStatus = 'open' | 'in-progress' | 'resolved';

export class Issue {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public status: IssueStatus,
    public readonly createdAt: Date,
  ) {}

  public assign(): void {
    if (this.status !== 'open') {
      throw new Error('Only open issues can be assigned.');
    }
    this.status = 'in-progress';
  }

  public resolve(): void {
    if (this.status !== 'in-progress') {
      throw new Error('Only in-progress issues can be resolved.');
    }
    this.status = 'resolved';
  }

  public reopen(): void {
    if (this.status !== 'resolved') {
      throw new Error('Only resolved issues can be reopened.');
    }
    this.status = 'open';
  }
}
