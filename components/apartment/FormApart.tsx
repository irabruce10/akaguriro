import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Button,
  FlatList,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import CustomButton from '../CustomButton';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import type {
  ApartmentsResponseBodyGet,
  ApartmentsResponseBodyPost,
} from '../../app/api/apartments/apartments+api';
import type { UserResponseBodyGet } from '../../app/api/user+api';
import type { Apartment } from '../../migrations/00008-createTableApartments';
import { LoadingAnimation } from '../LoadingSpinner';

export default function FormApart() {
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [focusedInput, setFocusedInput] = useState<string | undefined>();

  const [images, setImages] = useState<string[]>([]);
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [isStale, setIsStale] = useState(true);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!isStale) return;

      async function getApartments() {
        const response = await fetch('/api/apartments/apartments', {
          headers: {
            Cookie: 'name=value',
          },
        });
        const body: ApartmentsResponseBodyGet = await response.json();

        setApartments(body.apartments);

        const [apartmentsResponse, userResponse]: [
          ApartmentsResponseBodyGet,
          UserResponseBodyGet,
        ] = await Promise.all([
          fetch('/api/apartments/apartments').then((response) =>
            response.json(),
          ),
          fetch('/api/user').then((response) => response.json()),
        ]);

        setIsStale(false);

        if ('error' in userResponse) {
          // router.replace(`/authModal/signin?returnTo=/apartments`);
          router.replace(`/authModal/signin?returnTo=/apartments`);
          return;
        }

        if ('error' in apartmentsResponse) {
          setApartments([]);
          return;
        }

        if ('apartments' in apartmentsResponse) {
          setApartments(apartmentsResponse.apartments);
        }
      }

      getApartments().catch((error) => {
        console.error(error);
      });
    }, [isStale, router]),
  );

  const handlePress = async () => {
    // await uploadImages(images, 'image/jpeg');

    const response = await fetch('/api/apartments/apartments', {
      method: 'POST',

      body: JSON.stringify({
        name,
        rooms: parseInt(rooms),
        maxCapacity: parseInt(maxCapacity),
        price: parseInt(price),
        description,
        location,
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
    setDescription('');
    setImages([]);
    setImagesUrl([]);

    router.push('/(app)/apartments');
  };

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      orderedSelection: true,
    });

    if (!result.canceled) {
      const imageUris = result.assets.map((asset) => asset.uri);
      await uploadImages(imageUris, 'image/jpeg');
      setImages(imageUris);
    } else {
      alert('No image selected');
    }
    setLoading(false);
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
          setLoading(true);

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
            setLoading(false);
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
  const renderImage = ({ item }: { item: string }) => (
    <Image key={item} source={{ uri: item }} style={styles.image} />
  );

  return (
    <ScrollView>
      <View className=" bg-primary w-full h-full ">
        <View className=" text-center mt-2">
          <Text className="text-xl text-white text-center text-black-400 font-pmedium ">
            Add your property
          </Text>
        </View>
        <View className="px-16  ">
          <View>
            <TextInput
              className="bg-gray-50 mb-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <TextInput
            className="bg-gray-50 border mb-4 mt-4 border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3"
            value={rooms}
            onChangeText={setRooms}
            placeholder="Room"
          />

          <TextInput
            className="bg-gray-50 border mb-4 mt-4 border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3"
            value={maxCapacity}
            onChangeText={setMaxCapacity}
            placeholder="Max Capacity"
          />

          <TextInput
            className="bg-gray-50 mb-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3"
            value={price}
            onChangeText={setPrice}
            placeholder="Price"
          />

          <TextInput
            className="bg-gray-50 mb-4 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3"
            value={description}
            placeholder="Description"
            onChangeText={setDescription}
          />

          <TextInput
            className="bg-gray-50 border mb-4 mt-4 border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-3"
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
          />
          <View className="mt-6 mb-6">
            {loading ? (
              <LoadingAnimation />
            ) : (
              <FlatList
                data={imagesUrl}
                numColumns={3}
                keyExtractor={(item) => item}
                renderItem={renderImage}
              />
            )}

            <Button
              title="Pick images from camera roll GALLERY"
              onPress={pickImage}
              color={'gray'}
            />
          </View>
        </View>
        <View className="mb-28 px-4">
          <CustomButton
            title="Add apartment"
            containerStyles=""
            textStyles="text-white font-bold"
            handlePress={handlePress}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: '33%',
    height: 100,
    margin: 1,
  },
});
