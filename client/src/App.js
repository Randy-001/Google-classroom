//mport logo from './logo.svg';
import './App.css';
import Signup from "./Components/Auth/Signup.js"
import Login from "./Components/Auth/Login.js"
import StudentDash from "./Components/Classroom/StudentDash"
import Join  from './Components/Classroom/Join'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import StudentClass from './Components/Classroom/StudentClass';
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
              <Route exact path="/studentdashboard">
                   <StudentDash/>
              </Route>
              <Route exact path="/join">
                   <Join/>
              </Route>
              <Route exact path='/student/:id'>
                    <StudentClass/>
              </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
