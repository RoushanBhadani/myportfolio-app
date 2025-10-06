import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJPzOiGBu4KeUHGJX788PbVQil7PxI_Mg",
  authDomain: "chat-app-847a7.firebaseapp.com",
  projectId: "chat-app-847a7",
  storageBucket: "chat-app-847a7.firebasestorage.app",
  messagingSenderId: "457267659069",
  appId: "1:457267659069:web:d49dcc95c4eefbca148554"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);