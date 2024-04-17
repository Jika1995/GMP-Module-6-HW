import express from 'express';
import { deleteUserCart, getUserCart, updateUserCart } from 'controllers/cart.controller';

export const cartRouter = express.Router();

cartRouter.get('/profile/cart', getUserCart);
cartRouter.put('/profile/cart', updateUserCart);
cartRouter.delete('/profile/cart', deleteUserCart);