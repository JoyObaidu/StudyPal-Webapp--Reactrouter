// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBJ4JAKm7COJatZrUWsj0_xO7j97h9qs38",
  authDomain: "studypal-login-and-sign-up.firebaseapp.com",
  projectId: "studypal-login-and-sign-up",
  storageBucket: "studypal-login-and-sign-up.firebasestorage.app",
  messagingSenderId: "458616167684",
  appId: "1:458616167684:web:c1801f4e607a9682e7c451",
  measurementId: "G-BLNQJFWNG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
