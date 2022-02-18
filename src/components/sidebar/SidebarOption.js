import React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import db from '../../firebase/config';
import { FIRESTORE_COLLECTION_ROOMS } from '../../utils/constants/Firestore';
import { useNavigate } from 'react-router-dom';
import './SidebarOption.css';

function SidebarOption({
  Icon,
  title,
  channelId,
  addChannelOption,
  addGroupOption,
}) {
  const navigate = useNavigate();

  const selectChannel = () => {
    channelId ? navigate(`/room/${channelId}`) : navigate(title);
  };

  const addChannel = async () => {
    const channelName = prompt('Please enter the channel name:');
    if (channelName) {
      await addDoc(collection(db, FIRESTORE_COLLECTION_ROOMS), {
        name: channelName,
      });
    }
  };

  return (
    <div
      className={`sidebarOption ${addGroupOption ? 'sidebar__group' : ''}`}
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon className='sidebarOption__icon' color='#bcabbc' />}
      {Icon ? (
        <h3 className='sidebarOption__title'>{title}</h3>
      ) : (
        <h3 className='sidebarOption__channel sidebarOption__title'>
          <span className='sidebarOption__hash'>#</span> {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
