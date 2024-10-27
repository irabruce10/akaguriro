import type { Sql } from 'postgres';
import { z } from 'zod';

export type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string | null;
  image: string;
  quantity: number;
  countInStock: number | null;
};

export const productsSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  image: z.string().min(1).max(250),
  category: z.string().nullable(),
  price: z.number().min(0),
  quantity: z.number().min(1),
  countInStock: z.number().nullable(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(50) NOT NULL,
      price numeric CHECK (price > 0) NOT NULL,
      description varchar(250) NOT NULL,
      category varchar(250),
      image varchar(250) NOT NULL,
      quantity integer NOT NULL,
      count_in_stock integer
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE products; `;
}
