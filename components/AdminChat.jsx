import { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import ImagePicker from "./ImagePicker";

const ADMIN_ID = "02ffeb1d-8066-40f1-b6c1-a139f25db665";

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

function AdminChatModal() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    const chatsCollection = collection(db, "chats");
    const q = query(chatsCollection, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }

    const messagesCollection = collection(
      db,
      "chats",
      selectedUser.id,
      "messages"
    );
    const q = query(messagesCollection, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messageList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageList);
    });

    return () => unsubscribe();
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if ((!imageUrl && newMessage.trim() === "") || !selectedUser) {
      return;
    }

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
        senderId: ADMIN_ID,
      };

      if (newMessage.trim() !== "") {
        messageData.text = newMessage;
      }

      if (uploadedImageUrl) {
        messageData.imageUrl = uploadedImageUrl;
      }

      await addDoc(
        collection(db, "chats", selectedUser.id, "messages"),
        messageData
      );

      const lastMessageText = newMessage.trim() ? newMessage : "📷 Image";
      await setDoc(
        doc(db, "chats", selectedUser.id),
        {
          lastMessage: `Admin: ${lastMessageText}`, 
          timestamp: serverTimestamp(),
        },
        { merge: true }
      );

      setNewMessage("");
      setImageUrl(null);
    } catch (error) {
      console.error("Error sending message from admin:", error);
      alert("Failed to send message.");
    } finally {
      setIsUploading(false); 
    }
  };
  const goBackToUserList = () => {
    setSelectedUser(null);
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
      <Pressable style={styles.fab} onPress={() => setVisible(true)}>
        <Ionicons
          name="chatbubble-ellipses-sharp"
          size={40}
          color="#f57b00ff"
        />
      </Pressable>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
          >
            <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
              <LinearGradient
                colors={["rgba(7,7,9,1)", "rgba(27,24,113,1)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.modalBox}
              >
                <View style={styles.header}>
                  {selectedUser ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <Pressable onPress={goBackToUserList}>
                        <Ionicons name="arrow-back" size={22} color="#fff" />
                      </Pressable>
                      <Text style={styles.headerText} numberOfLines={1}>
                        {`Chat with ${selectedUser.id.substring(0, 8)}... 💬`}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.headerText}>User List 💬</Text>
                  )}
                  <Pressable
                    onPress={() => {
                      setVisible(false);
                      setSelectedUser(null);
                    }}
                  >
                    <Ionicons name="close" size={22} color="#fff" />
                  </Pressable>
                </View>

                {!selectedUser ? (
                  <ScrollView>
                    {users.map((user) => (
                      <Pressable
                        key={user.id}
                        style={styles.userItem}
                        onPress={() => setSelectedUser(user)}
                      >
                        <Text style={styles.userText}>
                          User ID: {user.id.substring(0, 8)}...
                        </Text>
                        <Text style={styles.lastMessage} numberOfLines={1}>
                          Last: {user.lastMessage}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                ) : (
                  <>
                    <ScrollView
                      ref={scrollViewRef}
                      style={styles.messages}
                      onContentSizeChange={() =>
                        scrollViewRef.current.scrollToEnd({ animated: true })
                      }
                    >
                      {messages.map((msg) => (
                        <View
                          key={msg.id}
                          style={[
                            styles.messageBubble,
                            msg.senderId === ADMIN_ID
                              ? styles.adminMsg
                              : styles.userMsg,
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
                          <View style={styles.imagePreview}>
                            {imagePreview}
                          </View>
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
                          placeholder="Type a reply..."
                          placeholderTextColor="#999"
                          value={newMessage}
                          onChangeText={setNewMessage}
                        />
                        <Pressable onPress={handleSendMessage}>
                          {isUploading ? (
                            <ActivityIndicator
                              size="small"
                              color="#888"
                              style={{ marginRight: 5 }}
                            />
                          ) : (
                            <Ionicons
                              name="send"
                              size={26}
                              color={"#f57b00ff"}
                            />
                          )}
                        </Pressable>
                      </View>
                    </View>
                  </>
                )}
              </LinearGradient>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    bottom: 45,
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
    zIndex: 999,
  },
  modalOverlay: {
    flex: 1,
  },
  modalBox: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  headerText: {
    color: "#f57b00ff",
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
  },
  userItem: {
    backgroundColor: "#f57b00ff",
    padding: 12,
    borderRadius: 5,
    marginVertical: 8,
    borderWidth: 0.5,
    borderColor: "#f57b00ff",
  },
  userText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  lastMessage: {
    color: "#000000ff",
    fontSize: 12,
    marginTop: 4,
    fontWeight: 600,
  },
  messages: { flex: 1, marginBottom: 10 },
  messageBubble: {
    padding: 8,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: "80%",
  },
  userMsg: {
    backgroundColor: "#2c2c2c",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#f57b00ff",
  },
  adminMsg: { backgroundColor: "#f57b00ff", alignSelf: "flex-end" },
  messageText: { color: "#fff" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#333",
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#f57b00ff",
    borderRadius: 8,
    padding: 8,
    color: "#fff",
    marginRight: 8,
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

export default AdminChatModal;
