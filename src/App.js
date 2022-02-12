import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from './firebase/config';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import NotFound from './pages/NotFound';
import CircularProgress from '@mui/material/CircularProgress';
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
    return <NotFound error={error} />;
  }

  if (user) {
    return (
      <div>
        <Header />
        <div className='app__body'>
          <Sidebar />
          <Routes>
            <Route
              path='/'
              element={<Navigate to='room/barkyVhYU0GLQ319P5Ti' />}
            />
            <Route path='/room/:roomId' element={<Chat />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  }

  return <Login />;
}

export default App;
