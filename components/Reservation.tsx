import { View, Text, Pressable, Image, TextInput } from 'react-native';
import React, { useCallback, useState } from 'react';

import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
import type { Booking } from '../migrations/00009-createTableBookings';
import { Ionicons } from '@expo/vector-icons';
import type { UserResponseBodyGet } from '../app/api/user+api';
import type { BookingResponseBodyGet } from '../app/api/reservationDash/[bookingId]+api';

type Props = {
  booking: Booking;
  setIsStale: (isStale: boolean) => void;
};

const Reservation = ({ booking }: Props) => {
  const { id, startDate, endDate, numGuests, numNights } = booking;

  return (
    <View className="my-6 px-4 space-y-6">
      <>
        <View className="flex flex-row ">
          <View>
            <Text className="text-gray-100 px-4  text-lg font-pregular ">
              CheckIn :{startDate}
            </Text>
            <Text className="text-gray-100 px-4  text-lg font-pregular ">
              CheckOut: {endDate}
            </Text>
            <Text className="text-gray-100 px-4  text-lg font-pregular ">
              Guests: {numGuests}
            </Text>
            <Text className="text-gray-100 px-4 mb-6  text-lg font-pregular ">
              Nights: {numNights} nights
            </Text>
          </View>
          <View
            className="bg-secondary  px-4 rounded-xl min-h-[62px] justify-center mt-16  text-xl font-medium  text-center "
            style={{ top: -42, left: 92 }}
          >
            <Pressable
              onPress={async () => {
                await fetch(`/api/reservationDash/${id}`, {
                  method: 'DELETE',
                });
                router.replace('/reservationDash/reservationDash');
              }}
            >
              <Ionicons name="trash-outline" size={36} />
            </Pressable>
          </View>
        </View>
      </>
      <View className="flex-shrink-0 mb-6 flex flex-row ">
        <View className="flex flex-row  mb-14  text-center items-center ml-10   ">
          <Link
            href="/(tabs)/apartments"
            style={{ color: 'black' }}
            className="bg-secondary px-9 rounded-xl min-h-[62px] justify-center mt-5 pt-5 text-xl font-medium  text-center "
          >
            <Text>Go Back</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Reservation;
