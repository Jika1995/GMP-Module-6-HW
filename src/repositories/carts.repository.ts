import { randomUUID } from "crypto";
import { readFile, writeFile } from 'fs/promises';
import { CartEntity, CartItemEntity } from "../schemas/cart.entity.js";
import { MyCustomError } from "../utils/customError.js";

const CARTS_FILE_PATH = 'src/db/carts.json';

async function loadCarts(): Promise<CartEntity[]> {
  try {
    const data = await readFile(CARTS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading carts:', err);
    return [];
  }
}

async function saveCarts(carts: CartEntity[]): Promise<void> {
  try {
    await writeFile(CARTS_FILE_PATH, JSON.stringify(carts), "utf-8")
    console.log(`Carts saved successfully!`)
  } catch (error) {
    console.error('Error saving carts:', error);
  }
}

export const CartRepository = {
  getAll: async (): Promise<CartEntity[]> => {
    const carts = await loadCarts()
    return carts;
  },
  getOne: async (userId: string): Promise<CartEntity> => {
    const carts = await loadCarts();
    const cart = carts.find((c: CartEntity) => c.userId === userId);
    if (!cart) {
      const newCart = {
        id: randomUUID(),
        userId,
        isDeleted: false,
        items: []
      };
      try {
        carts.push(newCart);
        saveCarts(carts);
        return newCart;
      } catch (error) {
        console.error('Error creating cart as it did not exist:', error);
        throw error; // Propagate the error to the caller
      }
    };
    return cart;
  },
  update: async (userId: string, cartItem: CartItemEntity): Promise<CartEntity> => {
    const carts = await loadCarts();
    const cart = carts.find((c: CartEntity) => c.userId === userId);
    if (!cart) {
      throw new MyCustomError(404, `Cart was not found`);
    };

    const cartIdx = carts.findIndex((item) => item.id === cart.id);
    let cartItemIdx = cart?.items.findIndex((item) => item.product.id === cartItem.product.id);

    if (cartItem.count === 0) {
      cart.items.splice(cartItemIdx, 1);
    };

    if (cartItemIdx === -1) {
      cart.items.push(cartItem);
    };

    cart.items[cartItemIdx] = { ...cartItem };
    carts[cartIdx] = { ...cart };
    await saveCarts(carts);
    return cart;
  },
  makeEmpty: async (userId: string): Promise<CartEntity> => {
    const carts = await loadCarts();
    const cart = carts.find((item) => item.userId === userId);
    if (!cart) {
      throw new MyCustomError(404, `Cart was not found`);
    };
    cart.items = [];
    const cartIdx = carts.findIndex((item) => item.userId === userId);

    try {
      carts[cartIdx] = { ...cart };
      await saveCarts(carts);
      return cart;
    } catch (error) {
      console.error('Error making cart empty failed with error:', error);
      throw error; // Propagate the error to the caller
    }
  },
};