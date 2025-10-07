import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function ImagePicker({ cameraImage }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant camera permission to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    // console.log("hello")
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      // aspect:[16, 9],
      // quality: 0.5,
    });
    // console.log(image)
    if (!image.canceled) {
      const imageUri = image.assets[0].uri;
      setPickedImage(imageUri);
      cameraImage(imageUri);
    }
  }

  return (
    <View>
      {/*  */}
      <Pressable onPress={takeImageHandler} style={{ marginRight: 10 }}>
        <Ionicons name="camera" size={32} color="#f57b00ff" />
      </Pressable>
    </View>
  );
}

export default ImagePicker;