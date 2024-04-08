export class CriticalError extends Error {
  readonly error: Error;

  constructor(err: Error, message = "Something went wrong. Please, try again later.") {
    super(message);
    this.error = err;
  }
}
