// src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "promptselz.firebaseapp.com",
  projectId: "promptselz",
  storageBucket: "promptselz.firebasestorage.app",
  messagingSenderId: "129069832755",
  appId: "1:129069832755:web:6986b5e52fb9357e2b2146"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);