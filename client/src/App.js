//mport logo from './logo.svg';
import './App.css';
import Signup from "./Components/Auth/Signup.js"
import Login from "./Components/Auth/Login.js"
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
function App() {
  return (
    <div className="app">
      <Router>
      <Switch>  
              <Route exact path="/signup">
                   <Signup/>
              </Route>
              <Route exact path="/login">
                   <Login/>
              </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
