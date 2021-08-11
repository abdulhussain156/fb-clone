import React, { useState, useEffect } from 'react';
import './App.css';
import Feed from "./Feed";
import Header from './header.js';
import Login from "./Login";
import Sidebar from './Sidebar';
import { UseStateValue } from "./StateProvider";
import Widgets from "./Widgets.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { actionType, actionTypes } from './reducer';
import { auth, provider, storage } from "./firebase";
function App() {

  const [{ image, username, user }, dispatch] = UseStateValue();
  const [profilepic, setprofilepic] = useState(null);

  useEffect(() => {
   auth.onAuthStateChanged((authUser) => {
     if (authUser) {
              
            dispatch({
                type: actionType.SET_USER,
                user: authUser,
              username: authUser.displayName,
                image:authUser.photoURL
            });
            authUser.updateProfile({
              photoURL:profilepic
            })
        }
        else {
            dispatch({
                type: actionType.SET_USER,
                user: null
                
            });
        }
    })
    
    
}, [user, username]);
  
  return (
    <div className="app">
    
          {!user ? (
        
            <Login />
          
          ) : (
              <>
                  <Header />
                
                <div className="app__body">
                  <Sidebar />
                  
                  <Feed />
                  
              <Widgets />
              </div>
              </>
    )}
   
        
      
     
      
    </div>
  );
}

export default App;
