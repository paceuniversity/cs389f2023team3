import React, { useState } from 'react';
import { collection, query, where, getDocs, addDoc} from "firebase/firestore";
import { FriendCard } from '../../pages/Friends';
import { db, useAuth, addFriend } from "../../firebase"; // Ensure this is the correct import path

const Search = ({ onSearchSuccess, onAddFriend }) => {
    const currentUser = useAuth();
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setError] = useState(false);

    const handleAddFriend = async (friendUsername) => {
        try {
          addFriend(currentUser.uid, friendUsername);
          setUser(null);
          setUsername('');
          onAddFriend(friendUsername);
        } catch (error) {
          console.error("Error adding friend: ", error);
        }
    };

    const handleSearch = async () => {
        setError(false); // Reset error state on new search
        const q = query(collection(db, "users"), where("name", "==", username));
        try { 
            const querySnapshot = await getDocs(q);
            let found = false;
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
                found = true;
                onSearchSuccess(doc.data());
            });

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
                    value={username}
                />
                {user && (
                  <div>
                    <FriendCard key={user.name} friendName={user.name} />
                    <button type="button" className="btn-outline-dark" data-mdb-ripple-color="dark" onClick={async () => await handleAddFriend(user.name)}>Add Friend</button>
                  </div>
                )}
            </div>
        </div>
    );
};

export default Search;