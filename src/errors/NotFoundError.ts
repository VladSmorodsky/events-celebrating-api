import { ApiError } from './ApiError.ts';

export default class NotFoundError extends ApiError {
  constructor(message: string, code = 404) {
    super(message);
    this.statusCode = code;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
