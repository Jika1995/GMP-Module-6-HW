import { ProductEntity } from "./product.entity.js";

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string; //uuid
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface CartItemRequestBody {
  product: string;
  count: number;
}