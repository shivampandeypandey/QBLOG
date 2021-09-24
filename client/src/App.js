import React,{useState,useEffect} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './components/login/Login';
import Home from './components/home/Home';
import ErrorBoundary from './helper/Error';
import Nav from './components/navbar/Navbar';
import Register from './components/Register/Register';
import GetUserService from './services/GetUserService';


export default function App() {
  const [updatingToken, setUpdatingToken] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [loggedInUser, setloggedInUser] = useState(null);

  useEffect(()=>{
    authManager();
  },[]);

  const authManager = async () => {
    setUpdatingToken(true);
    const token = localStorage.getItem("token");
    if(token){
      setIsAuth(true);
      const resp = await GetUserService();
      setloggedInUser(resp);
    } else {
      setIsAuth(false);
      setloggedInUser(null);
    }
    setUpdatingToken(false);
  }


  return (
    <BrowserRouter>
    <div className="App">
    <Nav loggedInUser={loggedInUser} authManager={authManager}/>
          <Switch>
            <Route exact path="/"     
                  render={() =>  
                    !updatingToken && isAuth ? <Home loggedInUser={loggedInUser}/> 
                    : <Login authManager={authManager} />}
            />
            <Route exact path="/register" component={Register}/>
          </Switch>
    </div>
    </BrowserRouter>
  );
}
