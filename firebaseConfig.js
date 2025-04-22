// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyClHqgNYfGFSPDCUpGRSUNXS548_axIwts",
  authDomain: "amanbhattiportfolio.firebaseapp.com",
  projectId: "amanbhattiportfolio",
  storageBucket: "amanbhattiportfolio.appspot.com",
  messagingSenderId: "488367331902",
  appId: "1:488367331902:web:ee3574e5f25264c47e8f6f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();