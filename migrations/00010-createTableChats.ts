import type { Sql } from 'postgres';
import { z } from 'zod';

export type Chat = {
  id: number;
  message: string;
  createdAt: string;
  apartmentId: number;
  userId: number;
};

export const chatsSchema = z.object({
  message: z.string().min(1),
  createdAt: z.string(),
  apartmentId: z.number(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE chats (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      message varchar(250) NOT NULL,
      created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      apartment_id integer NOT NULL REFERENCES apartments (id) ON DELETE cascade ON UPDATE cascade,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade ON UPDATE cascade
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE chats; `;
}
