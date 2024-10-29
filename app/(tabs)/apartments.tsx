import { Text, View } from 'react-native';
import React from 'react';
import Add from '../../components/apartment/AddApartBtn';

export default function About() {
  return (
    <View>
      <Text>Apartment</Text>
      <Text className="mt-8">
        <Add />{' '}
      </Text>
    </View>
  );
}
