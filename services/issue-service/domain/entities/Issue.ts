import { DomainError } from '../errors/DomainError';

export type IssueStatus = 'open' | 'in-progress' | 'resolved';

export class Issue {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public status: IssueStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public readonly createdBy: string,
    public assignedTo: string | null = null,
    public isDeleted: boolean = false,
  ) {}

  public static create(
    title: string,
    description: string,
    createdBy: string,
  ): Issue {
    return new Issue(
      crypto.randomUUID(),
      title,
      description,
      'open',
      new Date(),
      new Date(),
      createdBy,
      null,
      false,
    );
  }

  public updateDetails(update: {
    title?: string;
    description?: string;
  }): Issue {
    let modified = false;

    if (update.title && update.title !== this.title) {
      this.title = update.title;
      modified = true;
    }

    if (update.description && update.description !== this.description) {
      this.description = update.description;
      modified = true;
    }

    if (modified) this.updatedAt = new Date();

    return this;
  }

  public static fromPersistence(
    id: string,
    title: string,
    description: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: string,
    assignedTo: string | null,
    isDeleted: boolean = false,
  ): Issue {
    return new Issue(
      id,
      title,
      description,
      status as IssueStatus,
      createdAt,
      updatedAt,
      createdBy,
      assignedTo,
      isDeleted,
    );
  }

  public markDeleted(): Issue {
    return new Issue(
      this.id,
      this.title,
      this.description,
      this.status,
      this.createdAt,
      new Date(),
      this.createdBy,
      this.assignedTo,
      true,
    );
  }

  public assign(userId: string): void {
    if (this.status !== 'open')
      throw new DomainError('Only open issues can be assigned.');

    this.assignedTo = userId;
    this.status = 'in-progress';
    this.updatedAt = new Date();
  }

  public resolve(): void {
    if (this.status !== 'in-progress')
      throw new DomainError('Only in-progress issues can be resolved.');

    this.status = 'resolved';
    this.updatedAt = new Date();
  }

  public reopen(): void {
    if (this.status !== 'resolved')
      throw new DomainError('Only resolved issues can be reopened.');

    this.status = 'open';
    this.updatedAt = new Date();
  }
}
