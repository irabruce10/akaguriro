import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Channel as ChannelType } from 'stream-chat';
import { Channel, ChannelList } from 'stream-chat-expo';
import { router, useFocusEffect } from 'expo-router';

import { StreamChat } from 'stream-chat';
import type { UserStreamResponseBodyGet } from '../../api/astreamusers/users+api';

const client = StreamChat.getInstance('trz2a6qq5m32');

export default function chat() {
  const [userId, setUserId] = useState('');
  const [isReady, setIsReady] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const connect = async () => {
        const response = await fetch('/api/astreamusers/users/');
        const body = await response.json();
        setUserId(body.id);
        if ('error' in body) {
          router.replace(
            '/authModal/signin?returnTo=/achats/(home)/(tabs)/chat',
          );
          return;
        }

        await client.connectUser(
          {
            id: String(body.id),
            name: body.name,
            image: `https://ui-avatars.com/api/?name=${body.name}`,
          },
          client.devToken(String(body.id)),
        );

        setIsReady(true);
      };
      connect();
      return () => {
        if (isReady) {
          client.disconnectUser();
        }

        setIsReady(false);
      };
    }, []),
  );

  // useEffect(() => {
  //   const connect = async () => {
  //     const response = await fetch('/api/astreamusers/users/');
  //     const body: UserStreamResponseBodyGet = await response.json();
  //     setUserId(body.id);
  //     if ('error' in body) {
  //       router.replace('/authModal/signin?returnTo=/(tabs)/chat');
  //       return;
  //     }

  //     // console.log('userId: ' + userId);

  //     await client.connectUser(
  //       {
  //         id: String(body.id), // Fixed: Convert number to string
  //         name: body.name,
  //         image: `https://ui-avatars.com/api/?name=${body.name}`,
  //       },
  //       client.devToken(String(body.id)),
  //     );
  //     console.log('user', body);
  //     setIsReady(true);
  //   };
  //   connect();
  //   return () => {
  //     if (isReady) {
  //       client.disconnectUser();
  //     }

  //     setIsReady(false);
  //   };
  // }, []);
  if (!isReady) {
    return <ActivityIndicator />;
  }
  return (
    <ChannelList
      filters={{ members: { $in: [String(userId)] } }}
      onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />
  );
}

const styles = StyleSheet.create({});
