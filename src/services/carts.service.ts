import { CartRepository } from "../repositories/carts.repository.js"
import { OrderRepository } from "../repositories/orders.repository.js"
import { ProductRepository } from "../repositories/products.repository.js"
import { OrderEntity } from "../schemas/order.entity.js"
import { CartEntity, CartItemRequestBody } from "../schemas/cart.entity.js"

export const CartService = {
  getAll: async (): Promise<CartEntity[]> => {
    return await CartRepository.getAll();
  },
  getOneByUserId: async (userId: string): Promise<CartEntity> => {
    return await CartRepository.getOne(userId);
  },
  updateOneByUserId: async (userId: string, cartItemBody: CartItemRequestBody): Promise<CartEntity> => {
    const product = await ProductRepository.getOne(cartItemBody.product);
    if (!product) {
      const customError = {
        status: 400,
        message: "Products are not valid"
      };
      throw customError;
    }
    const cartItem = {
      product,
      count: cartItemBody.count
    };

    return await CartRepository.update(userId, cartItem);
  },
  makeUserCartEmpty: async (userId: string): Promise<CartEntity> => {
    return await CartRepository.makeEmpty(userId);
  },
  checkout: async (userId: string): Promise<OrderEntity> => {
    const cart = await CartRepository.getOne(userId);
    if (cart.items.length === 0) {
      const customError = {
        status: 400,
        message: "Cart is empty"
      };
      throw customError;
    }
    return await OrderRepository.create(userId, cart);
  },
};