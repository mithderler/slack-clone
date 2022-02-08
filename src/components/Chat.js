import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firebase/config';
import {
  onSnapshot,
  doc,
  collection,
  orderBy,
  query,
} from 'firebase/firestore';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';
import Message from './Message';
import ChatInput from './ChatInput';
import './Chat.css';

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    let unsubscribe, unsubscribe2;
    if (roomId) {
      unsubscribe = onSnapshot(doc(db, 'rooms', roomId), (doc) => {
        setRoomDetails(doc.data());
      });

      const q = query(
        collection(db, 'rooms', roomId, 'messages'),
        orderBy('timestamp', 'asc')
      );
      unsubscribe2 = onSnapshot(q, (snapshot) => {
        const messages = [];
        snapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        setRoomMessages(messages);
      });
    }

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [roomId]);

  return (
    <div className='chat'>
      <div className='chat__header'>
        <div className='chat__headerLeft'>
          <h4 className='chat__channelName'>
            <strong># {roomDetails?.name}</strong>
            <StarBorderIcon />
          </h4>
        </div>
        <div className='chat__headerRight'>
          <p>
            <InfoIcon />
            Details
          </p>
        </div>
      </div>
      <div className='chat__messages'>
        {roomMessages.map(({ message, timestamp, user, userImage }) => (
          <Message
            key={timestamp}
            user={user}
            userImage={userImage}
            message={message}
            timestamp={timestamp}
          />
        ))}
      </div>
      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  );
}

export default Chat;
