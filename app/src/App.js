
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import LoginPage from "./pages/LoginPage.js";
<<<<<<< Updated upstream
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
=======
import Friends from "./pages/Friends.js";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
<<<<<<< Updated upstream
=======
          )}
             {isLoggedIn && (
          <li>
            <Link to="/friends">Friends</Link>
          </li>
          )}
>>>>>>> Stashed changes
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
<<<<<<< Updated upstream
          <Route path="/profile" exact component={Profile} />
          <Route path="/login" exact component={LoginPage} />

=======
          <Route path="/friends" exact component={Friends} />
>>>>>>> Stashed changes
        </Switch>
      </div>
    </Router>
  );
}

export default App;
