export abstract class BaseError extends Error {
  public abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  serialize(): { message: string } {
    return { message: this.message };
  }
}
