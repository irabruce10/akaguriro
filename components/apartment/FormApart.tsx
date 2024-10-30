import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { ApartmentsResponseBodyPost } from '../../app/api_apartments/apartments+api';
import CustomButton from '../CustomButton';

export default function FormApart() {
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  return (
    <SafeAreaView>
      <View>
        <Text>name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text>rooms</Text>
        <TextInput
          value={rooms}
          onChangeText={setRooms}
          onFocus={() => setFocusedInput('rooms')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text>maxCapacity</Text>
        <TextInput
          value={maxCapacity}
          onChangeText={setMaxCapacity}
          onFocus={() => setFocusedInput('maxCapacity')}
          onBlur={() => setFocusedInput(undefined)}
        />
      </View>
      <CustomButton
        title="Add apartment"
        containerStyles="w-full my-7 px-28 text-center"
        textStyles="text-white font-bold"
        handlePress={async () => {
          const response = await fetch('/api_apartments/apartments', {
            method: 'POST',
            body: JSON.stringify({
              name,
              rooms: parseInt(rooms),
              maxCapacity: parseInt(maxCapacity),
            }),
          });

          if (!response.ok) {
            let errorMessage = 'Error creating guest';
            const body: ApartmentsResponseBodyPost = await response.json();

            if ('error' in body) {
              errorMessage = body.error;
            }

            Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
            return;
          }

          setName('');
          setRooms('');
          setMaxCapacity('');
          router.push('/(tabs)/apartments');
        }}
      />
    </SafeAreaView>
  );
}
