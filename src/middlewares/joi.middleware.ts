import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { sendError } from '../utils/utils.js';
export const joiMiddleware = (schema: Joi.ObjectSchema<any>, property?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i: Joi.ValidationErrorItem) => i.message).join(',');
      console.error('joierror', message);
      sendError(res, 422, `Products are not valid: ${ message }`);
    }
  }
}