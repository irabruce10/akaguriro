import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { router, Slot, Stack, useFocusEffect } from 'expo-router';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import type { UserStreamResponseBodyGet } from '../api/astreamusers/users+api';

const client = StreamChat.getInstance('fvp2pqwqbcsh');
//   useEffect(() => {
//     const connect = async () => {
//       const response = await fetch('/api/astreamusers/users/');
//       const body: UserStreamResponseBodyGet = await response.json();

//       if ('error' in body) {
//         router.replace('/authModal/signin?returnTo=/(tabs)/home');
//         return;
//       }
//       setUserId(String(body.id));
//       console.log('bodynameaa: ', userName);
//       setUserName(body.name!);
//       console.log('bodyname: ', body.name);
//       console.log('userid', body.id);

//       await client.connectUser(
//         {
//           id: String(body.id), // Fixed: Convert number to string
//           name: body.name,
//           image: `https://ui-avatars.com/api/?name=${body.name}`,

//           // id: 'user1',
//           // name: 'user1',
//           // image: 'https://ui-avatars.com/api/?name=user',
//         },
//         client.devToken(String(body.id!)),
//         // client.devToken('user1'),
//       );
//       setIsReady(true);

//       const channel = client.channel('messaging', 'the_park', {
//         name: 'the-park',
//       });
//       await channel.watch();
//     };

//     connect();
//     // return () => {
//     //   if (isReady) client.disconnectUser();
//     //   setIsReady(false);
//     // };
//   }, []);

//   if (!isReady) {
//     return <ActivityIndicator />;
//   }
//   return <Slot />;
// }

export default function Homelayout() {
  useFocusEffect(
    useCallback(() => {
      const connect = async () => {
        const response = await fetch('/api/astreamusers/users/');
        const body: UserStreamResponseBodyGet = await response.json();

        if ('error' in body) {
          // router.replace('/authModal/signin?returnTo=/(tabs)/home');
          return;
        }

        console.log(body);
        await client.connectUser(
          {
            id: String(body.id),
            name: body.name,
            image: 'https://ui-avatars.com/api/?name=user',
          },
          client.devToken(String(body.id)),
        );
      };

      connect();
    }, []),
  );

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: 'chat', headerShown: false }}
          />
          <Stack.Screen
            name="apartmentModal/[apartmentId]"
            options={{
              presentation: 'modal',
              title: '',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
}

const styles = StyleSheet.create({});
