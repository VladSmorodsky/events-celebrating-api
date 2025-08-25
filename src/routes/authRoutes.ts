import { Router } from 'express';
import { signUp } from '../controllers/authController.ts';
import { catchAsync } from '../utils/catchAsync.ts';
import { createUserValidator } from '../validations/requestValidations.ts';

const router = Router();

router.post('/sign-up', createUserValidator, catchAsync(signUp));

export default router;
