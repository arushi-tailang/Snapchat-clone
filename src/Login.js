import React from 'react'
import Snapchat from './snapchat-seeklogo.com.svg'
import {Button} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { auth, provider } from './firebase'
import { login } from "./features/appSlice"
import './Login.css'



function Login() {
const dispatch = useDispatch();

    const signIn = () => {
      auth.signInWithPopup(provider).then((result) => {
          dispatch(
              login({
              username: result.user.displayName,
              profilePic: result.user.photoURL,
              id :result.user.uid,
          })
        );
      })
          .catch(error => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login_container">
                <img src={Snapchat} alt=""></img>
                <Button variant='outlined' onClick={signIn}>Sign in</Button>
            </div>
        </div>
    )
}

export default Login
