import { CartEntity, CartItemEntity } from "schemas/cart.entity";
import { readFileSync, writeFileSync } from 'fs';
import { randomUUID } from "crypto";

let carts: CartEntity[] = loadCarts();

function loadCarts(): CartEntity[] {
  try {
    const data = readFileSync('src/db/carts.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return []
  }
};

function saveCarts() {
  try {
    writeFileSync("src/db/carts.json", JSON.stringify(carts), "utf-8")
    console.log(`Cart saved successfully!`)
  } catch (error) {
    console.log(`Error : ${ error }`)
  }
};

export const getCarts = async (): Promise<CartEntity[]> => {
  const carts = await loadCarts()
  return carts;
}

export const getCartById = async (cartId: string) => {
  const carts = await loadCarts();
  const cart = carts.find((c: CartEntity) => c.id === cartId);
  if (!cart) {
    throw new Error(`Cart with this id: ${ cartId } not found`)
  }
  return cart;
};

export const getCartByUserId = async (userId: string) => {
  const carts = await loadCarts();
  const cart = carts.find((c: CartEntity) => c.userId === userId);
  if (!cart) {
    const newCart = {
      id: randomUUID(),
      userId,
      isDeleted: false,
      items: []
    };
    carts.push(newCart);
    return newCart;
  }
  return cart;
}

export const updateUserCartByUserId = async (userId: string, cartItem: CartItemEntity) => {
  const cart = await getCartByUserId(userId);
  let cartItemIdx = cart?.items.findIndex((item) => item.product.id === cartItem.product.id);

  if (cartItem.count === 0) {
    cart.items.splice(cartItemIdx, 1);
  };

  if (!cartItemIdx) {
    cart.items.push(cartItem);
  };

  cart.items[cartItemIdx] = { ...cartItem }
  saveCarts();
  return cart;
}

export const makeUserCartEmpty = async (userId: string) => {
  const carts = await loadCarts();
  const cart = await getCartByUserId(userId);
  const cartByIdx = carts.findIndex((item) => item.userId === userId);
  carts[cartByIdx] = { ...cart, items: [] }
  saveCarts();
}