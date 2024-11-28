// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "planit-a61a6.firebaseapp.com",
  projectId: "planit-a61a6",
  storageBucket: "planit-a61a6.firebasestorage.app",
  messagingSenderId: "231295545479",
  appId: "1:231295545479:web:187f610d243c0b74dbc822"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);