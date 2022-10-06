import { Request, Response } from 'express';
import userService from '../services/userService';

async function signUp(req: Request, res: Response) {
  const user = req.body;
  const CreateUserData = {
    username: user.username,
    email: user.email,
    password: user.password
  }
  await userService.signUp(CreateUserData);

  res.sendStatus(201);
}

async function signIn(req: Request, res: Response) {
  const user = req.body;
  const tokenIdUsername = await userService.signIn(user);

  res.send( tokenIdUsername );
}

const userController = {
  signUp,
  signIn
};

export default userController;
