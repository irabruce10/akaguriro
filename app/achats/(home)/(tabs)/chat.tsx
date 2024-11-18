// import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
// import React, { useContext, useEffect, useState } from 'react';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useChatContext } from '../chatContext/ChatContext';
// import { ChannelList } from 'stream-chat-expo';
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
//         // router.replace('/authModal/signin?returnTo=/(tabs)/chat');
//         router.replace('/authModal/signin?returnTo=/(tabs)/chat');
//         return;
//       }

//       console.log('userId: ' + userId);
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
//     // return () => {
//     //   if (isReady) {
//     //     client.disconnectUser();
//     //   }

//     //   setIsReady(false);
//     // };
//   }, []);
//   // if (!isReady) {
//   //   return <ActivityIndicator />;
//   // }
//   return (
//     <ChannelList
//       filters={{ members: { $in: [String(userId)] } }}
//       onSelect={(channel) =>
//         router.push(`/achats/(home)/channel/${channel.cid}`)
//       }
//     />
//   );
// }

// ----------------------------------------------------------------

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Channel as ChannelType } from 'stream-chat';
import { Channel, ChannelList } from 'stream-chat-expo';
import { router } from 'expo-router';
import type { UserStreamResponseBodyGet } from '../../../api/astreamusers/users+api';
import { StreamChat } from 'stream-chat';
const client = StreamChat.getInstance('9eaw64xjzt94');

export default function chat() {
  const [userId, setUserId] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const connect = async () => {
      const response = await fetch('/api/astreamusers/users/');
      const body: UserStreamResponseBodyGet = await response.json();
      setUserId(body.id);
      if ('error' in body) {
        router.replace('/authModal/signin?returnTo=/(tabs)/chat');
        return;
      }

      console.log('userId: ' + userId);
      await client.connectUser(
        {
          id: String(body.id), // Fixed: Convert number to string
          name: body.name,
          image: `https://ui-avatars.com/api/?name=${body.name}`,
        },
        client.devToken(String(body.id)),
      );
      setIsReady(true);
    };
    connect();
    return () => {
      if (isReady) {
        client.disconnectUser();
      }

      setIsReady(false);
    };
  }, []);
  if (!isReady) {
    return <ActivityIndicator />;
  }
  return (
    <ChannelList
      filters={{ members: { $in: [String(userId)] } }}
      onSelect={(channel) =>
        router.push(`/achats/(home)/channel/${channel.cid}`)
      }
    />
  );
}

const styles = StyleSheet.create({});
