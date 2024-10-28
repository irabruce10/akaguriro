import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import type { Product } from '../../migrations/00000-createTableProducts.js';

import type { ProductsResponseBodyGet } from '../api/products+api.js';
import ProductItem from '../../components/ProductItem';
import SearchInput from '../../components/SearchInput.jsx';
import { useFocusEffect } from 'expo-router';
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
    <SafeAreaView className="bg-primary">
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item: Product) => String(item.id)}
        // ListHeaderComponent={() => (
        //   <View className="my-6 px-4 space-y-6 flex">
        //     <View className="justify-between items-start flex-row mb-6">
        //       <View>
        //         <Text className="font-psemibold  text-2xl  text-gray-100 ">
        //           Welcome again!
        //         </Text>
        //       </View>
        //     </View>
        //     {/* <SearchInput /> */}
        //   </View>
        // )}
      />
    </SafeAreaView>
  );
}
