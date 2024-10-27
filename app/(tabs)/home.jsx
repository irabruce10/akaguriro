import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import SearchInput from '../../components/SearchInput';

export default function Home() {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch('https://randomuser.me/api/', {
        method: 'GET',
      });
      const data = await response.json();
      setUsers(data.results);
    }
    getUsers().catch((error) => console.error(error));
  }, []);
  const renderItem = ({ item }) => (
    <Text className="text-white">
      user :{item.name.first} {item.name.last}
    </Text>
  );
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 flex">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-psemibold  text-2xl  text-gray-100 ">
                  Welcome
                </Text>
              </View>
            </View>
            <SearchInput />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
