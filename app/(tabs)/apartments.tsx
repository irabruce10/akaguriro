import SearchInput from '../../components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList } from 'react-native';
import React, { useCallback, useState } from 'react';

import ApartItem from '../../components/apartment/ApartItem';
import { useFocusEffect } from 'expo-router';
import type { ApartmentsResponseBodyGet } from '../api_apartments/apartments+api';
import Add from '../../components/apartment/AddApartBtn';
import EmptyState from '../../components/EmptyState';
import type { Apartment } from '../../migrations/00008-createTableApartments';

const apartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Apartment }) => (
    <ApartItem apartment={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getApartments() {
        const response = await fetch('/api_apartments/apartments', {
          headers: {
            Cookie: 'name=value',
          },
        });
        const body: ApartmentsResponseBodyGet = await response.json();

        setApartments(body.apartments);
        setIsStale(false);
      }

      getApartments().catch((error) => {
        console.error(error);
      });
    }, [isStale]),
  );

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <FlatList
        data={apartments}
        renderItem={renderItem}
        keyExtractor={(item: Apartment) => String(item.id)}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-start mb-6">
              <Text className="font-pmedium text-sm text-gray-100">
                User Profile
              </Text>
              <Text className="">
                <Add />
              </Text>
            </View>
            <SearchInput
              handleChangeText={function (text: string): void {
                throw new Error('Function not implemented.');
              }}
              value={''}
            />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Apartments
              </Text>
            </View>
          </View>
        )}
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
