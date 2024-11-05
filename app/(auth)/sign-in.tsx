import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';
import { Link } from 'expo-router';

export default function signInPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View>
          <Text className="text-base text-gray-100 font-pmedium">Sign In</Text>
          <View className="justify-center items-center px-4 pt-5 ">
            <Text className="text-gray-100 ">email</Text>
            <TextInput
              className="w-full h-16 px-4 bg-black-100  rounded-2xl items-center flex-row text-gray-100 focus:border-secondary "
              value={name}
              onChangeText={setName}
            />
            <Text className="text-gray-100 ">password</Text>
            <TextInput
              className="w-full h-16 px-4 bg-black-100  rounded-2xl items-center flex-row  text-gray-100 focus:border-secondary "
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <Link href="/sign-up" style={{ color: 'blue' }}>
          Create account
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
