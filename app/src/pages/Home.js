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
      <Post></Post>
    </div>}
  </div>
  );
}

export default Home;