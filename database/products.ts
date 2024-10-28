// import type { Products } from '../migrations/00000-createTableProducts';
import type { Product } from '../migrations/00000-createTableProducts';
import { sql } from './connect';

export const getProductsInsecure = async () => {
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;

  return products;
};

export const getProductInsecure = async (productId: Product['id']) => {
  const [product] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${productId}
  `;

  return product;
};

export const createProductInsecure = async (
  newProduct: Omit<Product, 'id'>,
) => {
  const [product] = await sql<Product[]>`
    INSERT INTO
      products (name, price, address)
    VALUES
      (
        ${newProduct.name},
        ${newProduct.price},
        ${newProduct.address}
      )
    RETURNING
      products.*
  `;
  return product;
};

export const updateProductInsecure = async (updatedProduct: Product) => {
  const [product] = await sql<Product[]>`
    UPDATE guests
    SET
      first_name = ${updatedProduct.name},
      last_name = ${updatedProduct.price},
      attending = ${updatedProduct.address}
    WHERE
      id = ${updatedProduct.id}
    RETURNING
      guests.*
  `;
  return product;
};

export const deleteProductInsecure = async (productId: Product['id']) => {
  const [product] = await sql<Product[]>`
    DELETE FROM products
    WHERE
      id = ${productId}
    RETURNING
      products.*
  `;
  return product;
};
