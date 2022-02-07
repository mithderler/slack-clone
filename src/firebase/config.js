import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCnfCns27duxoEpf6VzEIrvdX7l3e-CVJE',
  authDomain: 'slack-clone-81694.firebaseapp.com',
  projectId: 'slack-clone-81694',
  storageBucket: 'slack-clone-81694.appspot.com',
  messagingSenderId: '299702227215',
  appId: '1:299702227215:web:c3f127719e87855810ee7a',
  measurementId: 'G-5N8NHLNYCG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, analytics };
export default db;
