import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Channel as ChannelType } from 'stream-chat';
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from 'stream-chat-expo';

export default function ChannelScreen() {
  const [channel, setChannel] = useState<ChannelType | null>();
  const { cid } = useLocalSearchParams<{ cid: string }>();

  const { client } = useChatContext();
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const channels = await client.queryChannels({ cid });
        setChannel(channels[0]);
      } catch (error) {
        console.error('Error fetching channel:', error);
      }
    };
    fetchChannel();
  }, [cid]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}

const styles = StyleSheet.create({});
