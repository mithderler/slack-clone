import {
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
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
          src='https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg'
          alt=''
        />
        <h1>Sign in to Slack Clone</h1>
        <div>Please select your login type</div>
        {/* <Button onClick={signIn}>Sign In with Google</Button> */}
        <Button variant='outlined' onClick={signIn}>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
            alt='google icon'
          />
          <span>Continue with Google</span>
        </Button>
      </div>
    </div>
  );
}

export default Login;
