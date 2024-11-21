import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { StreamChat } from 'stream-chat';

const client = StreamChat.getInstance('fvp2pqwqbcsh');
export default function Home() {
  return (
    <View>
      <Text>Home ...a </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
