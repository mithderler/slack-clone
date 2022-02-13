import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  onSnapshot,
  doc,
  collection,
  orderBy,
  query,
} from 'firebase/firestore';
import {
  getChannelDetails,
  getChannelMessages,
} from '../../firebase/firestore-fn';
import * as constants from '../../utils/constants';
import db from '../../firebase/config';
import Message from './Message';
import SlateTextEditor from './SlateTextEditor';
import InfoIcon from '@mui/icons-material/Info';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './Chat.css';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

function Chat() {
  const [enteredText, setEnteredText] = useState(initialValue);
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);
  const [error, setError] = useState();
  const { channelId } = useParams();

  useEffect(() => {
    let unsubscribe, unsubscribe2;
    if (channelId) {
      unsubscribe = getChannelDetails(channelId, setChannelDetails);
      unsubscribe2 = getChannelMessages(
        channelId,
        setChannelMessages,
        setError
      );
    }

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [channelId]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages]);

  return (
    <div className='chat'>
      <div className='chat__header'>
        <div>
          <h4 className='chat__channel-name'>
            <strong># {channelDetails?.name}</strong>
            <StarBorderIcon />
          </h4>
        </div>
        <div className='chat__header--right'>
          <p className='chat__header--info'>
            <InfoIcon className='chat__header--info-icon' />
            Details
          </p>
        </div>
      </div>
      {channelMessages.map(({ message, timestamp, user, userImage }) => (
        <Message
          key={timestamp}
          user={user}
          userImage={userImage}
          message={message}
          timestamp={timestamp}
        />
      ))}
      <div className='chat__editor'>
        <SlateTextEditor
          value={enteredText}
          setValue={setEnteredText}
          channelName={channelDetails?.name}
          channelId={channelId}
        />
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Chat;
