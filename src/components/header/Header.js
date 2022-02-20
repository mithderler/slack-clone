import React, { useState } from 'react';
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
import { Menu, MenuList } from '@mui/material';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import './Header.css';

const auth = getAuth(app);

function Header() {
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const isUserMenuOpen = Boolean(anchorEl);
  const teamName = useSelector((state) => state.ui.teamName);

  const userMenuOpenHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const userMenuCloseHandler = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    signOut(auth);
  };

  return (
    <>
      <div className='header'>
        <div className='header__left'>
          <Tooltips title={constants.CHANEL_HEADER_HISTORY} arrow>
            <AccessTimeIcon className='header__left--history' />
          </Tooltips>
        </div>
        <Tooltips title={`${constants.CHANNEL_HEADER_SEARCH} Devs to Moon`}>
          <div className='header__search'>
            <p className='header__search--input'>Search Devs to Moon</p>
            <SearchIcon className='header__search--icon' />
          </div>
        </Tooltips>

        <div className='header__right'>
          <Tooltips title={constants.CHANNEL_HEADER_HELP}>
            <HelpOutlineIcon className='header__right--help' />
          </Tooltips>
          <div className='header__right--avatar'>
            <Tooltips title={user?.displayName} placement='bottom-start'>
              <Avatar
                onClick={userMenuOpenHandler}
                className='header__right--avatar-photo'
                src={user?.photoURL}
                alt={user?.displayName}
                sx={{ width: 28, height: 28, cursor: 'pointer' }}
                variant='square'
              />
            </Tooltips>
            <span>
              <FiberManualRecordIcon className='header__right--avatar-status' />
            </span>
          </div>
        </div>
      </div>
      <Menu
        id='menu'
        className='header__user-menu'
        onClose={userMenuCloseHandler}
        anchorEl={anchorEl}
        open={isUserMenuOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList className='header__user-menu--item user-item'>
          <div>
            <Avatar
              className='header__right--avatar-photo'
              src={user?.photoURL}
              alt={user?.displayName}
              sx={{ width: 36, height: 36 }}
              variant='square'
            />
          </div>
          <div className='header__user-menu--user-info'>
            <span>{user?.displayName}</span>
            <span>
              <FiberManualRecordIcon
                sx={{ fontSize: '13px', color: 'green' }}
              />
              Active
            </span>
          </div>
        </MenuList>
        <MenuList className='header__user-menu--item user-status'>
          <div className='header__user-menu--status-item'>
            <span>
              <SentimentSatisfiedAltIcon />
            </span>
            <p>Update your status</p>
          </div>
        </MenuList>
        <MenuList className='header__user-menu--item'>
          Set yourself as &nbsp;<strong>away</strong>
        </MenuList>
        <MenuList className='header__user-menu--item'>
          Pause notifications
        </MenuList>
        <Divider sx={{ margin: '8px 0' }} />
        <MenuList className='header__user-menu--item'>Profile</MenuList>
        <MenuList className='header__user-menu--item'>Preferences</MenuList>
        <Divider sx={{ margin: '8px 0' }} />
        <MenuList onClick={logoutHandler} className='header__user-menu--item'>
          Sign out of {teamName}
        </MenuList>
      </Menu>
    </>
  );
}

export default Header;
