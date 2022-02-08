import React from 'react';
import { Button } from '@mui/material';
import { auth, provider } from '../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { useStateValue } from '../context/auth-context';
import { actionTypes } from '../context/reducer';
import './Login.css';

function Login() {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <img
          src='https://media.istockphoto.com/photos/ketchup-smiles-picture-id95477720?s=612x612'
          alt=''
        />
        <h1>Sign in to Slack Clone</h1>
        <p>clone.slack.com</p>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
