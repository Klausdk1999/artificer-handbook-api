import { Router } from 'express';

import calcRouter from './calcRouter';

const router = Router();

router.use(calcRouter);

export default router;
