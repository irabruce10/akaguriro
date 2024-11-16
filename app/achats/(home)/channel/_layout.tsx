import { Stack } from 'expo-router';

export default function ChannelStact() {
  return (
    <Stack>
      <Stack.Screen name="[cid]" options={{ headerShown: false }} />
    </Stack>
  );
}
