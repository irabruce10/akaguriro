import type { Sql } from 'postgres';
import { z } from 'zod';

export type Product = {
  id: number;
  name: string;
  price: string;
  address: string;
  // description: string;
  // category: string | null;
  // image: string;
  // quantity: number;
  // owner: string;
};

export const productsSchema = z.object({
  name: z.string().min(1).max(50),
  price: z.string().min(0),
  address: z.string().min(1).max(100),
  // description: z.string().min(1).max(250),
  // category: z.string().nullable(),
  // image: z.string().min(1).max(250),
  // quantity: z.number().min(1),
  // owner: z.string().min(1).max(50),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(50) NOT NULL,
      price numeric CHECK (price > 0) NOT NULL,
      address varchar(100) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE products; `;
}

// / / address varchar(100) NOT NULL,
//   / / description varchar(250) NOT NULL,
//   / / category varchar(250),
//   / / image varchar(250) NOT NULL,
//   / / quantity integer NOT NULL,
//   / / owner varchar(50) NOT NULL
