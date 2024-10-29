import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background,
    alignItems: 'center',
    width: '100%',
  },
  addGuestContainer: {
    // backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 18,

    // color: colors.text,
    marginBottom: 8,
  },
  input: {
    // color: colors.text,
    // backgroundColor: colors.background,
    // borderColor: colors.textSecondary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  inputFocused: {
    // borderColor: colors.white,
  },
  button: {
    marginTop: 30,
    // backgroundColor: colors.text,
    padding: 12,
    borderRadius: 12,
    // shadowColor: colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: '100%',
  },
  text: {
    // color: colors.cardBackground,
    textAlign: 'center',
    fontSize: 18,
  },
});

const FormApart = () => {
  const [name, setName] = useState('gast');
  const [rooms, setRooms] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');

  const [regularPrice, setRegularPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addGuestContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text style={styles.label}>rooms</Text>
        <TextInput
          value={rooms}
          onChangeText={setRooms}
          onFocus={() => setFocusedInput('rooms')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text style={styles.label}>maxCapacity</Text>
        <TextInput
          value={maxCapacity}
          onChangeText={setMaxCapacity}
          onFocus={() => setFocusedInput('maxCapacity')}
          onBlur={() => setFocusedInput(undefined)}
        />
        {/* <Text style={styles.label}>discount</Text>
        <TextInput
          value={discount}
          onChangeText={setDiscount}
          onFocus={() => setFocusedInput('discount')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text style={styles.label}>description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          onFocus={() => setFocusedInput('description')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text style={styles.label}>regularPrice</Text>
        <TextInput
          value={image}
          onChangeText={setImage}
          onFocus={() => setFocusedInput('image')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text style={styles.label}>regularPrice</Text> */}
        {/* <TextInput
          value={location}
          onChangeText={setLocation}
          onFocus={() => setFocusedInput('location')}
          onBlur={() => setFocusedInput(undefined)}
        /> */}
      </View>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
        onPress={async () => {
          const response = await fetch('/api/apartments', {
            method: 'POST',
            body: JSON.stringify({ name, rooms, maxCapacity }),
          });

          if (!response.ok) {
            let errorMessage = 'Error creating Apartment';
            const body = await response.json();

            if ('error' in body) {
              errorMessage = body.error;
            }

            Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
            return;
          }

          setName('');
          setMaxCapacity('');
          setRegularPrice('');
          router.push('/(tabs)/apartments');
        }}
      >
        <Text style={styles.text}>Add Apartment</Text>
      </Pressable>

      {/* <Pressable>
        router.push('/apartments');
        <Text style={styles.text}>Add Apartment</Text>
      </Pressable> */}
    </SafeAreaView>
  );
};

export default FormApart;
