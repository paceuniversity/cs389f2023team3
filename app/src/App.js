import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from "./pages/About.js";
import Home from "./pages/Home";

function App() {
  return (
        <Router>
          <ul>
          <li>
            <Link to={`/`}>-Home</Link>
            <Link to={`/About`}>  -About</Link>
          </li>
          </ul>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
          </Switch>
        </Router>
  

    
  );
}

export default App;
