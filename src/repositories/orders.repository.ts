import { OrderEntity } from "schemas/order.entity";
import { readFileSync, writeFileSync } from 'fs';
import { randomUUID } from "crypto";
import { getCartByUserId } from "./carts.repository";
import { CartItemEntity } from "schemas/cart.entity";

let orders: OrderEntity[] = loadOrders();

function loadOrders(): OrderEntity[] {
  try {
    const data = readFileSync('src/db/orders.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return []
  }
};

function saveOrders() {
  try {
    writeFileSync("src/db/orders.json", JSON.stringify(orders), "utf-8")
    console.log(`Order saved successfully!`)
  } catch (error) {
    console.log(`Error : ${ error }`)
  }
};

export const getOrders = async (): Promise<OrderEntity[]> => {
  const orders = await loadOrders()
  return orders;
}

export const getOrderById = async (orderId: string) => {
  const orders = await loadOrders();
  const order = orders.find((p: OrderEntity) => p.id === orderId);
  if (!order) {
    throw new Error(`Order with this id: ${ orderId } not found`)
  }
  return order;
};

export const createOrder = async (userId: string, cartDetails: Omit<OrderEntity, 'id' | 'userId' | 'cartId' | 'total' | 'status'>) => {
  const cart = await getCartByUserId(userId);
  const newOrder: OrderEntity = {
    id: randomUUID(),
    userId,
    cartId: cart.id,
    items: cart.items,
    payment: cartDetails.payment,
    delivery: cartDetails.delivery,
    comments: cartDetails.comments,
    status: 'created',
    total: countTotal(cart.items)
  };

  const orders = await loadOrders();
  orders.push(newOrder);
  saveOrders();
};

export const countTotal = (items: CartItemEntity[]) => {
  let total = 0;

  items.forEach((item) => {
    const productTotalPrice = item.product.price * item.count;
    total = total + productTotalPrice;
  });

  return total;
};
