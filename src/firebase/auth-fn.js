import {
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './config';

export const signIn = (provider) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithPopup(auth, provider);
    })
    .then((result) => {
      //logged in
    })
    .catch((error) => {
      alert(error.message);
    });
};
