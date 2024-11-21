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
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCallback, useState } from 'react';
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
  type Href,
} from 'expo-router';
import type { UserResponseBodyGet } from '../api/user+api';
import type { LoginResponseBodyPost } from '../(auth)/api/signIn+api';

export default function signInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { returnTo } = useLocalSearchParams<{ returnTo: string }>();

  useFocusEffect(
    useCallback(() => {
      async function getUser() {
        const response = await fetch('/api/user');

        const responseBody: UserResponseBodyGet = await response.json();

        if ('name' in responseBody) {
          if (returnTo && typeof returnTo === 'string') {
            router.replace(returnTo as Href);
          }

          router.replace('/(app)/(tabs)/home');
        }
      }

      getUser().catch((error) => {
        console.error(error);
      });
    }, [returnTo]),
  );
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4">
        <View>
          <View className="flex flex-row justify-between mt-5">
            <Text className="text-base text-gray-100 font-pmedium ">
              Sign In
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
            const response = await fetch('/api/signIn', {
              method: 'POST',
              body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              let errorMessage = 'Error logging in';
              const responseBody: LoginResponseBodyPost = await response.json();
              if ('error' in responseBody) {
                errorMessage = responseBody.error;
              }

              Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
              return;
            }

            const responseBody: LoginResponseBodyPost = await response.json();

            if ('error' in responseBody) {
              Alert.alert('Error', responseBody.error, [{ text: 'OK' }]);
              return;
            }

            setEmail('');
            setPassword('');

            if (returnTo && typeof returnTo === 'string') {
              router.replace(returnTo as Href);
            } else {
              router.replace('/(app)/(tabs)/home');
            }
          }}
        >
          <Text className="bg-secondary rounded-xl min-h-[62px] justify-center mt-5 pt-5 text-xl font-medium  text-center ">
            SignIn
          </Text>
        </Pressable>
        <View className="flex flex-row mt-4 mb-4  text-center items-center ml-10   ">
          <Text className="text-white">Don't have an Account? </Text>
          <Link
            href="/authModal/signup"
            style={{ color: 'blue' }}
            className=" text-center  hover:text-black-800 visited:text-purple-600"
          >
            <Text className="text-secondary"> Create account for free</Text>
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
