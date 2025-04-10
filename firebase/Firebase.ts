// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPuV2S5VikovULCyGoxMlBd9VeTlxaHWs",
  authDomain: "landslide-realtime-db.firebaseapp.com",
  databaseURL: "https://landslide-realtime-db-default-rtdb.firebaseio.com",
  projectId: "landslide-realtime-db",
  storageBucket: "landslide-realtime-db.firebasestorage.app",
  messagingSenderId: "928839228175",
  appId: "1:928839228175:web:840fe4b7b1fa75a1803c7a",
  measurementId: "G-C1E6HQ7JQ9"
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAnalytics = getAnalytics(firebaseApp);

const firebaseDatabase = getDatabase(firebaseApp);

export { firebaseApp, firebaseAnalytics, firebaseDatabase };
