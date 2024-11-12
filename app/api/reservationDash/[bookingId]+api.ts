import { parse } from 'cookie';
import { deleteBooking, getBooking } from '../../../database/booking';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import type { Booking } from '../../../migrations/00009-createTableBookings';

export type BookingResponseBodyGet =
  | {
      booking: Booking;
    }
  | {
      error: string;
    };

export async function GET(
  request: Request,
  { bookingId }: { bookingId: string },
): Promise<ExpoApiResponse<BookingResponseBodyGet>> {
  // 1. Get the session token from the cookie
  const cookies = parse(request.headers.get('cookie') || '');

  const token = cookies.sessionToken;

  if (!token) {
    return ExpoApiResponse.json(
      {
        error: 'No session token found',
      },
      {
        status: 401,
      },
    );
  }
  const booking = await getBooking(token, Number(bookingId));

  if (!booking) {
    return ExpoApiResponse.json(
      {
        error: `No booking with id ${bookingId} found`,
      },
      {
        status: 404,
      },
    );
  }
  return ExpoApiResponse.json({ booking: booking });
}

export type BookingResponseBodyDelete =
  | {
      booking: Booking;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: Request,
  { bookingId }: { bookingId: string },
): Promise<ExpoApiResponse<BookingResponseBodyDelete>> {
  const booking = await deleteBooking(Number(bookingId));

  if (!booking) {
    return ExpoApiResponse.json(
      {
        error: `Booking ${bookingId} not found`,
      },
      {
        status: 404,
      },
    );
  }

  return ExpoApiResponse.json({ booking: booking });
}
