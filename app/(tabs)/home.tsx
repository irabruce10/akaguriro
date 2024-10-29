import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native';
import type { Product } from '../../migrations/00000-createTableProducts';

import type { ProductsResponseBodyGet } from '../api/products+api';
import ProductItem from '../../components/ProductItem';
import SearchInput from '../../components/SearchInput';
import { useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Product }) => (
    <ProductItem product={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;
      async function getProducts() {
        const response = await fetch('/api/products', {
          headers: {
            Cookie: 'name=value',
          },
        });
        const body: ProductsResponseBodyGet = await response.json();
        setProducts(body.products);
        setIsStale(false);
      }
      getProducts().catch((error) => {
        console.error('Error:', error);
      });
    }, [isStale]),
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar style="light" />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item: Product) => String(item.id)}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-start mb-6">
              <Text className="font-pmedium text-sm text-gray-100 mt-12">
                Store
              </Text>
            </View>
            <SearchInput
              handleChangeText={function (text: string): void {
                throw new Error('Function not implemented.');
              }}
              value={''}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
