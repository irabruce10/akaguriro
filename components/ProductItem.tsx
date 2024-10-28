import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import type { Product } from '../migrations/00000-createTableProducts';

type Props = {
  product: Product;
  setIsStale: (isStale: boolean) => void;
};
export default function ProductItem({ product, setIsStale }: Props) {
  const { id, name, price, address, category, quantity, owner } = product;
  return (
    <View>
      <Text>{name}</Text>

      <Text>Price: {price}</Text>
      <Text>ID: {id}</Text>
      <Text>Address: {address}</Text>
      <Text>Category: {category}</Text>
      <Text>Quantity: {quantity}</Text>
      <Text>Owner: {owner}</Text>
    </View>
  );
}
