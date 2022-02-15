import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Avatar from '@mui/material/Avatar';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';

const auth = getAuth(app);

function Header() {
  const [user] = useAuthState(auth);

  const logoutHandler = () => {
    signOut(auth);
  };

  return (
    <div className='header'>
      <div className='header__left'>
        <AccessTimeIcon className='header__left--history' />
      </div>
      <div className='header__search'>
        {/* <input
          className='header__search--input'
          type='text'
          placeholder='Search Devs to Moon'
        /> */}
        <p className='header__search--input'>Search Devs to Moon</p>
        <SearchIcon className='header__search--icon' />
      </div>
      <div className='header__right'>
        <div className='header__right--logout' onClick={logoutHandler}>
          Log Out
        </div>
        <HelpOutlineIcon className='header__right--help' />
        <div className='header__right--avatar'>
          <Avatar
            className='header__right--avatar-photo'
            src={user?.photoURL}
            alt={user?.displayName}
            sx={{ width: 28, height: 28 }}
            variant='square'
          />
          <span>
            <FiberManualRecordIcon className='header__right--avatar-status' />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
