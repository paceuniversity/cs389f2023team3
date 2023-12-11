import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import LoginPage from "./pages/LoginPage.js";
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
          <li>
            <Link to="/about">About</Link>
          </li>
          {isLoggedIn && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/about" exact component={About} />
<<<<<<< Updated upstream
          <Route path="/profile" exact component={Profile} />
          <Route path="/login" exact component={LoginPage} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;