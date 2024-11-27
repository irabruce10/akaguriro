import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { router, Slot, Stack, useFocusEffect } from 'expo-router';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import type { UserStreamResponseBodyGet } from '../api/astreamusers/users+api';

const client = StreamChat.getInstance('trz2a6qq5m32');

export default function Homelayout() {
  useFocusEffect(
    useCallback(() => {
      const connect = async () => {
        const response = await fetch('/api/astreamusers/users/');
        const body: UserStreamResponseBodyGet = await response.json();

        if ('error' in body) {
          // router.replace('/authModal/signin?returnTo=/(tabs)/home');
          return;
        }

        await client.connectUser(
          {
            id: String(body.id),
            name: body.name,
            image: 'https://ui-avatars.com/api/?name={body.name}',
          },
          client.devToken(String(body.id)),
        );
      };

      connect();
    }, []),
  );

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: 'chat', headerShown: false }}
          />
          <Stack.Screen
            name="apartmentModal/[apartmentId]"
            options={{
              presentation: 'modal',
              title: '',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="apartmentModal/addApart"
            options={{
              presentation: 'modal',
              title: '',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
}

const styles = StyleSheet.create({});
