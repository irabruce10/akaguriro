import { parse } from 'cookie';
import { ExpoApiResponse } from '../../../ExpoApiResponse';

import {
  chatsSchema,
  type Chat,
} from '../../../migrations/00010-createTableChats';
import { createChat, getChats } from '../../../database/chats';

export type MessageResponseBodyPost =
  | {
      message: Chat;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<MessageResponseBodyPost>> {
  const requestBody = await request.json();

  const result = chatsSchema.safeParse(requestBody);

  console.log('chat response', result);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain chat object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;

  if (!token) {
    return ExpoApiResponse.json({
      error: 'No session token found',
    });
  }

  const newMessage =
    token &&
    ((await createChat(
      token,
      result.data.message,
      result.data.createdAt,
      result.data.apartmentId,
    )) as Chat);

  console.log('new Message', newMessage);

  if (!newMessage) {
    return ExpoApiResponse.json(
      {
        error: 'Booking not created',
      },
      {
        status: 500,
      },
    );
  }

  return ExpoApiResponse.json({ message: newMessage });
}

export type MessageResponseBodyGet =
  | {
      message: Chat[];
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<MessageResponseBodyGet>> {
  // 1. get the session token from the cookie
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;

  if (!token) {
    return ExpoApiResponse.json({
      error: 'No session token found',
    });
  }
  const message = await getChats(token);

  return ExpoApiResponse.json({
    message: message,
  });
}
