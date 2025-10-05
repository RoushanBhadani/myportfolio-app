import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const subscribeToMessages = (userId, callback) => {
  const q = query(collection(db, "chats", userId, "messages"), orderBy("timestamp", "asc"));
  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => doc.data());
    callback(msgs);
  });
};
