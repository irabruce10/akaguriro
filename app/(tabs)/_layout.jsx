import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

 import icon from '../../constants'
import { Image } from 'react-native-web'

const TabIcon = ({ color }) => {
    return <View>
        <Image source={icon} resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'/>
    </View>
}

export default function Tabslayout() {
  return (
    <>

    <Tabs>
        <Tabs.Screen 
        name="home"
        options={{
            title: 'Home',
            headerShown:false,
            tabBarIcon: ({ color,focused }) => <TabIcon icon={icon.home} 
            color={color}
            name='Home'
            focused={focused} 
            />
            
        }} />
       
    </Tabs>
    </>
  )
}

const styles = StyleSheet.create({})