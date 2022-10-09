import { Request, Response } from 'express';
import calcService from '../services/calcService';

async function fourSides(req: Request, res: Response) {
  const { base, left, top, right, angle, angleLocation } = req.body;
  const result = await calcService.calcPieces(base,left,top,right,angle,angleLocation);

  res.send(result).status(200);
}

async function materialBuying(req: Request, res: Response) {
  const { desiredAmount, desiredSize, products } = req.body;
  const result = await calcService.simpleBestSplit(desiredAmount, desiredSize,products);

  res.send(result).status(200);
}

export default {
  materialBuying,
  fourSides
};
