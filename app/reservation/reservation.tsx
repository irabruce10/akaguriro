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
import type { ApartmentResponseBodyGet } from '../api/apartments/[apartmentId]+api';
import type { Apartment } from '../../migrations/00008-createTableApartments';

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
  const [apartment, setApartment] = useState<Apartment | null>();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useFocusEffect(
    useCallback(() => {
      async function getUserAndLoadApartment() {
        if (typeof apartmentId !== 'string') {
          return;
        }

        const [userResponse, apartmentResponse]: [
          UserResponseBodyGet,
          ApartmentResponseBodyGet,
        ] = await Promise.all([
          fetch('/api/user').then((response) => response.json()),
          fetch(`/api/apartments/${apartmentId}`).then((response) =>
            response.json(),
          ),
        ]);

        if ('name' in userResponse) setUserName(userResponse.name);

        if ('error' in userResponse) {
          router.replace(
            `/authModal/signin?returnTo=/apartments/${apartmentId}`,
          );
        }

        if ('apartment' in apartmentResponse) {
          setApartment(apartmentResponse.apartment!);
        }
      }

      getUserAndLoadApartment().catch((error) => {
        console.error(error);
      });
    }, [apartmentId, router]),
  );
  const handlePress = async () => {
    console.log('handlePress', apartment?.userId);
    console.log('handlePress', apartment?.id);
    console.log('handlePress', guestsNumber);
    console.log('handlePress', startDate);
    console.log('handlePress', endDate);

    // // await uploadImages(images, 'image/jpeg');
    // const response = await fetch('/api/apartments/apartments', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     name,
    //     rooms: parseInt(rooms),
    //     maxCapacity: parseInt(maxCapacity),
    //     imagesUrl,
    //   }),
    // });
    // if (!response.ok) {
    //   let errorMessage = 'Error creating apartment';
    //   const body: ApartmentsResponseBodyPost = await response.json();
    //   if ('error' in body) {
    //     errorMessage = body.error;
    //   }
    //   Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
    //   return;
    // }
    // setName('');
    // setRooms('');
    // setMaxCapacity('');
    // setImages([]);
    // setImagesUrl([]);
    // router.push('/(tabs)/apartments');
  };

  const handleDateChange = (
    selectedStartDate: string,
    selectedEndDate: string,
  ) => {
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
  };

  return (
    <ScrollView>
      <View className="my-6 px-4 space-y-6">
        <View>
          <Text className="text-xl">
            Reserve {apartment?.name} today. Pay on arrival.
          </Text>

          <CalenderPicker onDateChanges={handleDateChange} />
        </View>
        <Text className="font-pmedium text-sm text-black">
          user {userName.toLocaleUpperCase()}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-black font-pregular "
        >
          name: {apartment?.name}
        </Text>
        <Text className="text-black">rooms {apartment?.rooms} </Text>

        <Text>How many guests?</Text>
        <Picker
          selectedValue={guestsNumber}
          onValueChange={(itemValue) => setGuestsNumber(itemValue)}
          mode="dropdown"
          style={{ height: 50, width: 150 }}
          itemStyle={{ height: 50 }}
        >
          {Array.from({ length: apartment?.maxCapacity! + 1 }, (_, i) => (
            <Picker.Item key={i} label={`${i} `} value={i} />
          ))}
        </Picker>

        <Text>Breakfast: </Text>
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

      <CustomButton title="Book Now" handlePress={handlePress} />
    </ScrollView>
  );
}