import { parse } from 'cookie';

import { ExpoApiResponse } from '../../../ExpoApiResponse';

import type { Booking } from '../../../migrations/00009-createTableBookings';
import { getBookingsDashboard } from '../../../database/booking';

export type ReservationResponseBodyGet =
  | {
      reservation: Booking[];
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<ReservationResponseBodyGet>> {
  // 1. get the session token from the cookie
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;

  if (!token) {
    return ExpoApiResponse.json({
      error: 'No session token found',
    });
  }
  const reservation = await getBookingsDashboard(token);

  console.log('reservation', reservation);

  return ExpoApiResponse.json({
    reservation: reservation,
  });
}
