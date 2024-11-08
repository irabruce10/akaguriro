import SearchInput from '../../components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList } from 'react-native';
import React, { useCallback, useState } from 'react';

import ApartItem from '../../components/apartment/ApartItem';
import { router, useFocusEffect } from 'expo-router';
import type { ApartmentsResponseBodyGet } from '../api/apartments/apartments+api';
import Add from '../../components/apartment/AddApartBtn';
import EmptyState from '../../components/EmptyState';
import type { Apartment } from '../../migrations/00008-createTableApartments';

import { parse } from 'cookie';
import type { UserResponseBodyGet } from '../api/user+api';
import ApItemDa from '../../components/apartment/ApItemDa';

const apartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Apartment }) => (
    // <ApartItem apartment={item.item} setIsStale={setIsStale} />
    <ApItemDa apartment={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getUserAndApartments() {
        const [userResponse, apartmentsResponse]: [
          UserResponseBodyGet,
          ApartmentsResponseBodyGet,
        ] = await Promise.all([
          fetch('/api/user').then((response) => response.json()),
          fetch('/api/dashboard/dashboard').then((response) => response.json()),
        ]);

        setIsStale(false);

        if ('error' in userResponse) {
          router.replace('/authModal/signin?returnTo=/(tabs)/apartments');
          return;
        }

        if ('error' in apartmentsResponse) {
          setApartments([]);
          return;
        }

        if ('apartments' in apartmentsResponse) {
          setApartments(apartmentsResponse.apartments);
        }
      }

      getUserAndApartments().catch((error) => {
        console.error(error);
      });
    }, [isStale, router]),
  );

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <FlatList
        data={apartments}
        renderItem={renderItem}
        keyExtractor={(item: Apartment) => String(item.id)}
      />
    </SafeAreaView>
  );
};

export default apartments;
