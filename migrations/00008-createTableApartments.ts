import type { Sql } from 'postgres';
import { z } from 'zod';

export type Apartment = {
  id: number;
  name: string;
  rooms: number;
  maxCapacity: number;
  imagesUrl: string[];
  userId: number;
};
// regular_price: number;
// discount_price: number;
// description: string;

// place: string;
export const apartmentsSchema = z.object({
  name: z.string().min(1).max(50),
  rooms: z.number().min(0),
  maxCapacity: z.number().min(0),
  imagesUrl: z.array(z.string()),
});
// regular_price: z.number().min(2),
// discount_price: z.number().min(2),
// description: z.string().max(250),
// image: z.string().max(250),
// place: z.string().min(1).max(100),
export async function up(sql: Sql) {
  await sql`
    CREATE TABLE apartments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(50) NOT NULL,
      rooms integer NOT NULL,
      max_capacity integer NOT NULL,
      images_url TEXT[] NOT NULL,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
    );
  `;
}

// regular_price numeric NOT NULL,
// discount_price numeric NOT NULL,
// description varchar(250) NOT NULL,
// image varchar(250) NOT NULL,
// place varchar(100) NOT NULL

export async function down(sql: Sql) {
  await sql` DROP TABLE apartments; `;
}
