// import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
// import React, { useContext, useEffect, useState } from 'react';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useChatContext } from '../chatContext/ChatContext';
// import {
//   Channel,
//   ChannelList,
//   MessageInput,
//   MessageList,
// } from 'stream-chat-expo';
// import { router } from 'expo-router';

// import { StreamChat } from 'stream-chat';
// import type { UserStreamResponseBodyGet } from '../../../api/astreamusers/users+api';

// const client = StreamChat.getInstance('mj5v7j5fgvfn');

// export default function chatStack() {
//   const [userId, setUserId] = useState('');
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     const connect = async () => {
//       const response = await fetch('/api/astreamusers/users/');
//       const body: UserStreamResponseBodyGet = await response.json();
//       if ('error' in body) {
//         router.replace('/authModal/signin?returnTo=/(tabs)/chat');
//         return;
//       }

//       await client.connectUser(
//         {
//           id: String(body.id), // Fixed: Convert number to string
//           name: body.name,
//           image: `https://ui-avatars.com/api/?name=${body.name}`,
//         },
//         client.devToken(String(body.id)),
//       );
//       setIsReady(true);
//     };
//     connect();
//     return () => {
//       if (isReady) {
//         client.disconnectUser();
//       }

//       setIsReady(false);
//     };
//   }, []);
//   if (!isReady) {
//     return <ActivityIndicator />;
//   }
//   return (
//     <ChannelList
//       filters={{ members: { $in: [userId] } }}
//       onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
//     />
//   );
// }

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';

export default function chat() {
  return <Redirect href={'/achats/(home)/(tabs)/chat'} />;
}

const styles = StyleSheet.create({});
