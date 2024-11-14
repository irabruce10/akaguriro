import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
// import { Tabs } from 'expo-router';
import { icons } from '../../../constants';
// import { ChatContextProvider } from '../../

// const TabIcon = ({ color, icon, name, focused }) => {
//   return (
//     <View className="items-center justify-center gap-1">
//       <Image
//         source={icon}
//         resizeMode="contain"
//         tintColor={color}
//         className="w-8 h-9"
//       />
//       <Text
//         className={`${focused ? 'font-psemibold' : 'font-pregular'}text-xs`}
//         style={{ color: color }}
//       >
//         {name}
//       </Text>
//     </View>
//   );
// };

// export default function TabsLayout() {
//

//   return (
//     <OverlayProvider>
//       <Chat client={client}>
//         <>
//           <Tabs
//             screenOptions={{
//               tabBarShowLabel: false,
//               tabBarActiveTintColor: '#FFA001',
//               tabBarInactiveTintColor: '#CDCDE0',
//               tabBarStyle: {
//                 backgroundColor: '#161622',
//                 borderTopWidth: 1,
//                 borderTopColor: '#232533',
//                 height: 84,
//               },
//             }}
//           >
//             <Tabs.Screen
//               name="home"
//               options={{
//                 title: 'Home',
//                 headerShown: false,
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabIcon
//                     icon={icons.home}
//                     color={color}
//                     name="Home"
//                     focused={focused}
//                   />
//                 ),
//               }}
//             />
//             <Tabs.Screen
//               name="apartments"
//               options={{
//                 title: 'Apartments',
//                 headerShown: false,
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabIcon
//                     icon={icons.apartment}
//                     color={color}
//                     name="Apartments"
//                     focused={focused}
//                   />
//                 ),
//               }}
//             />

//             <Tabs.Screen
//               name="chatStack"
//               options={{
//                 title: 'Chat',
//                 headerShown: true,
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabIcon
//                     icon={icons.store}
//                     color={color}
//                     name="Chat"
//                     focused={focused}
//                   />
//                 ),
//               }}
//             />

//             {/* <Tabs.Screen
//           name="shop"
//           options={{
//             title: 'Shop Store',
//             headerShown: false,
//             tabBarIcon: ({ color, focused }) => (
//               <TabIcon
//                 icon={icons.store}
//                 color={color}
//                 name="Shop Store"
//                 focused={focused}
//               />
//             ),
//           }}
//         /> */}
//             <Tabs.Screen
//               name="books"
//               options={{
//                 title: 'Book store',
//                 headerShown: false,
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabIcon
//                     icon={icons.books}
//                     color={color}
//                     name="Book store"
//                     focused={focused}
//                   />
//                 ),
//               }}
//             />
//             <Tabs.Screen
//               name="profile"
//               options={{
//                 title: 'Profile',
//                 headerShown: false,
//                 tabBarIcon: ({ color, focused }) => (
//                   <TabIcon
//                     icon={icons.profile}
//                     color={color}
//                     name="Profile"
//                     focused={focused}
//                   />
//                 ),
//               }}
//             />
//           </Tabs>
//         </>
//       </Chat>
//     </OverlayProvider>
//   );
// }

import { Tabs } from 'expo-router';
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

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
            <MaterialCommunityIcons size={45} color={color} name="home" />
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
      <Tabs.Screen
        name="chatStack"
        options={{
          title: 'Chat',
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
            <FontAwesome name="book" size={40} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={35} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
