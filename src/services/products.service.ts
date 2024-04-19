import { ProductRepository } from "repositories/products.repository";
import { ProductEntity } from "schemas/product.entity";

export const ProductService = {
  getAll: async (): Promise<ProductEntity[]> => {
    return await ProductRepository.getAll();
  },
  getOneById: async (productId: string): Promise<ProductEntity> => {
    return await ProductRepository.getOne(productId);
  }
}