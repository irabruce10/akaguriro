import type { Session } from '../migrations/00006-createTableSessions';
import type { Chat } from '../migrations/00010-createTableChats';
import { sql } from './connect';

export const getChats = async (sessionToken: Session['token']) => {
  const chats = await sql<Chat[]>`
    SELECT
      chats.*
    FROM
      chats
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = chats.user_id
        AND expiry_timestamp > now()
      )
  `;

  return chats;
};

export const createChat = async (
  sessionToken: Session['token'],
  message: Chat['message'],
  createdAt: Chat['createdAt'],
  apartmentId: Chat['apartmentId'],
) => {
  const [chat] = await sql<Chat[]>`
    INSERT INTO
      chats (
        apartment_id,
        user_id,
        message,
        created_at
      ) (
        SELECT
          ${apartmentId},
          user_id,
          ${message},
          ${createdAt}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
      )
    RETURNING
      chats.*
  `;
  return chat;
};

export const deleteChat = async (chatId: Chat['id']) => {
  const [chat] = await sql<Chat[]>`
    DELETE FROM chats
    WHERE
      id = ${chatId}
    RETURNING
      chats.*
  `;
  return chat;
};

export async function getChat(
  sessionToken: Session['token'],
  chatId: Chat['id'],
) {
  const [chat] = await sql<Chat[]>`
    SELECT
      chats.*
    FROM
      chats
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = chat.user_id
        AND expiry_timestamp > now()
      )
    WHERE
      chats.id = ${chatId}
  `;
  return chat;
}
