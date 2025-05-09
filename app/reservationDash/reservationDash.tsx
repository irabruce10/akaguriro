import SearchInput from '../../components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, Pressable } from 'react-native';
import React, { useCallback, useState } from 'react';

import ApartItem from '../../components/apartment/ApartItem';
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';

import Add from '../../components/apartment/AddApartBtn';
import EmptyState from '../../components/EmptyState';

import { parse } from 'cookie';
import type { UserResponseBodyGet } from '../api/user+api';

import type { Booking } from '../../migrations/00009-createTableBookings';
import type { ReservationResponseBodyGet } from '../api/reservationDash/reservationDash+api';
import Reservation from '../../components/Reservation';

const reservation = () => {
  const { bookingId } = useLocalSearchParams();

  const [reservation, setReservation] = useState<Booking[]>([]);

  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Booking }) => (
    <Reservation booking={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getUserAndReservation() {
        const [userResponse, reservationResponse]: [
          UserResponseBodyGet,
          ReservationResponseBodyGet,
        ] = await Promise.all([
          fetch('/api/user').then((response) => response.json()),
          fetch('/api/reservationDash/reservationDash').then((response) =>
            response.json(),
          ),
        ]);

        setIsStale(false);

        if ('error' in userResponse) {
          router.replace('/authModal/signin?returnTo=/(tabs)/reservation');
          return;
        }

        if ('error' in reservationResponse) {
          setReservation([]);
          return;
        }

        if ('reservation' in reservationResponse) {
          setReservation(reservationResponse.reservation);
        }
      }

      getUserAndReservation().catch((error) => {
        console.error(error);
      });
    }, [isStale, router]),
  );

  return (
    <SafeAreaView className="bg-primary text-center  w-full h-full border-l-2">
      <View className="flex-row items-center justify-between px-4 py-4 space-x-6">
        <Text className="font-pmedium text-sm text-gray-100">
          My Reservations
        </Text>
      </View>
      <FlatList
        data={reservation}
        renderItem={renderItem}
        keyExtractor={(item: Booking) => String(item.id)}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center px-4">
            <Text className="text-xl text-center font-psemibold mb-8  text-white mt2">
              No Reservation Found Be the first to Book the apartment!
            </Text>

            <Link href="/(app)/(tabs)/apartments" className="px-20">
              <Text className="bg-secondary  rounded-xl min-h-[62px] justify-center pt-5 text-xl font-medium  text-center ">
                Book now
              </Text>
            </Link>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default reservation;
