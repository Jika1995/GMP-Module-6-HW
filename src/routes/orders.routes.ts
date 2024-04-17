import express from 'express';
import { createUserOrder } from 'controllers/orders.controller';
export const ordersRouter = express.Router();

ordersRouter.post('/profile/cart/checkout', createUserOrder);
