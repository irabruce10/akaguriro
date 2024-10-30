import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

export default function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View className="justify-center items-center px-4 ">
      <Text className="text-xl text-center font-psemibold text-white mt2">
        {title}
      </Text>

      <Text className="text-xl text-center font-psemibold text-white mt2">
        {subtitle}
      </Text>
      <CustomButton
        title="Add apartment"
        handlePress={() => router.push('/apartmentModal/addApart')}
        containerStyles="w-full my-5"
        textStyles=""
      />
    </View>
  );
}
