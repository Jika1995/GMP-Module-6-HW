import { OrderRepository } from "repositories/orders.repository";
import { OrderEntity } from "schemas/order.entity";

export const OrderService = {
  getAll: async (): Promise<OrderEntity[]> => {
    return await OrderRepository.getAll();
  },
  getOneByUserId: async (userId: string): Promise<OrderEntity> => {
    return await OrderRepository.getOne(userId);
  },
}