import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions";

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Ask for permission to access the gallery
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the gallery is required!");
      return;
    }

    // Open the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage} style={styles.button}>
        <Text style={styles.text}>Gallery</Text>
      </Pressable>
      <Pressable onPress={takePhoto} style={styles.button}>
        <Text style={styles.text}>Camera</Text>
      </Pressable>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  button: {
    paddingVertical: 12, // Set vertical padding
    paddingHorizontal: 20, // Set horizontal padding
    marginBottom: 20,
    backgroundColor: "#2f9ad0",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});