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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.background,
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,

    // color: colors.text,
  },
  textContainer: {
    alignItems: 'center',
    gap: 12,
  },
  textSecondary: {
    textAlign: 'center',
    fontSize: 14,

    // color: colors.textSecondary,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 80,
    gap: 200,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    // backgroundColor: colors.text,
    padding: 12,
    borderRadius: 12,
    // shadowColor: colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
  },
  buttonText: {
    // color: colors.cardBackground,
    textAlign: 'center',
    fontSize: 18,
  },
  label: {
    fontSize: 18,

    // color: colors.text,
    marginBottom: 8,
  },
  input: {
    // color: colors.text,
    // backgroundColor: colors.background,
    // borderColor: colors.textSecondary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  inputFocused: {
    // borderColor: colors.white,
  },
  inputContainer: {
    width: '100%',
    // backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
});

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
    <View style={styles.container}>
      <View style={styles.avatar}></View>
      {isEditing ? (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}> Name</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'name' && styles.inputFocused,
              ]}
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(undefined)}
            />
            <Text style={styles.label}>rooms</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'rooms' && styles.inputFocused,
              ]}
              value={rooms.toString()}
              onChangeText={setRooms}
              onFocus={() => setFocusedInput('rooms')}
              onBlur={() => setFocusedInput(undefined)}
            />

            <Text style={styles.label}>maxCapacity</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'rooms' && styles.inputFocused,
              ]}
              value={maxCapacity.toString()}
              onChangeText={setMaxCapacity}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.5 : 1 },
            ]}
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
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              name: {name} {rooms} rooms, {maxCapacity} guests
            </Text>

            <Text style={styles.textSecondary}>{maxCapacity}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Pressable
              style={styles.icon}
              onPress={() => {
                setIsEditing(true);
              }}
            >
              <Ionicons name="create-outline" size={36} />
            </Pressable>
            <Pressable
              style={styles.icon}
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
