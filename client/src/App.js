//mport logo from './logo.svg';
import './App.css';
import Signup from "./Components/Auth/Signup.js"
import Login from "./Components/Auth/Login.js"
import StudentDash from "./Components/Classroom/StudentDash"
import Join  from './Components/Classroom/Join'
import Create  from './Components/Classroom/Create'
import Test from './Components/Classroom/Test'
import Teacherdashboard from './Components/Classroom/Teacherdashboard'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TeacherClass from './Components/Classroom/TeacherClass';
function App() {
  return (
    <div className="app">
      <Router>
      <Switch>  
              <Route exact path="/signup">
                   <Signup/>
              </Route>
              <Route exact path="/">
                   <Login/>
              </Route>
              <Route exact path="/studentdashboard">
                   <StudentDash/>
              </Route>
              <Route exact path="/teacherdashboard">
                   <Teacherdashboard/>
              </Route>
              <Route exact path="/join">
                   <Join/>
              </Route>
              <Route exact path='/teacher/:id'>
                    <TeacherClass/>
               </Route>
              <Route exact path="/create">
                   <Create/>
              </Route>
              <Route exact path="/:id/test">
                   <Test/>
              </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
