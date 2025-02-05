// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "instagram-flutter-cd18b.firebaseapp.com",
  projectId: "instagram-flutter-cd18b",
  storageBucket: "instagram-flutter-cd18b.appspot.com",
  messagingSenderId: "993230140834",
  appId: "1:993230140834:web:dc7932eddf5f325d58aefb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
