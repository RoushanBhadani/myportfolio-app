import { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";
import {
  Alert,
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SHAKE_THRESHOLD = 1.5;
const ADMIN_SECRET_CODE = "Roushan@77177";
const ADMIN_ID = "02ffeb1d-8066-40f1-b6c1-a139f25db665";

const AdminMode = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleAdminSubmit = async () => {
    if (inputText === ADMIN_SECRET_CODE) {
      await AsyncStorage.setItem("userId", ADMIN_ID);
      Alert.alert(
        "Success",
        "Admin mode enabled! Please restart the app for changes to take effect."
      );
    } else {
      Alert.alert("Error", "Incorrect code.");
    }
    setModalVisible(false);
    setInputText("");
  };

  useEffect(() => {
    let lastShake = 0;
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const gForce = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();
      if (gForce > SHAKE_THRESHOLD && now - lastShake > 1000) {
        lastShake = now;
        console.log("SHAKE DETECTED! Opening prompt modal...");
        setModalVisible(true);
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Admin Access</Text>
          <Text style={styles.modalSubtitle}>
            Enter the secret code to enable admin mode.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Secret Code"
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
            secureTextEntry={true}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => {
                setInputText("");
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.submitButton]}
              onPress={handleAdminSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#f57b00ff",
    borderRadius: 5,
    padding: 10,
    color: "#fff",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#555",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: "#f57b00ff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AdminMode;