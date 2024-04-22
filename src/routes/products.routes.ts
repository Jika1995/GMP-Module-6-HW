import express from 'express';
import { ProductController } from '../controllers/products.controller.js';

export const productsRouter = express.Router();

productsRouter.get('/', ProductController.getAllProducts);
productsRouter.get('/:productId', ProductController.getProductById);