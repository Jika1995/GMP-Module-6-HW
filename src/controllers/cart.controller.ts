import { Request, Response } from 'express';
import { getCartByUserId, makeUserCartEmpty, updateUserCartByUserId } from 'repositories/carts.repository';

export const getUserCart = (async (req: Request, res: Response) => {
  try {
    const userId = req.get('x-user-id');
    if (!userId) {
      return res.status(400).send(`Missing fields in header: x-user-id`)
    };
    const cart = await getCartByUserId(userId);
    res.json(cart);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
})

export const updateUserCart = ((req: Request, res: Response) => {
  try {
    const userId = req.get('x-user-id');
    if (!userId) {
      return res.status(400).send(`Missing fields in header: x-user-id`)
    };

    const cart = updateUserCartByUserId(userId, req.body);
    res.status(200).json(cart)
  } catch (err) {
    console.log(`Error : ${ err }`)
  }
});

export const deleteUserCart = ((req: Request, res: Response) => {
  try {
    const userId = req.get('x-user-id');
    if (!userId) {
      return res.status(400).send(`Missing fields in header: x-user-id`)
    };

    makeUserCartEmpty(userId);
    res.status(200).json('Cart is empty. You successfully deleted all items')
  } catch (err) {
    console.log(`Error : ${ err }`)
  }
});