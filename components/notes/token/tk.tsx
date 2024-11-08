// import type { Apartment } from '../migrations/00008-createTableApartments';
// import type { Session } from '../migrations/00006-createTableSessions.js';
// import { sql } from './connect';

// export const getApartmentsInsecure = async () => {
//   const apartments = await sql<Apartment[]>`
//     SELECT
//       apartments.*
//     FROM
//       apartments
//   `;

//   return apartments;
// };
// export const getApartmentInsecure = async (apartmentId: Apartment['id']) => {
//   const [apartment] = await sql<Apartment[]>`
//     SELECT
//       *
//     FROM
//       apartments
//     WHERE
//       id = ${apartmentId}
//   `;

//   return apartment;
// };

// export const getApartmentsDashboard = async (
//   sessionToken: Session['token'],
// ) => {
//   const apartments = await sql<Apartment[]>`
//     SELECT
//       apartments.*
//     FROM
//       apartments
//       INNER JOIN sessions ON (
//         sessions.token = ${sessionToken}
//         AND sessions.user_id = apartments.user_id
//         AND expiry_timestamp > now()
//       )
//   `;

//   return apartments;
// };

// export const getApartmentDashboard = async (
//   sessionToken: Session['token'],
//   apartmentId: Apartment['id'],
// ) => {
//   const [apartment] = await sql<Apartment[]>`
//     SELECT
//       apartments.*
//     FROM
//       apartments
//       INNER JOIN sessions ON (
//         sessions.token = ${sessionToken}
//         AND sessions.user_id = apartments.user_id
//         AND expiry_timestamp > now()
//       )
//     WHERE
//       apartments.id = ${apartmentId}
//   `;

//   return apartment;
// };

// export const createApartmentInsecure = async (
//   newApartment: Omit<Apartment, 'id'>,
// ) => {
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
//         user_id,
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

// export const createApartmentInsecure = async (
//   sessionToken: Session['token'],
//   name: Apartment['name'],
//   rooms: Apartment['rooms'],
//   maxCapacity: Apartment['maxCapacity'],
//   imagesUrl: Apartment['imagesUrl'],
// ) => {
//   const [apartment] = await sql<Apartment[]>`
//     INSERT INTO
//       apartments (
//         user_id,
//         name,
//         rooms,
//         max_capacity,
//         images_url
//       ) (
//         SELECT
//           user_id,
//           ${name},
//           ${rooms},
//           ${maxCapacity},
//           ${imagesUrl}
//         FROM
//           sessions
//         WHERE
//           token = ${sessionToken}
//           AND sessions.expiry_timestamp > now()
//       )
//     RETURNING
//       apartments.*
//   `;
//   return apartment;
// };
//---------------------------------------------

// export const updateApartmentInsecure = async (updatedApartment: Apartment) => {
//   const [apartment] = await sql<Apartment[]>`
//     UPDATE apartments
//     SET
//       name = ${updatedApartment.name},
//       rooms = ${updatedApartment.rooms},
//       max_capacity = ${updatedApartment.maxCapacity},
//       images_url = ${updatedApartment.imagesUrl}
//     WHERE
//       id = ${updatedApartment.id}
//     RETURNING
//       apartments.*
//   `;
//   return apartment;
// };

// export const deleteApartmentInsecure = async (apartmentId: Apartment['id']) => {
//   const [apartment] = await sql<Apartment[]>`
//     DELETE FROM apartments
//     WHERE
//       id = ${apartmentId}
//     RETURNING
//       apartments.*
//   `;
//   return apartment;
// };

// import type { Apartment } from '../migrations/00001-createTableApartments';
// import { sql } from './connect';

// export const getApartmentsInsecure = async () => {
//   const apartments = await sql<Apartment[]>`
//     SELECT
//       *
//     FROM
//       apartments
//   `;

//   return apartments;
// };

// export const getApartmentInsecure = async (apartmentId: Apartment['id']) => {
//   const [apartment] = await sql<Apartment[]>`
//     SELECT
//       *
//     FROM
//       apartments
//     WHERE
//       id = ${apartmentId}
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
//         images_url
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

// export const updateApartmentInsecure = async (updatedApartment: Apartment) => {
//   const [apartment] = await sql<Apartment[]>`
//     UPDATE apartments
//     SET
//       name = ${updatedApartment.name},
//       rooms = ${updatedApartment.rooms},
//       max_capacity = ${updatedApartment.maxCapacity},
//       images_url = ${updatedApartment.imagesUrl}
//     WHERE
//       id = ${updatedApartment.id}
//     RETURNING
//       apartments.*
//   `;
//   return apartment;
// };

