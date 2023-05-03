import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZAGEDBU7xhr3HvYXVL8E48i8K_ATzUpE",
  authDomain: "frontendstore-66dff.firebaseapp.com",
  projectId: "frontendstore-66dff",
  storageBucket: "frontendstore-66dff.appspot.com",
  messagingSenderId: "1027702339734",
  appId: "1:1027702339734:web:826475d89faba00f722ab7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () => app;
export const auth = getAuth(app);
export const db = getFirestore(app);
