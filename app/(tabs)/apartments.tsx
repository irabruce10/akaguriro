import React, { useCallback, useState } from 'react';
import Add from '../../components/apartment/AddApartBtn';
import type { Apartment } from '../../migrations/00001-createTableApartments';
import ApartItem from '../../components/ApartItem';
import { useFocusEffect } from 'expo-router';
import type { ApartmentsResponseBodyGet } from '../api/apartments+api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView, Text, View } from 'react-native';
import SearchInput from '../../components/SearchInput';

export default function About() {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Apartment }) => (
    <ApartItem apartment={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;
      async function getApartments() {
        const response = await fetch('/api/apartments', {
          headers: {
            Cookie: 'name=value',
          },
        });
        const body: ApartmentsResponseBodyGet = await response.json();
        setApartments(body.apartments);
        setIsStale(false);
      }
      getApartments().catch((error) => {
        console.error('Error:', error);
      });
    }, [isStale]),
  );

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={apartments}
        renderItem={renderItem}
        keyExtractor={(item: Apartment) => String(item.id)}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-start mb-6">
              <Text className="font-pmedium text-sm text-gray-100">
                Apartments
              </Text>
              <Text className="">
                <Add />{' '}
              </Text>
            </View>
            <SearchInput
              handleChangeText={function (text: string): void {
                throw new Error('Function not implemented.');
              }}
              value={''}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
