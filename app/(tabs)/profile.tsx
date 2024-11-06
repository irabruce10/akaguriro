import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import type { UserResponseBodyGet } from '../api/user+api';
import type { SignOutResponseBodyGet } from '../(auth)/api/signOut+api';

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
        const response = await fetch('/api/user');

        const body: UserResponseBodyGet = await response.json();

        if ('error' in body) {
          router.replace('/(auth)/signin?returnTo=/(tabs)/profile');
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
          const response = await fetch('/api/signOut');

          if (!response.ok) {
            let errorMessage = 'Error logging out';
            const responseBody: SignOutResponseBodyGet = await response.json();
            if ('error' in responseBody) {
              errorMessage = responseBody.error;
            }

            Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
            return;
          }

          router.push('/(auth)/signin');
        }}
      >
        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </View>
  );
}
