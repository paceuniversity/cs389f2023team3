import "./Home.css";
import { useHistory } from "react-router-dom";
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import AuthDetails from '../components/auth/AuthDetails';

import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const history = useHistory();
  const auth = getAuth();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        setIsLoggedIn(true);
      } else {

        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); 
  }, [auth]);

  const toggleForm = (formName) => { 
    setCurrentForm(formName);
  }

  const handleLoginSuccess = () => {

    history.push("/home"); 
  }

  return (
    <div className="home-page">
      <div className="center">
        <h1>Welcome to TuneTalk!</h1>

        { !isLoggedIn && 
          <>
            Login or Register below!
            { 
              currentForm === "login" ? (
                <Login onFormSwitch={toggleForm} onLoginSuccess={handleLoginSuccess} />
              ) : (
                <Register onFormSwitch={toggleForm} />
              )
            }
          </>
        }
      </div>
    </div>
  );
}

export default Home;