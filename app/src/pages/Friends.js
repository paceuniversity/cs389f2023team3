import React, { useState, useEffect } from "react";
import "./Home.css";
import { useAuth } from '../firebase';
import { Card, CardHeader, Avatar, Divider } from "@mui/material";
import Search from "../components/auth/Search";
import { doc, getFirestore, getDoc } from "firebase/firestore";

function Friends() {
  const currentUser = useAuth();
  const [friends, setFriends] = useState([]);
  const isAuthenticated = !!currentUser;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userDocRef = doc(getFirestore(), "users", currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const friendsData = userData.friends || [];
          setFriends(friendsData);
        }
      } catch (error) {
        console.error("Error fetching friends: ", error);
      }
    };

    if (isAuthenticated) {
      fetchFriends();
    }
  }, [currentUser, isAuthenticated]);

  function onAddFriend(friendUsername) {
    setFriends([...friends, friendUsername]);
  }

  return (
    <div className="home-page">
      {isAuthenticated && (
        <div className="search-bar-container">
          <h3>
            <Search friends={friends} onAddFriend={onAddFriend}/>
          </h3>
          <div>
            <Divider style={{ marginTop: "16px" }}/>
            {friends.map((friendName) => (
              <FriendCard key={friendName} friendName={friendName} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FriendCard({ friendName }) {
  return (
    <Card sx={{ maxWidth: 240, marginTop: 2 }}>
      <CardHeader
        avatar={<Avatar>{friendName.charAt(0)}</Avatar>}
        title={friendName}
      />
    </Card>
  );
}

export {
  Friends,
  FriendCard
}