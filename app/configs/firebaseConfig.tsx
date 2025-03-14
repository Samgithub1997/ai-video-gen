// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyXH8qBNFuwqDjKlkK3kkGXSEw05iNNRY",
  authDomain: "ai-video-generator-65df2.firebaseapp.com",
  projectId: "ai-video-generator-65df2",
  storageBucket: "ai-video-generator-65df2.firebasestorage.app",
  messagingSenderId: "82613346499",
  appId: "1:82613346499:web:9b8f3c930b153fe9588276",
  measurementId: "G-EJ7N4QFDJX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
