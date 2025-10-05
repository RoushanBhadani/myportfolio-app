import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";

export const loginUser = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user.uid; // use this as userId
  } catch (error) {
    console.log("Login Error:", error);
  }
};
