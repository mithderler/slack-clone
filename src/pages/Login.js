import { useState } from 'react';
import { googleProvider, githubProvider } from '../firebase/config';
import { signIn } from '../firebase/auth-fn';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../index.css';

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
      <div className='login__header'>
        <div className='login__header__bar'>
          <div className='login__header--left'></div>
          <div className='login__header--center'>
            <img
              src='https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg'
              alt=''
            />
          </div>
          <div className='login__header--right'>
            <span>New to Slack?</span>
            <a href='#' className='login__header--signup'>
              Create an account
            </a>
          </div>
        </div>
      </div>
      <div className='login__container'>
        <h2 className='login__header-text--top'>Sign in to Slack</h2>
        <div className='login__header-text--bottom'>
          We suggest using the <strong>email address you use at work.</strong>
        </div>
        <div className='login__signins'>
          <Button variant='outlined' onClick={signInWithGoogle}>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
              alt='google icon'
            />
            <span>Sign in with Google</span>
          </Button>
          <Button
            id='login__github'
            variant='outlined'
            onClick={signInWithGithub}
          >
            <img
              src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
              alt='github icon'
            />
            <span>Sign in with Github</span>
          </Button>
          <div className='login__divider'>
            <hr />
            <div className='login__divider--content'>OR</div>
            <hr />
          </div>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { width: '100%' },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              id='login__email'
              variant='outlined'
              placeholder='name@work-email.com'
              size='small'
              sx={{ mb: 2 }}
            />
            <TextField
              id='outlined-password-input'
              placeholder='password'
              type='password'
              autoComplete='current-password'
              size='small'
              sx={{ mb: 3 }}
            />

            <Button
              variant='contained'
              sx={[
                {
                  height: '44px',
                  background: '#4a154b',
                  textTransform: 'none',
                  fontSize: '18px',
                  fontWeight: '700',
                },
                {
                  '&:hover': {
                    background: 'rgba(74, 21, 75, 0.9)',
                  },
                },
              ]}
            >
              Sign In with Email
            </Button>
          </Box>
          <div className='login__footer'>
            <ul>
              <li>Privacy & Terms</li>
              <li>Contact Us</li>
              <li className='login__footer--region'>
                <LanguageIcon />
                Change region <ExpandMoreIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
