import { Request, Response } from 'express';
import { OrderService } from '../services/orders.service.js';
import { MyCustomError } from "../utils/customError.js";
import { sendError, sendOk } from "../utils/utils.js";

export const OrderController = {
  getAllOrders: async (req: Request, res: Response): Promise<void> => {
    try {
      const orders = await OrderService.getAll();
      sendOk(res, 200, orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      sendError(res, 500, 'Internal Server Error');
    }
  },
  getOrderByUserId: async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    try {
      const order = await OrderService.getOneByUserId(userId);
      sendOk(res, 200, order);
    } catch (error) {
      console.error(`Error fetching order of user with id ${ userId }:`, error);
      if (error instanceof MyCustomError) {
        sendError(res, error.status, error.message);
      } else {
        sendError(res, 500, 'Internal Server Error');
      }
    }
  },
}