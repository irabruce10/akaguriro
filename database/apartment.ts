import type { Apartment } from '../migrations/00008-createTableApartments';
import type { Session } from '../migrations/00006-createTableSessions.js';
import { sql } from './connect';

export const getApartmentsInsecure = async () => {
  const apartments = await sql<Apartment[]>`
    SELECT
      apartments.*
    FROM
      apartments
  `;

  return apartments;
};

export const getApartmentInsecure = async (
  sessionToken: Session['token'],
  apartmentId: Apartment['id'],
) => {
  const [apartment] = await sql<Apartment[]>`
    SELECT
      apartments.*
    FROM
      apartments
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = apartments.user_id
        AND expiry_timestamp > now()
      )
    WHERE
      apartments.id = ${apartmentId}
  `;

  return apartment;
};

export const createApartmentInsecure = async (
  sessionToken: Session['token'],
  name: Apartment['name'],
  rooms: Apartment['rooms'],
  maxCapacity: Apartment['maxCapacity'],
  imagesUrl: Apartment['imagesUrl'],
) => {
  const [apartment] = await sql<Apartment[]>`
    INSERT INTO
      apartments (
        user_id,
        name,
        rooms,
        max_capacity,
        images_url
      ) (
        SELECT
          user_id,
          ${name},
          ${rooms},
          ${maxCapacity},
          ${imagesUrl}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
      )
    RETURNING
      apartments.*
  `;
  return apartment;
};

export const updateApartmentInsecure = async (updatedApartment: Apartment) => {
  const [apartment] = await sql<Apartment[]>`
    UPDATE apartments
    SET
      name = ${updatedApartment.name},
      rooms = ${updatedApartment.rooms},
      max_capacity = ${updatedApartment.maxCapacity},
      images_url = ${updatedApartment.imagesUrl}
    WHERE
      id = ${updatedApartment.id}
    RETURNING
      apartments.*
  `;
  return apartment;
};

export const deleteApartmentInsecure = async (apartmentId: Apartment['id']) => {
  const [apartment] = await sql<Apartment[]>`
    DELETE FROM apartments
    WHERE
      id = ${apartmentId}
    RETURNING
      apartments.*
  `;
  return apartment;
};
