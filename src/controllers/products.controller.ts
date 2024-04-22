import { Request, Response } from 'express';
import { ProductService } from '../services/products.service.js';
import { MyCustomError } from "../utils/customError.js";
import { sendError, sendOk } from "../utils/utils.js";

export const ProductController = {
  getAllProducts: async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await ProductService.getAll();
      sendOk(res, 200, products);
    } catch (error) {
      console.error('Error fetching products:', error);
      sendError(res, 500, 'Internal Server Error');
    }
  },
  getProductById: async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;
    try {
      const product = await ProductService.getOneById(productId);
      sendOk(res, 200, product);
    } catch (error) {
      console.error(`Error fetching product with id ${ productId }:`, error);
      if (error instanceof MyCustomError) {
        sendError(res, error.status, error.message);
      } else {
        sendError(res, 500, 'Internal Server Error');
      }
    }
  }
}

