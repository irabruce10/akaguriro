import { StatusBar, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="w-full flex justify-center items-center h-full px-4">
      <Text className="text-sm font-pblack  mt-7 text-center">Akaguriro</Text>
      <StatusBar />

      <Link href="/home" style={{ color: 'blue' }}>
        go to home page
      </Link>
    </View>
  );
}
