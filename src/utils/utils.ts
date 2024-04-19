import { Request, Response } from "express";
import { CartItemEntity } from "schemas/cart.entity";
import { MyCustomError } from "./customError";

export const countTotal = (items: CartItemEntity[]) => {
  let total = 0;

  items.forEach((item) => {
    const productTotalPrice = item.product.price * item.count;
    total = total + productTotalPrice;
  });

  return total;
};

export const sendOk = (res: Response, statusCode: number, data: any) => {
  const response = {
    data,
    error: null
  };

  return res.status(statusCode).json(response);
};

export const sendError = (res: Response, statusCode: number, errorMessage: string) => {
  const response = {
    data: null,
    error: {
      message: errorMessage
    }
  };

  return res.status(statusCode).json(response);
}

// export const parseRequestBody = (req: any) => new Promise((resolve, reject) => {
//   let body = '';

//   req.on('data', (chunk: any) => {
//     body += chunk.toString();
//   });

//   req.on('end', () => {
//     resolve(JSON.parse(body));
//   });

//   req.on('error', (error: Error) => {
//     reject(error);
//   });
// });