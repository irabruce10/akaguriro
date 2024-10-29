import { View, Text } from 'react-native';
import React from 'react';
import type { Apartment } from '../migrations/00001-createTableApartments';
type Props = {
  apartment: Apartment;
  setIsStale: (isStale: boolean) => void;
};

const ApartItem = ({ apartment }: Props) => {
  const { id, name, rooms, max_capacity } = apartment;
  return (
    <View>
      <Text className="text-red">ID: {id}</Text>
      <Text className="text-red">name:{name}</Text>
      <Text className="text-red">Rooms: {rooms}</Text>
      <Text className="text-red">guests: {max_capacity}</Text>
    </View>
  );
};

export default ApartItem;
