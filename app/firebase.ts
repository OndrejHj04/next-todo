import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmtikAook_sF3kA8KWbYc5qumODnA2hBI",
  authDomain: "next-todo-4d266.firebaseapp.com",
  projectId: "next-todo-4d266",
  storageBucket: "next-todo-4d266.appspot.com",
  messagingSenderId: "127215396989",
  appId: "1:127215396989:web:6f5fa81ff7f83d6db16914",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
