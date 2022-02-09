import {
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import { Button } from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../context/auth-context';
import './Login.css';

function Login() {
  const authCtx = useContext(AuthContext);

  const signIn = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider);
      })
      .then((result) => {
        authCtx.login(result.user);
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