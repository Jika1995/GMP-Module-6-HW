import { OrderRepository } from "../repositories/orders.repository.js";
import { OrderEntity } from "../schemas/order.entity.js";

export const OrderService = {
  getAll: async (): Promise<OrderEntity[]> => {
    return await OrderRepository.getAll();
  },
  getOneByUserId: async (userId: string): Promise<OrderEntity> => {
    return await OrderRepository.getOne(userId);
  },
}