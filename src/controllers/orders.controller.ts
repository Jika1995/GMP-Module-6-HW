import { Request, Response } from 'express';
import { createOrder } from 'repositories/orders.repository';

export const createUserOrder = ((req: Request, res: Response) => {
  try {
    const userId = req.get('x-user-id');
    if (!userId) {
      return res.status(400).send(`Missing fields in header: x-user-id`)
    };

    const order = createOrder(userId, req.body);
    res.status(200).json(order);
  } catch (err) {
    console.log(`Error : ${ err }`)
  }
});