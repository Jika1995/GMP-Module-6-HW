import { CartRepository } from "../repositories/carts.repository.js"
import { OrderRepository } from "../repositories/orders.repository.js"
import { ProductRepository } from "../repositories/products.repository.js"
import { OrderEntity } from "../schemas/order.entity.js"
import { CartEntity, CartItemRequestBody } from "../schemas/cart.entity.js"
import { MyCustomError } from "../utils/customError.js"

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
      throw new MyCustomError(400, `Products are not valid`);
    }
    const cartItem = {
      product,
      count: cartItemBody.count
    };
    console.log('cartItem to upd', cartItem)
    return await CartRepository.update(userId, cartItem);
  },
  makeUserCartEmpty: async (userId: string): Promise<CartEntity> => {
    return await CartRepository.makeEmpty(userId);
  },
  checkout: async (userId: string): Promise<OrderEntity> => {
    const cart = await CartRepository.getOne(userId);
    if (cart.items.length === 0) {
      throw new MyCustomError(400, `Cart is empty`);
    }
    return await OrderRepository.create(userId, cart);
  },
};