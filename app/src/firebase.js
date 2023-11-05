// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA59MnvhqQPFvE5RmzUmWOSqZYUwNZQ6vc",
  authDomain: "tunetalk-875f4.firebaseapp.com",
  projectId: "tunetalk-875f4",
  storageBucket: "tunetalk-875f4.appspot.com",
  messagingSenderId: "511154919092",
  appId: "1:511154919092:web:35f18e669c65016ebc29e1",
  measurementId: "G-YS9P0LDP15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);