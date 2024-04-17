import { ProductEntity } from "schemas/product.entity";
import { readFileSync, writeFileSync } from 'fs';
import { randomUUID } from "crypto";

let products: ProductEntity[] = loadProducts();

function loadProducts(): ProductEntity[] {
  try {
    const data = readFileSync('src/db/products.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return []
  }
};

function saveProducts() {
  try {
    writeFileSync("src/db/products.json", JSON.stringify(products), "utf-8")
    console.log(`Product saved successfully!`)
  } catch (error) {
    console.log(`Error : ${ error }`)
  }
};

export const getProducts = async (): Promise<ProductEntity[]> => {
  const products = await loadProducts()
  return products;
}

export const getProductById = async (productId: string) => {
  const products = await loadProducts();
  const product = products.find((p: ProductEntity) => p.id === productId);
  if (!product) {
    throw new Error(`Product with this id: ${ productId } not found`)
  }
  return product;
};