import {
  getAllBookings,
  getAllBookingWithDate,
} from '../../../database/booking';
import { ExpoApiResponse } from '../../../ExpoApiResponse';

import type { Booking } from '../../../migrations/00009-createTableBookings';
import type { BookingsResponseBodyGet } from './reservation+api';

// export type ReservationResponseBodyGet =
//   | {
//       reservation: Booking;
//     }
//   | {
//       error: string;
//     };

// export async function GET(
//   request: Request,
//   { apartmentId }: { apartmentId: string },
// ): Promise<ExpoApiResponse<ReservationResponseBodyGet>> {
//   console.log('apartID', apartmentId);
//   const bookings = await getAllBookingWithDate(Number(apartmentId));

//   console.log('Booking', bookings);

//   if (!bookings) {
//     return ExpoApiResponse.json(
//       {
//         error: ` booking  found`,
//       },
//       {
//         status: 404,
//       },
//     );
//   }

//   return ExpoApiResponse.json({ reservation: bookings });
// }
// export async function GET(
//   request: Request,
//   { id }: { id: number },
//   apartmentsId: number,
// ): Promise<ExpoApiResponse<BookingsResponseBodyGet>> {
//   const booking = await getAllBookings(apartmentsId);

//   return ExpoApiResponse.json({
//     booking: booking,
//   });
// }
