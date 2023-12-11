import React, { useState, useEffect } from "react";
import "./Home.css";
import { FriendController } from "../components/auth/FriendController";

import { Post } from '../pages/Post';
import { Card, CardHeader, Avatar, TextField, Button, Box } from "@mui/material";
import { useAuth, getUser, getPosts, addPost } from '../firebase';
import AlbumSearch from "./AlbumSearch";
import { AuthDetails } from '../components/auth/AuthDetails.jsx';
import Search  from "../components/auth/Search";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

function Friends() {
  const currentUser = useAuth();
  const [currentUserDetails, setCurrentUserDetails] = useState({}); 
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [key, setKey] = useState('');
  const isAuthenticated = !!currentUser;


    const handleSearchSuccess = (userData) => {

        console.log("Search Successful: ", userData);
      };
    
      const toggleForm = (formName) => {
        console.log("Form toggled to: ", formName);
      };

  return (
  <div className="home-page">
            {isAuthenticated && (
        <div className="search-bar-container">
         <h3> <Search onSearchSuccess={handleSearchSuccess} onFormSwitch={toggleForm} /> </h3> 
        </div>
    )}

    </div>
  );
}

export default Friends;