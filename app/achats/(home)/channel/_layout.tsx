import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ChannelStact() {
  return (
    <Stack screenOptions={{ title: 'chatRoom' }}>
      <Stack.Screen
        name="[cid]"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => router.replace('/achats/(home)/(tabs)/chat')}
              className="mr-5"
            >
              {/* <Entypo name="chevron-left" size={50} color="black" /> */}
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
