import joi from 'joi';

export const quadrilateralSchema = joi.object({
  angleLocation: joi.string().required(),
  base: joi.number().min(0).required(),
  left: joi.number().min(0).required(),
  top: joi.number().min(0).required(),
  right: joi.number().min(0).required(),
  angle: joi.number().min(0).required()
});
