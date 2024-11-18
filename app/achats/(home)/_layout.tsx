// // import { router, Slot, Stack, Tabs, useFocusEffect } from 'expo-router';
// // import { useEffect, useState } from 'react';

// // import { StreamChat } from 'stream-chat';
// // import type { UserStreamResponseBodyGet } from '../../api/astreamusers/users+api';
// // import { ActivityIndicator } from 'react-native';

// // const client = StreamChat.getInstance('mj5v7j5fgvfn');
// // export default function HomeLayout() {
// //   const [isReady, setIsReady] = useState(false);
// //   const [userId, setUserId] = useState('');
// //   const [userName, setUserName] = useState('');

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

// // import { router, Slot, Stack, Tabs, useFocusEffect } from 'expo-router';
// // import React, { useEffect, useState } from 'react';

// // import { StreamChat } from 'stream-chat';
// // import type { UserStreamResponseBodyGet } from '../../api/astreamusers/users+api';
// // import { ActivityIndicator } from 'react-native';

// // const client = StreamChat.getInstance('mj5v7j5fgvfn');

// // async function connectAndFetchUser(): Promise<{
// //   userId: string;
// //   userName: string;
// // }> {
// //   const response = await fetch('/api/astreamusers/users/');
// //   const body: UserStreamResponseBodyGet = await response.json();

// //   if ('error' in body) {
// //     router.replace('/authModal/signin?returnTo=/(tabs)/home');
// //     throw new Error('User not found');
// //   }

// //   console.log('userNameeee', body.id);

// //   const userId = String(body.id);
// //   const userName = body.name!;

// //   await client.connectUser(
// //     {
// //       id: String(body.id),
// //       name: body.name,
// //       // image: `https://ui-avatars.com/api/?name=${String(String(body.name))}`,
// //     },
// //     client.devToken(String(body.id)),
// //   );
// //   const channel = client.channel('messaging', 'the_park', {
// //     name: 'the-park',
// //   });
// //   await channel.watch();
// //   return { userId, userName };
// // // }

// // export default function HomeLayout() {
// //   const [isReady, setIsReady] = useState(false);
// //   const [userId, setUserId] = useState('');
// //   const [userName, setUserName] = useState('');

// //   useFocusEffect(
// //     React.useCallback(() => {
// //       const connect = async () => {
// //         const { userId, userName } = await connectAndFetchUser();
// //         setUserId(userId);
// //         setUserName(userName);
// //         setIsReady(true);
// //       };

// //       connect();
// //     }, []),
// //   );

// //   if (!isReady) {
// //     return <ActivityIndicator />;
// //   }

// //   return <Slot />;
// // }

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React from 'react';
// import ChatProvider from '../../providers/ChatProvider';
// import { router, Stack } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function HomeLayout() {
//   return (
//     <ChatProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen
//           name="(tabs)"
//           options={{ title: 'chat', headerShown: false }}
//         />
//       </Stack>
//     </ChatProvider>
//   );
// }

// const styles = StyleSheet.create({});

//----------------------------------------------------------------

import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { router, Slot, Stack } from 'expo-router';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import type { UserStreamResponseBodyGet } from '../../api/astreamusers/users+api';

const client = StreamChat.getInstance('9eaw64xjzt94');
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
  useEffect(() => {
    const connect = async () => {
      const response = await fetch('/api/astreamusers/users/');
      const body: UserStreamResponseBodyGet = await response.json();

      if ('error' in body) {
        router.replace('/authModal/signin?returnTo=/(tabs)/home');
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
      // const channel = client.channel('messaging', 'the_park', {
      //   name: 'the-park',
      // });
      // await channel.watch();
    };

    connect();
  }, []);
  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ title: 'chat', headerShown: false }}
          />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
}

const styles = StyleSheet.create({});
