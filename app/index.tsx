import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView className="  min-h-[105vh]">
      <ImageBackground
        source={require('../assets/splash.png')}
        style={styles.image}
        resizeMode="contain"
      >
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className=" w-full justify-center mt-60 items-center h-full px-4">
            <Text className="">
              <Link href="/(app)/(tabs)/home" style={{ color: 'blue' }}>
                go to home page
              </Link>
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                Welcome to Akaguriro!
              </Text>
              <Text style={{ marginTop: 16 }}>
                One Solution For All Your Needs
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/authModal/signin')}>
              <View className="w-full flex flex-row justify-center items-center mt-6  py-4 rounded-md text-sm font-pblack text-white bg-secondary">
                <View>
                  <AntDesign
                    name="login"
                    size={24}
                    color="black"
                    style={{ left: -40 }}
                  />
                </View>

                <Text
                  style={{ left: -30, textAlign: 'center', fontWeight: '600' }}
                >
                  Continue with Email
                </Text>
              </View>
            </TouchableOpacity>

            {/* <CustomButton
              title="Continue with Login in"
              handlePress={() => router.push('/authModal/signin')}
              containerStyles="w-full flex justify-center items-center mt-4 px-4 py-2 rounded-md text-sm font-pblack text-white"
              textStyles=""
            /> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    top: 50,
    flex: 1,
    marginBottom: 200,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {},
});
