import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import type { Product } from '../migrations/00000-createTableProducts';

type Props = {
  product: Product;
  setIsStale: (isStale: boolean) => void;
};
export default function ProductItem({ product, setIsStale }: Props) {
  const { id, name, price, address } = product;
  return (
    <View>
      <Text className="text-white">ID: {id}</Text>
      <Text className="text-white">{name}</Text>
      <Text className="text-white">Price: {price}</Text>
      <Text className="text-white">Address: {address}</Text>
    </View>
  );
}
