import { Link, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { UserResponseBodyGet } from '../../api/user+api';
import type { SignOutResponseBodyGet } from '../../(auth)/api/signOut+api';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Profile() {
  const [userName, setUserName] = React.useState('');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      async function getUser() {
        const response = await fetch('/api/user');

        const body: UserResponseBodyGet = await response.json();

        if ('error' in body) {
          router.replace('/authModal/signin?returnTo=/profile');
          return;
        }

        setUserName(body.name);
      }
      getUser().catch((error) => {
        console.error(error);
      });
    }, [router]),
  );

  return (
    <SafeAreaView>
      <View className="mt-10">
        <View>
          <View className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            <Image
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
              source={{ uri: `https://ui-avatars.com/api/?name=${userName}` }}
              alt="Bordered avatar"
            />
            <Text className="text-xl text-center font-psemibold mb-8 mt-6 text-black mt2">
              {userName.toLocaleUpperCase()!}
            </Text>
            <View className="flex flex-col space-y-5 sm:ml-8">
              <Link
                href="/dashboard/dashboard"
                className="py-3.5 mb-6 px-7 text-base font-medium text-primary-100 focus:outline-none  rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
              >
                Apartment Owner
              </Link>

              <View>
                <Link
                  href="/reservationDash/reservationDash"
                  className="py-3.5 px-7 text-base font-medium text-primary-100 focus:outline-none  rounded-lg border border-indigo-200  focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                >
                  Reservation Managment
                </Link>
              </View>
            </View>
          </View>
        </View>

        <Pressable
          onPress={async () => {
            const response = await fetch('/api/signOut');

            if (!response.ok) {
              let errorMessage = 'Error logging out';
              const responseBody: SignOutResponseBodyGet =
                await response.json();
              if ('error' in responseBody) {
                errorMessage = responseBody.error;
              }

              Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
              return;
            }

            router.push('/');
          }}
        >
          <View className="mt-9 px-11">
            <Text className="py-3.5 text-center text-base font-medium bg-[#fb8f15] rounded-lg border  ">
              Sign Out
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
