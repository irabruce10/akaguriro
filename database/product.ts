// import type { Products } from '../migrations/00000-createTableProducts';
import { sql } from './connect';
type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string | null;
  image: string;
  quantity: number;
  countInStock: number | null;
};

export const getProductsInsecure = async () => {
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
  `;

  return products;
};

export const getProductInsecure = async (id: number) => {
  const [products] = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;

  return products;
};
