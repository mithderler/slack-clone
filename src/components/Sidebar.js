import React, { useState, useEffect, useContext } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
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
          <h2>Devs to Moon</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption Icon={MoreVertIcon} title='Browse Slack' />
      <hr />
      <button onClick={handleClick} className='sidebar__collapse-button'>
        <SidebarOption
          Icon={open ? ExpandLessIcon : ExpandMoreIcon}
          title='Channels'
        />
      </button>
      <hr />

      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {channels.map((channel) => (
            <SidebarOption
              title={channel.name}
              id={channel.id}
              key={channel.id}
            />
          ))}
          <SidebarOption Icon={AddIcon} addChannelOption title='Add Channels' />
        </List>
      </Collapse>
    </div>
  );
}

export default Sidebar;
