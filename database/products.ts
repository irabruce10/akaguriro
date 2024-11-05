import { sql } from './connect';
import type { Session } from '../migrations/00006-createTableSessions.js';
import type { Product } from '../migrations/00007-createTableProducts';

export const getProductsInsecure = async (sessionToken: Session['token']) => {
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = products.user_id
        AND expiry_timestamp > now()
      )
  `;

  return products;
};

export const getProductInsecure = async (
  sessionToken: Session['token'],
  productId: Product['id'],
) => {
  const [product] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = products.user_id
        AND expiry_timestamp > now()
      )
    WHERE
      id = ${productId}
  `;

  return product;
};

export const createProductInsecure = async (
  sessionToken: Session['token'],
  name: Product['name'],
  price: Product['price'],
  address: Product['address'],
) => {
  const [product] = await sql<Product[]>`
    INSERT INTO
      products (user_id, name, price, address) (
        SELECT
          user_id,
          ${name},
          ${price},
          ${address}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
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
      name = ${updatedProduct.name},
      price = ${updatedProduct.price},
      address = ${updatedProduct.address}
    WHERE
      id = ${updatedProduct.id}
    RETURNING
      products.*
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
