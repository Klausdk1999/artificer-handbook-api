import { Router } from 'express';

import calcRouter from './calcRouter';
import userRouter from './userRouter';
import projectRouter from './projectRouter';

const router = Router();

router.use(calcRouter);
router.use(userRouter);
router.use(projectRouter);

export default router;
