import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Link } from 'expo-router';
import type { Product } from '../../migrations/00007-createTableProducts';

type Props = {
  product: Product;
  setIsStale: (isStale: boolean) => void;
};
export default function ProductItem({ product, setIsStale }: Props) {
  const { id, name, price, address } = product;
  return (
    <Link href={`/productModal/${id}`} asChild>
      <Pressable>
        <View>
          <Text className="text-black">ID: {id}</Text>
          <Text className="text-black">name {name}</Text>
          <Text className="text-black">Price: {price}</Text>
          <Text className="text-black">Address: {address}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
