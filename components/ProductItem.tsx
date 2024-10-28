import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import type { Product } from '../migrations/00000-createTableProducts';
import { Link } from 'expo-router';

type Props = {
  product: Product;
  setIsStale: (isStale: boolean) => void;
};
export default function ProductItem({ product, setIsStale }: Props) {
  const { id, name, price, address } = product;
  return (
    <Link href={`/product/${id}`} asChild>
      <Pressable>
        <View>
          <Text className="text-red">ID: {id}</Text>
          <Text className="text-red">{name}</Text>
          <Text className="text-red">Price: {price}</Text>
          <Text className="text-red">Address: {address}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
