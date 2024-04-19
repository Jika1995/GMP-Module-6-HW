import express from 'express';
import { CartController } from 'controllers/cart.controller';
import { joiMiddleware } from 'middlewares/joi.middleware';
import { schemas } from 'schemas/schemas';

export const cartRouter = express.Router();

cartRouter.get('/profile/cart', CartController.getUserCart);
cartRouter.put('/profile/cart', joiMiddleware(schemas.cartItemPOST), CartController.updateUserCart);
cartRouter.delete('/profile/cart', CartController.deleteUserCart);
cartRouter.post('/profile/cart/checkout', CartController.updateUserCart)