import { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import ImagePicker from "./ImagePicker";

const uploadImageToCloudinary = async (imageUri) => {
  const CLOUD_NAME = "dgkitslcv";
  const UPLOAD_PRESET = "myportfolio-chats-image";

  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    type: `image/${imageUri.split(".").pop()}`,
    name: `upload.${imageUri.split(".").pop()}`,
  });
  formData.append("upload_preset", UPLOAD_PRESET);

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (!response.ok) throw new Error("Upload failed");
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};


function ChatWithUs() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    const getOrCreateUserId = async () => {
      let id = await AsyncStorage.getItem("userId");
      if (!id) {
        id = uuid.v4();
        await AsyncStorage.setItem("userId", id);
      }
      setUserId(id);
    };
    getOrCreateUserId();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const messagesCollection = collection(db, "chats", userId, "messages");
    const q = query(messagesCollection, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatHistory(messages);
    });
    return () => unsubscribe();
  }, [userId]);

  const handleSendMessage = async () => {
    if ((!imageUrl && message.trim() === "") || !userId) return;

    setIsUploading(true);
    let uploadedImageUrl = null;

    try {
      if (imageUrl) {
        uploadedImageUrl = await uploadImageToCloudinary(imageUrl);
        if (!uploadedImageUrl) {
          alert("Image upload failed. Please try again.");
          setIsUploading(false);
          return;
        }
      }

      const messageData = {
        createdAt: serverTimestamp(),
        senderId: userId,
      };
      if (message.trim() !== "") messageData.text = message;
      if (uploadedImageUrl) messageData.imageUrl = uploadedImageUrl;

      await addDoc(collection(db, "chats", userId, "messages"), messageData);

      const lastMessageText = message.trim() ? message : "📷 Image";
      await setDoc(
        doc(db, "chats", userId),
        {
          lastMessage: lastMessageText,
          timestamp: serverTimestamp(),
          userId: userId,
        },
        { merge: true }
      );

      setMessage("");
      setImageUrl(null);
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Failed to send message.");
    } finally {
      setIsUploading(false);
    }
  };

  const cameraImageHandler = (uri) => {
    setImageUrl(uri);
  };

  let imagePreview = null;
  if (imageUrl) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        resizeMode="contain"
      />
    );
  }

  return (
    <>
      <View style={styles.fabContainer}>
        <Pressable
          style={styles.fab}
          onPress={() => {
            setMessage("");
            setImageUrl(null);
            setVisible(true);
          }}
        >
          <Ionicons
            name="chatbubble-ellipses-sharp"
            size={40}
            color="#f57b00ff"
          />
        </Pressable>
      </View>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
              <LinearGradient
                colors={["rgba(7,7,9,1)", "rgba(27,24,113,1)"]}
                style={styles.chatBox}
              >
                <View style={styles.chatHeader}>
                  <Text style={styles.headerText}>Chat With Us 💬</Text>
                  <Pressable onPress={() => setVisible(false)}>
                    <Ionicons name="close" size={22} color="#fff" />
                  </Pressable>
                </View>

                <ScrollView
                  ref={scrollViewRef}
                  style={styles.chatBody}
                  showsVerticalScrollIndicator={false}
                  onContentSizeChange={() =>
                    scrollViewRef.current.scrollToEnd({ animated: true })
                  }
                >
                  {chatHistory.map((msg) => (
                    <View
                      key={msg.id}
                      style={[
                        styles.messageBubble,
                        msg.senderId === userId
                          ? styles.userMsg
                          : styles.botMsg,
                      ]}
                    >
                      {msg.imageUrl && (
                        <Image
                          source={{ uri: msg.imageUrl }}
                          style={styles.chatImage}
                          resizeMode="cover"
                        />
                      )}
                      {msg.text && (
                        <Text style={styles.messageText}>{msg.text}</Text>
                      )}
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.chatFooter}>
                  {imageUrl && (
                    <View style={styles.previewContainer}>
                      <View style={styles.imagePreview}>{imagePreview}</View>
                      <Pressable
                        style={styles.closeButton}
                        onPress={() => setImageUrl(null)}
                      >
                        <Entypo name="cross" size={24} color="#f57b00ff" />
                      </Pressable>
                    </View>
                  )}
                  <View style={styles.inputContainer}>
                    <ImagePicker cameraImage={cameraImageHandler} />
                    <TextInput
                      style={styles.input}
                      placeholder={
                        isUploading ? "Sending..." : "Type a message..."
                      }
                      value={message}
                      onChangeText={setMessage}
                      editable={!isUploading}
                    />
                    <Pressable
                      onPress={handleSendMessage}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <ActivityIndicator
                          size="small"
                          color="#888"
                          style={{ marginRight: 5 }}
                        />
                      ) : (
                        <Ionicons name="send" size={26} color={"#f57b00ff"} />
                      )}
                    </Pressable>
                  </View>
                </View>
              </LinearGradient>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    right: 20,
    bottom: 45,
    zIndex: 999,
  },
  fab: {
    backgroundColor: "rgba(255, 255, 255, 0.53)",
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  chatBox: {
    backgroundColor: "#121212",
    flex: 1,
    paddingHorizontal: 15,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  headerText: {
    color: "#f57b00ff",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatBody: {
    flex: 1,
    marginVertical: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#f57b00ff",
  },
  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#2c2c2c",
    borderWidth: 1,
    borderColor: "#f57b00ff",
  },
  messageText: {
    color: "#fff",
  },
  chatFooter: {
    borderTopColor: "#333",
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#f57b00ff",
    borderRadius: 10,
    marginRight: 10,
    height: 40,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    backgroundColor: "#2c2c2c",
    borderRadius: 4,
  },
  previewContainer: {
    marginBottom: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(27,24,113,0.5)",
    borderRadius: 15,
    padding: 3,
    zIndex: 1,
  },
  chatImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default ChatWithUs;
