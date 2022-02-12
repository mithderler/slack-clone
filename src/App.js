import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import CircularProgress from '@mui/material/CircularProgress';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from './firebase/config';
import './App.css';

const auth = getAuth(app);

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className='app__spinner'>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      // BEM naming convention
      <div className='App'>
        <>
          <Header />
          <div className='app__body'>
            <Sidebar />
            <Routes>
              <Route path='/' element={<h1>Welcome</h1>} />
              <Route path='/room/:roomId' element={<Chat />} />
              <Route path='*' element={<h1>Page not found</h1>} />
            </Routes>
          </div>
        </>
      </div>
    );
  }

  return (
    // BEM naming convention
    <div className='App'>
      <Login />
    </div>
  );
}

export default App;
