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
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const [roomPrice, setRoomPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

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

        if ('apartment' in body) {
          setName(body.apartment.name);
          setRooms(body.apartment.rooms);
          setMaxCapacity(body.apartment.maxCapacity);
          setImagesUrl(body.apartment.imagesUrl);
          setOwner(body.apartment.ownerName!);
          setRoomPrice(body.apartment.price);
          setDescription(body.apartment.description);
          setLocation(body.apartment.location);
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
    router.replace(`/channel/${channel.cid}`);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-4">
          {/* <Text className="font-pmedium text-sm text-black">
            Apartment Details
          </Text> */}
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

          <View>
            <Animated.Text
              entering={FadeInLeft.delay(700).duration(700)}
              className="text-xl mt-6 text-black-400 font-pmedium "
            >
              name: {name}
            </Animated.Text>
          </View>
          <View>
            <Animated.Text
              entering={FadeInLeft.delay(600).duration(600)}
              className="text-xl mt-6 text-black-400 font-pmedium "
            >
              {rooms} rooms
            </Animated.Text>
          </View>
          <View>
            <Animated.Text
              entering={FadeInLeft.delay(500).duration(500)}
              className="text-xl mt-6 text-black-400 font-pmedium "
            >
              Max Capacity: {maxCapacity}
            </Animated.Text>
          </View>

          <View>
            <Animated.Text
              entering={FadeInDown.delay(400).duration(400)}
              className="text-xl mt-6 text-black-400 font-pmedium "
            >
              Room Price {roomPrice} €
            </Animated.Text>
          </View>
          <View>
            <Animated.Text
              entering={FadeInDown.delay(300).duration(300)}
              className="text-xl mt-6 text-black-100 font-pmedium "
            >
              Description: {description}
            </Animated.Text>
          </View>
          <View>
            <Animated.Text
              entering={FadeInDown.delay(200).duration(200)}
              className="text-xl mt-6 text-black-100 font-pmedium "
            >
              Location: {location}
            </Animated.Text>
          </View>

          <View>
            <Animated.Text
              entering={FadeInDown.delay(100).duration(100)}
              className="text-xl mt-6  text-black-100 font-pmedium "
            >
              <View className="flex flex-row justify-between">
                <View className="w-[46px] h-[46px] mr-4 rounded-lg border border-secondary justify-center p-0.5 ">
                  <Image
                    className="w-full h-full rounded-lg "
                    resizeMode="cover"
                    source={{
                      uri: `https://ui-avatars.com/api/?name=${owner}`,
                    }}
                  />
                </View>
              </View>
              <Text
                style={{
                  top: 31,
                  left: 10,
                  position: 'absolute',
                  fontSize: 16,
                  color: '#171717',
                }}
              >
                Owner {owner}
              </Text>
            </Animated.Text>
          </View>

          <View>
            <Link
              className="bg-secondary rounded-xl min-h-[62px] justify-center mt-5 pt-5 text-xl font-medium  text-center "
              href={`/reservation/reservation?apartmentId=${apartmentId}`}
            >
              Reserve Now
            </Link>

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
    </SafeAreaView>
  );
}
