import { OrderEntity } from "schemas/order.entity";
import { randomUUID } from "crypto";
import { CartEntity } from "schemas/cart.entity";
import { countTotal } from "utils/utils";
import { readFile, writeFile } from 'fs/promises';

const ORDERS_FILE_PATH = 'src/db/orders.json';

async function loadOrders(): Promise<OrderEntity[]> {
  try {
    const data = await readFile(ORDERS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading orders:', err);
    return [];
  }
};

async function saveOrders(orders: OrderEntity[]): Promise<void> {
  try {
    await writeFile(ORDERS_FILE_PATH, JSON.stringify(orders), "utf-8")
    console.log(`Orders saved successfully!`)
  } catch (error) {
    console.error('Error saving orders:', error);
  }
};

export const OrderRepository = {
  getAll: async (): Promise<OrderEntity[]> => {
    const orders = await loadOrders()
    return orders;
  },
  getOne: async (orderId: string): Promise<OrderEntity> => {
    const orders = await loadOrders();
    const order = orders.find((p: OrderEntity) => p.id === orderId);
    if (!order) {
      const customError = {
        status: 404,
        message: `Order with this id: ${ orderId } not found`,
      };
      throw customError;
    }
    return order;
  },
  create: async (userId: string, cart: CartEntity): Promise<OrderEntity> => {

    const cartMockDetails: Omit<OrderEntity, 'id' | 'userId' | 'cartId' | 'total' | 'status' | 'items'> = {
      payment: {
        type: 'paypal',
        address: 'London',
        creditCard: '1234-1234-1234-1234'
      },
      delivery: {
        type: 'post',
        address: 'London'
      },
      comments: 'Deliver on time'
    }
    const newOrder: OrderEntity = {
      id: randomUUID(),
      userId,
      cartId: cart.id,
      items: cart.items,
      payment: cartMockDetails.payment,
      delivery: cartMockDetails.delivery,
      comments: cartMockDetails.comments,
      status: 'created',
      total: countTotal(cart.items)
    };

    try {
      const orders = await loadOrders();
      orders.push(newOrder);
      await saveOrders(orders);
      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error; // Propagate the error to the caller
    }
  },
}