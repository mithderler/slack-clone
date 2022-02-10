import {
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import { Button } from '@mui/material';
import './Login.css';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

function Login() {
  // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const signIn = () => {
    // signInWithGoogle();

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider);
      })
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        //logged in
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
