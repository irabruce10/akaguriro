import type { Sql } from 'postgres';
import { z } from 'zod';

export type User = {
  id: number;
  name: string;
};

export type Apartment = {
  id: number;
  name: string;
  rooms: number;
  maxCapacity: number;
  price: number;
  description: string;
  location: string;
  imagesUrl: string[];
  userId: number;
};

// place: string;
export const apartmentsSchema = z.object({
  name: z.string().min(1).max(50),
  rooms: z.number().min(0),
  maxCapacity: z.number().min(0),
  price: z.number().min(2),
  description: z.string().max(550),
  location: z.string().min(1).max(100),
  imagesUrl: z.array(z.string()),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE apartments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(50) NOT NULL,
      rooms integer NOT NULL,
      max_capacity integer NOT NULL,
      price integer NOT NULL,
      description text NOT NULL,
      location text NOT NULL,
      images_url TEXT[] NOT NULL,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE apartments; `;
}
