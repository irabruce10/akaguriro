import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { router, Slot, Stack, useFocusEffect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { UserStreamResponseBodyGet } from '../api/astreamusers/users+api';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot />
      {/* <Stack /> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
