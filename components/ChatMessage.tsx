import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import type { Chat } from '../migrations/00010-createTableChats';
type Props = {
  messages: Chat;
  setIsStale: (isStale: boolean) => void;
};
export default function ChatMessage({ messages }: Props) {
  const { id, message, createdAt } = messages;
  return (
    <View>
      <Text>
        {/* {messages.userId === messages.apartment?.ownerId ? 'Owner' : 'User'} */}
      </Text>
      <Text> {message}</Text>
      <Text> {createdAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
