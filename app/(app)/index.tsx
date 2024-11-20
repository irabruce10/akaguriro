import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect, Slot } from 'expo-router';

export default function MainTabScreen() {
  return <Redirect href={'/(app)/(tabs)/home'} />;
  // return <Redirect href={'/(home)'} />;
}
