import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "./assets/InterviewPic.jpeg";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from 'expo-sharing';
import React from "react";

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to acces camera roll is required");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {
    if(Platform.OS ==='web'){
      alert('sharing is not available on your platForm');
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this pic</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // console.log(pickerResult);

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{ width: 305, height: 400 }}
      />
      <Text style={{ color: "red", fontSize: 50 }}>Hello Imran!</Text>
      <Text>How are you?</Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 6,
  },
  buttonText: {
    
    fontSize: 20,
    color: "#fff",
  },
  thumbnail: {
    width: 500,
    height: 500,
    resizeMode: "contain",
  },
});
