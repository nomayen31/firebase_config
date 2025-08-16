// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPQ9zfpocziAo2yrYOXtAaulM6Go_MAAA",
  authDomain: "simple-firebase-f5d77.firebaseapp.com",
  projectId: "simple-firebase-f5d77",
  storageBucket: "simple-firebase-f5d77.firebasestorage.app",
  messagingSenderId: "330111309822",
  appId: "1:330111309822:web:a3522a251c2acfeb56d2af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;