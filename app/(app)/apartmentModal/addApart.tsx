import { View, Text, Pressable } from 'react-native';
import React from 'react';
import FormApart from '../../../components/apartment/FormApart';

const addApart = () => {
  return (
    <View>
      <Text>
        <FormApart />
      </Text>
    </View>
  );
};

export default addApart;
