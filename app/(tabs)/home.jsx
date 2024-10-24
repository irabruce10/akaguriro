import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[{ id: '1' }, { id: '2' }, { id: '3' }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-white">Item {item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-psemibold  text-2xl  text-gray-100 ">
                  Welcome
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
