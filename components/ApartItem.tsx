import { View, Text } from 'react-native';
import React from 'react';
import type { Apartment } from '../migrations/00001-createTableApartments';
type Props = {
  apartment: Apartment;
  setIsStale: (isStale: boolean) => void;
};

const ApartItem = ({ apartment }: Props) => {
  const { id, name, rooms, maxCapacity } = apartment;
  return (
    <View>
      <Text className="text-white">ID: {id}</Text>
      <Text className="text-white">name:{name}</Text>
      <Text className="text-white">Rooms: {rooms}</Text>
      <Text className="text-white">guests: {maxCapacity}</Text>
    </View>
  );
};

export default ApartItem;
