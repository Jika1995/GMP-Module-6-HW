import { Request, Response } from 'express';
import { getProductById, getProducts } from 'repositories/products.repository';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).send(`Product with id: ${ productId } does not exist`)
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  };
};

