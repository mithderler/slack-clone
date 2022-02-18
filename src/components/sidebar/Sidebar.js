import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getChannelList } from '../../firebase/firestore-fn';
import SidebarOption from './SidebarOption';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui';
import * as constants from '../../utils/constants/Tooltips';
import { Tooltips } from '../../utils/functions/Mui';
import './Sidebar.css';

const auth = getAuth(app);

function Sidebar() {
  const [user] = useAuthState(auth);
  const [channels, setChannels] = useState([]);
  const [isChannelListOpen, setIsChannelListOpen] = useState(true);
  const isSidebarHidden = useSelector((state) => state.ui.isSidebarHidden);
  const dispatch = useDispatch();

  const collapseChannelsHandler = () => {
    setIsChannelListOpen(!isChannelListOpen);
  };

  useEffect(() => {
    const unsubscribe = getChannelList(setChannels);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.onresize = resize;
    function resize() {
      if (window.innerWidth > 585) {
        dispatch(uiActions.showSidebar());
      }
      if (window.innerWidth <= 585) {
        dispatch(uiActions.hideSidebar());
      }
    }
  }, [dispatch]);

  //todo: Workspace name is hardcoded, need to handle after adding workspace feature
  return (
    <div className={`sidebar ${isSidebarHidden ? 'hidden' : ''}`}>
      <div className='sidebar__header'>
        <div className='sidebar__info--left'>
          <span className='sidebar__info--team-name'>Devs to Moon</span>
          <ExpandMoreIcon
            className='sidebar__info--expand-icon'
            fontSize='small'
          />
        </div>
        <Tooltips title={constants.CHANNEL_SIDEBAR_NEW_MESSAGE}>
          <NoteAltOutlinedIcon className='sidebar__header--new-message' />
        </Tooltips>
      </div>
      <SidebarOption Icon={MoreVertIcon} title='Browse Slack' addGroupOption />
      <button
        onClick={collapseChannelsHandler}
        className='sidebar__collapse--button'
      >
        <SidebarOption
          Icon={isChannelListOpen ? ArrowDropDownIcon : ArrowRightIcon}
          title='Channels'
          addGroupOption
        />
      </button>

      <Collapse in={isChannelListOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {channels.map((channel) => (
            <SidebarOption
              key={channel.id}
              channelId={channel.id}
              title={channel.name}
            />
          ))}
          <SidebarOption
            Icon={AddBoxIcon}
            addChannelOption
            title='Add Channels'
          />
        </List>
      </Collapse>
    </div>
  );
}

export default Sidebar;
