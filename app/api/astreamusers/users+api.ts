import { parse } from 'cookie';
import type { User } from '../../../migrations/00005-createTableUsers';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  getUser,
  getUserByIdAndToken,
  getUserInsecure,
  getUserStream,
} from '../../../database/users';

export type UserStreamResponseBodyGet =
  | {
      name: User['name'];
      id: User['id'];
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<UserStreamResponseBodyGet>> {
  // 1. get the session token from the cookie
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;

  if (!token) {
    return ExpoApiResponse.json({
      error: 'No session token found',
    });
  }

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserStream(token));

  if (!user) {
    return ExpoApiResponse.json({ error: 'User not found' });
  }

  // 4. return the user profile
  return ExpoApiResponse.json({ name: user.name, id: user.id });
}
