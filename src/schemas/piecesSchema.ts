import joi from 'joi';

export const piecesSchema = joi.object({
  desiredAmount: joi.string().required(),
  desiredSize: joi.number().min(0).required(),
  products: joi.array().items({ 
    price:joi.number().required(),
    size:joi.number().required()
  }) 
});
 