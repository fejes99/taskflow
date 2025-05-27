import { BaseError } from '../../shared/errors/BaseError';

export class ValidationError extends BaseError {
  statusCode = 422;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
