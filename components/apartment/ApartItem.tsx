import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';

import { Link } from 'expo-router';
import { images } from '../../constants';
import type { Apartment } from '../../migrations/00008-createTableApartments';

type Props = {
  apartment: Apartment;
  setIsStale: (isStale: boolean) => void;
};

const ApartItem = ({ apartment }: Props) => {
  const { id, name, rooms, maxCapacity, imagesUrl } = apartment;
  return (
    <Link href={`/apartmentModal/${id}`} asChild>
      <Pressable>
        <View className="my-6 px-4 space-y-6">
          <Text className="text-white">name:{name}</Text>
          <Text className="text-white">Rooms: {rooms}</Text>
          <Text className="text-white">guests: {maxCapacity}</Text>

          {imagesUrl.length > 0 && (
            <Image
              source={{ uri: imagesUrl[0] }}
              style={{ width: 150, height: 150 }}
            />
          )}

          {/* <Image source={require('../../assets/images/yourImage.png')} /> */}
        </View>
      </Pressable>
    </Link>
  );
};

export default ApartItem;
