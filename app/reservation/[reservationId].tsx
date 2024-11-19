// import { Ionicons } from '@expo/vector-icons';
// import {
//   Link,
//   router,
//   useFocusEffect,
//   useLocalSearchParams,
// } from 'expo-router';
// import { useCallback, useState } from 'react';
// import {
//   Button,
//   Image,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';

// import CalenderPicker from '../../components/CalenderPicker';
// import { Picker } from '@react-native-picker/picker';
// import type { UserResponseBodyGet } from '../api/user+api';
// import CustomButton from '../../components/CustomButton';
// import type { ApartmentResponseBodyGet } from '../api/apartments/[apartmentId]+api';
// import type { Apartment } from '../../migrations/00008-createTableApartments';

// export default function Apartment() {
//   const { dashboardId } = useLocalSearchParams();

//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState('');
//   const [rooms, setRooms] = useState('');
//   const [maxCapacity, setMaxCapacity] = useState('');
//   const [imagesUrl, setImagesUrl] = useState<string[]>([]);
//   const [focusedInput, setFocusedInput] = useState<string | undefined>();
//   const [guestsNumber, setGuestsNumber] = useState('');
//   const [hasBreakfast, setHasBreakfast] = useState(false);
//   const [totalPrice, setTotalPrice] = useState('');
//   const [userName, setUserName] = useState('');
//   const [apartment, setApartment] = useState<Apartment | null>();
//   const [isStale, setIsStale] = useState(true);

//   useFocusEffect(
//     useCallback(() => {
//       async function getUserAndLoadApartment() {
//         if (typeof dashboardId !== 'string') {
//           return;
//         }

//         const [userResponse, apartmentResponse]: [
//           UserResponseBodyGet,
//           ApartmentResponseBodyGet,
//         ] = await Promise.all([
//           fetch('/api/user').then((response) => response.json()),
//           fetch(`/api/dashboard/${dashboardId}`).then((response) =>
//             response.json(),
//           ),
//         ]);

//         console.log('User response', userResponse);

//         if ('error' in userResponse) {
//           router.replace(
//             `/authModal/signin?returnTo=/apartments/${dashboardId}`,
//           );
//         }

//         if ('apartment' in apartmentResponse) {
//           setApartment(apartmentResponse.apartment);
//           console.log('Apartment responsedf', apartment);
//         }
//       }

//       getUserAndLoadApartment().catch((error) => {
//         console.error(error);
//       });
//     }, [dashboardId, router]),
//   );

//   if (typeof dashboardId !== 'string') {
//     return null;
//   }

//   return (
//     <ScrollView>
//       <View className="my-6 px-4 space-y-6">
//         <View>
//           <Text className="text-xl">Reserve {name} today. Pay on arrival.</Text>

//           <CalenderPicker />
//         </View>
//         <Text className="font-pmedium text-sm text-black">user{userName}</Text>

//         <Text
//           numberOfLines={1}
//           ellipsizeMode="tail"
//           className="text-black font-pregular "
//         >
//           name: {name}
//         </Text>
//         <Text className="text-black">{rooms} rooms </Text>

//         <Text>How many guests?</Text>
//         <Picker
//           selectedValue={guestsNumber}
//           onValueChange={(itemValue) => setGuestsNumber(itemValue)}
//           mode="dropdown"
//           style={{ height: 50, width: 150 }}
//           itemStyle={{ height: 50 }}
//         >
//           {Array.from({ length: parseInt(maxCapacity) + 1 }, (_, i) => (
//             <Picker.Item key={i} label={`${i} `} value={i} />
//           ))}
//         </Picker>

//         <Text>Breakfast: </Text>
//         <Switch
//           value={hasBreakfast}
//           onValueChange={(newValue) => setHasBreakfast(newValue)}
//           trackColor={{ false: '#767577', true: '#8e8b87' }}
//           thumbColor="#fb8f15"
//           ios_backgroundColor="#3e2465"
//         />
//         <Text>{hasBreakfast}</Text>
//         {parseInt(guestsNumber) > 0 && hasBreakfast !== false && (
//           <Text>Total price: {` ${60 * parseInt(guestsNumber)} `}</Text>
//         )}
//         <Text>You are booking for {guestsNumber} guests.</Text>
//       </View>
//     </ScrollView>
//   );
// }
