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
    <Link href={`/(app)/apartmentModal/${id}`} asChild>
      <Pressable>
        <View className="my-6 flex flex-row px-4 space-y-6  mb-10 mt-10  ">
          {imagesUrl.length > 0 && (
            <Image
              source={{ uri: imagesUrl[0] }}
              style={{ width: 200, height: 150 }}
              className="w-full h-full rounded-xl mt-2"
              resizeMode="cover"
            />
          )}
          <View className="px-9 text-center flex flex-col justify-between p-4 leading-normal ">
            <Text className="text-white mb-2 text-2xl font-bold tracking-tight  dark:text-white ">
              {name}
            </Text>
            <Text className=" mb-3 font-normal text-gray-500 dark:text-gray-400">
              {rooms} Rooms
            </Text>
            <Text className=" mb-3 font-normal text-gray-500 dark:text-gray-400">
              {maxCapacity} guests Max
            </Text>
          </View>
          <View></View>
          {/* <Image source={require('../../assets/images/yourImage.png')} /> */}
        </View>
      </Pressable>
    </Link>
  );
};

export default ApartItem;
