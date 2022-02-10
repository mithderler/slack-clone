import React, { useEffect, useState, useRef } from 'react';
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
import SlateTextEditor from './SlateTextEditor';
import ReadOnly from './SlateReadOnly';
import './Chat.css';

function Chat() {
  const [input, setInput] = useState(initialValue);

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
      unsubscribe2 = onSnapshot(
        q,
        (snapshot) => {
          const messages = [];
          snapshot.forEach((doc) => {
            messages.push(doc.data());
          });
          setRoomMessages(messages);
        },
        (error) => {
          console.log('error occured: ', error);
        }
      );
    }

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [roomId]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

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
      {/* <ChatInput channelName={roomDetails?.name} channelId={roomId} /> */}
      <div className='chat__editor'>
        <SlateTextEditor
          value={input}
          setValue={setInput}
          channelName={roomDetails?.name}
          channelId={roomId}
        />
        {/* <ReadOnly initialValue={initialValue} /> */}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Chat;

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const initialValue2 = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
];
