import {
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import { Button } from '@mui/material';
import { useStateValue } from '../context/auth-context';
import { actionTypes } from '../context/reducer';
import './Login.css';

function Login() {
  const [state, dispatch] = useStateValue();

  const signIn = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, provider);
      })
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log('tokenn: ', token);
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
