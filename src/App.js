import './App.css';
import './index.css';

import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';


// import components
import LandingPage from './LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const endpoint = "http://localhost:1234/api/auth/verify";

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {
      const serverResponse = await axios.get(endpoint, {
        headers:{
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.token
        }
      });
      // const parseRes = await serverResponse.json();
      setIsAuthenticated(serverResponse.status === 200);

    }catch (err){
      console.log(err);
    }
  }

  useEffect(() => {
    isAuth();
  })

  return (
     <Fragment>
       <Router>
          <Switch>
            <Route exact path = "/"
              render = {props => !isAuthenticated ? <Login {...props} setAuth = {setAuth}/> : <Redirect to = "/dashboard" />}
              />
            <Route exact path = "/login" 
              render = {props => !isAuthenticated ? <Login {...props} setAuth = {setAuth}/> : <Redirect to = "/dashboard" />}
            />
            <Route exact path = "/register" 
              render = {props => !isAuthenticated ? <Register {...props} setAuth = {setAuth}/> : <Redirect to = "/login"/>}
              />
            <Route exact path = "/dashboard" 
              render = {props => isAuthenticated ? <Dashboard {...props} setAuth = {setAuth}/> : <Redirect to = "/login" />}
            />
          </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
