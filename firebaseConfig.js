// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm96nV2NU6b2t6zvxYO0-cvjKrVRFFLFA",
  authDomain: "projetocreditocarbonoteste.firebaseapp.com",
  projectId: "projetocreditocarbonoteste",
  storageBucket: "projetocreditocarbonoteste.appspot.com",
  messagingSenderId: "974485110361",
  appId: "1:974485110361:web:5a7cf435238b39eef17b48",
  measurementId: "G-5ZH1E0FDV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);