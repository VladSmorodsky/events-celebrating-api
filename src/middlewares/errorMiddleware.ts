import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../errors/ApiError.ts';

export const errorMiddleware = (error: unknown, req: Request, res: Response, _next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped();
    const fieldName = Object.keys(mappedErrors)[0]!;
    return res.status(422).json({
      message: mappedErrors[fieldName]?.msg as string,
      field: fieldName,
    });
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof Error) {
    return res.status(500).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Unexpected error' });
};
