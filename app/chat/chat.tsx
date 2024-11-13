import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useCallback, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import CustomButton from '../../components/CustomButton';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import type { UserResponseBodyGet } from '../api/user+api';
import type { ApartmentResponseBodyGet } from '../api/apartments/[apartmentId]+api';
import type { Apartment } from '../../migrations/00008-createTableApartments';
import type { ReservationResponseBodyPost } from '../api/reservation/reservation+api';
import type { MessageResponseBodyGet } from '../api/chats/chats+api';
import type { Chat } from '../../migrations/00010-createTableChats';
import ChatMessage from '../../components/ChatMessage';

export default function ChatRoom() {
  const { apartmentId } = useLocalSearchParams();
  const [apartment, setApartment] = useState<Apartment | null>();
  const [message, setMessage] = useState('');
  const [createdAt, setCreatedAt] = useState(
    new Date().toISOString().replace('T', ' ').replace(/\..+/, ''),
  );

  const [chats, setChats] = useState<Chat[]>([]);

  const [ownerId, setOwnerId] = useState<number | null>(null);

  const [isStale, setIsStale] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function getUserAndLoadMessage() {
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

        if ('error' in userResponse) {
          router.replace(
            `/authModal/signin?returnTo=/apartments/${apartmentId}`,
          );
        }

        if ('apartment' in apartmentResponse) {
          setApartment(apartmentResponse.apartment!);
          setOwnerId(apartmentResponse.apartment?.userId!);
        }
      }

      getUserAndLoadMessage().catch((error) => {
        console.error(error);
      });
    }, [apartmentId, router]),
  );

  if (typeof apartmentId !== 'string') {
    return null;
  }
  const renderItem = (item: { item: Chat }) => (
    <ChatMessage messages={item.item} setIsStale={setIsStale} />
  );
  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getUserAndMessage() {
        const [userResponse, messageResponse]: [
          UserResponseBodyGet,
          MessageResponseBodyGet,
        ] = await Promise.all([
          fetch('/api/user').then((response) => response.json()),
          fetch('/api/chats/chats').then((response) => response.json()),
        ]);

        setIsStale(false);

        console.log('User', userResponse);
        console.log('message', messageResponse);

        if ('error' in userResponse) {
          router.replace('/authModal/signin?returnTo=/(tabs)/reservation');
          return;
        }

        if ('error' in messageResponse) {
          setChats([]);

          return;
        }

        if ('message' in messageResponse) {
          setChats(messageResponse.message);
        }
      }

      getUserAndMessage().catch((error) => {
        console.error(error);
      });
    }, [isStale, router]),
  );
  const handlePress = async () => {
    console.log('created', createdAt);
    const response = await fetch('/api/chats/chats', {
      method: 'POST',
      body: JSON.stringify({
        message,
        createdAt,
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

    router.push(`/chat/chat?apartmentId=${apartmentId}`);
  };

  return (
    <SafeAreaView>
      <Text>Chat</Text>

      <View>
        <TextInput value={message} onChangeText={setMessage} />
      </View>
      <Text>OwnerName {apartment?.ownerName!}</Text>

      {chats.length > 0 ? (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item: Chat) => String(item.id)}
        />
      ) : (
        <Text>No message </Text>
      )}

      <CustomButton
        title="Send"
        containerStyles="w-full my-7 px-28  "
        textStyles="text-white font-bold"
        handlePress={handlePress}
      />
    </SafeAreaView>
  );
}
