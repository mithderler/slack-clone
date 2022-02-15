import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from './firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from './components/chat/Chat';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './components/header/Header';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Sidebar from './components/sidebar/Sidebar';
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

  //todo: handle navigation of root directory to relevant channel
  if (user) {
    return (
      <div className='app'>
        <Header />
        <div className='app__body'>
          <Sidebar />
          <Routes>
            <Route
              path='/'
              element={<Navigate to='room/barkyVhYU0GLQ319P5Ti' />}
            />
            <Route path='/room/:channelId' element={<Chat />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  }

  return <Login />;
}

export default App;
