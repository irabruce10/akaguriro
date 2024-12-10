import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import CustomButton from '../../../components/CustomButton'
import { router, useFocusEffect } from 'expo-router'
import ProductForm from '../../../components/product/ProductForm'
import ProductItem from '../../../components/product/ProductItem'
import type { ProductsResponseBodyGet } from '../../api/products/products+api'
import type { Product } from '../../../migrations/00007-createTableProducts'



export default function product() {

  const [isStale, setIsStale] = useState(true);
const [products, setProducts] = useState<Product[]>([]);


  const renderItem = (item: { item: Product }) => (
    <ProductItem product={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getProducts() {
        const response = await fetch('/api/products/products');
        const body = await response.json();

        setProducts(body.products);

        const a = fetch('/api/user').then((response) => response.json());
      }

      getProducts().catch((error) => {
        console.error(error);
      });

    }, [isStale, router]),
  );
  return (
    <View>
      <Text>products</Text>
      <Text>add Product</Text>
      <ProductForm/>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}

      />


    </View>
  )
}

const styles = StyleSheet.create({})
