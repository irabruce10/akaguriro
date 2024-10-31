import { useState } from 'react';
import { Button, Image, View, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  // const [image, setImage] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string[]>([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
      setImage(imageUris);
    } else {
      alert('No image selected');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}

        {image.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}

        <Button title="Pick an image from camera roll" onPress={pickImage} />
      </View>
    </ScrollView>
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
