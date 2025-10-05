import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const sendMessage = async (text, userId, from) => {
  if (!text.trim()) return;

  try {
    await addDoc(collection(db, "chats", userId, "messages"), {
      text,
      from, // "user" or "admin"
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.log("Send message error:", error);
  }
};
