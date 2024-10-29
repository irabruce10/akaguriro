import {
  createApartmentInsecure,
  getApartmentsInsecure,
} from '../../database/apartment';

import { ExpoApiResponse } from '../../ExpoApiResponse';
import {
  type Apartment,
  apartmentsSchema,
} from '../../migrations/00001-createTableApartments';

export type ApartmentsResponseBodyGet = {
  apartments: Apartment[];
};

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<ApartmentsResponseBodyGet>> {
  const cookie = request.headers.get('cookie');
  console.log('cookie', cookie);

  const apartments = await getApartmentsInsecure();
  if (!apartments) {
    alert('Error fetching apartments');
  }

  return ExpoApiResponse.json(
    {
      apartments: apartments,
    },
    {
      headers: {
        'Set-Cookie': 'test=123',
      },
    },
  );
}

export type ApartmentsResponseBodyPost =
  | {
      apartment: Apartment;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<ApartmentsResponseBodyPost>> {
  const requestBody = await request.json();

  const result = apartmentsSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain apartment object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const newApartment = {
    name: result.data.name,
    rooms: result.data.rooms,
    max_capacity: result.data.max_capacity,
  };

  const apartment = await createApartmentInsecure(newApartment);

  if (!apartment) {
    return ExpoApiResponse.json(
      {
        error: 'Apartment not created',
      },
      {
        status: 500,
      },
    );
  }

  return ExpoApiResponse.json({ apartment: apartment });
}
