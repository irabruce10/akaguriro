// import { getBookingsWithDateRange } from '../../../database/booking';
// import { ExpoApiResponse } from '../../../ExpoApiResponse';

// import type { Booking } from '../../../migrations/00009-createTableBookings';

// export type ReservationResponseBodyGet =
//   | {
//       reservation: Booking;
//     }
//   | {
//       error: string;
//     };

// export async function GET(
//   request: Request,

//   startDate: string,
//   endDate: string,
// ): Promise<ExpoApiResponse<ReservationResponseBodyGet>> {
//   const reservation = await getBookingsWithDateRange(
//     String(startDate),
//     String(endDate),
//   );

//   console.log('Booking', reservation);

//   if (!reservation) {
//     return ExpoApiResponse.json(
//       {
//         error: ` booking  found`,
//       },
//       {
//         status: 404,
//       },
//     );
//   } else {
//     return ExpoApiResponse.json({ reservation: reservation });
//   }
// }

import { getAllBookingWithDate } from '../../../database/booking';
import { ExpoApiResponse } from '../../../ExpoApiResponse';

import type { Booking } from '../../../migrations/00009-createTableBookings';

export type ReservationResponseBodyGet =
  | {
      reservation: Booking;
    }
  | {
      error: string;
    };

export async function GET({
  apartmentId,
}: {
  apartmentId: number;
}): Promise<ExpoApiResponse<ReservationResponseBodyGet>> {
  const reservation = await getAllBookingWithDate(apartmentId);

  console.log('Booking', reservation);

  if (!reservation) {
    return ExpoApiResponse.json(
      {
        error: ` booking  found`,
      },
      {
        status: 404,
      },
    );
  }
  return ExpoApiResponse.json({ reservation: reservation });
}
