// import {
//   StyleSheet,
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   Pressable,
//   Alert,
// } from 'react-native';
// import { useState } from 'react';
// import { router } from 'expo-router';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //
//     alignItems: 'center',
//     width: '100%',
//   },
//   addGuestContainer: {
//     // backgroundColor: colors.cardBackground,
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     width: '100%',
//   },
//   label: {
//     fontSize: 18,

//     //
//     marginBottom: 8,
//   },
//   input: {
//     //
//     //
//     // borderColor: colors.textSecondary,
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   inputFocused: {
//     // borderColor: colors.white,
//   },
//   button: {
//     marginTop: 30,
//     // backgroundColor: colors.text,
//     padding: 12,
//     borderRadius: 12,
//     // shadowColor: colors.white,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//     width: '100%',
//   },
//   text: {
//     // color: colors.cardBackground,
//     textAlign: 'center',
//     fontSize: 18,
//   },
// });

// const FormApart = () => {
//   const [name, setName] = useState('gast');
//   const [rooms, setRooms] = useState('');
//   const [maxCapacity, setMaxCapacity] = useState('');

//   const [regularPrice, setRegularPrice] = useState('');
//   const [discount, setDiscount] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [location, setLocation] = useState('');

//   const [focusedInput, setFocusedInput] = useState<string | undefined>();
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.addGuestContainer}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           value={name}
//           onChangeText={setName}
//           onFocus={() => setFocusedInput('name')}
//           onBlur={() => setFocusedInput(undefined)}
//         />
//         <Text style={styles.label}>rooms</Text>
//         <TextInput
//           value={rooms}
//           onChangeText={setRooms}
//           onFocus={() => setFocusedInput('rooms')}
//           onBlur={() => setFocusedInput(undefined)}
//         />
//         <Text style={styles.label}>maxCapacity</Text>
//         <TextInput
//           value={maxCapacity}
//           onChangeText={setMaxCapacity}
//           onFocus={() => setFocusedInput('maxCapacity')}
//           onBlur={() => setFocusedInput(undefined)}
//         />
//       </View>
//       <Pressable
//         style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
//         onPress={async () => {
//           const apartment = {
//             name,
//             rooms: parseInt(rooms),
//             maxCapacity: parseInt(maxCapacity),
//           };
//           const response = await fetch('/api/apartments', {
//             method: 'POST',
//             body: JSON.stringify(apartment),
//           });

//           if (!response.ok) {
//             let errorMessage = 'Error creating Apartment';
//             const body = await response.json();

//             if ('error' in body) {
//               errorMessage = body.error;
//             }

//             Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
//             return;
//           }

//           setName('');
//           setMaxCapacity('');
//           setRegularPrice('');
//           router.push('/(tabs)/apartments');
//         }}
//       >
//         <Text style={styles.text}>Add Apartment</Text>
//       </Pressable>
//     </SafeAreaView>
//   );
// };

// export default FormApart;

{
  /* <Text style={styles.label}>discount</Text>
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
        <Text style={styles.label}>regularPrice</Text> */
}
{
  /* <TextInput
          value={location}
          onChangeText={setLocation}
          onFocus={() => setFocusedInput('location')}
          onBlur={() => setFocusedInput(undefined)}
        /> */
}

import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { ApartmentsResponseBodyPost } from '../../app/api_apartments/apartments+api';
// import { colors } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    width: '100%',
  },
  addGuestContainer: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 18,
    // fontFamily: 'Poppins_400Regular',

    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    // fontFamily: 'Poppins_400Regular',
  },
  inputFocused: {},
  button: {
    marginTop: 30,

    padding: 12,
    borderRadius: 12,

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: '100%',
  },
  text: {
    // fontFamily: 'Poppins_400Regular',

    textAlign: 'center',
    fontSize: 18,
  },
});

export default function FormApart() {
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addGuestContainer}>
        <Text style={styles.label}>name</Text>
        <TextInput
          style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text style={styles.label}>rooms</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'rooms' && styles.inputFocused,
          ]}
          value={rooms}
          onChangeText={setRooms}
          onFocus={() => setFocusedInput('rooms')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text style={styles.label}>maxCapacity</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'rooms' && styles.inputFocused,
          ]}
          value={maxCapacity}
          onChangeText={setMaxCapacity}
          onFocus={() => setFocusedInput('maxCapacity')}
          onBlur={() => setFocusedInput(undefined)}
        />
      </View>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
        onPress={async () => {
          // const apartment = {
          //   name,
          //   rooms: parseInt(rooms),
          //   maxCapacity: parseInt(maxCapacity),
          // };
          const response = await fetch('/api/apartments', {
            method: 'POST',
            body: JSON.stringify({
              name,
              rooms: parseInt(rooms),
              maxCapacity: parseInt(maxCapacity),
            }),
          });

          if (!response.ok) {
            let errorMessage = 'Error creating guest';
            const body: ApartmentsResponseBodyPost = await response.json();

            if ('error' in body) {
              errorMessage = body.error;
            }

            Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
            return;
          }

          setName('');
          setRooms('');
          setMaxCapacity('');
          router.push('/(tabs)/apartments');
        }}
      >
        <Text style={styles.text}>Add apart</Text>
      </Pressable>
    </SafeAreaView>
  );
}
