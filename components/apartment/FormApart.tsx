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

import CustomButton from '../CustomButton';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { Button, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import type { ApartmentsResponseBodyPost } from '../../app/api/apartments/apartments+api';

export default function FormApart() {
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');

  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  const [images, setImages] = useState<string[]>([]);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  const handlePress = async () => {
    // await uploadImages(images, 'image/jpeg');

    const response = await fetch('/api/apartments', {
      method: 'POST',

      body: JSON.stringify({
        name,
        rooms: parseInt(rooms),
        maxCapacity: parseInt(maxCapacity),
        imagesUrl,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Error creating apartment';
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
    setImages([]);
    setImagesUrl([]);

    router.push('/(tabs)/apartments');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      orderedSelection: true,
    });

    console.log(result);

    if (!result.canceled) {
      // setImage(result.assets[0]?.uri);
      const imageUris = result.assets.map((asset) => asset.uri);
      await uploadImages(imageUris, 'image/jpeg');
      setImages(imageUris);
    } else {
      alert('No image selected');
    }
  };

  // Upload images to Firebase Storage

  const uploadImages = async (imageUris: string[], fileType: string) => {
    const urls: string[] = [];
    for (const uri of imageUris) {
      const response = await fetch(uri);

      const blob = await response.blob();
      const storageRef = ref(storage, 'Images/' + new Date().getTime());
      const uploadTask = uploadBytesResumable(storageRef, blob, {
        contentType: fileType,
      });

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File uploaded at:', downloadURL);
          urls.push(downloadURL);

          if (urls.length === imageUris.length) {
            setImagesUrl(urls);
            urls.forEach((url) => saveRecords(fileType, url, new Date()));
            console.log('All images uploaded successfully', imagesUrl);
          }
        },
      );
    }
  };

  const saveRecords = async (
    fileType: string,
    url: string,
    createdAt: Date,
  ) => {
    try {
      const docRef = await addDoc(collection(db, 'files'), {
        url,
        createdAt,
        fileType,
      });
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const deleteImage = async (imageUrl: string) => {
    try {
      const storageRef = ref(storage, imageUrl.split('/').slice(3).join('/'));
      await deleteObject(storageRef);

      const updatedImagesUrl = imagesUrl.filter((url) => url !== imageUrl);
      setImagesUrl(updatedImagesUrl);

      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <SafeAreaView>
      <View className="justify-center items-center px-4 pt-5 ">
        <Text>name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text>rooms</Text>
        <TextInput
          value={rooms}
          onChangeText={setRooms}
          onFocus={() => setFocusedInput('rooms')}
          onBlur={() => setFocusedInput(undefined)}
        />
        <Text>maxCapacity</Text>
        <TextInput
          value={maxCapacity}
          onChangeText={setMaxCapacity}
          onFocus={() => setFocusedInput('maxCapacity')}
          onBlur={() => setFocusedInput(undefined)}
        />

        <View style={styles.container}>
          {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}

          {/* {images.map((images, index) => (
            <Image key={index} source={{ uri: images }} style={styles.image} />
          ))} */}

          {imagesUrl.map((url) => (
            <Image key={url} source={{ uri: url }} style={styles.image} />
          ))}

          <Button
            title="Pick an image from camera roll GALERY"
            onPress={pickImage}
          />
        </View>

        {/* <ImagePickerExample /> */}
      </View>

      <CustomButton
        title="Add apartment"
        containerStyles="w-full my-7 px-28  "
        textStyles="text-white font-bold"
        handlePress={handlePress}
        // handlePress={async () => {
        //   const response = await fetch('/api_apartments/apartments', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       name,
        //       rooms: parseInt(rooms),
        //       maxCapacity: parseInt(maxCapacity),
        //       imagesUrl,
        //     }),
        //   });

        //   if (!response.ok) {
        //     let errorMessage = 'Error creating guest';
        //     const body: ApartmentsResponseBodyPost = await response.json();

        //     if ('error' in body) {
        //       errorMessage = body.error;
        //     }

        //     Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
        //     return;
        //   }

        //   console.log('iaaaaaa', imagesUrl);
        //   setName('');
        //   setRooms('');
        //   setMaxCapacity('');
        //   setImagesUrl([]);
        //   router.push('/(tabs)/apartments');
        // }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});
