import { parse } from 'cookie';
import type { User } from '../../migrations/00005-createTableUsers';
import { ExpoApiResponse } from '../../ExpoApiResponse';
import { getUser } from '../../database/users';

export type UserResponseBodyGet =
  | {
      name: User['name'];
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<UserResponseBodyGet>> {
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
  const user = token && (await getUser(token));

  if (!user) {
    return ExpoApiResponse.json({ error: 'User not found' });
  }

  // 4. return the user profile
  return ExpoApiResponse.json({ name: user.name });
}
