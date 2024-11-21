import { Link, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { SignUpResponseBodyPost } from '../(auth)/api/signUp+api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  useFocusEffect(
    useCallback(() => {
      async function getUser() {
        const response = await fetch('/api/user');

        const responseBody: SignUpResponseBodyPost = await response.json();

        if ('name' in responseBody) {
          router.replace('/authModal/signin');
        }
      }

      getUser().catch((error) => {
        console.error(error);
      });
    }, []),
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4">
        <View>
          <View className="flex flex-row justify-between mt-5">
            <Text className="text-base text-gray-100 font-pmedium ">
              Sign Up
            </Text>
            <Image
              source={require('../../assets/AkaLogo.png')}
              resizeMode="cover"
              style={styles.logo}
            />
          </View>
          <View className="justify-center items-center  ">
            <TextInput
              className="w-full h-16 bg-black-100  rounded-2xl items-center flex-row text-gray-100 focus:border-secondary mb-4 px-4 "
              value={name}
              placeholder="Enter your Firstname"
              placeholderTextColor={'gray'}
              onChangeText={setName}
            />
            <TextInput
              className="w-full h-16 bg-black-100  rounded-2xl items-center flex-row text-gray-100 focus:border-secondary mb-4 px-4 "
              value={email}
              placeholder="Enter your email address"
              placeholderTextColor={'gray'}
              onChangeText={setEmail}
            />

            <TextInput
              className="w-full h-16 px-4 bg-black-100  rounded-2xl items-center flex-row  text-gray-100 focus:border-secondary "
              value={password}
              placeholder="Enter your password"
              placeholderTextColor={'gray'}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <Pressable
          onPress={async () => {
            const response = await fetch('/api/signUp', {
              method: 'POST',
              body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
              let errorMessage = 'Error creating user';
              const responseBody: SignUpResponseBodyPost =
                await response.json();
              if ('error' in responseBody) {
                errorMessage = responseBody.error;
              }

              Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
              return;
            }

            const responseBody: SignUpResponseBodyPost = await response.json();

            if ('error' in responseBody) {
              Alert.alert('Error', responseBody.error, [{ text: 'OK' }]);
              return;
            }

            setName('');
            setPassword('');
            router.replace('/(app)/(tabs)/home');
          }}
        >
          <Text className="bg-secondary rounded-xl min-h-[62px] justify-center mt-5 pt-5 text-xl font-medium  text-center ">
            SignUp
          </Text>
        </Pressable>

        <View className="flex flex-row mt-4 mb-4  text-center items-center ml-24   ">
          <Text className="text-white">Already have an account? </Text>
          <Link
            href="/authModal/signin"
            style={{ color: 'blue' }}
            className=" text-center  hover:text-black-800 visited:text-purple-600"
          >
            <Text className="text-secondary"> SignIn</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    top: -20,
  },
});
