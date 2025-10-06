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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

const ADMIN_ID = "02ffeb1d-8066-40f1-b6c1-a139f25db665";

function AdminChatModal() {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
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
    if (newMessage.trim() === "" || !selectedUser) return;

    const messageData = {
      text: newMessage,
      createdAt: serverTimestamp(),
      senderId: ADMIN_ID,
    };

    await addDoc(
      collection(db, "chats", selectedUser.id, "messages"),
      messageData
    );

    await setDoc(
      doc(db, "chats", selectedUser.id),
      {
        lastMessage: newMessage,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );

    setNewMessage("");
  };

  const goBackToUserList = () => {
    setSelectedUser(null);
  };

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
            
          >
            <View style={styles.modalBox}>
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
                        <Text style={styles.messageText}>{msg.text}</Text>
                      </View>
                    ))}
                  </ScrollView>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Type a reply..."
                      placeholderTextColor="#999"
                      value={newMessage}
                      onChangeText={setNewMessage}
                    />
                    <Pressable onPress={handleSendMessage}>
                      <Ionicons name="send" size={26} color="#f57b00ff" />
                    </Pressable>
                  </View>
                </>
              )}
            </View>
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
    bottom: 30,
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
    zIndex: 999,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalBox: {
    height: "100%",
    backgroundColor: "#121212",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  headerText: {
    color: "#f57b00ff",
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
  },
  userItem: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 5,
    marginVertical: 8,
    borderWidth: 0.5,
    borderColor: "#f57b00ff",
  },
  userText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  lastMessage: { color: "#ccc", fontSize: 12, marginTop: 4 },
  messages: { flex: 1, marginBottom: 10 },
  messageBubble: {
    padding: 8,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: "80%",
  },
  userMsg: { backgroundColor: "#2c2c2c", alignSelf: "flex-start" },
  adminMsg: { backgroundColor: "#f57b00ff", alignSelf: "flex-end" },
  messageText: { color: "#fff" },
  inputContainer: { flexDirection: "row", alignItems: "center" },
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
});

export default AdminChatModal;
