import Joi from 'joi';

export const schemas = {
  cartItemPOST: Joi.object().keys({
    product: Joi.string().uuid().required(),
    count: Joi.number().required()
  }),
}