// import { useState } from 'react';
// import { Button, Image, View, StyleSheet, ScrollView } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { addDoc, collection, onSnapshot } from 'firebase/firestore';
// import { db, storage } from '../firebaseConfig';

// export default function ImagePickerExample() {
//   const [images, setImages] = useState<string[]>([]);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: false,
//       allowsMultipleSelection: true,
//       aspect: [4, 3],
//       quality: 1,
//       orderedSelection: true,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       // setImage(result.assets[0]?.uri);
//       const imageUris = result.assets.map((asset) => asset.uri);
//       setImages(imageUris);
//       console.log('image', images);
//       await uploadImages(imageUris, 'image/jpeg');
//     } else {
//       alert('No image selected');
//     }
//   };

//   // Upload images to Firebase Storage

//   const uploadImages = async (imageUris: string[], fileType: string) => {
//     for (const uri of imageUris) {
//       const response = await fetch(uri);

//       const blob = await response.blob();
//       const storageRef = ref(storage, 'Images/' + new Date().getTime());
//       const uploadTask = uploadBytesResumable(storageRef, blob, {
//         contentType: fileType,
//       });

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//         },
//         (error) => {
//           console.error(error);
//         },
//         async () => {
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           // console.log('File uploaded at:', downloadURL);
//           await saveRecords(fileType, downloadURL, new Date());
//         },
//       );
//     }
//   };

//   const saveRecords = async (
//     fileType: string,
//     url: string,
//     createdAt: Date,
//   ) => {
//     try {
//       const docRef = await addDoc(collection(db, 'files'), {
//         url,
//         createdAt,
//         fileType,
//       });
//       console.log('Document successfully written!');
//     } catch (error) {
//       console.error('Error adding document: ', error);
//     }
//   };

//   // function to handle the one image upload

//   // async function uploadImages(uri, fileType) {
//   //   const response = await fetch(uri);

//   //   const blob = await response.blob();
//   //   const storageRef = ref(storage, 'Images/' + new Date().getTime());
//   //   const uploadTask = uploadBytesResumable(storageRef, blob);

//   //   uploadTask.on(
//   //     'state_changed',
//   //     (snapshot) => {
//   //       const progress =
//   //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   //       console.log(`Upload is ${progress}% done`);
//   //     },
//   //     (error) => {},
//   //     () => {
//   //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//   //         console.log('File uploaded at:', downloadURL);
//   //         setImages([]);
//   //       });
//   //     },
//   //   );
//   // }

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}

//         {images.map((images, index) => (
//           <Image key={index} source={{ uri: images }} style={styles.image} />
//         ))}

//         <Button title="Pick an image from camera roll" onPress={pickImage} />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
// });

// Deletee image in firestore and firebase storage
// import { deleteObject } from 'firebase/storage';
// const deleteImage = async (imageUrl: string) => {
//   try {
//     const storageRef = ref(storage, imageUrl.split('/').slice(3).join('/'));
//     await deleteObject(storageRef);

//     const updatedImagesUrl = imagesUrl.filter((url) => url !== imageUrl);
//     setImagesUrl(updatedImagesUrl);

//     console.log('Image deleted successfully');
//   } catch (error) {
//     console.error('Error deleting image:', error);
//   }
// };
// <View style={styles.container}>
//   {images.map((image, index) => (
//     <Text key={index} style={{ position: 'relative' }}>
//       <Image source={{ uri: image }} style={styles.image} />
//       <Pressable
//         style={{
//           position: 'absolute',
//           top: -10,
//           right: -10,
//           width: 20,
//           height: 20,
//           backgroundColor: 'red',
//           borderRadius: 10,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//         onPress={() => deleteImage(image)}
//       >
//         <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//       </Pressable>
//     </Text>
//   ))}
// </View>;
