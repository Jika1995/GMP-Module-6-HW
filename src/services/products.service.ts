import { ProductRepository } from "../repositories/products.repository.js";
import { ProductEntity } from "../schemas/product.entity.js";

export const ProductService = {
  getAll: async (): Promise<ProductEntity[]> => {
    return await ProductRepository.getAll();
  },
  getOneById: async (productId: string): Promise<ProductEntity> => {
    return await ProductRepository.getOne(productId);
  }
}