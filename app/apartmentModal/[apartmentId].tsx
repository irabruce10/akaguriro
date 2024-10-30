import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { ApartmentResponseBodyGet } from '../api_apartments/[apartmentId]+api';

export default function Apartment() {
  const { apartmentId } = useLocalSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();

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
    <View>
      <View></View>
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
          <View>
            <Text numberOfLines={1} ellipsizeMode="tail">
              name: {name} {rooms} rooms, {maxCapacity} guests
            </Text>

            <Text>{maxCapacity}</Text>
          </View>
          <View>
            <Pressable
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
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
