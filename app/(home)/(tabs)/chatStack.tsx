import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useChatContext } from '../chatContext/ChatContext';
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
} from 'stream-chat-expo';
import { router } from 'expo-router';
import type { UserStreamResponseBodyGet } from '../../api/astreamusers/users+api';

export default function chatStack() {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const connect = async () => {
      const response = await fetch('/api/astreamusers/users/');
      const body: UserStreamResponseBodyGet = await response.json();
      if ('error' in body) {
        router.replace('/authModal/signin?returnTo=/(tabs)/home');
        return;
      }
      setUserId(String(body.id)); // Fixed: Convert number to string
    };
    connect();
  }, []);
  return (
    <ChannelList
      filters={{ members: { $in: [userId] } }}
      onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
    />
  );
}

const styles = StyleSheet.create({});
