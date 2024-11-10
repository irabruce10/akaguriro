import { Ionicons } from '@expo/vector-icons';
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Button,
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
import CustomButton from '../../components/CustomButton';

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
  const [userName, setUserName] = useState('');

  useFocusEffect(
    useCallback(() => {
      async function loadApartme() {
        if (typeof apartmentId !== 'string') {
          return;
        }

        const response = await fetch(`/api/apartments/${apartmentId}`);
        const body = await response.json();

        console.log('Apartment response', body);

        if ('apartment' in body) {
          setName(body.apartment.name);
          setRooms(body.apartment.rooms);
          setMaxCapacity(body.apartment.maxCapacity);
          setImagesUrl(body.apartment.imagesUrl);
          setUserName(body.apartment.userName);
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
      <View className="my-6 px-4 space-y-6">
        <Text className="font-pmedium text-sm text-black">user{userName}</Text>
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

        <View>
          <Link
            className="bg-secondary rounded-xl min-h-[62px] justify-center items-center"
            href={`/reservation/reservation?apartmentId=${apartmentId}`}
          >
            Reserve Now
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
