import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect } from 'react';
// import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import '../global.css';

// SplashScreen.preventAutoHideAsync();

// const RootLayout = () => {
//   const [fontsLoaded, error] = useFonts({
//     'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
//     'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
//     'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
//     'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
//     'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
//     'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
//     'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
//     'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
//     'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
//   });

//   useEffect(() => {
//     if (error) throw error;

//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded, error]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   if (!fontsLoaded && !error) {
//     return null;
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Stack>
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

//         <Stack.Screen
//           name="productModal/[productId]"
//           options={{
//             presentation: 'modal',
//             title: '',
//             animation: 'slide_from_bottom',

//             headerStyle: {},
//           }}
//         />

//         <Stack.Screen
//           name="authModal/signin"
//           options={{
//             presentation: 'modal',
//             title: '',
//             animation: 'slide_from_bottom',
//           }}
//         />
//         <Stack.Screen
//           name="authModal/signup"
//           options={{
//             presentation: 'modal',
//             title: '',
//             animation: 'slide_from_bottom',
//           }}
//         />
//         <Stack.Screen
//           name="apartmentModal/addApart"
//           options={{
//             presentation: 'modal',
//             title: '',
//             animation: 'slide_from_bottom',

//             headerStyle: { backgroundColor: 'black' },
//           }}
//         />
//         <Stack.Screen
//           name="apartmentModal/[apartmentId]"
//           options={{
//             presentation: 'modal',
//             title: '',
//             animation: 'slide_from_bottom',

//             headerStyle: {},
//           }}
//         />
//       </Stack>
//     </GestureHandlerRootView>
//   );
// };

// export default RootLayout;

import { Slot, SplashScreen, Stack } from 'expo-router';

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <Slot /> */}

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="productModal/[productId]"
          options={{
            headerShown: false,
            presentation: 'modal',
            title: '',
            animation: 'slide_from_bottom',
          }}
        />

        <Stack.Screen
          name="authModal/signin"
          options={{
            presentation: 'modal',
            title: 'Akaguriro',
            headerShown: true,
            headerTintColor: 'black',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="authModal/signup"
          options={{
            presentation: 'modal',
            title: 'Akaguriro',
            headerTintColor: 'black',
            headerShown: true,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="reservation/reservation"
          options={{
            presentation: 'modal',
            title: '',
            headerShown: true,

            animation: 'slide_from_bottom',
          }}
        />

        {/* <Stack.Screen
          name="apartmentModal/[apartmentId]"
          options={{
            presentation: 'modal',

            title: '',
            animation: 'slide_from_bottom',
          }}
        /> */}
      </Stack>
    </GestureHandlerRootView>
  );
}
