import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { type Product } from '../../migrations/00000-createTableProducts.js';
import { useFocusEffect } from 'expo-router';
import { type ProductsResponseBodyGet } from '../api/products+api.js';
import ProductItem from '../../components/ProductItem';
import SearchInput from '../../components/SearchInput.jsx';
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Product }) => (
    <ProductItem product={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function fetchProducts() {
        const response = await fetch('api/products', {
          headers: {
            Cookie: 'name=value',
          },
        });
        const body: ProductsResponseBodyGet = await response.json();
        setProducts(body.products);
        setIsStale(false);
      }
    }),
  );

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 flex">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-psemibold  text-2xl  text-gray-100 ">
                  Welcome again
                </Text>
              </View>
            </View>
            {/* <SearchInput /> */}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
