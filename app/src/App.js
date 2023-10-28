import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
