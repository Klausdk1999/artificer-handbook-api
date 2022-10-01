import { Router } from 'express';
import userController from '../controllers/userController';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
import { userSchema } from '../schemas/userSchema';
import { loginSchema } from '../schemas/loginSchema';

const userRouter = Router();

userRouter.post(
  '/sign-up',
  validateSchemaMiddleware(userSchema),
  userController.signUp
);
userRouter.post(
  '/sign-in',
  validateSchemaMiddleware(loginSchema),
  userController.signIn
);

export default userRouter;
