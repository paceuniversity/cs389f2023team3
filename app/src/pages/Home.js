import React, { useState, useEffect } from "react";
import "./Home.css";

import { Post } from '../pages/Post';
import { Card, CardHeader, Avatar, TextField, Button, Box } from "@mui/material";
import { useAuth, getUser, getPosts, addPost } from '../firebase';
import AlbumSearch from "./AlbumSearch";

function Home() {
  const currentUser = useAuth();
  const [currentUserDetails, setCurrentUserDetails] = useState({}); 
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [key, setKey] = useState('');
  const [newPostData, setNewPostData] = useState({
    userId: '',
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
    if (currentUser) {
      const fetchPosts = async () => {
        const user = await getUser(currentUser.uid);
        setCurrentUserDetails(user);
  
        const fetchedPosts = await getPosts(currentUser.uid);
        setPostsArray(fetchedPosts);
      };
  
      fetchPosts();
    }
  }, [currentUser]);

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

    newPostData.userId = currentUser.uid;
    newPostData.userName = currentUserDetails.name;
    newPostData.date = new Date();

    setPostsArray((prevPosts) => [newPostData, ...prevPosts]);
    await addPost(newPostData);

    setNewPostData({
      userId: '',
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
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label={currentUserDetails.name} src={currentUserDetails.photoURL}></Avatar>
          }
          title={currentUserDetails.name}
          subheader={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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

    <div className="posts">
      {postsArray.map((data, index) => (
        <Post key={index} postData={data} />
      ))}
    </div>
  </div>
  );
}

export default Home;