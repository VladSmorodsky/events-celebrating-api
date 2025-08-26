import { body, type CustomValidator } from 'express-validator';
import type { CreateUserDTO } from '../dto/userDto.ts';
import { ApiError } from '../errors/ApiError.ts';
import User from '../models/userModel.ts';

const isUserEmailExists: CustomValidator = async (email: string) => {
  const user = await User.find({ email: email });
  if (user) {
    throw new ApiError('Email already in use', 422);
  }
  return true;
};

export const createUserValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2 })
    .withMessage('Name must have at least 2 symbols.'),
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Email must be valid.')
    .normalizeEmail()
    .custom(isUserEmailExists),
  body('password').trim().notEmpty().isLength({ min: 8 }).withMessage('Password is required'),
  body('confirm_password')
    .trim()
    .notEmpty()
    .withMessage('Password Confirmation is required.')
    .custom((value, { req }) => {
      const reqBody: CreateUserDTO = req.body as CreateUserDTO;
      if (value !== reqBody.password) {
        throw new ApiError('Passwords do not match.', 422);
      }

      return true;
    }),
];
