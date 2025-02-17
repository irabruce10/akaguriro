import { parse } from 'cookie';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  bookingsSchema,
  type Booking,
} from '../../../migrations/00009-createTableBookings';
import {
  createBookingInsecure,
  getAllBookings,
} from '../../../database/booking';

export type ReservationResponseBodyPost =
  | {
      reservation: Booking;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<ReservationResponseBodyPost>> {
  const requestBody = await request.json();

  const result = bookingsSchema.safeParse(requestBody);

  console.log('result response', result);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain booking object',
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

  const newBooking =
    token &&
    ((await createBookingInsecure(
      token,
      result.data.startDate,
      result.data.endDate,
      result.data.numNights,
      result.data.numGuests,
      result.data.breakfast,
      result.data.totalPrice,
      result.data.status,
      result.data.apartmentId,
    )) as Booking);

  console.log('New booking', newBooking);

  if (!newBooking) {
    return ExpoApiResponse.json(
      {
        error: 'Booking not created',
      },
      {
        status: 500,
      },
    );
  }

  return ExpoApiResponse.json({ reservation: newBooking });
}

export type BookingsResponseBodyGet = {
  booking: Booking[];
};

// export async function GET(
//   request: Request,
// ): Promise<ExpoApiResponse<BookingsResponseBodyGet>> {
//   const booking = await getAllBookings();

//   return ExpoApiResponse.json({
//     booking: booking,
//   });
// }

export async function GET(
  request: Request,
  { id }: { id: number },
): Promise<ExpoApiResponse<BookingsResponseBodyGet>> {
  const booking = await getAllBookings();

  return ExpoApiResponse.json({
    booking: booking,
  });
}
