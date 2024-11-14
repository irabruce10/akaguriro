import { router, Slot, Stack, useFocusEffect } from 'expo-router';
import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { ActivityIndicator } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import type { UserStreamResponseBodyGet } from '../api/astreamusers/users+api';

const client = StreamChat.getInstance('mj5v7j5fgvfn');

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  // useFocusEffect(
  //   useCallback(() => {
  //     async function getUser() {
  //       const response = await fetch('/api/astreamusers/users/');

  //       const body: UserStreamResponseBodyGet = await response.json();

  //       if ('error' in body) {
  //         router.replace('/authModal/signin?returnTo=/(tabs)/home');
  //         return;
  //       }

  //       console.log('body: ', body.name, body.id!);

  //       setUserName(body.name!);
  //       setUserId(String(body.id!));

  //       console.log('userId', userId);
  //       console.log('userName', userName);
  //     }
  //     getUser().catch((error) => {
  //       console.error(error);
  //     });
  //   }, [router]),
  // );

  useEffect(() => {
    // if ('error' in body) {
    //   router.replace('/authModal/signin?returnTo=/(tabs)/home');
    //   return;
    // }

    // console.log('body: ', body.name, body.id!);

    // setUserName(body.name!);
    // setUserId(String(body.id!));

    // console.log('userId', userId);
    // console.log('userName', userName);

    const connect = async () => {
      const response = await fetch('/api/astreamusers/users/');
      const body: UserStreamResponseBodyGet = await response.json();
      if ('error' in body) {
        router.replace('/authModal/signin?returnTo=/(tabs)/home');
        return;
      }

      await client.connectUser(
        {
          id: String(body.id), // Fixed: Convert number to string
          name: body.name,
          image: `https://ui-avatars.com/api/?name=${body.name}`,
        },
        client.devToken(String(body.id)),
      );
      setIsReady(true);

      // const channel = client.channel('messaging', 'the_park', {
      //   name: 'the_park',
      // });
      // await channel.watch()
    };

    connect();
    return () => {
      if (isReady) client.disconnectUser();
      setIsReady(false);
    };
  }, []);

  if (!isReady) {
    return <ActivityIndicator />;
  }
  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
