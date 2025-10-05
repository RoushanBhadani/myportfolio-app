import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";

export default function DownloadResume() {
  const handleDownload = () => {
    const resumeUrl =
      "https://drive.google.com/file/d/1aBCuFcKjiwITbUZVgcPDkxvJUvpaMXSK/view?usp=sharing";

    Linking.openURL(resumeUrl).catch(() => {
      Alert.alert("Error", "Unable to open resume link.");
    });
  };

  return (
    <View style={styles.footer}>
      <Pressable style={styles.downloadButton} onPress={handleDownload}>
        <Ionicons name="download-outline" size={22} color="#f57b00ff" />
        <Text style={styles.downloadText}>Download Resume</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width:'100%',
    borderWidth: 1,
    padding: 8,
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#f57b00ff",
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  downloadText: {
    color: "#f57b00ff",
    fontSize: 16,
    marginLeft: 10,
  },
});
