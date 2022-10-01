import { Router } from 'express';
import calcController from '../controllers/calcController';
// import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
// import { calcCreateDataSchema } from '../schemas/calcCreateData';
// import { calcUseDataSchema } from '../schemas/calcUseData';

const calcRouter = Router();

calcRouter.post(
  '/4sides',
  calcController.fourSides
);
calcRouter.post(
  '/materials',
  calcController.materialBuying
);

export default calcRouter;
