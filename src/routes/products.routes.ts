import express from 'express';
import { ProductController } from 'controllers/products.controller';

export const productsRouter = express.Router();

productsRouter.get('/products', ProductController.getAllProducts);
productsRouter.get('/:productId', ProductController.getProductById);