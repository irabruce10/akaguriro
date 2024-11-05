import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
// import type { LogoutResponseBodyGet } from '../(auth)/api/logout+api';

import type { UserResponseBodyGet } from '../api_user/user+api';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,

    padding: 12,
    borderRadius: 12,

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default function Profile() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      async function getUser() {
        const response = await fetch('/api_user/user');

        const body: UserResponseBodyGet = await response.json();

        if ('error' in body) {
          router.replace('/(auth)/sign-in?redirect=profile');
          return;
        }
      }
      getUser().catch((error) => {
        console.error(error);
      });
    }, [router]),
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
        onPress={async () => {
          const response = await fetch('/api/logout');

          if (!response.ok) {
            let errorMessage = 'Error logging out';
            // const responseBody: LogoutResponseBodyGet = await response.json();
            // if ('error' in responseBody) {
            //   errorMessage = responseBody.error;
            // }

            Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
            return;
          }
        }}
      >
        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </View>
  );
}
