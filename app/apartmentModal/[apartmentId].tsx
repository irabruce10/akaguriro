import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { ApartmentResponseBodyGet } from '../apiApartments/[apartmentId]+api';

import CalenderPicker from '../../components/CalenderPicker';
import { Picker } from '@react-native-picker/picker';

export default function Apartment() {
  const { apartmentId } = useLocalSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [focusedInput, setFocusedInput] = useState<string | undefined>();
  const [guestsNumber, setGuestsNumber] = useState('');
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [totalPrice, setTotalPrice] = useState('');
  useFocusEffect(
    useCallback(() => {
      async function loadApartme() {
        if (typeof apartmentId !== 'string') {
          return;
        }

        const response = await fetch(`/api_apartments/${apartmentId}`);
        const body = await response.json();

        if ('apartment' in body) {
          setName(body.apartment.name);
          setRooms(body.apartment.rooms);
          setMaxCapacity(body.apartment.maxCapacity);
          setImagesUrl(body.apartment.imagesUrl);
        }
      }

      loadApartme().catch((error) => {
        console.error(error);
      });
    }, [apartmentId]),
  );

  if (typeof apartmentId !== 'string') {
    return null;
  }

  return (
    <ScrollView>
      {isEditing ? (
        <>
          <View>
            <Text> Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(undefined)}
            />
            <Text>rooms</Text>
            <TextInput
              value={rooms.toString()}
              onChangeText={setRooms}
              onFocus={() => setFocusedInput('rooms')}
              onBlur={() => setFocusedInput(undefined)}
            />

            <Text>maxCapacity</Text>
            <TextInput
              value={maxCapacity.toString()}
              onChangeText={setMaxCapacity}
            />
          </View>
          <Pressable
            onPress={async () => {
              await fetch(`/api_apartments/${apartmentId}`, {
                method: 'PUT',
                body: JSON.stringify({
                  name,
                  rooms: parseInt(rooms),
                  maxCapacity: parseInt(maxCapacity),
                }),
              });

              setIsEditing(false);
              router.replace('/(tabs)/apartments');
            }}
          >
            <Text>Save</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View className="my-6 px-4 space-y-6">
            <Text className="font-pmedium text-sm text-black">
              Apartment Details
            </Text>
            <View className="flex-row justify-between items-start mb-6">
              {imagesUrl.map((imageUrl, index) => (
                <Image
                  className="flex-1 flex-row"
                  key={index}
                  source={{ uri: imageUrl }}
                  style={{ width: 150, height: 150 }}
                  resizeMode="contain"
                />
              ))}
            </View>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-black font-pregular "
            >
              name: {name}
            </Text>
            <Text className="text-black">{rooms} rooms </Text>

            <Text>How many guests?</Text>
            <Picker
              selectedValue={guestsNumber}
              onValueChange={(itemValue) => setGuestsNumber(itemValue)}
              mode="dropdown"
              style={{ height: 50, width: 150 }}
              itemStyle={{ height: 50 }}
            >
              {Array.from({ length: parseInt(maxCapacity) + 1 }, (_, i) => (
                <Picker.Item key={i} label={`${i} `} value={i} />
              ))}
            </Picker>

            <Text>hasBreakfast: </Text>
            <Switch
              value={hasBreakfast}
              onValueChange={(newValue) => setHasBreakfast(newValue)}
              trackColor={{ false: '#767577', true: '#8e8b87' }}
              thumbColor="#fb8f15"
              ios_backgroundColor="#3e2465"
            />
            <Text>{hasBreakfast}</Text>
            {parseInt(guestsNumber) > 0 && hasBreakfast !== false && (
              <Text>Total price: {` ${60 * parseInt(guestsNumber)} `}</Text>
            )}
            <Text>You are booking for {guestsNumber} guests.</Text>
          </View>
          <View>
            {/* <Pressable
              onPress={() => {
                setIsEditing(true);
              }}
            >
              <Ionicons name="create-outline" size={36} />
            </Pressable>
            <Pressable
              onPress={async () => {
                await fetch(`/api_apartments/${apartmentId}`, {
                  method: 'DELETE',
                });
                setIsEditing(false);
                router.replace('/(tabs)/apartments');
              }}
            >
              <Ionicons name="trash-outline" size={36} />
            </Pressable> */}
          </View>
        </>
      )}

      <View className="my-6 px-4 space-y-6">
        <Text className="text-xl">Reserve {name} today. Pay on arrival.</Text>
        {/* <StartDatePicker /> */}

        <CalenderPicker />
      </View>
    </ScrollView>
  );
}
