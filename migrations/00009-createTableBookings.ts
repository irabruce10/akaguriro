import type { Sql } from 'postgres';
import { z } from 'zod';

export type Booking = {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  breakfast: boolean;
  totalPrice: number;
  status: string;
  apartmentId: number;
  userId: number;
};

export const bookingsSchema = z.object({
  startDate: z.string().min(1),
  endDate: z.string().min(1),

  numNights: z.number().min(1),
  numGuests: z.number().min(1),
  breakfast: z.boolean(),
  totalPrice: z.number(),
  status: z.string().min(1).max(50),
  apartmentId: z.number(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE bookings (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      start_date varchar NOT NULL,
      end_date varchar NOT NULL,
      num_nights integer NOT NULL,
      num_guests integer NOT NULL,
      breakfast boolean NOT NULL,
      total_price numeric NOT NULL,
      status varchar(250) NOT NULL,
      apartment_id integer NOT NULL REFERENCES apartments (id) ON DELETE cascade ON UPDATE cascade,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade ON UPDATE cascade
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE bookings; `;
}