// export const deleteApartmentInsecure = async (apartmentId: Apartment['id']) => {
//   const [apartment] = await sql<Apartment[]>`
//     DELETE FROM apartments
//     WHERE
//       id = ${apartmentId}
//     RETURNING
//       apartments.*
//   `;
//   return apartment;
// };

//-------------------------

// import { parse } from 'cookie';
// import {
//   createApartmentInsecure,
//   getApartmentsInsecure,
// } from '../../../database/apartment';
// import { ExpoApiResponse } from '../../../ExpoApiResponse';
// import {
//   apartmentsSchema,
//   type Apartment,
// } from '../../../migrations/00008-createTableApartments';
// export type ApartmentsResponseBodyGet = {
//   apartments: Apartment[];
// };

// export async function GET(
//   request: Request,
// ): Promise<ExpoApiResponse<ApartmentsResponseBodyGet>> {
//   const apartments = await getApartmentsInsecure();

//   return ExpoApiResponse.json({
//     apartments: apartments,
//   });
// }

// export type ApartmentsResponseBodyPost =
//   | {
//       apartment: Apartment;
//     }
//   | {
//       error: string;
//       errorIssues?: { message: string }[];
//     };

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

// export type ApartmentsResponseBodyPost =
//   | {
//       apartment: Apartment;
//     }
//   | {
//       error: string;
//       errorIssues?: { message: string }[];
//     };

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

//   const cookies = parse(request.headers.get('cookie') || '');
//   const token = cookies.sessionToken;

//   if (!token) {
//     return ExpoApiResponse.json({
//       error: 'No session token found',
//     });
//   }

//   const newApartment =
//     token &&
//     ((await createApartmentInsecure(
//       token,
//       result.data.name,
//       result.data.rooms,
//       result.data.maxCapacity,
//       result.data.imagesUrl,
//     )) as Apartment);

//   if (!newApartment) {
//     return ExpoApiResponse.json(
//       {
//         error: 'Apartment not created',
//       },
//       {
//         status: 500,
//       },
//     );
//   }

//   return ExpoApiResponse.json({ apartment: newApartment });
// }

// export type ProductsResponseBodyPost =
//   | {
//       product: Product;
//     }
//   | {
//       error: string;
//       errorIssues?: { message: string }[];
//     };

// export async function POST(
//   request: Request,
// ): Promise<ExpoApiResponse<ProductsResponseBodyPost>> {
//   const requestBody = await request.json();

//   const result = productsSchema.safeParse(requestBody);

//   if (!result.success) {
//     return ExpoApiResponse.json(
//       {
//         error: 'Request does not contain guest object',
//         errorIssues: result.error.issues,
//       },
//       {
//         status: 400,
//       },
//     );
//   }

//   const newProduct = {
//     name: result.data.name,
//     price: result.data.price,
//     address: result.data.address,
//   };
//   // description: result.data.description,
//   // category: result.data.category,
//   // image: result.data.image,
//   // quantity: result.data.quantity,
//   // owner: result.data.owner,
//   const product = await createProductInsecure(newProduct);

//   if (!product) {
//     return ExpoApiResponse.json(
//       {
//         error: 'Guest not created',
//       },
//       {
//         status: 500,
//       },
//     );
//   }

//   return ExpoApiResponse.json({ product: product });
// }

// import {
//   createApartmentInsecure,
//   getApartmentsInsecure,
// } from '../../database/apartment';
// import { ExpoApiResponse } from '../../ExpoApiResponse';
// import {
//   apartmentsSchema,
//   type Apartment,
// } from '../../migrations/00008-createTableApartments';

// export type ApartmentsResponseBodyGet = {
//   apartments: Apartment[];
// };

// export async function GET(
//   request: Request,
// ): Promise<ExpoApiResponse<ApartmentsResponseBodyGet>> {
//   const cookie = request.headers.get('cookie');
//   console.log('cookie', cookie);

//   const apartments = await getApartmentsInsecure();

//   return ExpoApiResponse.json(
//     {
//       apartments: apartments,
//     },
//     {
//       headers: {
//         'Set-Cookie': 'test=123',
//       },
//     },
//   );
// }
