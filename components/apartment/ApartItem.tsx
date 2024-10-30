import { View, Text, Pressable } from 'react-native';
import React from 'react';
import type { Apartment } from '../../migrations/00001-createTableApartments';
import { Link } from 'expo-router';

type Props = {
  apartment: Apartment;
  setIsStale: (isStale: boolean) => void;
};

const ApartItem = ({ apartment }: Props) => {
  const { id, name, rooms, maxCapacity } = apartment;
  return (
    <Link href={`/apartmentModal/${id}`} asChild>
      <Pressable>
        <View className="my-6 px-4 space-y-6">
          <Text className="text-white">ID: {id}</Text>
          <Text className="text-white">name:{name}</Text>
          <Text className="text-white">Rooms: {rooms}</Text>
          <Text className="text-white">guests: {maxCapacity}</Text>
        </View>
      </Pressable>
    </Link>
  );
};

export default ApartItem;
