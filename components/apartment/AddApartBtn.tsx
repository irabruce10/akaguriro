import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const add = () => {
  return (
    <View>
      <Link href={`/(home)/apartmentModal/addApart`} asChild>
        <Pressable>
          <View>
            <Text className="text-white">add</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

export default add;
