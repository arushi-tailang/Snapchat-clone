import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Chats from './Chats';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectuser} from "./features/appSlice";
import Login from './Login';
import { auth } from './firebase';
import takeSnap from  './Chats'
import Snapchat from './snapchat-seeklogo.com.svg'

function App() {

  const user = useSelector(selectuser );
  const dispatch  = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login ({
          username:authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout())
      }
    })
  })

  return (
    <div className="app">
      <Router>
        {!user ?(
          <Login />
        ) : (
          <>
          <img className="app_logo" src={Snapchat} 
          alt='' 

          />
          {/* <img className="appBG" src='https://www.pngkey.com/png/full/859-8598072_picture-freeuse-library-silhouette-mobile-at-getdrawings-cell.png' 
          alt='' 

        /> */}
          <div className='app_body' >
           <div className="app_bodyBackground">
           <Switch>
       <Route path="/chats/view">
         <ChatView />
        </Route>
          <Route path="/chats">
         <Chats />
        </Route>
        
         <Route path="/preview">
        <Preview />
        </Route>
           <Route exact path="/">
           <WebcamCapture />
           </Route>
        </Switch>
         </div>
       </div>
       </>
        )}
       </Router>
       </div>
  );
}

export default App;
