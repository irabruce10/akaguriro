import type { Sql } from 'postgres';
import { z } from 'zod';

export type Booking = {
  id: number;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numUsers: number;
  roomPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  roomId: number;
  userId: number;
};

export const bookingsSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  numNights: z.number().min(1),
  numUsers: z.number().min(1),
  roomPrice: z.number().min(0),
  extrasPrice: z.number().min(0),
  totalPrice: z.number().min(0),
  status: z.string().min(1).max(50),
  hasBreakfast: z.boolean(),
  isPaid: z.boolean(),
  observations: z.string().max(250),
  roomId: z.number().min(1),
  userId: z.number().min(1),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE bookings (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      start_date timestamp NOT NULL,
      end_date timestamp NOT NULL,
      num_nights integer NOT NULL,
      num_users integer NOT NULL,
      room_price numeric NOT NULL,
      extras_price numeric NOT NULL,
      total_price numeric NOT NULL,
      status varchar(50) NOT NULL,
      has_breakfast boolean NOT NULL,
      is_paid boolean NOT NULL,
      observations varchar(250) NOT NULL,
      apartment_id integer NOT NULL REFERENCES apartments (id) ON DELETE cascade ON UPDATE cascade
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE bookings; `;
}
//  / / cascade user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade ON UPDATE
