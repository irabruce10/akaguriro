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
        <View>
          <Text className="text-white">Dash Apartment</Text>
          <Text className="text-white">StartDate :{startDate}</Text>
          <Text className="text-white">EndDate: {endDate}</Text>
          <Text className="text-white">Guests: {numGuests}</Text>
          <Text className="text-white">Nights: {numNights}</Text>
        </View>

        <View>
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
      </>
    </View>
  );
};

export default Reservation;
