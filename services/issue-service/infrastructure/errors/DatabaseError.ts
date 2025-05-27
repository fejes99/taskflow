import { BaseError } from '../../shared/errors/BaseError';

export class DatabaseError extends BaseError {
  public statusCode = 500;

  constructor(message: string = 'Database operation failed') {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
