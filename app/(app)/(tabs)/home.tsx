import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import Carousel from '../../../components/Carousel';

export default function Home() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar barStyle="light-content" backgroundColor="#161622" />
      <ScrollView className="">
        <View className="flex flex-row px-4 justify-between mt-7">
          <Animated.Text
            entering={FadeInUp.delay(300).duration(300)}
            className="text-base text-gray-100 font-pmedium "
          >
            Welcome Again
          </Animated.Text>
          <Animated.Image
            entering={FadeInUp.delay(500).duration(500)}
            source={require('../../../assets/AkaLogo.png')}
            resizeMode="cover"
            style={styles.logo}
          />
        </View>
        <View>
          <Carousel />
        </View>

        <View className="px-4">
          <Animated.Text
            entering={FadeInRight.delay(600).duration(600)}
            className="text-xl text-center mt-6 mb-6 text-gray-100 font-pmedium "
          >
            Why Choose Us?
          </Animated.Text>
          <View>
            <Animated.Text
              entering={FadeInLeft.delay(700).duration(700)}
              className="text-xl text-gray-100 font-pmedium "
            >
              Choose from a variety of apartments that suit your needs, whether
              you're traveling solo, with family, or for business.
            </Animated.Text>
          </View>

          <View>
            <Animated.Text
              entering={FadeInLeft.delay(700).duration(700)}
              className="text-xl mt-6 text-gray-100 font-pmedium "
            >
              Book your apartment in just a few steps—no hidden fees.
            </Animated.Text>
          </View>
          <View>
            <Animated.Text
              entering={FadeInLeft.delay(700).duration(700)}
              className="text-xl mt-6 text-gray-100 font-pmedium "
            >
              Great Locations: Our apartments are located in prime areas.
              Rentals close to shopping centers, schools, and parks.
            </Animated.Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    top: -20,
  },
});
