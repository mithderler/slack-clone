import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './Header.css';
import AuthContext from '../context/auth-context';

function Header() {
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
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
