import { Request, Response } from 'express';
import { CartService } from '../services/carts.service.js';
import { MyCustomError } from '../utils/customError.js';
import { countTotal, sendError, sendOk } from '../utils/utils.js';

export const CartController = {
  getAllCarts: async (req: Request, res: Response): Promise<void> => {
    try {
      const carts = await CartService.getAll();
      sendOk(res, 200, carts);
    } catch (error) {
      console.error('Error fetching carts:', error);
      sendError(res, 500, 'Internal Server Error');
    }
  },
  getUserCart: async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;
    try {
      const cart = await CartService.getOneByUserId(userId);
      const response = {
        cart,
        total: countTotal(cart.items)
      }
      sendOk(res, 200, response)
    } catch (error) {
      console.error(`Error fetching cart of user: ${ userId }`, error);
      sendError(res, 500, 'Internal Server Error');
    }
  },
  updateUserCart: async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;
    try {
      const cart = await CartService.updateOneByUserId(userId, req.body);
      const response = {
        cart,
        total: countTotal(cart.items)
      };
      sendOk(res, 201, response);
    } catch (error) {
      console.error(`Error updating cart of user: ${ userId }`, error);
      sendError(res, 500, 'Internal Server Error');
    }
  },
  deleteUserCart: async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;
    try {
      const cart = await CartService.makeUserCartEmpty(userId);
      if (cart) {
        const response = {
          success: true,
        }
        sendOk(res, 200, response)
      }
    } catch (error) {
      console.error(`Error updating cart of user: ${ userId }`, error);
      sendError(res, 500, 'Internal Server Error');
    }
  },
  checkout: async (req: Request, res: Response) => {
    const userId = req.headers["x-user-id"] as string;
    try {
      const order = await CartService.checkout(userId);
      sendOk(res, 200, order)
    } catch (error) {
      console.error(`Error creating order for user: ${ userId }:`, error);
      if (error instanceof MyCustomError) {
        sendError(res, error.status, error.message);
      } else {
        sendError(res, 500, 'Internal Server Error');
      }
    }
  }
}