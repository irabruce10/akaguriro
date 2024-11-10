import { Ionicons } from '@expo/vector-icons';
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
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

import CalenderPicker from '../../components/CalenderPicker';
import { Picker } from '@react-native-picker/picker';
import type { UserResponseBodyGet } from '../api/user+api';
import type { ApartmentResponseBodyGet } from '../api/apartments/[apartmentId]+api';
import type { Apartment } from '../../migrations/00008-createTableApartments';

export default function Apartment() {
  const { dashboardId } = useLocalSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [focusedInput, setFocusedInput] = useState<string | undefined>();
  const [guestsNumber, setGuestsNumber] = useState('');
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [totalPrice, setTotalPrice] = useState('');
  const [userName, setUserName] = useState('');
  const [apartment, setApartment] = useState<Apartment | null>();
  // useFocusEffect(
  //   useCallback(() => {
  //     async function loadApartme() {
  //       if (typeof apartmentId !== 'string') {
  //         return;
  //       }

  //       const response = await fetch(`/api/apartments/${apartmentId}`);
  //       const body = await response.json();

  //       if ('apartment' in body) {
  //         setName(body.apartment.name);
  //         setRooms(body.apartment.rooms);
  //         setMaxCapacity(body.apartment.maxCapacity);
  //         setImagesUrl(body.apartment.imagesUrl);
  //         setUserName(body.apartment.userName);
  //       }

  //       // const responsez = await fetch('/api/apartments/apartments');

  //       // const bodyz: UserResponseBodyGet = await responsez.json();
  //       // console.log('bodss', bodyz);
  //       // setUserName(bodyz.name);
  //     }

  //     loadApartme().catch((error) => {
  //       console.error(error);
  //     });
  //   }, [apartmentId]),
  // );

  // if (typeof apartmentId !== 'string') {
  //   return null;
  // }

  useFocusEffect(
    useCallback(() => {
      async function getUserAndLoadApartment() {
        if (typeof dashboardId !== 'string') {
          return;
        }

        const [userResponse, apartmentResponse]: [
          UserResponseBodyGet,
          ApartmentResponseBodyGet,
        ] = await Promise.all([
          fetch('/api/user').then((response) => response.json()),
          fetch(`/api/dashboard/${dashboardId}`).then((response) =>
            response.json(),
          ),
        ]);

        console.log('User response', userResponse);

        if ('error' in userResponse) {
          router.replace(
            `/authModal/signin?returnTo=/apartments/${dashboardId}`,
          );
        }

        if ('apartment' in apartmentResponse) {
          setApartment(apartmentResponse.apartment!);
          console.log('Apartment responsedf', apartment!);
        }
      }

      getUserAndLoadApartment().catch((error) => {
        console.error(error);
      });
    }, [dashboardId, router]),
  );

  if (typeof dashboardId !== 'string') {
    return null;
  }
  if (!apartment) {
    return (
      <View>
        <Text>Access Denied</Text>
        <Text>You do not have permission to access this note</Text>
        <Link href="/(tabs)/apartments">Back to notes</Link>
      </View>
    );
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
              await fetch(`/api/apartments/${dashboardId}`, {
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
            <Text className="font-pmedium text-sm text-black">user</Text>
            <Text className="font-pmedium text-sm text-black">
              Apartment Details :
            </Text>
            <View className="flex-row justify-between items-start mb-6">
              {apartment?.imagesUrl.map((imageUrl, index) => (
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
              name: {apartment?.name}
            </Text>
            <Text className="text-black">{apartment?.rooms} rooms </Text>
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
                await fetch(`/api/apartments/${dashboardId}`, {
                  method: 'DELETE',
                });
                setIsEditing(false);
                router.replace('/dashboard/dashboard');
              }}
            >
              <Ionicons name="trash-outline" size={36} />
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
}

// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// const apartment = () => {
//   return (
//     <View>
//       <Text>apartment</Text>
//     </View>
//   );
// };

// export default apartment;

// const styles = StyleSheet.create({});
