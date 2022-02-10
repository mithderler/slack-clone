import React from 'react';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase/config';
import './Header.css';

const auth = getAuth(app);

function Header() {
  const [user, loading, error] = useAuthState(auth);

  const logoutHandler = () => {
    signOut(auth);
  };

  return (
    <div className='header'>
      <div className='header__left'>
        <AccessTimeIcon />
      </div>
      <div className='header__search'>
        <input type='text' placeholder='Search Devs to Moon' />
        <SearchIcon />
      </div>
      <div className='header__right'>
        <div className='header__right-logout' onClick={logoutHandler}>
          Log Out
        </div>
        <HelpOutlineIcon sx={{ width: 20, height: 20 }} />
        <div className='header__right-avatar'>
          <Avatar
            className='header__avatar'
            src={user?.photoURL}
            alt={user?.displayName}
            sx={{ width: 28, height: 28 }}
            variant='square'
          />
          <span>
            <FiberManualRecordIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
