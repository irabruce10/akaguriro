import type { Sql } from 'postgres';
import { z } from 'zod';

export type Guest = {
  id: number;
  fullName: string;
  email: string;
  nationality: string;
  countryFlag: string;
  nationalId: string;
};

export const guestsSchema = z.object({
  fullName: z.string().min(1).max(50),
  email: z.string().email(),
  nationality: z.string().min(1).max(50),
  countryFlag: z.string().min(1).max(250),
  nationalId: z.string().min(1).max(50),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE guests (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      fullname varchar(50) NOT NULL,
      email varchar(50) NOT NULL,
      nationality varchar(50) NOT NULL,
      countryflag varchar(250) NOT NULL,
      nationalid varchar(50) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE guests; `;
}
