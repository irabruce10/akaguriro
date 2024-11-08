//import {
//   deleteApartmentInsecure,
//   getApartmentInsecure,
//   updateApartmentInsecure,
// } from '../../database/apartment';
// import { ExpoApiResponse } from '../../ExpoApiResponse';
// import type { Apartment } from '../../migrations/00008-createTableApartments';

// export type ApartmentResponseBodyGet =
//   | {
//       apartment: Apartment;
//     }
//   | {
//       error: string;
//     };

// export async function GET(
//   request: Request,
//   { apartmentId }: { apartmentId: string },
// ): Promise<ExpoApiResponse<ApartmentResponseBodyGet>> {
//   const apartment = await getApartmentInsecure(Number(apartmentId));

//   if (!apartment) {
//     return ExpoApiResponse.json(
//       {
//         error: `No apartment with id ${apartmentId} found`,
//       },
//       {
//         status: 404,
//       },
//     );
//   }
//   return ExpoApiResponse.json({ apartment: apartment });
// }

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

// export type ApartmentResponseBodyDelete =
//   | {
//       apartment: Apartment;
//     }
//   | {
//       error: string;
//     };

// export async function DELETE(
//   request: Request,
//   { apartmentId }: { apartmentId: string },
// ): Promise<ExpoApiResponse<ApartmentResponseBodyDelete>> {
//   const apartment = await deleteApartmentInsecure(Number(apartmentId));

//   if (!apartment) {
//     return ExpoApiResponse.json(
//       {
//         error: `Apartment ${apartmentId} not found`,
//       },
//       {
//         status: 404,
//       },
//     );
//   }

//   return ExpoApiResponse.json({ apartment: apartment });
// }

// import {
//   deleteApartmentInsecure,
//   getApartmentInsecure,
//   updateApartmentInsecure,
// } from '../../database/apartment';
// import { ExpoApiResponse } from '../../ExpoApiResponse';
// import type { Apartment } from '../../migrations/00008-createTableApartments';

// export type ApartmentResponseBodyGet =
//   | {
//       apartment: Apartment;
//     }
//   | {
//       error: string;
//     };

// export async function GET(
//   request: Request,
//   { apartmentId }: { apartmentId: string },
// ): Promise<ExpoApiResponse<ApartmentResponseBodyGet>> {
//   const apartment = await getApartmentInsecure(Number(apartmentId));

//   if (!apartment) {
//     return ExpoApiResponse.json(
//       {
//         error: `No apartment with id ${apartmentId} found`,
//       },
//       {
//         status: 404,
//       },
//     );
//   }
//   return ExpoApiResponse.json({ apartment: apartment });
// }

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

// export type ApartmentResponseBodyDelete =
//   | {
//       apartment: Apartment;
//     }
//   | {
//       error: string;
//     };

// export async function DELETE(
//   request: Request,
//   { apartmentId }: { apartmentId: string },
// ): Promise<ExpoApiResponse<ApartmentResponseBodyDelete>> {
//   const apartment = await deleteApartmentInsecure(Number(apartmentId));

//   if (!apartment) {
//     return ExpoApiResponse.json(
//       {
//         error: `Apartment ${apartmentId} not found`,
//       },
//       {
//         status: 404,
//       },
//     );
//   }

//   return ExpoApiResponse.json({ apartment: apartment });
// }

//-----------------------------

// import SearchInput from '../../components/SearchInput';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { View, Text, FlatList } from 'react-native';
// import React, { useCallback, useState } from 'react';

// import ApartItem from '../../components/apartment/ApartItem';
// import { useFocusEffect } from 'expo-router';
// import type { ApartmentsResponseBodyGet } from '../api_apartments/apartments+api';
// import Add from '../../components/apartment/AddApartBtn';
// import EmptyState from '../../components/EmptyState';
// import type { Apartment } from '../../migrations/00008-createTableApartments';

// const apartments = () => {
//   const [apartments, setApartments] = useState<Apartment[]>([]);

//   const [isStale, setIsStale] = useState(true);

//   const renderItem = (item: { item: Apartment }) => (
//     <ApartItem apartment={item.item} setIsStale={setIsStale} />
//   );

//   useFocusEffect(
//     useCallback(() => {
//       if (!isStale) return;

//       async function getApartments() {
//         const response = await fetch('/api_apartments/apartments', {
//           headers: {
//             Cookie: 'name=value',
//           },
//         });
//         const body: ApartmentsResponseBodyGet = await response.json();

//         setApartments(body.apartments);
//         setIsStale(false);
//       }

//       getApartments().catch((error) => {
//         console.error(error);
//       });
//     }, [isStale]),
//   );
