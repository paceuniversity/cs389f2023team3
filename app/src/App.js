import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import LoginPage from "./pages/LoginPage.js";
import Friends from './pages/Friends.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [auth]);

  return (
    <Router>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/home">Home</Link>
            </li>
          )}
          {isLoggedIn && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          )}
          {isLoggedIn && (
          <li>
            <Link to="/friends">Friends</Link>
          </li>
          )}
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/home" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/about" exact component={About} />
          <Route path="/friends" exact component={Friends} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;