// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-5NIVWDfK-_jAPvS869IhlXBI0YLXTzc",
  authDomain: "abedin-expo-v4.firebaseapp.com",
  projectId: "abedin-expo-v4",
  storageBucket: "abedin-expo-v4.firebasestorage.app",
  messagingSenderId: "257322444024",
  appId: "1:257322444024:web:ce2edb129e4e25742d470d",
  measurementId: "G-K5947QD0X9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authFirebase = getAuth(app)