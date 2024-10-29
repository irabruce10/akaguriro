import { FlatList, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import Add from '../../components/apartment/AddApartBtn';
import type { Apartment } from '../../migrations/00001-createTableApartments';
import ApartItem from '../../components/ApartItem';
import { useFocusEffect } from 'expo-router';
import type { ApartmentsResponseBodyGet } from '../api/apartments+api';

export default function About() {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [isStale, setIsStale] = useState(true);

  const renderItem = (item: { item: Apartment }) => (
    <ApartItem apartment={item.item} setIsStale={setIsStale} />
  );

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;
      async function getApartments() {
        const response = await fetch('/api/apartments', {
          headers: {
            Cookie: 'name=value',
          },
        });
        const body: ApartmentsResponseBodyGet = await response.json();
        setApartments(body.apartments);
        setIsStale(false);
      }
      getApartments().catch((error) => {
        console.error('Error:', error);
      });
    }, [isStale]),
  );

  return (
    <View>
      <Text>Apartment</Text>
      <Text className="mt-8">
        <Add />{' '}
      </Text>

      <FlatList
        data={apartments}
        renderItem={renderItem}
        keyExtractor={(item: Apartment) => String(item.id)}
      />
    </View>
  );
}
