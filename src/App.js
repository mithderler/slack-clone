import { Routes, Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from './firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { uiActions } from './store/ui';
import { useEffect } from 'react';
import Chat from './components/chat/Chat';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './components/header/Header';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Sidebar from './components/sidebar/Sidebar';
import './index.css';

const auth = getAuth(app);

function App() {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const sidebarSwitchHandler = () => {
      if (window.innerWidth > 585) {
        dispatch(uiActions.showSidebar());
      }
      if (window.innerWidth <= 585) {
        dispatch(uiActions.hideSidebar());
      }
    };

    window.addEventListener('resize', sidebarSwitchHandler);
    window.addEventListener('DOMContentLoaded', sidebarSwitchHandler);

    return () => {
      window.removeEventListener('resize', sidebarSwitchHandler);
      window.removeEventListener('DOMContentLoaded', sidebarSwitchHandler);
    };
  }, [dispatch]);

  // Onload hide sidebar for small devices
  useEffect(() => {
    if (window.innerWidth <= 585) {
      dispatch(uiActions.hideSidebar());
    }
  }, []);

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
            <Route path='/signin' element={<Navigate to='/' />} />
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

  return (
    <Routes>
      <Route path='/signin' element={<Login />} />
      <Route path='*' element={<Navigate to='/signin' />} />
    </Routes>
  );
}

export default App;
