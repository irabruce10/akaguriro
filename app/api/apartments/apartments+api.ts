import { parse } from 'cookie';
import {
  createApartmentInsecure,
  getApartmentsInsecure,
} from '../../../database/apartment';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  apartmentsSchema,
  type Apartment,
} from '../../../migrations/00008-createTableApartments';
export type ApartmentsResponseBodyGet =
  | {
      apartments: Apartment[];
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<ApartmentsResponseBodyGet>> {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;

  if (!token) {
    return ExpoApiResponse.json({
      error: 'No session token found',
    });
  }

  const apartments = await getApartmentsInsecure(token);

  return ExpoApiResponse.json({
    apartments: apartments,
  });
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

  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;

  if (!token) {
    return ExpoApiResponse.json({
      error: 'No session token found',
    });
  }

  const newApartment =
    token &&
    ((await createApartmentInsecure(
      token,
      result.data.name,
      result.data.rooms,
      result.data.maxCapacity,
      result.data.imagesUrl,
    )) as Apartment);

  if (!newApartment) {
    return ExpoApiResponse.json(
      {
        error: 'Apartment not created',
      },
      {
        status: 500,
      },
    );
  }

  return ExpoApiResponse.json({ apartment: newApartment });
}
