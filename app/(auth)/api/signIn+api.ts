import crypto from 'node:crypto';
import bcryptJs from 'bcryptjs';
import { createSessionInsecure } from '../../../database/sessions';

import { ExpoApiResponse } from '../../../ExpoApiResponse';

import { createSerializedRegisterSessionTokenCookie } from '../../../util/cookies';
import {
  userLoginSchema,
  userSchema,
  type User,
} from '../../../migrations/00005-createTableUsers';
import { getUserWithPasswordHash } from '../../../database/users';

export type LoginResponseBodyPost =
  | {
      email: { email: User['email'] };
    }
  | { error: string; errorIssues?: { message: string }[] };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<LoginResponseBodyPost>> {
  // Task: Implement the user login workflow with session

  // 1. Get the user data from the request
  const requestBody = await request.json();

  // 2. Validate the user data with zod
  const result = userLoginSchema.safeParse(requestBody);
  console.log('zod', result);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain user object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  // 3. Verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHash(result.data.email);

  if (!userWithPasswordHash) {
    return ExpoApiResponse.json(
      {
        error: 'Email or password not valid',
      },
      {
        status: 401,
      },
    );
  }

  // 4. Validate the user password by comparing with hashed password
  const passwordHash = await bcryptJs.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!passwordHash) {
    return ExpoApiResponse.json(
      {
        error: 'Email or password not valid',
      },
      {
        status: 401,
      },
    );
  }
  // 6. Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // 7. Create the session record
  const session = await createSessionInsecure(token, userWithPasswordHash.id);

  if (!session) {
    return ExpoApiResponse.json(
      {
        error: 'Sessions creation failed',
      },
      {
        status: 401,
      },
    );
  }

  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  return ExpoApiResponse.json(
    {
      email: {
        email: userWithPasswordHash.email,
      },
    },
    {
      // 8. Send the new cookie in the headers
      headers: {
        'Set-Cookie': serializedCookie,
      },
    },
  );
}
