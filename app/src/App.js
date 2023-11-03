import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";


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
        </ul>
      </nav>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/profile" exact component={Profile} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
