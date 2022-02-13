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
import './Sidebar.css';

const auth = getAuth(app);

function Sidebar() {
  const [user] = useAuthState(auth);
  const [channels, setChannels] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const collapseChannelsHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const unsubscribe = getChannelList(setChannels);

    return () => unsubscribe();
  }, []);

  //todo: Workspace name is hardcoded, need to handle after adding workspace feature
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='sidebar__info'>
          <div className='sidebar__info--left'>
            <span className='sidebar__info--team-name'>Devs to Moon</span>
            <ExpandMoreIcon
              className='sidebar__info--expand-icon'
              fontSize='small'
            />
          </div>
          <h3 className='sidebar__info--username'>{user?.displayName}</h3>
        </div>
        <NoteAltOutlinedIcon className='sidebar__header--new-message' />
      </div>
      <SidebarOption Icon={MoreVertIcon} title='Browse Slack' addGroupOption />
      <button
        onClick={collapseChannelsHandler}
        className='sidebar__collapse--button'
      >
        <SidebarOption
          Icon={isOpen ? ArrowDropDownIcon : ArrowRightIcon}
          title='Channels'
          addGroupOption
        />
      </button>

      <Collapse in={isOpen} timeout='auto' unmountOnExit>
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
