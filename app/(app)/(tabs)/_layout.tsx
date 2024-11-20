import { Slot, Stack, Tabs } from 'expo-router';
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

export default function TabsNavigation() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 74,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={44} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="apartments"
        options={{
          title: 'Apartments',
          headerShown: false,

          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="apartment" size={44} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          // href: '/achats/(home)/(tabs)/chat',
          tabBarIcon: ({ size, color }) => (
            <Entypo name="message" size={45} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="books"
        options={{
          title: 'Books',
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="bookshelf" size={44} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={35} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
