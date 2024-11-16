import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';

export default function HomeLayout() {
  return <Redirect href={'/achats/(home)/(tabs)'} />;
}

const styles = StyleSheet.create({});
