import { ScrollView, StatusBar, Text, View } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView className="w-full flex justify-center items-center px-4 min-h-[105vh]">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className=" w-full justify-center items-center h-full px-4">
          <Text className="text-sm font-pblack   text-center">Akaguriro</Text>

          <Text>
            <Link href="/home" style={{ color: 'blue' }}>
              go to home page
            </Link>
          </Text>
          <CustomButton
            title="Continue with Login in"
            handlePress={() => router.push('/signin')}
            containerStyles="w-full flex justify-center items-center mt-4 px-4 py-2 rounded-md text-sm font-pblack text-white bg-primary"
            textStyles=""
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
