import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtQmaNyw9WEd9ZWXmk6ztvhtdDymt0-u4",
  authDomain: "sentique-ac5b3.firebaseapp.com",
  projectId: "sentique-ac5b3",
  storageBucket: "sentique-ac5b3.appspot.com",
  messagingSenderId: "624120364442",
  appId: "1:624120364442:web:20e8ff5b0e2a5cfa2d8e23",
};

// ? application and authentication initialization
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ? database initialization
export const db = getFirestore();
