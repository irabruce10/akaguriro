import type { Apartment } from '../migrations/00001-createTableApartments';
import { sql } from './connect';

export const getApartmentsInsecure = async () => {
  const apartments = await sql<Apartment[]>`
    SELECT
      *
    FROM
      apartments
  `;

  return apartments;
};

export const getApartmentInsecure = async (apartmentId: Apartment['id']) => {
  const [apartment] = await sql<Apartment[]>`
    SELECT
      *
    FROM
      apartments
    WHERE
      id = ${apartmentId}
  `;

  return apartment;
};

export const createApartmentInsecure = async (
  newApartment: Omit<Apartment, 'id'>,
) => {
  const [apartment] = await sql<Apartment[]>`
    INSERT INTO
      apartments (name, rooms, max_capacity)
    VALUES
      (
        ${newApartment.name},
        ${newApartment.rooms},
        ${newApartment.max_capacity}
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
      max_capacity = ${updatedApartment.max_capacity}
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
