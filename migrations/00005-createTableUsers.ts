// import type { Sql } from 'postgres';
// import { z } from 'zod';

// export type User = {
//   id: number;
//   name: string;
// };

// export const userSchema = z.object({
//   name: z.string().min(3),

//   password: z.string().min(3),
// });

// export async function up(sql: Sql) {
//   await sql`
//     CREATE TABLE users (
//       id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//       name varchar(80) NOT NULL UNIQUE,
//       password_hash varchar(80) NOT NULL
//     );
//   `;
// }

// export async function down(sql: Sql) {
//   await sql`DROP TABLE users`;
// }

import type { Sql } from 'postgres';
import { z } from 'zod';

export type User = {
  id: number;
  name: string;
  email: string;
};

export const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(3).email(),
  password: z.string().min(3),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(80) NOT NULL UNIQUE,
      email varchar(80) NOT NULL UNIQUE,
      password_hash varchar(280) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
