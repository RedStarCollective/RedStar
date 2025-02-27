// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (you'll get this from Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyC33ndsgXhDgC2Dz5E65O1YtFJrhhA9Q2Q",
    authDomain: "redstar-6cf23.firebaseapp.com",
    projectId: "redstar-6cf23",
    storageBucket: "redstar-6cf23.firebasestorage.app",
    messagingSenderId: "1039732267577",
    appId: "1:1039732267577:web:f64456fc54c9307c090be8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };