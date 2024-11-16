import { Ionicons } from '@expo/vector-icons';
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import CalenderPicker from '../../../../components/CalenderPicker';
import { Picker } from '@react-native-picker/picker';
import type { UserResponseBodyGet } from '../../../api/user+api';
import CustomButton from '../../../../components/CustomButton';
import { useChatContext } from 'stream-chat-expo';

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
  const [owner, setOwner] = useState('');
  const [me, setMe] = useState('');
  const [ownerId, setOwnerId] = useState('');

  useFocusEffect(
    useCallback(() => {
      async function loadApartme() {
        if (typeof apartmentId !== 'string') {
          return;
        }

        const response = await fetch(`/api/apartments/${apartmentId}`);
        const body = await response.json();

        console.log('Apartmentss response', body);

        if ('apartment' in body) {
          setName(body.apartment.name);
          setRooms(body.apartment.rooms);
          setMaxCapacity(body.apartment.maxCapacity);
          setImagesUrl(body.apartment.imagesUrl);
          setOwner(body.apartment.ownerName);
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

  const { client } = useChatContext();
  useEffect(() => {
    const connect = async () => {
      const response = await fetch('/api/astreamusers/users/');
      const body = await response.json();
      setMe(body.id);

      console.log('bodyid: ', me);

      const responseSender = await fetch(`/api/apartments/${apartmentId}`);
      const bodySender = await responseSender.json();

      setOwnerId(bodySender.apartment.userId);
      console.log('ownerapa', ownerId);
    };
    connect();
  }, []);

  const handlePress = async () => {
    console.log('me', me);
    console.log('ownerid', ownerId);
    const channel = client.channel('messaging', {
      members: [String(me), String(ownerId)],
    });
    await channel.watch();
    router.replace(`/achats/channel/${channel.cid}`);
    console.warn('Press');
  };

  return (
    <ScrollView>
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

        <Text>Max Capacity: {maxCapacity} </Text>

        <Text className="font-pmedium text-sm text-black">Owner {owner}</Text>

        <View>
          <Link
            className="bg-secondary rounded-xl min-h-[62px] justify-center items-center"
            href={`/reservation/reservation?apartmentId=${apartmentId}`}
          >
            Reserve Now
          </Link>

          {/* <Link
            className="bg-secondary rounded-xl min-h-[62px] mt-4 justify-center items-center"
            href={`/chat/chat?apartmentId=${apartmentId}`}
          >
            message
          </Link> */}

          <TouchableOpacity
            onPress={handlePress}
            className="bg-secondary rounded-xl mt-6 min-h-[62px] justify-center items-center"
          >
            <Text className={`text-primary font-psemibold text-lg `}>
              Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
