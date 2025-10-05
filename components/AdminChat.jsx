import { useState } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const users = ["userA", "userB", "userC", "userD", "userE"];

function AdminChatModal() {
  const [visible, setVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const msg = {
      id: Date.now(),
      text: newMessage,
      from: "admin",
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  const goBackToUserList = () => {
    setSelectedUser(null);
    setMessages([]);
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
          <View style={styles.modalBox}>
            <View style={styles.header}>
              {selectedUser ? (
                <View style={{flexDirection:'row', gap:15}}>
                  <Pressable onPress={() => goBackToUserList()}>
                    <Ionicons
                      name={selectedUser ? "arrow-back" : "close"}
                      size={22}
                      color="#fff"
                    />
                  </Pressable>
                  <Text style={styles.headerText}>
                    {`${selectedUser}'s Chat 💬`}
                  </Text>
                </View>
              ) : (
                <>
                  <Text style={styles.headerText}>
                    {selectedUser
                      ? `${selectedUser}'s Chat 💬`
                      : "User List 💬"}
                  </Text>
                  <Pressable onPress={() => setVisible(false)}>
                    <Ionicons name="close" size={22} color="#fff" />
                  </Pressable>
                </>
              )}
            </View>

            {!selectedUser && (
              <ScrollView style={styles.userList}>
                {users.map((user, index) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.userItem,
                      selectedUser === user && styles.selectedUser,
                    ]}
                    onPress={() => setSelectedUser(user)}
                  >
                    <Text style={styles.userText}>{user}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}

            {selectedUser && (
              <>
                <ScrollView style={styles.messages}>
                  {messages.map((msg) => (
                    <View
                      key={msg.id}
                      style={[
                        styles.messageBubble,
                        msg.from === "admin" ? styles.adminMsg : styles.userMsg,
                      ]}
                    >
                      <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
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
    marginBottom: 10,
  },
  headerText: { color: "#f57b00ff", fontSize: 18, fontWeight: "bold" },
  userItem: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 5,
    marginVertical: 8,
    borderWidth: 0.5,
    borderColor: "#f57b00ff",
  },
  selectedUser: { backgroundColor: "#f57b00ff" },
  userText: { color: "#fff", fontSize: 14 },
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
  },
});

export default AdminChatModal;
