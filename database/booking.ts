import type { Session } from '../migrations/00006-createTableSessions';
import { sql } from './connect';

import { ExpoApiResponse } from '../ExpoApiResponse';
import type { Booking } from '../migrations/00009-createTableBookings';

export const getBookingsDashboard = async (
  sessionToken: Session['token'],
) => {
  const bookings = await sql<Booking[]>`
    SELECT
      bookings.*
    FROM
      bookings
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = bookings.user_id
        AND expiry_timestamp > now()
      )
  `;

  return bookings;
};


export const createBookingInsecure = async (
  sessionToken: Session['token'],
  startDate: Booking['startDate'],
  endDate: Booking['endDate'],
  numNights: Booking['numNights'],
  numGuests: Booking['numGuests'],
  breakfast: Booking['breakfast'],
  apartmentId: Booking['apartmentId'],
) => {
  const [booking] = await sql<Booking[]>`
    INSERT INTO
      bookings (
        apartment_id,
        user_id,
        start_date,
        end_date,
        num_nights,
        num_guests,
        breakfast
      ) (
        SELECT
          ${apartmentId},
          user_id,
          ${startDate},
          ${endDate},
          ${numNights},
          ${numGuests},
          ${breakfast}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
      )
    RETURNING
      bookings.*
  `;
  return booking;
};
