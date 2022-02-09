import React, { useState, useEffect, useContext } from 'react';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SidebarOption from './SidebarOption';
import db from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import './Sidebar.css';
import AuthContext from '../context/auth-context';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

function Sidebar() {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
    console.log(open);
    console.log('clicked');
  };

  const authCtx = useContext(AuthContext);
  const user = authCtx.user;
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      const rooms = [];
      snapshot.forEach((doc) => {
        rooms.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      setChannels(rooms);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='sidebar__info'>
          <div className='sidebar__info-team-name'>
            <span>Devs to Moon</span>
            <ExpandMoreIcon fontSize='small' />
          </div>
          <h3>{user?.displayName}</h3>
        </div>
        <NoteAltOutlinedIcon />
      </div>
      <SidebarOption Icon={MoreVertIcon} title='Browse Slack' group />
      <button onClick={handleClick} className='sidebar__collapse-button'>
        <SidebarOption
          Icon={open ? ArrowDropDownIcon : ArrowRightIcon}
          title='Channels'
          group
        />
      </button>

      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {channels.map((channel) => (
            <SidebarOption
              title={channel.name}
              id={channel.id}
              key={channel.id}
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
