import { useState } from 'react';
import { googleProvider, githubProvider } from '../firebase/config';
import { signIn } from '../firebase/auth-fn';
import Button from '@mui/material/Button';
import '../App.css';

function Login() {
  const [error, setError] = useState(null);

  const signInWithGoogle = () => {
    signIn(googleProvider);
  };

  const signInWithGithub = () => {
    signIn(githubProvider);
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
        <Button variant='outlined' onClick={signInWithGoogle}>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
            alt='google icon'
          />
          <span>Continue with Google</span>
        </Button>
        <Button variant='outlined' onClick={signInWithGithub}>
          <img
            src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
            alt='github icon'
          />
          <span>Continue with Github</span>
        </Button>
      </div>
    </div>
  );
}

export default Login;
