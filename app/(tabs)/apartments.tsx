import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TextInput } from 'react-native';
import React, { useCallback, useState } from 'react';

import { router, useFocusEffect } from 'expo-router';

import Add from '../../components/apartment/AddApartBtn';

import { parse } from 'cookie';
import type { Apartment } from '../../migrations/00008-createTableApartments';
import ApartItem from '../../components/apartment/ApartItem';
import type { ApartmentsResponseBodyGet } from '../api/apartments/apartments+api';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';

const apartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [search, setSearch] = useState('');

  const filteredAp = search
    ? apartments.filter(
        (item) =>
          item.name.includes(search.toLocaleLowerCase()) ||
          item.rooms.toString() === search,
      )
    : apartments;

  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Apartment }) => (
    <ApartItem apartment={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getApartments() {
        const response = await fetch('/api/apartments/apartments');
        const body: ApartmentsResponseBodyGet = await response.json();

        setApartments(body.apartments);

        const a = fetch('/api/user').then((response) => response.json());

        console.log('User apa:', a);

        //   const [apartmentsResponse, userResponse]: [
        //     ApartmentsResponseBodyGet,
        //     UserResponseBodyGet,
        //   ] = await Promise.all([
        //     fetch('/api/apartments/apartments').then((response) =>
        //       response.json(),
        //     ),
        //     fetch('/api/user').then((response) => response.json()),
        //   ]);

        //   setIsStale(false);
        //   console.log('User apa:', userResponse);
        //   console.log('Apartments:', apartmentsResponse);

        //   if ('error' in userResponse) {
        //     router.replace(`/(auth)/signin?returnTo=/(tabs)/apartments`);
        //     return;
        //   }

        //   if ('error' in apartmentsResponse) {
        //     setApartments([]);
        //     return;
        //   }

        //   if ('apartments' in apartmentsResponse) {
        //     setApartments(apartmentsResponse.apartments);
        //   }
      }

      getApartments().catch((error) => {
        console.error(error);
      });
    }, [isStale, router]),
  );

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <View className="my-6 px-4 space-y-6">
        <View className="flex-row justify-between items-start mb-6">
          <Text className="font-pmedium text-sm text-gray-100">
            User Profile
          </Text>
          <Text className="">
            <Add />
          </Text>
        </View>

        <View className="w-full flex-1 pt-5 pb-8">
          <Text className="text-gray-100 text-lg font-pregular mb-3">
            Latest Apartments
          </Text>
        </View>
      </View>
      <View>
        <SearchInput value={search} handleChangeText={setSearch} />
      </View>
      <FlatList
        data={filteredAp}
        renderItem={renderItem}
        keyExtractor={(item: Apartment) => String(item.id)}
        // ListHeaderComponent={() => (
        //   <View className="my-6 px-4 space-y-6">
        //     <View className="flex-row justify-between items-start mb-6">
        //       <Text className="font-pmedium text-sm text-gray-100">
        //         User Profile
        //       </Text>
        //       <Text className="">
        //         <Add />
        //       </Text>
        //     </View>

        //     <View>
        //       <SearchInput value={search} handleChangeText={setSearch} />
        //     </View>

        //     <View className="w-full flex-1 pt-5 pb-8">
        //       <Text className="text-gray-100 text-lg font-pregular mb-3">
        //         Latest Apartments
        //       </Text>
        //     </View>
        //   </View>
        // )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center px-4">
            <EmptyState
              title="No Apartment Found"
              subtitle="Be the first to upload the apartment!"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default apartments;
