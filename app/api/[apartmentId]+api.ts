import {
  deleteApartmentInsecure,
  getApartmentInsecure,
  updateApartmentInsecure,
} from '../../database/apartment';
import { ExpoApiResponse } from '../../ExpoApiResponse';
import {
  apartmentsSchema,
  type Apartment,
} from '../../migrations/00001-createTableApartments';

export type ApartmentResponseBodyGet =
  | {
      apartment: Apartment;
    }
  | {
      error: string;
    };

export async function GET(
  request: Request,
  { apartmentId }: { apartmentId: string },
): Promise<ExpoApiResponse<ApartmentResponseBodyGet>> {
  const apartment = await getApartmentInsecure(Number(apartmentId));

  if (!apartment) {
    return ExpoApiResponse.json(
      {
        error: `No apartment with id ${apartment} found`,
      },
      {
        status: 404,
      },
    );
  }
  return ExpoApiResponse.json({ apartment: apartment });
}

export type ApartmentResponseBodyPut =
  | {
      apartment: Apartment;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function PUT(
  request: Request,
  { apartmentId }: { apartmentId: string },
): Promise<ExpoApiResponse<ApartmentResponseBodyPut>> {
  const requestBody = await request.json();

  const result = apartmentsSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain guest object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const updatedApartment = await updateApartmentInsecure({
    id: Number(apartmentId),
    name: result.data.name,
    rooms: result.data.rooms,
    maxCapacity: result.data.maxCapacity,
  });

  if (!updatedApartment) {
    return ExpoApiResponse.json(
      {
        error: `Apartment ${apartmentId} not found`,
      },
      {
        status: 404,
      },
    );
  }

  return ExpoApiResponse.json({ apartment: updatedApartment });
}

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