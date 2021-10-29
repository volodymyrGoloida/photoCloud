import React from 'react'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/home/Home';
function App() {
 return <Router>
  <Switch>
    <Route exact path={"/"}>
     <Home />
    </Route>
    <Route exact path={'/register'}>
      <Register />
    </Route>
    <Route path={"/login"}>
      <Login />
    </Route>
  </Switch>
 </Router>
  
 
  
}

export default App;
