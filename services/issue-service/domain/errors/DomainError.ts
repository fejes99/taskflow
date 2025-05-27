import { BaseError } from '../../shared/errors/BaseError';

export class DomainError extends BaseError {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}
