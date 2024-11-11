import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';

import { Link } from 'expo-router';
import type { Booking } from '../migrations/00009-createTableBookings';

type Props = {
  booking: Booking;
  setIsStale: (isStale: boolean) => void;
};

const Reservation = ({ booking }: Props) => {
  const { id, startDate, endDate, numGuests, numNights, breakfast } = booking;
  return (
    <Link href={`/dashboard/${id}`} asChild>
      <Pressable>
        <View className="my-6 px-4 space-y-6">
          <Text className="text-white">Dash Apartment</Text>
          <Text className="text-white">StartDate :{startDate}</Text>
          <Text className="text-white">EndDate: {endDate}</Text>
          <Text className="text-white">Guests: {numGuests}</Text>
          <Text className="text-white">Nights: {numNights}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default Reservation;
