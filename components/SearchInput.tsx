import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  type ImageSourcePropType,
} from 'react-native';
import React from 'react';
import { icons } from '../constants';
type Props = {
  handleChangeText: (text: string) => void;
  value: string;

  source?: ImageSourcePropType | undefined; // optional prop for icon source
};
const SearchInput = ({ handleChangeText, value, source }: Props) => {
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex flex-row space-x-4 ">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder="Search for ..."
        placeholderTextColor="#CDCDE0"
        onChangeText={handleChangeText}
      />

      <TouchableOpacity>
        <Image
          source={icons.search}
          resizeMode="contain"
          className="w-5 h-5 "
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
