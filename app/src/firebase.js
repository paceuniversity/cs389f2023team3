import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, addDoc, collection, getDocs, getDoc, query, orderBy, updateDoc, arrayUnion, where } from "firebase/firestore";
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
export async function getPosts(currentUserId) {
  try {
    // Fetch the user's document to get the list of friends
    const userDocRef = doc(db, "users", currentUserId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      console.error("User document not found.");
      return [];
    }

    const userData = userDocSnapshot.data();

    // Fetch posts from friends
    const postsCollection = collection(db, 'posts');
    const querySnapshot = await getDocs(
      query(postsCollection, where('userName', 'in', [...userData.friends, userData.name]), orderBy('date', 'desc'))
    );

    const friendPostsArray = [];
    querySnapshot.forEach((doc) => {
      friendPostsArray.push({ id: doc.id, ...doc.data() });
    });

    return friendPostsArray;
  } catch (error) {
    console.error("Error fetching friend posts: ", error);
    return [];
  }
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

// Function to add a friend by name
export async function addFriend(currentUserId, friendUserName) {
  try {
    const currentUserDocRef = doc(getFirestore(), "users", currentUserId);
    const friendUserDocRef = await getUserDocRefByName(friendUserName);

    if (!currentUserDocRef || !friendUserDocRef) {
      console.log("User not found.");
      return;
    }

    await updateDoc(currentUserDocRef, {
      friends: arrayUnion(friendUserName),
    });

    await updateDoc(friendUserDocRef, {
      friends: arrayUnion((await getDoc(currentUserDocRef)).data().name),
    });
  } catch (error) {
    console.error("Error adding friend: ", error);
  }
}

// Helper function to get user document reference by name
async function getUserDocRefByName(name) {
  const userQuery = query(collection(db, "users"), where("name", "==", name));
  const userSnapshot = await getDocs(userQuery);

  if (!userSnapshot.empty) {
    return doc(db, "users", userSnapshot.docs[0].id);
  } else {
    return null;
  }
}