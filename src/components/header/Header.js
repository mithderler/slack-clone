import React from 'react';
import * as constants from '../../utils/constants/Tooltips';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Avatar from '@mui/material/Avatar';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SearchIcon from '@mui/icons-material/Search';
import { Tooltips } from '../../utils/functions/Mui';
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
        <Tooltips title={constants.CHANEL_HEADER_HISTORY} arrow>
          <AccessTimeIcon className='header__left--history' />
        </Tooltips>
      </div>
      <Tooltips title={`${constants.CHANNEL_HEADER_SEARCH} Devs to Moon`}>
        <div className='header__search'>
          {/* <input
          className='header__search--input'
          type='text'
          placeholder='Search Devs to Moon'
        /> */}
          <p className='header__search--input'>Search Devs to Moon</p>
          <SearchIcon className='header__search--icon' />
        </div>
      </Tooltips>
      <div className='header__right'>
        <div className='header__right--logout' onClick={logoutHandler}>
          Log Out
        </div>
        <Tooltips title={constants.CHANNEL_HEADER_HELP}>
          <HelpOutlineIcon className='header__right--help' />
        </Tooltips>
        <div className='header__right--avatar'>
          <Tooltips title={user?.displayName} placement='bottom-start'>
            <Avatar
              className='header__right--avatar-photo'
              src={user?.photoURL}
              alt={user?.displayName}
              sx={{ width: 28, height: 28 }}
              variant='square'
            />
          </Tooltips>
          <span>
            <FiberManualRecordIcon className='header__right--avatar-status' />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
