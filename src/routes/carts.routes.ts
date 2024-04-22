import express from 'express';
import { CartController } from '../controllers/cart.controller.js';
import { joiMiddleware } from '../middlewares/joi.middleware.js';
import { schemas } from '../schemas/schemas.js';

export const cartRouter = express.Router();

cartRouter.get('/', CartController.getUserCart);
cartRouter.put('/', joiMiddleware(schemas.cartItemPOST), CartController.updateUserCart);
cartRouter.delete('/', CartController.deleteUserCart);
cartRouter.post('/checkout', CartController.checkout)