import "./Home.css";
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { Post } from '../pages/Post';

import React, { useState } from "react";

function Home() {
  const [currentForm, setCurrentForm] = useState('login');
  const isAuthenticated = true;

  const toggleForm = (formName) => { 
    setCurrentForm(formName);
  }

  return (
  <div className="home-page">
   
    {!isAuthenticated && <div className="login center">
      <h1>Welcome to TuneTalk!</h1>

      Login or Register below!
    
      { 
       currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}  /> 
      }
     
    </div>}

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
    userName: "Tiffany",
    date: "November 1, 2023",
    description: "Check out this album!",
    artist: "Mac Miller",
    title: "Live From Space",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/5f/Mac_Miller_Live_from_Space.jpg"
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
    userName: "Nate",
    date: "November 3, 2023",
    description: "Classic rock vibes!",
    artist: "The Rolling Stones",
    title: "Sticky Fingers",
    coverUrl: "https://amateurphotographer.com/wp-content/uploads/sites/7/2021/12/010.jpg"
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
    userName: "Rosi",
    date: "November 5, 2023",
    description: "Just love it!!",
    artist: "Taylor Swift",
    title: "1989",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png"
  }
];

export default Home;