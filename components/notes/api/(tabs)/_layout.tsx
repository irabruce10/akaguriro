import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack, Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'chat' }} />
      <Stack.Screen name="profile" options={{ title: 'chat' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({});
