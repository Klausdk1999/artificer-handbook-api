import { Router } from 'express';
import userController from '../controllers/userController';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
import { userSchema } from '../schemas/userSchema';

const userRouter = Router();

userRouter.post(
  '/sign-up',
  validateSchemaMiddleware(userSchema),
  userController.signUp
);
userRouter.post(
  '/sign-in',
  validateSchemaMiddleware(userSchema),
  userController.signIn
);

export default userRouter;
