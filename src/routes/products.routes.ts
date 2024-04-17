import express from 'express';
import { getAllProducts, getProduct } from 'controllers/products.controller';

export const productsRouter = express.Router();

productsRouter.get('/products', getAllProducts);
productsRouter.get('/:productId', getProduct);