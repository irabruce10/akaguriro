import {
  apartmentsSchema,
  type Apartment,
} from '../migrations/00008-createTableApartments';
import type { Session } from '../migrations/00006-createTableSessions.js';
import { sql } from './connect';
import type { ApartmentsResponseBodyPost } from '../app/api/apartments/apartments+api';
import { ExpoApiResponse } from '../ExpoApiResponse';

export const getApartmentsInsecure = async () => {
  const apartments = await sql<Apartment[]>`
    SELECT
      apartments.*
    FROM
      apartments
  `;

  return apartments;
};

export const getApartmentsDashboard = async (
  sessionToken: Session['token'],
) => {
  const apartments = await sql<Apartment[]>`
    SELECT
      apartments.*
    FROM
      apartments
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = apartments.user_id
        AND expiry_timestamp > now()
      )
  `;

  return apartments;
};

export const getApartmentInsecure = async (apartmentId: Apartment['id']) => {
  const [apartment] = await sql<Apartment[]>`
    SELECT
      apartments.*
    FROM
      apartments
    WHERE
      id = ${apartmentId}
  `;

  return apartment;
};

export const getApartmentWithUser = async (apartmentId: Apartment['id']) => {
  const [apartment] = await sql<Apartment[]>`
    SELECT
      apartments.*,
      users.name AS owner_name
    FROM
      apartments
      INNER JOIN users ON (apartments.user_id = users.id)
    WHERE
      apartments.id = ${apartmentId}
  `;

  return apartment;
};

export const getApartmentDashboard = async (
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

// export const createApartmentInsecure = async (
//   name: Apartment['name'],
//   rooms: Apartment['rooms'],
//   maxCapacity: Apartment['maxCapacity'],
//   imagesUrl: Apartment['imagesUrl'],
// ) => {
//   const [session] = await sql<Session[]>`
//     SELECT
//       sessions.*
//     FROM
//       sessions
//   `;

//   if (!session) {
//     return null; // or throw an error if you prefer
//   }

//   const [apartment] = await sql<Apartment[]>`
//     INSERT INTO
//       apartments (
//         user_id,
//         name,
//         rooms,
//         max_capacity,
//         images_url
//       )
//     VALUES
//       (
//         ${session.userId},
//         ${name},
//         ${rooms},
//         ${maxCapacity},
//         ${imagesUrl}
//       )
//     RETURNING
//       apartments.*
//   `;
//   return apartment;
// };

// export const createApartmentInsecure = async (
//   newApartment: Omit<Apartment, 'id'>,
// ) => {
//   const [apartment] = await sql<Apartment[]>`
//     INSERT INTO
//       apartments (
//         name,
//         rooms,
//         max_capacity,
//         images_url,
//         user_id,
//       )
//     VALUES
//       (
//         ${newApartment.name},
//         ${newApartment.rooms},
//         ${newApartment.maxCapacity},
//         ${newApartment.imagesUrl}
//       )
//     RETURNING
//       apartments.*
//   `;
//   return apartment;
// };

export const createApartmentInsecure = async (
  sessionToken: Session['token'],
  name: Apartment['name'],
  rooms: Apartment['rooms'],
  maxCapacity: Apartment['maxCapacity'],
  price: Apartment['price'],
  description: Apartment['description'],
  location: Apartment['location'],
  imagesUrl: Apartment['imagesUrl'],
) => {
  const [apartment] = await sql<Apartment[]>`
    INSERT INTO
      apartments (
        user_id,
        name,
        rooms,
        max_capacity,
        price,
        description,
        location,
        images_url
      ) (
        SELECT
          user_id,
          ${name},
          ${rooms},
          ${maxCapacity},
          ${price},
          ${description},
          ${location},
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
// export async function POST(
//   request: Request,
// ): Promise<ExpoApiResponse<ApartmentsResponseBodyPost>> {
//   const requestBody = await request.json();

//   const result = apartmentsSchema.safeParse(requestBody);

//   if (!result.success) {
//     return ExpoApiResponse.json(
//       {
//         error: 'Request does not contain apartment object',
//         errorIssues: result.error.issues,
//       },
//       {
//         status: 400,
//       },
//     );
//   }

//   const newApartment = {
//     name: result.data.name,
//     rooms: result.data.rooms,
//     maxCapacity: result.data.maxCapacity,
//     imagesUrl: result.data.imagesUrl,
//   };

//   const apartment = await createApartmentInsecure(newApartment);

//   if (!apartment) {
//     return ExpoApiResponse.json(
//       {
//         error: 'Apartment not created',
//       },
//       {
//         status: 500,
//       },
//     );
//   }

//   return ExpoApiResponse.json({ apartment: apartment });
// }
