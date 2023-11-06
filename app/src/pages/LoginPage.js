import "./Home.css";
//import "../components/auth/Login.css";
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import AuthDetails from '../components/auth/AuthDetails';

import React, { useState } from "react";

function Home() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => { 
    setCurrentForm(formName);
  }

  return (
  <div className="home-page">
   
    <div className="center">
      <h1>Welcome to TuneTalk!</h1>

      Login or Register below!
    
      { 
       currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}  /> 

       
      }
      < AuthDetails />
    </div>
  </div>
  );
}

export default Home;