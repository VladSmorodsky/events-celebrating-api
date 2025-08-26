import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/userModel.ts';
import type { CreateUserDTO } from '../dto/userDto.ts';
import { hashPassword } from '../services/passwordService.ts';

export const signUp = async (req: Request, res: Response, _next: NextFunction): Promise<Response | void> => {
  const errors = validationResult(req);
  errors.throw();

  const requestBody: CreateUserDTO = req.body as CreateUserDTO;
  const hashedPassword = await hashPassword(requestBody.password);
  const user = new User({
    name: requestBody.name,
    email: requestBody.email,
    password: hashedPassword,
  });
  const savedUser = await user.save();

  res.status(200).json({ user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } });
};
