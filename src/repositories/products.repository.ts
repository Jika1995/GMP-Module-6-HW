import { ProductEntity } from "schemas/product.entity";
import { readFile, writeFile } from 'fs/promises';

const PRODUCTS_FILE_PATH = 'src/db/products.json';

async function loadProducts(): Promise<ProductEntity[]> {
  try {
    const data = await readFile(PRODUCTS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading products:', err);
    return [];
  }
}

async function saveProducts(products: ProductEntity[]): Promise<void> {
  try {
    await writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products), 'utf-8');
    console.log('Products saved successfully!');
  } catch (error) {
    console.error('Error saving products:', error);
  }
}

export const ProductRepository = {
  getAll: async (): Promise<ProductEntity[]> => {
    const products = await loadProducts();
    return products;
  },
  getOne: async (productId: string): Promise<ProductEntity> => {
    const products = await loadProducts();
    const product = products.find((p: ProductEntity) => p.id === productId);
    if (!product) {
      const customError = {
        status: 404,
        message: `Product with this id: ${ productId } not found`,
      };
      throw customError;
    }
    return product;
  },
}