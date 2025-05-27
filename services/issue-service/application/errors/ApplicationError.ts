export class ApplicationError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
