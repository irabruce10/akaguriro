import SearchInput from '../../components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, Image } from 'react-native';
import React, { useCallback, useState } from 'react';

import ApartItem from '../../components/apartment/ApartItem';
import { Link, router, useFocusEffect } from 'expo-router';
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
      <View className="my-6 px-4 ">
        <View className="flex flex-row justify-between mt-5">
          <Image
            source={require('../../assets/AkaLogo.png')}
            resizeMode="cover"
            style={{ width: 50, height: 50, top: -20 }}
          />
          <Text className="" style={{ top: -12 }}>
            <Add />
          </Text>
        </View>
      </View>
      <Text className="text-gray-100 px-4  text-lg font-pregular ">
        Apartments Dashboard
      </Text>
      <FlatList
        data={apartments}
        renderItem={renderItem}
        keyExtractor={(item: Apartment) => String(item.id)}
        ListEmptyComponent={() => (
          <View className="flex-1 mt-20 justify-center items-center px-4">
            <EmptyState
              title="No Apartment Found"
              subtitle="Be the first to upload the apartment!"
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View className="flex-shrink-0 mb-6  ">
            <View className="flex flex-row  mb-14  text-center items-center ml-10   ">
              <Link
                href="/(app)/(tabs)/apartments"
                style={{ color: 'blue' }}
                className=" text-center  hover:text-black-800 visited:text-purple-600"
              >
                <Text className="text-secondary"> Go Back</Text>
              </Link>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default apartments;
