// import type { User } from '../migrations/00005-createTableUsers';
// import type { Session } from '../migrations/00006-createTableSessions';
// import { sql } from './connect';

// type UserWithPasswordHash = User & {
//   passwordHash: string;
// };

// export async function getUser(sessionToken: Session['token']) {
//   const [user] = await sql<Pick<User, 'name'>[]>`
//     SELECT
//       users.name
//     FROM
//       users
//       INNER JOIN sessions ON (
//         sessions.token = ${sessionToken}
//         AND users.id = sessions.user_id
//         AND expiry_timestamp > now()
//       )
//   `;
//   return user;
// }

// export async function getUserStream(sessionToken: Session['token']) {
//   const [user] = await sql<Pick<User, 'name' | 'id'>[]>`
//     SELECT
//       users.name,
//       users.id
//     FROM
//       users
//       INNER JOIN sessions ON (
//         sessions.token = ${sessionToken}
//         AND users.id = sessions.user_id
//         AND expiry_timestamp > now()
//       )
//   `;
//   return user;
// }

// export async function getUserByIdAndToken(
//   sessionToken: Session['token'],
//   userId: User['id'],
// ) {
//   const [user] = await sql<User[]>`
//     SELECT
//       users.id,
//       users.name
//     FROM
//       users
//       INNER JOIN sessions ON (
//         sessions.token = ${sessionToken}
//         AND users.id = sessions.user_id
//         AND expiry_timestamp > now()
//       )
//     WHERE
//       users.id = ${userId}
//   `;
//   return user;
// }

// export async function getUserInsecure(name: User['name']) {
//   const [user] = await sql<User[]>`
//     SELECT
//       users.id,
//       users.name
//     FROM
//       users
//     WHERE
//       name = ${name.toLowerCase()},
//   `;
//   return user;
// }

// export async function createUserInsecure(
//   name: User['name'],

//   passwordHash: UserWithPasswordHash['passwordHash'],
// ) {
//   const [user] = await sql<User[]>`
//     INSERT INTO
//       users (name, password_hash)
//     VALUES
//       (
//         ${name.toLowerCase()},
//         ${passwordHash}
//       )
//     RETURNING
//       users.id,
//       users.name
//   `;
//   return user;
// }

// export async function getUserWithPasswordHashInsecure(name: User['name']) {
//   const [user] = await sql<UserWithPasswordHash[]>`
//     SELECT
//       *
//     FROM
//       users
//     WHERE
//       name = ${name.toLowerCase()}
//   `;
//   return user;
// }

import type { User } from '../migrations/00005-createTableUsers';
import type { Session } from '../migrations/00006-createTableSessions';
import { sql } from './connect';

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function getUser(sessionToken: Session['token']) {
  const [user] = await sql<Pick<User, 'name'>[]>`
    SELECT
      users.name
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND users.id = sessions.user_id
        AND expiry_timestamp > now()
      )
  `;
  return user;
}

export async function getUserStream(sessionToken: Session['token']) {
  const [user] = await sql<Pick<User, 'name' | 'id'>[]>`
    SELECT
      users.name,
      users.id
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND users.id = sessions.user_id
        AND expiry_timestamp > now()
      )
  `;
  return user;
}

export async function getUserByIdAndToken(
  sessionToken: Session['token'],
  userId: User['id'],
) {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.name
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND users.id = sessions.user_id
        AND expiry_timestamp > now()
      )
    WHERE
      users.id = ${userId}
  `;
  return user;
}

export async function getUserInsecure(name: User['name']) {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.name
    FROM
      users
    WHERE
      name = ${name.toLowerCase()}
  `;
  return user;
}

export async function createUserInsecure(
  name: User['name'],
  email: User['email'],
  passwordHash: UserWithPasswordHash['passwordHash'],
) {
  const [user] = await sql<User[]>`
    INSERT INTO
      users (name, email, password_hash)
    VALUES
      (
        ${name.toLowerCase()},
        ${email},
        ${passwordHash}
      )
    RETURNING
      users.id,
      users.name,
      users.email
  `;
  return user;
}

export async function getUserWithPasswordHashInsecure(name: User['name']) {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      name = ${name.toLowerCase()}
  `;
  return user;
}
