import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');

  return (
    <SafeAreaView>
      <View>
        <Text>Name</Text>
        <TextInput value={name} onChangeText={setName} />
        <Text>price</Text>
        <TextInput value={price} onChangeText={setPrice} />

        <Text>address</Text>

        <TextInput value={address} onChangeText={setAddress} />
      </View>
      <Pressable
        onPress={async () => {
          const product = {
            name,
            price,
            address,
          };
          const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(product),
          });

          if (!response.ok) {
            let errorMessage = 'Error creating guest';
            const body = await response.json();

            if ('error' in body) {
              errorMessage = body.error;
            }

            Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
            return;
          }

          setName('');
          setPrice('');
          setAddress('');
          router.push('/(tabs)/home');
        }}
      >
        <Text>Add product</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
