import type { Request, Response, NextFunction } from 'express';
import User from '../models/userModel.ts';
import type { CreateUserDTO } from '../dto/userDto.ts';
import { validationResult } from 'express-validator';

export const signUp = async (req: Request, res: Response, _next: NextFunction): Promise<Response | void> => {
  const errors = validationResult(req);
  errors.throw();

  const requestBody: CreateUserDTO = req.body as CreateUserDTO;
  const user = new User(requestBody);
  const savedUser = await user.save();

  res.status(200).json({ user: savedUser });
};
