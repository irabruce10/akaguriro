import { Slot, Stack, Tabs } from 'expo-router';
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
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
          height: 64,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 name="hotel" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          href: '/achats/(home)/(tabs)',
          tabBarIcon: ({ size, color }) => (
            <Entypo name="message" size={45} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="apartments"
        options={{
          title: 'Apartments',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome6 name="hotel" size={30} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="chats"
        options={{
          title: 'Chat',
          tabBarIcon: ({ size, color }) => (
            <Entypo name="message" size={45} color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="books"
        options={{
          title: 'Books',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="book" size={40} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          href: '/achats/(home)/(tabs)',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={35} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
