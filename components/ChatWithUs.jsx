import { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

function ChatWithUs() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userId, setUserId] = useState(null);
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
    if (message.trim() === "" || !userId) return;

    const messageData = {
      text: message,
      createdAt: serverTimestamp(),
      senderId: userId,
    };

    await addDoc(collection(db, "chats", userId, "messages"), messageData);

    await setDoc(
      doc(db, "chats", userId),
      {
        lastMessage: message,
        timestamp: serverTimestamp(),
        userId: userId,
      },
      { merge: true }
    );

    setMessage("");
  };

  return (
    <>
      <View style={styles.fabContainer}>
        <Pressable style={styles.fab} onPress={() => setVisible(true)}>
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
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.chatBox}>
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
                      msg.senderId === userId ? styles.userMsg : styles.botMsg,
                    ]}
                  >
                    <Text style={styles.messageText}>{msg.text}</Text>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.chatFooter}>
                <TextInput
                  style={styles.input}
                  placeholder="Type a message..."
                  placeholderTextColor="#ccc"
                  value={message}
                  onChangeText={setMessage}
                />
                <Pressable onPress={handleSendMessage}>
                  <Ionicons name="send" size={26} color="#f57b00ff" />
                </Pressable>
              </View>
            </View>
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
    bottom: 30,
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
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  chatBox: {
    backgroundColor: "#121212",
    height: "90%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    paddingBottom: 10,
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
  },
  messageText: {
    color: "#fff",
  },
  chatFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#333",
    borderTopWidth: 1,
    paddingTop: 10,
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
});

export default ChatWithUs;
