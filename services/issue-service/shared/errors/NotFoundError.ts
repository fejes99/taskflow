import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  public statusCode = 404;

  constructor(resource: string = 'Resource') {
    super(`${resource} not found.`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
