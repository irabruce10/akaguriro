import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const add = () => {
  return (
    <View>
      <Link href={`/(app)/apartmentModal/addApart`}>
        <Pressable>
          <View>
            <Text className="text-white">
              <Ionicons name="add-circle" size={34} color="white" />
            </Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
};

export default add;
