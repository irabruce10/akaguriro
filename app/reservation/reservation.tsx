import { Ionicons } from '@expo/vector-icons';
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
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
import type { ReservationResponseBodyPost } from '../api/reservation/reservation+api';

interface ReservationProps {
  startDate: string;
  endDate: string;
}

export default function Apartment() {
  const { apartmentId } = useLocalSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [focusedInput, setFocusedInput] = useState<string | undefined>();
  const [guestsNumber, setGuestsNumber] = useState('');
  const [breakfast, setBreakfast] = useState(false);
  // const [extrasPrice, setExtrasPrice] = useState(0);
  const [userName, setUserName] = useState('');
  const [apartment, setApartment] = useState<Apartment | null>();
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [numNights, setNumNights] = useState(0);

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
    const response = await fetch('/api/reservation/reservation', {
      method: 'POST',
      body: JSON.stringify({
        startDate,
        endDate,
        numNights,
        numGuests: parseInt(guestsNumber),
        breakfast,
        apartmentId: Number(apartmentId),
      }),
    });
    if (!response.ok) {
      let errorMessage = 'Error creating apartment';
      const body: ReservationResponseBodyPost = await response.json();
      if ('error' in body) {
        errorMessage = body.error;
      }
      Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
      return;
    }

    router.push('/reservationDash/reservationDash');
  };

  const handleDateChange = (
    selectedStartDate: string,
    selectedEndDate: string,
  ) => {
    // setStartDate(selectedStartDate);
    // setEndDate(selectedEndDate);

    const startDateObj = new Date(selectedStartDate);
    const endDateObj = new Date(selectedEndDate);

    const startDate = startDateObj.toISOString().slice(0, 10);
    console.log('Start Dated:', startDate);
    const endDate = endDateObj.toISOString().slice(0, 10);

    setStartDate(startDate);
    setEndDate(endDate);

    const diffInMilliseconds = endDateObj.getTime() - startDateObj.getTime();

    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    setNumNights(diffInDays);

    console.log('Total Nights', numNights);
  };

  return (
    <ScrollView>
      <View className="my-6 px-4 space-y-6">
        <View>
          <Text className="text-xl">
            Reserve {apartment?.name} today. Pay on arrival.
          </Text>

          <CalenderPicker onDateChanges={handleDateChange} />

          <Text>Total Nights {numNights}</Text>
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
          value={breakfast}
          onValueChange={(newValue) => setBreakfast(newValue)}
          trackColor={{ false: '#767577', true: '#8e8b87' }}
          thumbColor="#fb8f15"
          ios_backgroundColor="#3e2465"
        />
        <Text>{breakfast}</Text>
        {/*
        {parseInt(guestsNumber) > 0 && breakfast !== false && (
          <Text> price: {Number(extrasPrice)}</Text>
        )} */}

        <Text>You are booking for {guestsNumber} guests.</Text>
      </View>

      <CustomButton title="Book Now" handlePress={handlePress} />
    </ScrollView>
  );
}
