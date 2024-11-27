import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TextInput, Image } from 'react-native';
import React, { useCallback, useState } from 'react';

import { router, useFocusEffect } from 'expo-router';

import type { Apartment } from '../../../migrations/00008-createTableApartments';
import ApartItem from '../../../components/apartment/ApartItem';
import type { ApartmentsResponseBodyGet } from '../../api/apartments/apartments+api';
import SearchInput from '../../../components/SearchInput';
import EmptyState from '../../../components/EmptyState';
import Add from '../../../components/apartment/AddApartBtn';

const apartments = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const filteredAp = search
    ? apartments.filter(
        (item) =>
          item.location.includes(search.toLocaleLowerCase()) ||
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
      }

      getApartments().catch((error) => {
        console.error(error);
      });
      setLoading(false);
    }, [isStale, router]),
  );

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <View className="my-6 px-4 ">
        <View className="flex flex-row justify-between mt-5">
          <Image
            source={require('../../../assets/AkaLogo.png')}
            resizeMode="cover"
            style={{ width: 50, height: 50, top: -20 }}
          />
          <Text className="" style={{ top: -12 }}>
            <Add />
          </Text>
        </View>
      </View>
      <View className="mt-x px-4" style={{ top: -20 }}>
        <SearchInput value={search} handleChangeText={setSearch} />
      </View>
      <Text className="text-gray-100 px-4  text-lg font-pregular ">
        Latest Apartments
      </Text>

      <FlatList
        data={filteredAp}
        renderItem={renderItem}
        keyExtractor={(item: Apartment) => String(item.id)}
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
