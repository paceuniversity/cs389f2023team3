import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, writeBatch, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase"; // Ensure this is the correct import path
import Search  from "./Search";

const FriendController = ({ currentUserId }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {

        const fetchFriendRequests = async () => {
            const q = query(collection(db, "friendRequests"), where("receiverId", "==", currentUserId));
            const querySnapshot = await getDocs(q);
            const requestsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setRequests(requestsData);
        };

        fetchFriendRequests();
    }, [currentUserId]);

    const handleAccept = async (requestId, senderId) => {
  
        const requestDocRef = doc(db, "friendRequests", requestId);
        await updateDoc(requestDocRef, { status: 'accepted' });
    
   
        const currentUserRef = doc(db, "users", currentUserId); 
        const senderUserRef = doc(db, "users", senderId);
    
     
        const batch = writeBatch(db);
    
  
        const currentUserFriendsRef = collection(currentUserRef, "friends");
        batch.set(doc(currentUserFriendsRef, senderId), {
            userId: senderId,
            addedAt: serverTimestamp() 
        });
    
     
        const senderUserFriendsRef = collection(senderUserRef, "friends");
        batch.set(doc(senderUserFriendsRef, currentUserId), {
            userId: currentUserId,
            addedAt: serverTimestamp() 
        });
    
    
        await batch.commit();
    };
    
    const handleDeny = async (requestId) => {
     
        const requestDocRef = doc(db, "friendRequests", requestId);
    
  
        await updateDoc(requestDocRef, { status: 'denied' });

        setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
    };
    
    return (
        <div>
            <h2>Friend Requests</h2>
            {requests.map((request) => (
                <div key={request.id}>
                    <p>{request.senderId} wants to be your friend!</p>
                    <button onClick={() => handleAccept(request.id)}>Accept</button>
                    <button onClick={() => handleDeny(request.id)}>Deny</button>
                </div>
            ))}
        </div>
    );
};

export default FriendController;
