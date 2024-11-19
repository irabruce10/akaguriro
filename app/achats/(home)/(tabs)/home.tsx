import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { StreamChat } from 'stream-chat';
import { router, Slot, Stack, useFocusEffect } from 'expo-router';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import type { UserStreamResponseBodyGet } from '../../../api/astreamusers/users+api';

const client = StreamChat.getInstance('fvp2pqwqbcsh');
export default function Home() {
  // useFocusEffect(
  //   useCallback(() => {
  //     const connect = async () => {
  //       const response = await fetch('/api/astreamusers/users/');
  //       const body: UserStreamResponseBodyGet = await response.json();

  //       if ('error' in body) {
  //         router.replace('/authModal/signin?returnTo=/(tabs)/home');
  //         return;
  //       }

  //       console.log(body);
  //       await client.connectUser(
  //         {
  //           id: String(body.id),
  //           name: body.name,
  //           image: 'https://ui-avatars.com/api/?name=user',
  //         },
  //         client.devToken(String(body.id)),
  //       );
  //       // const channel = client.channel('messaging', 'the_park', {
  //       //   name: 'the-park',
  //       // });
  //       // await channel.watch();
  //     };

  //     connect();
  //   }, []),
  // );

  return (
    <View>
      <Text>Home ...a </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
