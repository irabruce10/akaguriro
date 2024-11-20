// import {
//   Alert,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { useCallback, useState } from 'react';
// import { router, useFocusEffect } from 'expo-router';
// import type { SignUpResponseBodyPost } from './api/signUp+api';

// export default function signInPage() {
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');

//   useFocusEffect(
//     useCallback(() => {
//       async function getUser() {
//         const response = await fetch('/api_user/user');

//         const responseBody: SignUpResponseBodyPost = await response.json();

//         if ('name' in responseBody) {
//           router.replace('/(tabs)/apartments');
//         }
//       }

//       getUser().catch((error) => {
//         console.error(error);
//       });
//     }, []),
//   );

//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <ScrollView>
//         <View>
//           <Text className="text-base text-gray-100 font-pmedium">Sign Up</Text>
//           <View className="justify-center items-center px-4 pt-5 ">
//             <Text className="text-gray-100 ">name</Text>
//             <TextInput
//               className="w-full h-16 px-4 bg-black-100  rounded-2xl items-center flex-row text-gray-100 focus:border-secondary "
//               value={name}
//               onChangeText={setName}
//             />
//             <Text className="text-gray-100 ">password</Text>
//             <TextInput
//               className="w-full h-16 px-4 bg-black-100  rounded-2xl items-center flex-row  text-gray-100 focus:border-secondary "
//               value={password}
//               onChangeText={setPassword}
//             />
//           </View>
//         </View>
//         <Pressable
//           onPress={async () => {
//             const response = await fetch('/api/signUp', {
//               method: 'POST',
//               body: JSON.stringify({ name, password }),
//             });

//             if (!response.ok) {
//               let errorMessage = 'Error creating user';
//               const responseBody: SignUpResponseBodyPost =
//                 await response.json();
//               if ('error' in responseBody) {
//                 errorMessage = responseBody.error;
//               }

//               Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
//               return;
//             }

//             const responseBody: SignUpResponseBodyPost = await response.json();

//             if ('error' in responseBody) {
//               Alert.alert('Error', responseBody.error, [{ text: 'OK' }]);
//               return;
//             }

//             setName('');
//             setPassword('');
//             router.replace('/(tabs)/apartments');
//           }}
//         >
//           <Text className="bg-secondary rounded-xl min-h-[62px] justify-center items-center">
//             SignUp
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({});

// import { Link, router, useFocusEffect } from 'expo-router';
// import { useCallback, useState } from 'react';
// import {
//   Alert,
//   Pressable,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';
// import type { SignUpResponseBodyPost } from '../(auth)/api/signUp+api';
// import { StreamChat } from 'stream-chat';
// const client = StreamChat.getInstance('9eaw64xjzt94');

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: colors.background,
//     alignItems: 'center',
//     width: '100%',
//   },
//   registerInputContainer: {
//     // backgroundColor: colors.cardBackground,
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     width: '100%',
//   },
//   label: {
//     fontSize: 18,

//     // color: colors.text,
//     marginBottom: 8,
//   },
//   input: {
//     // color: colors.text,
//     // backgroundColor: colors.background,
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
//   promptTextContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 4,
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
// export default function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [focusedInput, setFocusedInput] = useState<string | undefined>();

//   useFocusEffect(
//     useCallback(() => {
//       async function getUser() {
//         const response = await fetch('/api/user');

//         const responseBody: SignUpResponseBodyPost = await response.json();

//         if ('name' in responseBody) {
//           router.replace('/authModal/signin');
//         }
//       }

//       getUser().catch((error) => {
//         console.error(error);
//       });
//     }, []),
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.registerInputContainer}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
//           value={name}
//           onChangeText={setName}
//           onFocus={() => setFocusedInput('name')}
//           onBlur={() => setFocusedInput(undefined)}
//         />
//         {/* <Text style={styles.label}>email</Text>
//         <TextInput
//           style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
//           value={email}
//           onChangeText={setEmail}
//           onFocus={() => setFocusedInput('email')}
//           onBlur={() => setFocusedInput(undefined)}
//         /> */}
//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           style={[
//             styles.input,
//             focusedInput === 'password' && styles.inputFocused,
//           ]}
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//           onFocus={() => setFocusedInput('password')}
//           onBlur={() => setFocusedInput(undefined)}
//         />
//         <View style={styles.promptTextContainer}>
//           <Text>Already have an account?</Text>
//           <Link href="/authModal/signin">Login</Link>
//         </View>
//       </View>
//       <Pressable
//         onPress={async () => {
//           const response = await fetch('/api/signUp', {
//             method: 'POST',
//             body: JSON.stringify({ name, password }),
//           });

//           if (!response.ok) {
//             let errorMessage = 'Error creating user';
//             const responseBody: SignUpResponseBodyPost = await response.json();
//             if ('error' in responseBody) {
//               errorMessage = responseBody.error;
//             }

//             Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
//             return;
//           }

//           const responseBody: SignUpResponseBodyPost = await response.json();

//           if (response.ok)
//             if ('error' in responseBody) {
//               Alert.alert('Error', responseBody.error, [{ text: 'OK' }]);
//               return;
//             }

//           setName('');
//           setPassword('');
//           router.replace('/achats/(home)/(tabs)/home');
//         }}
//       >
//         <Text style={styles.text}>Register</Text>
//       </Pressable>
//     </SafeAreaView>
//   );
// }

import { Link, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { SignUpResponseBodyPost } from '../(auth)/api/signUp+api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background,
    alignItems: 'center',
    width: '100%',
  },
  registerInputContainer: {
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
  promptTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
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

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  useFocusEffect(
    useCallback(() => {
      async function getUser() {
        const response = await fetch('/api/user');

        const responseBody: SignUpResponseBodyPost = await response.json();

        if ('name' in responseBody) {
          router.replace('/authModal/signin');
        }
      }

      getUser().catch((error) => {
        console.error(error);
      });
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.registerInputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text style={styles.label}>email</Text>
        <TextInput
          style={[styles.input]}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[
            styles.input,
            focusedInput === 'password' && styles.inputFocused,
          ]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <View style={styles.promptTextContainer}>
          <Text>Already have an account?</Text>
          <Link href="/authModal/signup">Login</Link>
        </View>
      </View>
      <Pressable
        onPress={async () => {
          const response = await fetch('/api/signUp', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
          });

          if (!response.ok) {
            let errorMessage = 'Error creating user';
            const responseBody: SignUpResponseBodyPost = await response.json();
            if ('error' in responseBody) {
              errorMessage = responseBody.error;
            }

            Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
            return;
          }

          const responseBody: SignUpResponseBodyPost = await response.json();

          if ('error' in responseBody) {
            Alert.alert('Error', responseBody.error, [{ text: 'OK' }]);
            return;
          }

          setName('');
          setPassword('');
          router.replace('/(app)/(tabs)/home');
        }}
      >
        <Text style={styles.text}>Register</Text>
      </Pressable>
    </SafeAreaView>
  );
}
