import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

// Firebase configuration
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
initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(); // Export auth
const storage = getStorage();
const db = getFirestore();

// Custom hook to use auth
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

// Function to upload files to Firebase Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true); 
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });
  
  setLoading(false);
  alert("Uploaded file!");
  return photoURL;
}

// Function to create or update user profile data in Firestore
export async function createUserOrUpdateProfile(uid, updatedData) {
  const userDocRef = doc(getFirestore(), "users", uid);
  try {
    await setDoc(userDocRef, updatedData, { merge: true });
    console.log("Profile created/updated successfully!");
  } catch (error) {
    console.error("Error creating/updating profile: ", error);
  }
}
