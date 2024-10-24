import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import "../global.css";

const index = () => {
  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <Text className="text-3xl  ">Akaguriro</Text>
      <StatusBar style ="auto"/>

      <Link href='/home'>go to home page </Link>
    </View>
  )
}

export default index

// const styles = StyleSheet.create({
//     container:{
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     }
// })  