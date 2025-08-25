export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, code = 500) {
    super(message);
    this.statusCode = code;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
