import type { Session } from '../migrations/00006-createTableSessions';
import { sql } from './connect';

import { ExpoApiResponse } from '../ExpoApiResponse';
import type { Booking } from '../migrations/00009-createTableBookings';

export const getBookingsDashboard = async (sessionToken: Session['token']) => {
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

export const getAllBookingWithDate = async (
  apartmentId: Booking['apartmentId'],
) => {
  const [booking] = await sql<Booking[]>`
    SELECT
      start_date,
      end_date
    FROM
      bookings
    WHERE
      apartment_id = ${apartmentId}
  `;

  return booking;
};

export const createBookingInsecure = async (
  sessionToken: Session['token'],
  startDate: Booking['startDate'],
  endDate: Booking['endDate'],
  numNights: Booking['numNights'],
  numGuests: Booking['numGuests'],
  breakfast: Booking['breakfast'],
  totalPrice: Booking['totalPrice'],
  status: Booking['status'],
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
        breakfast,
        total_price,
        status
      ) (
        SELECT
          ${apartmentId},
          user_id,
          ${startDate},
          ${endDate},
          ${numNights},
          ${numGuests},
          ${breakfast},
          ${totalPrice},
          ${status}
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

export const deleteBooking = async (bookingId: Booking['id']) => {
  const [booking] = await sql<Booking[]>`
    DELETE FROM bookings
    WHERE
      id = ${bookingId}
    RETURNING
      bookings.*
  `;
  return booking;
};

export async function getBooking(
  sessionToken: Session['token'],
  bookingId: Booking['id'],
) {
  const [booking] = await sql<Booking[]>`
    SELECT
      bookings.*
    FROM
      bookings
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = bookings.user_id
        AND expiry_timestamp > now()
      )
    WHERE
      bookings.id = ${bookingId}
  `;
  return booking;
}
