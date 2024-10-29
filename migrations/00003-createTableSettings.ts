import type { Sql } from 'postgres';
import { z } from 'zod';

export type Setting = {
  id: number;
  minBookings: number;
  maxBookings: number;
  maxSettingsPerBooking: number;
  breakFastPrice: number;
};

export const settingsSchema = z.object({
  minBookings: z.number().min(1),
  maxBookings: z.number().min(1),
  maxSettingsPerBooking: z.number().min(1),
  breakfastPrice: z.number().min(0),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE settings (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      min_bookings integer NOT NULL,
      max_bookings integer NOT NULL,
      max_settings_per_booking integer NOT NULL,
      breakfast_price numeric NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE settings; `;
}
