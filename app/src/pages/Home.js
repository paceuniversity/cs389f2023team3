import React, { useState, useEffect } from "react";
import "./Home.css";

import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { Post } from '../pages/Post';
import { Card, CardHeader, Avatar, TextField, Button, Box } from "@mui/material";
import { AuthDetails } from '../components/auth/AuthDetails.jsx';
import AlbumSearch from "./AlbumSearch";
import { getPosts, addPost } from '../firebase';

function Home() {
  const [currentForm, setCurrentForm] = useState('login');
  const isAuthenticated = true;
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [key, setKey] = useState('');
  const [newPostData, setNewPostData] = useState({
    userName: '',
    date: '',
    albumId: '',
    description: '',
    title: '',
    artist: '',
    coverUrl: '',
  });
  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPostsArray(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const toggleForm = (formName) => { 
    setCurrentForm(formName);
  }

  const handleInputChange = (field) => (event) => {
    setNewPostData({
      ...newPostData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(newPostData);
  };

  const onSubmit = async (event) => {
    if (selectedAlbum) {
      newPostData.albumId = selectedAlbum.id;
      newPostData.title = selectedAlbum.name;
      newPostData.artist = selectedAlbum.artists[0].name;
      newPostData.coverUrl = selectedAlbum.images[0].url
    }

    newPostData.userName = "Tiffany";
    newPostData.date = "November 26, 2023";

    setPostsArray((prevPosts) => [newPostData, ...prevPosts]);
    await addPost(newPostData);

    setNewPostData({
      userName: '',
      date: '',
      description: '',
      title: '',
      artist: '',
      coverUrl: '',
    });

    setSelectedAlbum('');
    setKey(new Date());
  };

  return (
  <div className="home-page">
   
    {!isAuthenticated && <div className="login center">
      <h1>Welcome to TuneTalk!</h1>

      Login or Register below!
    
      { 
       currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}  /> 
      }
     
    </div>}
    
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Tiffany"></Avatar>
          }
          title="Tiffany"
          subheader="November 26, 2023"
        />
        <Box sx={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={newPostData.description}
            onChange={handleInputChange('description')}
          />
          <AlbumSearch onAlbumSelected={setSelectedAlbum} externalKey={key}></AlbumSearch>
        </Box>
        <Button type="submit" variant="contained" color="primary" sx={{ margin: '16px' }}>
          Post
        </Button>
      </Card>
    </form>

    {isAuthenticated && <div className="posts">
      {postsArray.map((data, index) => (
        <Post key={index} postData={data} />
      ))}
    </div>}
  </div>
  );
}

export default Home;