import { Router } from 'express';

import calcRouter from './calcRouter';
import userRouter from './userRouter';

const router = Router();

router.use(calcRouter);
router.use(userRouter);
export default router;
