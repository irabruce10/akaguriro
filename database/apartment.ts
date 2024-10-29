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
      apartments (name, price, address)
    VALUES
      (
        ${newApartment.name},
        ${newApartment.rooms},
        ${newApartment.regular_price}
      )
    RETURNING
      apartments.*
  `;
  return apartment;
};

export const updateApartmentInsecure = async (updatedApartment: Apartment) => {
  const [apartment] = await sql<Apartment[]>`
    UPDATE guests
    SET
      name = ${updatedApartment.name},
      price = ${updatedApartment.rooms},
      address = ${updatedApartment.regular_price}
    WHERE
      id = ${updatedApartment.id}
    RETURNING
      guests.*
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
