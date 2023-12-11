import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, addDoc, collection, getDocs, getDoc } from "firebase/firestore";
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
export const db = getFirestore();

// Custom hook to use auth
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

// Function to get user details
export async function getUser(uid) {
  const userDocRef = doc(getFirestore(), "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    return data;
  }
}

// Function to upload files to Firebase Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true); 
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

// Function to get posts from Firestore
export async function getPosts() {
  const postsCollection = collection(db, 'posts');
  const querySnapshot = await getDocs(postsCollection);

  const postsArray = [];
  querySnapshot.forEach((doc) => {
    postsArray.push({ id: doc.id, ...doc.data() });
  });

  return postsArray;
}

// Function to add a new post to Firestore
export async function addPost(postData) {
  const postsCollection = collection(db, 'posts');
  try {
    const docRef = await addDoc(postsCollection, postData);
    console.log('Post added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding post: ', error);
  }
}
