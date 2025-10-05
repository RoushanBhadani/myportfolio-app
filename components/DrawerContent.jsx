import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Alert,
  Linking,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DownloadResume from "./DownloadResume";
import ChatWithUs from "./ChatWithUs";

export default function CustomDrawerContent(props) {
  const handleDownload = () => {
    const resumeUrl =
      "https://drive.google.com/file/d/1aBCuFcKjiwITbUZVgcPDkxvJUvpaMXSK/view?usp=sharing"; // 👈 Replace with your real link

    Linking.openURL(resumeUrl)
      // .then(() => {
      //   Alert.alert("Resume", "Your resume is being opened!");
      // })
      .catch(() => {
        Alert.alert("Error", "Unable to open resume link.");
      });
  };

  return (
    <LinearGradient
      colors={["rgba(7,7,9,1)", "rgba(27,24,113,1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <DrawerItemList {...props} />
        <View style={{marginVertical:8}}>
          <DownloadResume/>
        </View>
        
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

