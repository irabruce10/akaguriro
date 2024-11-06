import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function NewProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');

  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  return (
    <SafeAreaView>
      <View>
        <Text>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text>price</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          onFocus={() => setFocusedInput('price')}
          onBlur={() => setFocusedInput(undefined)}
        />

        <Text>address</Text>

        <TextInput
          value={address}
          onChangeText={setAddress}
          onFocus={() => setFocusedInput('price')}
          onBlur={() => setFocusedInput(undefined)}
        />
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
