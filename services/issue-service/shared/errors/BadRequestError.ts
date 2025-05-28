import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  public statusCode = 400;
  public details?: Record<string, string[]>;

  constructor(
    message: string = 'Bad request',
    details?: Record<string, string[]>,
  ) {
    super(message);
    this.details = details;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
