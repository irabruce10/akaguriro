import { parse } from 'cookie';
import {
  apartmentsSchema,
  type Apartment,
} from '../../../migrations/00008-createTableApartments';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  deleteApartmentInsecure,
  getApartmentDashboard,
} from '../../../database/apartment';

export type ApartmentResponseBodyGet =
  | {
      apartment: Apartment;
    }
  | {
      error: string;
    };

export async function GET(
  request: Request,
  { dashboardId }: { dashboardId: string },
): Promise<ExpoApiResponse<ApartmentResponseBodyGet>> {
  // const apartment = await getApartmentDashboard(Number(apartmentId));
  // if (!apartment) {
  //   return ExpoApiResponse.json(
  //     {
  //       error: `No apartment with id ${apartmentId} found`,
  //     },
  //     {
  //       status: 404,
  //     },
  //   );
  // }
  // return ExpoApiResponse.json({ apartment: apartment });

  const cookies = parse(request.headers.get('cookie') || '');

  const token = cookies.sessionToken;

  if (!token) {
    return ExpoApiResponse.json(
      {
        error: 'No session token found',
      },
      {
        status: 401,
      },
    );
  }
  const apartment = await getApartmentDashboard(token, Number(dashboardId));

  console.log('ap', apartment);

  if (!apartment) {
    return ExpoApiResponse.json(
      {
        error: `No apartmentddd with id ${dashboardId} found`,
      },
      {
        status: 404,
      },
    );
  }
  return ExpoApiResponse.json({ apartment: apartment });
}

// export type ApartmentResponseBodyPut =
//   | {
//       apartment: Apartment;
//     }
//   | {
//       error: string;
//       errorIssues?: { message: string }[];
//     };

// export async function PUT(
//   request: Request,
//   { apartmentId }: { apartmentId: string },
// ): Promise<ExpoApiResponse<ApartmentResponseBodyPut>> {
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

//   const updatedApartment = await updateApartmentInsecure({
//     id: Number(apartmentId),
//     name: result.data.name,
//     rooms: result.data.rooms,
//     maxCapacity: result.data.maxCapacity,
//     imagesUrl: result.data.imagesUrl,
//   });

//   if (!updatedApartment) {
//     return ExpoApiResponse.json(
//       {
//         error: `Apartment ${apartmentId} not found`,
//       },
//       {
//         status: 404,
//       },
//     );
//   }

//   return ExpoApiResponse.json({ apartment: updatedApartment });
// }

export type ApartmentResponseBodyDelete =
  | {
      apartment: Apartment;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: Request,
  { apartmentId }: { apartmentId: string },
): Promise<ExpoApiResponse<ApartmentResponseBodyDelete>> {
  const apartment = await deleteApartmentInsecure(Number(apartmentId));

  console.log('Deleting', apartment);

  if (!apartment) {
    return ExpoApiResponse.json(
      {
        error: `Apartment ${apartmentId} not found`,
      },
      {
        status: 404,
      },
    );
  }

  return ExpoApiResponse.json({ apartment: apartment });
}
