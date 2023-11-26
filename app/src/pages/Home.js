import "./Home.css";
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { Post } from '../pages/Post';
import { Card, CardHeader, Avatar, TextField, Button, Box } from "@mui/material";

import React, { useState } from "react";
import { AuthDetails } from '../components/auth/AuthDetails.jsx';

function Home() {
  const [currentForm, setCurrentForm] = useState('login');
  const isAuthenticated = true;
  const [newPostData, setNewPostData] = useState({
    userName: '',
    date: '',
    description: '',
    artist: '',
    title: '',
    coverUrl: '',
  });

  const toggleForm = (formName) => { 
    setCurrentForm(formName);
  }

  const handleInputChange = (field) => (event) => {
    setNewPostData({
      ...newPostData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(newPostData);
  };

  const onSubmit = (event) => {

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
            <Avatar aria-label="Lihi"></Avatar>
          }
          title="Lihi Shamriz"
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

const postsArray = [
  {
    userName: "Rosi",
    date: "November 5, 2023",
    description: "Just love it!!",
    artist: "Taylor Swift",
    title: "1989",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png"
  },
  {
    userName: "Jason",
    date: "November 4, 2023",
    description: "Rap legend",
    artist: "Eminem",
    title: "The Marshall Mathers LP",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg"
  },
  {
    userName: "Nate",
    date: "November 3, 2023",
    description: "Classic rock vibes!",
    artist: "The Rolling Stones",
    title: "Sticky Fingers",
    coverUrl: "https://amateurphotographer.com/wp-content/uploads/sites/7/2021/12/010.jpg"
  },
  {
    userName: "Alex",
    date: "November 2, 2023",
    description: "My favorite of all times.",
    artist: "The Beatles",
    title: "Abbey Road",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg"
  },
  {
    userName: "Tiffany",
    date: "November 1, 2023",
    description: "Check out this album!",
    artist: "Mac Miller",
    title: "Live From Space",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/5f/Mac_Miller_Live_from_Space.jpg"
  },
];

export default Home;