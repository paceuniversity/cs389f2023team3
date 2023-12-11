import React, { useState } from 'react';
import { collection, query, where, getDocs, doc} from "firebase/firestore";


import { db } from "../../firebase"; // Ensure this is the correct import path

const Search = ({ onFormSwitch, onSearchSuccess }) => {

    const sendFriendRequest = async (receiverId) => {
        // Implement sending a friend request to Firebase here
        console.log("Sending a friend request to:", receiverId);
    };
    
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setError] = useState(false);

    const handleSearch = async () => {
        setError(false); // Reset error state on new search
        const q = query(collection(db, "users"), where("displayName", "==", username));
        try { 
            const querySnapshot = await getDocs(q);
            let found = false;
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
                found = true;
            });

            if (found) {
                setUser(doc.data());
    onSearchSuccess(doc.data()); // Pass the found user back to the parent component
  }
  
        } catch(err) {
            setError(true);
        }
    };

    const handleKey = (e) => {
        if (e.code === "Enter") {
            handleSearch();
        }
    };

  
    return (
        <div className='search'>
            <div className="searchForm">
                <input 
                    type="text" 
                    placeholder='Find a user' 
                    onKeyDown={handleKey} 
                    onChange={e => setUsername(e.target.value)}
                />
                {err && <p>Error in search. Please try again.</p>}
                {user && (
                  <div>
                    <p>User Found: {user.displayName}</p>
                    <button onClick={() => sendFriendRequest(user.id)}>Send Friend Request</button>
                  </div>
                )}
            </div>
        </div>
    );
};

export default Search;
