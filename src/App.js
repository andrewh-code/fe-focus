import './App.css';
import './index.css';

import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';


// import components
import LandingPage from './LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Journal from './components/journal/Journal';
import ForgotPassword from './components/login/ForgotPassword';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(isAuth());
  
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
      // setIsAuthenticated(serverResponse.status === 200);
      return true;
    }catch (err){
      console.log(err);
      // setIsAuthenticated(false);
      return false;
    }
  }

  useEffect(() => {
      const authResult = async () => {
        var result = isAuth();
        setIsAuthenticated(result);
      }
      authResult();
  }, []);

  return (
     <Fragment>
       <Router>
          <Switch>
            <Route exact path = "/"
              render = {props => !isAuthenticated ? <Login {...props} setAuth = {setAuth}/> : <Redirect to = "/dashboard" />}
              />
            <Route exact path = "/forgot" component={ForgotPassword}/>
            <Route exact path = "/login" 
              render = {props => !isAuthenticated ? <Login {...props} setAuth = {setAuth}/> : <Redirect to = "/dashboard" />}
            />
            <Route exact path = "/register" 
              render = {props => !isAuthenticated ? <Register {...props} setAuth = {setAuth}/> : <Redirect to = "/login"/>}
              />
            <Route exact path = "/dashboard" 
              render = {props => isAuthenticated ? <Dashboard {...props} setAuth = {setAuth}/> : <Redirect to = "/login" />}
            />
            <Route exact path = "/journal"
              render = {props => isAuthenticated ? <Journal {...props} setAuth = {setAuth}/> : <Redirect to ="/login" />}
            />
          </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
